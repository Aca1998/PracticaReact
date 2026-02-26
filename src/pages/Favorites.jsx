import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GameCard from "../components/GameCard";
import { API_SERVICE } from "../services/service";

const Favorites = () => {
  const favoriteIds = useSelector((state) => state.games.favorites);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favoriteIds.length === 0) {
        setGames([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const results = await Promise.all(
          favoriteIds.map(async (id) => {
            try {
              return await API_SERVICE.getGameDetail(id);
            } catch (error) {
              return null;
            }
          })
        );
        setGames(results.filter(Boolean));
      } catch (error) {
        console.error("Error fetching favorites", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favoriteIds]);

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
