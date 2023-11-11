// Funciónes para guardar el carrito en localStorage
const guardarPokemonStorage = (partida) => {
    localStorage.setItem('partida', JSON.stringify(partida));
}

const guardarPokemonsVistosEnLocalStorage = () => {
    let arrayPokemonsVistos = Array.from(pokemonsVistos);
    localStorage.setItem('pokemonsVistos', JSON.stringify(arrayPokemonsVistos));
}

const restaurarPokemonsVistosDesdeLocalStorage = () => {
    const pokemonsVistosJSON = localStorage.getItem('pokemonsVistos');
    if (pokemonsVistosJSON) {
        let arrayPokemonsVistos = JSON.parse(pokemonsVistosJSON);
        pokemonsVistos = new Set(arrayPokemonsVistos);
    }
}

const obtenerPokemonStorage = () => {// Función para obtener el carrito desde el almacenamiento local
    const pokemonJSON = localStorage.getItem('partida');
    return JSON.parse(pokemonJSON) || []; // Si no hay datos, devuelve una matriz vacía
}


const cargarPokemon = () => {//Funcion para cargar carrito desde localstorage
const pokemonStorage =   obtenerPokemonStorage()
if (pokemonStorage && Array.isArray(pokemonStorage) && pokemonStorage.length > 0) {
    array = pokemonStorage
    array.forEach((pokemon)=>{
    agregarPokemon(pokemon)
    mostrarPokemons()
    agregarPokedex()
    })
    
    restaurarPokemonsVistosDesdeLocalStorage();
    actualizarVistosEnLaPokedex()    
} else {
        filtrarPokemon()
       }
}
