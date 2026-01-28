import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';
import { obtenerJuegosPopulares } from '../services/api';

const GameCarousel = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            const data = await obtenerJuegosPopulares(4);
            setGames(data);
            setLoading(false);
        };
        fetchGames();
    }, []);

    if (loading) {
        return (
            <div className="my-16 flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="my-12">
            <div className="text-center mb-12">

                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Títulos <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Populares</span>
                </h2>
            </div>

            <div className="flex overflow-x-auto pb-8 px-4 scrollbar-hide snap-x -mx-4 items-center xl:justify-center">
                {games.map((game) => (
                    <div key={game.id} className="snap-center shrink-0 first:pl-4 last:pr-4">
                        <GameCard
                        id={game.id}
                        title={game.name}
                        rating={game.rating}
                        image={game.background_image}
                        />

                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameCarousel;
