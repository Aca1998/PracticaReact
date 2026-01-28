import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ id, title, image, rating }) => {
  return (
    <div className="bg-[#1E293B] rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-violet-500/50 transition-all duration-300 min-w-[280px] m-4 group relative">
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] to-transparent opacity-60"></div>
      </div>

      <div className="p-5 relative z-10">
        <h3 className="text-lg font-bold text-white mb-2 truncate group-hover:text-violet-400 transition-colors">
          {title}
        </h3>

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center space-x-2 bg-black/30 px-2 py-1 rounded">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-white font-medium text-sm">{rating}</span>
          </div>

          <Link
            to={`/juego/${id}`}
            className="text-sm font-medium text-violet-400 hover:text-white transition-colors"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
