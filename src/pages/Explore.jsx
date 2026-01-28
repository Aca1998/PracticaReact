import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import { buscarJuegos, obtenerGeneros } from '../services/api';

const Explore = () => {
  const [busqueda, setBusqueda] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  // Cargar géneros (categorías) una sola vez
  useEffect(() => {
    const fetchGenres = async () => {
      const data = await obtenerGeneros();
      setGenres(data);
    };
    fetchGenres();
  }, []);

  // Buscar juegos cuando cambia el texto o el género
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      const data = await buscarJuegos(busqueda, 8, selectedGenre);
      setGames(data);
      setLoading(false);
    };

    const timeoutId = setTimeout(() => {
      fetchGames();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [busqueda, selectedGenre]);

  return (
    <div className="min-h-screen pb-20 bg-[#0F172A]">
      {/* Cabecera de la sección Explorar */}
      <div className="bg-[#1E293B] border-b border-white/5 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Explora nuestro Catálogo</h1>
          <p className="text-slate-400 mb-8">Encuentra tus próximos juegos favoritos</p>

          {/* Barra de Búsqueda */}
          <div className="max-w-xl mx-auto relative group">
            <input
              type="text"
              placeholder="Buscar videojuegos..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#0F172A] border border-white/10 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all text-lg placeholder-slate-500"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-violet-500 transition-colors text-xl">
              🔍
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Resultados */}
      <div className="container mx-auto px-6 mt-12">
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <h2 className="text-xl font-semibold text-white">
            Resultados ({games.length})
          </h2>

          {/* Select de categorías (géneros) */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-[#1E293B] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-300 outline-none focus:border-violet-500"
          >
            <option value="">Todos los géneros</option>
            {genres.map((g) => (
              <option key={g.id} value={String(g.id)}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game) => (
              <div key={game.id} className="transform hover:-translate-y-1 transition-transform duration-300">
                <GameCard
                  id={game.id}
                  title={game.name}
                  rating={game.rating}
                  image={game.background_image}
                />
              </div>
            ))}
          </div>
        )}

        {!loading && games.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No se encontraron juegos.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
