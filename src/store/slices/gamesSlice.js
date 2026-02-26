import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_SERVICE } from '../../services/service';

// Thunks
export const fetchPopularGames = createAsyncThunk(
    'games/fetchPopularGames',
    async (pageSize, { rejectWithValue }) => {
        try {
            return await API_SERVICE.getPopularGames(pageSize);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchGamesBySearch = createAsyncThunk(
    'games/fetchGamesBySearch',
    async (params, { rejectWithValue }) => {
        try {
            return await API_SERVICE.searchGames(params);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchGenres = createAsyncThunk(
    'games/fetchGenres',
    async (_, { rejectWithValue }) => {
        try {
            return await API_SERVICE.getGenres();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchGameDetail = createAsyncThunk(
    'games/fetchGameDetail',
    async (id, { rejectWithValue }) => {
        try {
            return await API_SERVICE.getGameDetail(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        popularGames: [],
        searchResults: [],
        totalCount: 0,
        genres: [],
        favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
        loading: false,
        error: null,
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const id = action.payload;
            const index = state.favorites.indexOf(id);
            if (index === -1) {
                state.favorites.push(id);
            } else {
                state.favorites.splice(index, 1);
            }
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
    },
    extraReducers: (builder) => {
        builder
            // Popular Games
            .addCase(fetchPopularGames.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPopularGames.fulfilled, (state, action) => {
                state.loading = false;
                state.popularGames = action.payload;
            })
            .addCase(fetchPopularGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Search Games
            .addCase(fetchGamesBySearch.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGamesBySearch.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload.results;
                state.totalCount = action.payload.count;
            })
            .addCase(fetchGamesBySearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Genres
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.genres = action.payload;
            });
    },
});

export const { toggleFavorite } = gamesSlice.actions;
export default gamesSlice.reducer;
