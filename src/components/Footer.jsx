import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16 mt-auto">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-12 border-b border-slate-800 pb-12">
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="text-2xl font-bold text-white mb-4">VideoJuegos APP</h4>
                        <p className="text-slate-400 max-w-sm">
                            La plataforma definitiva para explorar, descubrir y seguir tus videojuegos favoritos.
                        </p>
                    </div>
                    <div>
                        <h5 className="text-white font-semibold mb-4">Enlaces</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Explorar</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Categorías</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-white font-semibold mb-4">Legal</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Alfonso Carmona Aguayo - Practica React.</p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
