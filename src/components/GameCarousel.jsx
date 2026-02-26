import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import GameCard from './GameCard';
import { fetchPopularGames } from '../store/slices/gamesSlice';

const GameCarousel = () => {
  const dispatch = useDispatch();
  const { popularGames: games, loading } = useSelector((state) => state.games);

  const carruselRef = useRef(null);

  useEffect(() => {
    dispatch(fetchPopularGames(15));
  }, [dispatch]);

  useEffect(() => {
    if (loading) return;
    if (!carruselRef.current) return;

    const el = carruselRef.current;

    const interval = setInterval(() => {
      const alFinal = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;

      if (alFinal) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 320, behavior: 'smooth' });
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
    return (
      <div className="my-16 flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="my-12">
      <div className="text-center mb-10">
        <span className="inline-block py-1 px-3 rounded-full bg-violet-500/10 text-violet-400 text-xs font-bold tracking-widest uppercase mb-4 border border-violet-500/20">
          🔥 Trending Now
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Títulos{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
            Populares
          </span>
        </h2>
      </div>

      <div
        ref={carruselRef}
        className="flex gap-4 overflow-x-auto pb-6 px-2 scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {games.map((game) => (
          <Link
            key={game.id}
            to={`/juego/${game.id}`}
            className="shrink-0 w-[320px] block transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
          >

            <GameCard
              id={game.id}
              title={game.name}
              rating={game.rating}
              image={game.background_image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameCarousel;
