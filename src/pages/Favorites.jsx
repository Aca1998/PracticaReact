import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameCard from "../components/GameCard";
import { fetchFavoriteGames } from "../store/slices/gamesSlice";

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites: favoriteIds, favoriteGames: games, loading } = useSelector((state) => state.games);

  useEffect(() => {
    if (favoriteIds.length > 0) {
      dispatch(fetchFavoriteGames(favoriteIds));
    }
  }, [dispatch, favoriteIds]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-[#0F172A]">
      <div className="bg-[#1E293B] border-b border-white/5 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Tus Favoritos</h1>
          <p className="text-slate-400">Juegos que has marcado como favorito</p>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12">
        {favoriteIds.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">Aún no tienes favoritos.</p>
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
      </div>
    </div>
  );
};

export default Favorites;
