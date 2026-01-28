// Tu llave y la web base
const KEY = '053e1c68be48474790d44b6a51caaa6a';
const URL = 'https://api.rawg.io/api';

// 1. Traer juegos populares (He puesto que traiga 10 siempre)
export const verPopulares = async () => {
    // Pedimos los datos
    const respuesta = await fetch(`${URL}/games?key=${KEY}&ordering=-rating&page_size=10`);
    // Los convertimos a algo que JS entienda (JSON)
    const datos = await respuesta.json();
    // Devolvemos la lista de juegos
    return datos.results;
};

// 2. Traer los géneros (Acción, Aventura...)
export const verGeneros = async () => {
    const respuesta = await fetch(`${URL}/genres?key=${KEY}`);
    const datos = await respuesta.json();
    return datos.results;
};

// 3. Buscar juego por nombre (Solo busca, no filtra por nada más para no liar)
export const buscar = async (texto) => {
    // Si no escriben nada, no busco nada
    if (!texto) return []; 
    
    const respuesta = await fetch(`${URL}/games?key=${KEY}&search=${texto}&page_size=5`);
    const datos = await respuesta.json();
    return datos.results;
};

// 4. Ver info de un solo juego
export const verJuego = async (id) => {
    const respuesta = await fetch(`${URL}/games/${id}?key=${KEY}`);
    const datos = await respuesta.json();
    return datos; // Aquí devolvemos "datos" directo, no "results"
};