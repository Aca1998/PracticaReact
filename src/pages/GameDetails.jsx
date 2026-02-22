import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { obtenerDetalleJuego } from '../services/api';

const GameDetails = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchGame = async () => {
            const data = await obtenerDetalleJuego(id);
            setGame(data);
            setLoading(false);
        };
        fetchGame();

        // Check favorites
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(id));
    }, [id]);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        let newFavorites;
        if (favorites.includes(id)) {
            newFavorites = favorites.filter(favId => favId !== id);
            setIsFavorite(false);
        } else {
            newFavorites = [...favorites, id];
            setIsFavorite(true);
        }
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F172A] flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
            </div>
        );
    }

    if (!game) {
        return (
            <div className="min-h-screen bg-[#0F172A] text-white flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-4">Juego no encontrado</h2>
                <Link to="/" className="text-violet-400 hover:text-white transition-colors">Volver al inicio</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F172A] text-slate-200">
            {/* Hero Section with Background Image */}
            <div className="relative h-[50vh] w-full">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${game.background_image})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 container mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                        <div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {game.genres.map(genre => (
                                    <Link
                                        key={genre.id}
                                        to={`/juegos/genero/${genre.id}`}
                                        className="bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-violet-500/30 hover:bg-violet-500/40 transition-colors"
                                    >
                                        {genre.name}
                                    </Link>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-2">{game.name}</h1>
                            <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
                                <span>{game.released}</span>
                                <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                                <div className="flex items-center text-yellow-400">
                                    <span className="mr-1">★</span>
                                    <span>{game.rating}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={toggleFavorite}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${isFavorite ? 'bg-red-500/20 text-red-500 border-red-500/50' : 'bg-white/10 text-white hover:bg-white/20'} border`}
                        >
                            <span className="text-xl">{isFavorite ? '❤️' : '🤍'}</span>
                            {isFavorite ? 'Favorito' : 'Añadir a Favoritos'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Sobre el juego</h2>
                            <div
                                className="prose prose-invert prose-violet max-w-none text-slate-400 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: game.description }}
                            />
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Tags</h2>
                            <div className="flex flex-wrap gap-2">
                                {game.tags && game.tags.length > 0 ? (
                                    game.tags.map(tag => (
                                        <Link
                                            key={tag.id}
                                            to={`/juegos/tag/${tag.id}`}
                                            className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-white/10 hover:border-violet-500/50 hover:text-white transition-all"
                                        >
                                            {tag.name}
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-slate-500">No hay tags disponibles.</p>
                                )}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Plataformas</h2>
                            <div className="flex flex-wrap gap-3">
                                {game.platforms.map(({ platform }) => (
                                    <span key={platform.id} className="bg-[#1E293B] border border-white/10 px-4 py-2 rounded-lg text-slate-300">
                                        {platform.name}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {game.website && (
                            <section>
                                <a
                                    href={game.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors font-medium"
                                >
                                    Visitar sitio web oficial ↗
                                </a>
                            </section>
                        )}
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-[#1E293B] p-6 rounded-2xl border border-white/5 space-y-4">
                            <div>
                                <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Desarrollador</h3>
                                <div className="flex flex-wrap gap-2">
                                    {game.developers && game.developers.length > 0 ? (
                                        game.developers.map(d => (
                                            <span key={d.id} className="text-white font-medium">{d.name}</span>
                                        ))
                                    ) : (
                                        <p className="text-slate-400">N/A</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Editor</h3>
                                <div className="flex flex-wrap gap-2">
                                    {game.publishers && game.publishers.length > 0 ? (
                                        game.publishers.map(p => (
                                            <Link
                                                key={p.id}
                                                to={`/publisher/${p.id}`}
                                                className="text-white font-medium hover:text-violet-400 transition-colors"
                                            >
                                                {p.name}
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-slate-400">N/A</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Metacritic</h3>
                                {game.metacritic ? (
                                    <span className={`inline-block px-2 py-1 rounded text-sm font-bold ${game.metacritic >= 75 ? 'bg-green-500/20 text-green-400' : game.metacritic >= 50 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {game.metacritic}
                                    </span>
                                ) : (
                                    <p className="text-slate-400">N/A</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetails;
