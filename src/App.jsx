import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import GameDetails from './pages/GameDetails';
import Favorites from './pages/Favorites';
import GamesByCategory from './pages/GamesByCategory';
import PublisherSearch from './pages/PublisherSearch';
import PublisherDetail from './pages/PublisherDetail';
import Events from './pages/Events';
import MyEvents from './pages/MyEvents';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#0F172A] text-slate-200 font-sans">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explorar" element={<Explore />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/mis-eventos" element={<MyEvents />} />
            <Route path="/juegos/:categoryType/:slug" element={<GamesByCategory />} />
            <Route path="/publishers" element={<PublisherSearch />} />
            <Route path="/publisher/:id" element={<PublisherDetail />} />
            <Route path="/juego/:id" element={<GameDetails />} />
            <Route path="/favoritos" element={<Favorites />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
