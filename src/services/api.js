const llaveApi = '053e1c68be48474790d44b6a51caaa6a';
const URLRAW = 'https://api.rawg.io/api';

// Obtener juegos populares
export const obtenerJuegosPopulares = async (pageSize = 4) => {
  try {
    const url = `${URLRAW}/games?key=${llaveApi}&ordering=-rating&page_size=${pageSize}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) return [];

    return data.results;
  } catch (error) {
    console.log("Error en juegos populares");
    return [];
  }
};

// Obtener géneros por categorias 
export const obtenerGeneros = async () => {
  try {
    const response = await fetch(`${URLRAW}/genres?key=${llaveApi}`);
    const data = await response.json();

    if (!response.ok) return [];

    return data.results;
  } catch (error) {
    console.log("Error al cargar géneros");
    return [];
  }
};

// con esta funcion podemos buscar los juegos y tambien añade la paginacion
export const buscarJuegos = async (query = "", pageSize = 8, genreId = "", page = 1, tags = "", publishers = "") => {
  try {
    let url = `${URLRAW}/games?key=${llaveApi}&page_size=${pageSize}&page=${page}`;

    if (query) {
      url += `&search=${query}`;
    }

    if (genreId) {
      url += `&genres=${genreId}`;
    }

    if (tags) {
      url += `&tags=${tags}`;
    }

    if (publishers) {
      url += `&publishers=${publishers}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) return { results: [], count: 0 };

    return { results: data.results, count: data.count };
  } catch (error) {
    console.log("Error en la búsqueda");
    return { results: [], count: 0 };
  }
};


//Obtener detalle de un juego por ID
export const obtenerDetalleJuego = async (id) => {
  try {
    const response = await fetch(`${URLRAW}/games/${id}?key=${llaveApi}`);
    const data = await response.json();

    if (!response.ok) return null;

    return data;
  } catch (error) {
    console.log("Error en detalle del juego");
    return null;
  }
};

// Obtener detalle de un publisher
export const obtenerDetallePublisher = async (id) => {
  try {
    const response = await fetch(`${URLRAW}/publishers/${id}?key=${llaveApi}`);
    const data = await response.json();

    if (!response.ok) return null;

    return data;
  } catch (error) {
    console.log("Error al obtener detalle del publisher");
    return null;
  }
};

// Buscar publishers
export const buscarPublishers = async (query = "", page = 1, pageSize = 8) => {
  try {
    let url = `${URLRAW}/publishers?key=${llaveApi}&page=${page}&page_size=${pageSize}`;
    if (query) {
      url += `&search=${query}`;
    }
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) return { results: [], count: 0 };

    return { results: data.results, count: data.count };
  } catch (error) {
    console.log("Error al buscar publishers");
    return { results: [], count: 0 };
  }
};
