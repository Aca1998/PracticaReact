import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="bg-[#0F172A]/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-tight text-white hover:text-violet-400 transition-colors">
                    VideoJuegos <span className="text-violet-500">APP</span>
                </Link>
                <nav className="flex items-center space-x-8">
                    <ul className="flex space-x-6 text-sm font-medium">
                        <li>
                            <Link to="/" className="text-slate-300 hover:text-white transition-colors">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/explorar" className="text-slate-300 hover:text-white transition-colors">
                                Explorar
                            </Link>
                        </li>
                        <li>
                            <Link to="/eventos" className="text-slate-300 hover:text-white transition-colors">
                                Eventos
                            </Link>
                        </li>
                        <li>
                            <Link to="/publishers" className="text-slate-300 hover:text-white transition-colors">
                                Publishers
                            </Link>
                        </li>
                    </ul>

                    {/* User Profile Section */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-400 hover:bg-violet-600 transition-all hover:text-white"
                        >
                            <span className="text-xl">👤</span>
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 mt-3 w-48 bg-[#1E293B] border border-white/10 rounded-xl shadow-2xl py-2 z-[60] overflow-hidden">
                                <div className="px-4 py-2 border-b border-white/5 mb-1">
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Usuario Simulado</p>
                                    <p className="text-sm text-white font-medium">Gamer Pro</p>
                                </div>
                                <Link
                                    to="/favoritos"
                                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-violet-600 hover:text-white transition-colors"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    Mis Favoritos
                                </Link>
                                <Link
                                    to="/mis-eventos"
                                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-violet-600 hover:text-white transition-colors"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    Mis Eventos
                                </Link>
                                <div className="mt-1 pt-1 border-t border-white/5">
                                    <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
