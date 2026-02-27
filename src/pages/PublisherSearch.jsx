import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublishersSearch } from '../store/slices/gamesSlice';

const PublisherSearch = () => {
    const dispatch = useDispatch();
    const {
        searchResultsPublishers: publishers,
        totalCountPublishers: total,
        loading
    } = useSelector((state) => state.games);

    const [busqueda, setBusqueda] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 8;

    useEffect(() => {
        setPage(1);
    }, [busqueda]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(fetchPublishersSearch({ query: busqueda, page, pageSize }));
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [dispatch, busqueda, page]);

    const totalPages = Math.ceil(total / pageSize) || 1;
    const hayAnterior = page > 1;
    const haySiguiente = page < totalPages;

    return (
        <div className="min-h-screen pb-20 bg-[#0F172A]">
            <div className="bg-[#1E293B] border-b border-white/5 py-12">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">Busca Publishers</h1>
                    <p className="text-slate-400 mb-8">Encuentra información sobre editores de videojuegos</p>

                    <div className="max-w-xl mx-auto relative group">
                        <input
                            type="text"
                            placeholder="Buscar publishers..."
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

            <div className="container mx-auto px-6 mt-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-semibold text-white">
                        Resultados ({total})
                    </h2>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {publishers.map((pub) => (
                                <Link
                                    key={pub.id}
                                    to={`/publisher/${pub.id}`}
                                    className="bg-[#1E293B] border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300 group"
                                >
                                    <div className="h-40 overflow-hidden relative">
                                        <img
                                            src={pub.image_background || 'https://via.placeholder.com/400x200?text=No+Image'}
                                            alt={pub.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] to-transparent"></div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-violet-400 transition-colors">
                                            {pub.name}
                                        </h3>
                                        <p className="text-slate-400 text-sm">
                                            {pub.games_count} juegos publicados
                                        </p>
                                    </div>
                                </Link>
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

                        {publishers.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-slate-500 text-lg">No se encontraron publishers.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PublisherSearch;
