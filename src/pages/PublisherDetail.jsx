import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameCard from '../components/GameCard';
import { obtenerDetallePublisher, buscarJuegos } from '../services/api';

const PublisherDetail = () => {
    const { id } = useParams();
    const [publisher, setPublisher] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 8;

    useEffect(() => {
        const fetchPublisherData = async () => {
            setLoading(true);
            const pubData = await obtenerDetallePublisher(id);
            setPublisher(pubData);

            if (pubData) {
                const gamesData = await buscarJuegos("", pageSize, "", page, "", id);
                setGames(gamesData.results);
                setTotal(gamesData.count);
            }
            setLoading(false);
        };
        fetchPublisherData();
    }, [id, page]);

    const totalPages = Math.ceil(total / pageSize) || 1;
    const hayAnterior = page > 1;
    const haySiguiente = page < totalPages;

    if (loading && !publisher) {
        return (
            <div className="min-h-screen bg-[#0F172A] flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
            </div>
        );
    }

    if (!publisher) {
        return (
            <div className="min-h-screen bg-[#0F172A] text-white flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-4">Publisher no encontrado</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 bg-[#0F172A]">
            <div className="relative h-[40vh] w-full">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${publisher.image_background})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 container mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-2">{publisher.name}</h1>
                    <p className="text-slate-300 text-lg">{publisher.games_count} videojuegos publicados</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1">
                        <div className="bg-[#1E293B] p-6 rounded-2xl border border-white/5 space-y-6 sticky top-24">
                            <div>
                                <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Sobre {publisher.name}</h3>
                                <div
                                    className="text-slate-300 prose prose-invert max-w-none text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: publisher.description }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="text-2xl font-bold text-white">Videojuegos publicados</h2>

                        {loading ? (
                            <div className="flex justify-center py-10">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {games.map((game) => (
                                        <GameCard
                                            key={game.id}
                                            id={game.id}
                                            title={game.name}
                                            rating={game.rating}
                                            image={game.background_image}
                                        />
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublisherDetail;
