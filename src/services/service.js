const llaveApi = '053e1c68be48474790d44b6a51caaa6a';
const URLRAW = 'https://api.rawg.io/api';

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const API_SERVICE = {
  getPopularGames: async (pageSize = 4) => {
    const url = `${URLRAW}/games?key=${llaveApi}&ordering=-rating&page_size=${pageSize}`;
    const data = await fetchData(url);
    return data.results;
  },

  getGenres: async () => {
    const url = `${URLRAW}/genres?key=${llaveApi}`;
    const data = await fetchData(url);
    return data.results;
  },

  searchGames: async ({ query = "", pageSize = 8, genreId = "", page = 1, tags = "", publishers = "" }) => {
    let url = `${URLRAW}/games?key=${llaveApi}&page_size=${pageSize}&page=${page}`;
    if (query) url += `&search=${query}`;
    if (genreId) url += `&genres=${genreId}`;
    if (tags) url += `&tags=${tags}`;
    if (publishers) url += `&publishers=${publishers}`;
    
    const data = await fetchData(url);
    return { results: data.results, count: data.count };
  },

  getGameDetail: async (id) => {
    const url = `${URLRAW}/games/${id}?key=${llaveApi}`;
    return await fetchData(url);
  },

  getPublisherDetail: async (id) => {
    const url = `${URLRAW}/publishers/${id}?key=${llaveApi}`;
    return await fetchData(url);
  },

  searchPublishers: async ({ query = "", page = 1, pageSize = 8 }) => {
    let url = `${URLRAW}/publishers?key=${llaveApi}&page=${page}&page_size=${pageSize}`;
    if (query) url += `&search=${query}`;
    
    const data = await fetchData(url);
    return { results: data.results, count: data.count };
  }
};
