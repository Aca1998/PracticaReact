import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameCard from '../components/GameCard';
import { buscarJuegos } from '../services/api';

const GamesByCategory = () => {
    const { categoryType, slug } = useParams();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 8;

    useEffect(() => {
        setPage(1);
    }, [categoryType, slug]);

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            const genreId = categoryType === 'genero' ? slug : '';
            const tags = categoryType === 'tag' ? slug : '';

            const data = await buscarJuegos("", pageSize, genreId, page, tags);
            setGames(data.results);
            setTotal(data.count);
            setLoading(false);
        };
        fetchGames();
    }, [categoryType, slug, page]);

    const totalPages = Math.ceil(total / pageSize) || 1;
    const hayAnterior = page > 1;
    const haySiguiente = page < totalPages;

    const categoryTitle = categoryType === 'genero' ? 'Género' : 'Tag';

    return (
        <div className="min-h-screen pb-20 bg-[#0F172A]">
            <div className="bg-[#1E293B] border-b border-white/5 py-12">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">Juegos por {categoryTitle}: <span className="text-violet-400 capitalize">{slug.replace(/-/g, ' ')}</span></h1>
                    <p className="text-slate-400">Mostrando {total} resultados</p>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-12">
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

                        {games.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-slate-500 text-lg">No se encontraron juegos para esta categoría.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default GamesByCategory;
