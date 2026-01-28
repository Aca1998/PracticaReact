import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-[#0F172A]/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-tight text-white hover:text-violet-400 transition-colors">
                    VideoJuegos <span className="text-violet-500">APP</span>
                </Link>
                <nav>
                    <ul className="flex space-x-8 text-sm font-medium">
                        <li>
                            <Link to="/" className="text-slate-300 hover:text-white transition-colors hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/explorar" className="text-slate-300 hover:text-white transition-colors hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                                Explorar
                            </Link>
                        </li>
                             <li>
                            <Link to="/favoritos" className="text-slate-300 hover:text-white transition-colors hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                                Favoritos
                            </Link>
                            </li>

                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
