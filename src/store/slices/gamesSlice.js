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

export const fetchFavoriteGames = createAsyncThunk(
    'games/fetchFavoriteGames',
    async (favoriteIds, { rejectWithValue }) => {
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
            return results.filter(Boolean);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchPublishersSearch = createAsyncThunk(
    'games/fetchPublishersSearch',
    async (params, { rejectWithValue }) => {
        try {
            return await API_SERVICE.searchPublishers(params);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchPublisherDetail = createAsyncThunk(
    'games/fetchPublisherDetail',
    async (id, { rejectWithValue }) => {
        try {
            return await API_SERVICE.getPublisherDetail(id);
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
        searchResultsPublishers: [],
        currentGame: null,
        currentPublisher: null,
        favoriteGames: [],
        totalCount: 0,
        totalCountPublishers: 0,
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
        clearCurrentGame: (state) => {
            state.currentGame = null;
        },
        clearCurrentPublisher: (state) => {
            state.currentPublisher = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Popular Games
            .addCase(fetchPopularGames.pending, (state) => {
                state.loading = true;
                state.error = null;
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
                state.error = null;
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
            // Game Detail
            .addCase(fetchGameDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentGame = null;
            })
            .addCase(fetchGameDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.currentGame = action.payload;
            })
            .addCase(fetchGameDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Favorite Games Details
            .addCase(fetchFavoriteGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavoriteGames.fulfilled, (state, action) => {
                state.loading = false;
                state.favoriteGames = action.payload;
            })
            .addCase(fetchFavoriteGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Publishers Search
            .addCase(fetchPublishersSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPublishersSearch.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResultsPublishers = action.payload.results;
                state.totalCountPublishers = action.payload.count;
            })
            .addCase(fetchPublishersSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Publisher Detail
            .addCase(fetchPublisherDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentPublisher = null;
            })
            .addCase(fetchPublisherDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.currentPublisher = action.payload;
            })
            .addCase(fetchPublisherDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Genres
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.genres = action.payload;
            });
    },
});

export const { toggleFavorite, clearCurrentGame, clearCurrentPublisher } = gamesSlice.actions;
export default gamesSlice.reducer;
