import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelParticipation } from '../store/slices/eventsSlice';
import { Link } from 'react-router-dom';

const MyEvents = () => {
    const dispatch = useDispatch();
    const allEvents = useSelector((state) => state.events.list);
    const userEventIds = useSelector((state) => state.events.userEvents);

    const userEvents = allEvents.filter(event => userEventIds.includes(event.id));

    return (
        <div className="min-h-screen pb-20 bg-[#0F172A]">
            <div className="bg-[#1E293B] border-b border-white/5 py-12">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">Mis Eventos</h1>
                    <p className="text-slate-400">Eventos a los que te has apuntado</p>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-12">
                {userEvents.length === 0 ? (
                    <div className="text-center py-20 bg-[#1E293B] rounded-2xl border border-dashed border-white/10">
                        <p className="text-slate-500 text-lg mb-6">Aún no te has apuntado a ningún evento.</p>
                        <Link
                            to="/eventos"
                            className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-full transition-all"
                        >
                            Explorar Eventos
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {userEvents.map((event) => (
                            <div key={event.id} className="bg-[#1E293B] rounded-2xl overflow-hidden border border-white/5 p-6 flex flex-col sm:flex-row gap-6">
                                <div className="sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden">
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                                    <div className="text-slate-400 text-sm mb-4">{event.location}</div>
                                    <button
                                        onClick={() => dispatch(cancelParticipation(event.id))}
                                        className="text-red-400 hover:text-red-300 text-sm font-semibold transition-colors"
                                    >
                                        Cancelar participación
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyEvents;
