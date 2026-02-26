import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameCard from '../components/GameCard';
import { fetchGamesBySearch, fetchGenres } from '../store/slices/gamesSlice';

const Explore = () => {
  const dispatch = useDispatch();
  const { searchResults: games, totalCount: total, genres, loading } = useSelector((state) => state.games);

  const [busqueda, setBusqueda] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [busqueda, selectedGenre]);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchGamesBySearch({ query: busqueda, pageSize, genreId: selectedGenre, page }));
    };

    const timeoutId = setTimeout(fetchData, 500);
    return () => clearTimeout(timeoutId);
  }, [busqueda, selectedGenre, page, dispatch]);

  const totalPages = Math.ceil(total / pageSize) || 1;
  const hayAnterior = page > 1;
  const haySiguiente = page < totalPages;

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
            Resultados ({total})
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
          <>
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

            {/* Paginación */}
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={!hayAnterior}
                className={`px-5 py-3 rounded-lg font-bold border transition-all
                  ${hayAnterior ? 'bg-[#1E293B] text-white border-white/10 hover:border-violet-500/50' : 'bg-white/5 text-slate-500 border-white/5 cursor-not-allowed'}`}
              >
                ◀ Anterior
              </button>

              <span className="text-slate-300 font-medium">
                Página <span className="text-white font-bold">{page}</span> de{' '}
                <span className="text-white font-bold">{totalPages}</span>
              </span>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!haySiguiente}
                className={`px-5 py-3 rounded-lg font-bold border transition-all
                  ${haySiguiente ? 'bg-[#1E293B] text-white border-white/10 hover:border-violet-500/50' : 'bg-white/5 text-slate-500 border-white/5 cursor-not-allowed'}`}
              >
                Siguiente ▶
              </button>
            </div>

            {!loading && games.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-500 text-lg">No se encontraron juegos.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
