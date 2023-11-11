//Variables globales

const listadoSeleccionados = document.getElementById("contenedor-pkmn")
const listadoPkdx = document.getElementById("contenedor-pokedex")
const pokebolas1 = document.getElementById("pokeball-1")
const pokebolas2 = document.getElementById("pokeball-2")
const pokebolas3 = document.getElementById("pokeball-3")
const pokebolas4 = document.getElementById("pokeball-4")
const pokebolas5 = document.getElementById("pokeball-5")
const pokebolas6 = document.getElementById("pokeball-6")
let src = null
let borde = null
let array = [] // verificar para llamar al localstorage
let elegidoPelea = []
let pokemonSeleccionado = []
let cont = array.length
let contador = 0
let i = 0
 
const pintarPokeballs = (cont) => {
    
    switch (cont) {
        case 0:
        pokebolas1.setAttribute("src", "img/pokebola-llena.png")        
            break;
        case 1:
        pokebolas2.setAttribute("src", "img/pokebola-llena.png")        
            break;
        case 2:
        pokebolas3.setAttribute("src", "img/pokebola-llena.png")        
            break;
        case 3:
        pokebolas4.setAttribute("src", "img/pokebola-llena.png")        
            break;
        case 4:
        pokebolas5.setAttribute("src", "img/pokebola-llena.png")        
            break;
        case 5: 
        pokebolas6.setAttribute("src", "img/pokebola-llena.png")        
            break;
        default: 
                   break;
    }

}
const resetearPokebolas = () => { //Funcion que resetea pokebolas equipo
    for (let i = 1; i <= 6; i++) {
        const pokebola = document.getElementById(`pokeball-${i}`);
        if (elegidoPelea[i - 1]) {
            // Si hay un Pokémon en la posición 'i - 1', establece la imagen como llena
            pokebola.setAttribute("src", "img/pokebola-llena.png");
        } else {
            // Si la posición está vacía, establece la imagen como vacía
            pokebola.setAttribute("src", "img/pokebola.png");
        }
    }
}

const eliminarPokemon = (pokemonId) => {//Funcion que elimina pokemon del equipo
    const index = elegidoPelea.findIndex(pokemon => pokemon.id === pokemonId);
    if (index !== -1) {
        elegidoPelea.splice(index, 1); // Elimina el Pokémon del equipo
        cont--;
        resetearPokebolas();

            pokebola(cont);        
        
    }
}





const pokebola = (pokebolaIndex) => { //muestra contenido de la pokebola al pasar mouse por arriba (console.log)
    
        pokebolas1.addEventListener("mouseover", () => {
          if(elegidoPelea[0]){ 
                const pokemonName = elegidoPelea[0].name;
                console.log("Nombre del Pokémon:", pokemonName);
            }else{
                console.log("Espacio vacio")
            }
        });
        pokebolas2.addEventListener("mouseover", () => {
            if(elegidoPelea[1]){ 
                const pokemonName = elegidoPelea[1].name;
                console.log("Nombre del Pokémon:", pokemonName);
            }else{
                console.log("Espacio vacio")
            }
        });
        pokebolas3.addEventListener("mouseover", () => {
            if(elegidoPelea[2]){ 
                const pokemonName = elegidoPelea[2].name;
                console.log("Nombre del Pokémon:", pokemonName);
            }else{
                console.log("Espacio vacio")
            }
        });
        pokebolas4.addEventListener("mouseover", () => {
            if(elegidoPelea[3]){ 
                const pokemonName = elegidoPelea[3].name;
                console.log("Nombre del Pokémon:", pokemonName);
            }else{
                console.log("Espacio vacio")
            }
        });
        pokebolas5.addEventListener("mouseover", () => {
            if(elegidoPelea[4]){ 
                const pokemonName = elegidoPelea[4].name;
                console.log("Nombre del Pokémon:", pokemonName);
            }else{
                console.log("Espacio vacio")
            }
        });
        pokebolas6.addEventListener("mouseover", () => {
            if(elegidoPelea[5]){ 
                const pokemonName = elegidoPelea[5].name;
                console.log("Nombre del Pokémon:", pokemonName);
            }else{
                console.log("Espacio vacio")
            }
        });
 
}

const type = (value) =>{ //Funcion que filtra por tipo de pokemons
    switch (value) {
        case "bug":
            src = "types/BugType.png"
            borde = "bordes/bug.png"
             break;
        case "dark":
            src = "types/DarkType.png"
            borde = "bordes/poison.png"
            break;
        case "dragon":
            src = "types/DragonType.png"
            break;
        case "electric":
                src = "types/ElectricType.png"
                borde = "bordes/electric.png"
                break;
        case "fairy":
                src = "types/FairyType.png"
                borde = "bordes/fairy.png"
                break;
        case "fighting":
                src = "types/FightingType.png"
                break;
        case "fire":
                    src = "types/FireType.png"
                    borde = "bordes/fire.png"
                    break;
        case "flying":
                    src = "types/FlyingType.png"
                    borde = "bordes/fairy.png"
                    break;
        case "ghost":
                    src = "types/GhostType.png"
                    borde = "bordes/poison.png"
                    break;
        case "grass":
                src = "types/GrassType.png"
                borde = "bordes/bug.png"
                break;
        case "ground":
                src = "types/GroundType.png"
                borde = "bordes/normal.png"
                break;
        case "ice":
                src = "types/IceType.png"
                borde = "bordes/water.png"
                break;
        case "normal":
                src = "types/NormalType.png"
                borde = "bordes/normal.png"
                break;
        case "psychic":
                src = "types/PsychicType.png"
                borde = "bordes/poison.png"
                break;
        case "rock":
                src = "types/RockType.png"
                break;
        case "poison":
                src = "types/PoisonType.png"
                borde = "bordes/poison.png"
                break;
        case "steel":
                src = "types/SteelType.png"
                break;
        case "water":
                src = "types/WaterType.png"
                borde = "bordes/water.png"
                break;
        
        default:
            console.log("no se encontro el tipo")
            break;
    }
}
    


const mostrarPokemons = () => { //muestra pokemons que capturaste y para seleccion de pelea
    listadoSeleccionados.innerHTML = ""
    array.forEach((pokemon, index) => {
        type(pokemon.types[0].type.name)            
        const div = document.createElement("div")
        div.classList = "carousel-item";    
    // Verifica si es el primer elemento y asigna la clase correspondiente
        if (index === 0) {
            div.classList = "carousel-item active";
        }
        div.innerHTML += `
                    <div class="mis-pokemon ${pokemon.types[0].type.name}-background" id="selected-${i}">
                        <div class="img-team">
                        <img class="producto-imagen-pokemon" src="${pokemon.sprites.front_default}" alt="1">
                        <img class="borde" src="${borde}" alt="1">
                        <img class="type" src=${src} alt="">
                        </div>
                        <div class="detalles-pkmn" id="id"> 
                        <h6 class="pokemon">Pokemon: ${pokemon.name}</h6>
                        <h6 class="pokemon">HP: ${pokemon.stats[0].base_stat}</h6>
                        <h6 class="pokemon">Ataque: ${pokemon.stats[1].base_stat}</h6>
                        <h6 class="pokemon">Defensa: ${pokemon.stats[2].base_stat}</h6>
                        <button class="btn-team btn btn-secondary" id="seleccionado1-${pokemon.id}">Elegir</button>
                        <button class="btn-team btn btn-secondary" id="quitar-${pokemon.id}">Quitar</button>
                        </div>`
       listadoSeleccionados.appendChild(div)
       elegirPokemon(pokemon,i)
       i++
   })
}
    

const agregarPokemon = (pokemon) => {// funcion para capturar pokemon derrotado
    
    if (!array.some(pkmn => pkmn.id === pokemon.id)){ 
    array.push(pokemon)
    mostrarPokemons()
} else {
    console.log("Ya tenes este pokemon")
}
}


    const elegirPokemon = (pokemon, i) => {    //Funcion para elegir los pokemon para la batalla
        const selected = document.getElementById(`selected-${i}`)
        const elegir = document.getElementById(`seleccionado1-${pokemon.id}`)
        const quitar = document.getElementById(`quitar-${pokemon.id}`)
        if (elegidoPelea.some(pkmn => pkmn.id === pokemon.id)) {    
            selected.style.borderStyle ="inset"
            selected.style.border = "3px solid #5cdf57"
        }
    elegir.addEventListener("click", () => {
        if (cont <= 5) {
            if (!elegidoPelea.some(pkmn => pkmn.id === pokemon.id)) {
                elegidoPelea.push(pokemon)
                selected.style.borderStyle ="inset"
                selected.style.border = "3px solid #5cdf57"
                console.log("Pokemon elegido para pelear: " + pokemon.name)
                console.log(elegidoPelea)
                pintarPokeballs(cont)
                pokebola(cont)
                resetearPokebolas()
                cont++
            } else {
                console.log("¡Este Pokémon ya ha sido elegido!")
            }
        } else {
            console.log("Pokebolas llenas")
        }
    })
    quitar.addEventListener("click", () =>{
        eliminarPokemon(pokemon.id)
        resetearPokebolas()
        selected.style.borderStyle ="none"
        selected.style.border = "1px solid black"   
    }) 
}