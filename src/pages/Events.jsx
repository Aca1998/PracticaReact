import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinEvent, cancelParticipation } from '../store/slices/eventsSlice';

const Events = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events.list);
    const userEvents = useSelector((state) => state.events.userEvents);

    return (
        <div className="min-h-screen pb-20 bg-[#0F172A]">
            <div className="bg-[#1E293B] border-b border-white/5 py-12">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">Eventos de Videojuegos</h1>
                    <p className="text-slate-400">Descubre y apúntate a los próximos eventos del sector</p>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {events.map((event) => {
                        const isJoined = userEvents.includes(event.id);
                        return (
                            <div key={event.id} className="bg-[#1E293B] rounded-2xl overflow-hidden border border-white/5 flex flex-col md:flex-row group transition-all hover:border-violet-500/50">
                                <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-center text-slate-400 text-sm mb-4">
                                            <span className="mr-2">📍</span>
                                            {event.location}
                                        </div>
                                        <p className="text-slate-400 text-sm mb-6">
                                            {event.description}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => dispatch(isJoined ? cancelParticipation(event.id) : joinEvent(event.id))}
                                        className={`w-full py-3 rounded-xl font-bold transition-all ${isJoined
                                                ? 'bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20'
                                                : 'bg-violet-600 text-white hover:bg-violet-700 shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                                            }`}
                                    >
                                        {isJoined ? 'Cancelar Participación' : 'Apuntarse'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Events;
