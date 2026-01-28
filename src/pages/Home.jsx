import React from 'react';
import GameCarousel from '../components/GameCarousel';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Sección Hero / Promoción */}
            <section className="relative py-32 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-violet-600/10 blur-[120px] -z-10"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-full bg-blue-600/10 blur-[120px] -z-10"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-300 text-sm font-semibold mb-6 tracking-wide uppercase border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                        La nueva plataforma
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tight leading-tight">
                        Explora el Universo <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                            Gaming
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        Descubre los títulos más inmersivos y mejor valorados. Tu próxima gran historia comienza aquí.
                    </p>
                        <div className="flex justify-center space-x-4">
                        <Link
                            to="/explorar"
                            className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:-translate-y-1"
                        >
                            Explora tus juegos
                        </Link>

                        <Link
                            to="/favoritos"
                            className="bg-white/5 backdrop-blur hover:bg-white/10 text-white border border-white/10 font-bold py-4 px-10 rounded-full text-lg transition-all"
                        >
                            Juegos Favoritos
                        </Link>
                        </div>
                </div>
            </section>

            {/* Carrusel de Juegos Populares */}
            <div className="container mx-auto px-6 -mt-10 relative z-20 mb-20">
                <GameCarousel />
            </div>
        </div>
    );
};

export default Home;
