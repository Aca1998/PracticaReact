import { createSlice } from '@reduxjs/toolkit';
import { initialEvents } from '../../data/eventsData';

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        list: initialEvents,
        userEvents: JSON.parse(localStorage.getItem('userEvents') || '[]'),
    },
    reducers: {
        joinEvent: (state, action) => {
            const eventId = action.payload;
            if (!state.userEvents.includes(eventId)) {
                state.userEvents.push(eventId);
                localStorage.setItem('userEvents', JSON.stringify(state.userEvents));
            }
        },
        cancelParticipation: (state, action) => {
            const eventId = action.payload;
            state.userEvents = state.userEvents.filter(id => id !== eventId);
            localStorage.setItem('userEvents', JSON.stringify(state.userEvents));
        },
    },
});

export const { joinEvent, cancelParticipation } = eventsSlice.actions;
export default eventsSlice.reducer;
