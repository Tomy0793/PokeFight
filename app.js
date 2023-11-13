document.addEventListener("DOMContentLoaded", () => {
    fetchPokemons(40)
})

//Variables
const capturar = document.getElementById("capturar")
const pokemonContainer = document.querySelector(".pokemon-container")
const btnpokebola = document.querySelector(".header");
const pokedex = []
const pokemonsAtrapados = new Set()
let verificarCard = false
let verificarCard1 = false
let pokemonsVistos = new Set()
let pokemonCapturado = []
let pokemonCapturado1 = []
let pokemonVisto = []
let vidaDefecto;
let vidaDefectoEquipo;
let derrotado


//Consumimos pokeapi
async function fetchPokemon(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await res.json()
    return data
}

async function fetchPokemons(cantidad) {
    for (let i = 1; i <= cantidad; i++) {
        const pokemonData = await fetchPokemon(i)
        crearPokemon(pokemonData, i) 
    }
  cargarPokemon()
}
const listadoPokedex = () => { //Funcion que crea pokedex
    
    listadoPkdx.innerHTML = ""
    pokedex.forEach((pokemon) => { 
        type(pokemon.types[0].type.name)  
        const div = document.createElement("div")
        div.classList.add("div-pkmn")
        div.innerHTML += `
                        <img class="imagen-pokedex imagen-pokedex-${pokemon.id} pkdx" id="imagen-pokedex" src="${pokemon.sprites.front_default}" alt="1">
                        <img class="borde-pkdx borde-pkdx-${pokemon.id}" id="atrapado${pokemon.id}" src="${borde}" alt="1">
                        <img class="atrapado atrapado1" id="atrapado-${pokemon.id}" src="img/pokebola-llena.png" alt="1">`
                listadoPkdx.appendChild(div)
        })
}


const crearPokemon = (pokemon) => {//Funcion principal
    pokedex.push(pokemon)
    listadoPokedex()
}


const inicializarJuego = () => { // Función para inicializar el juego

        capturar.addEventListener("click", () => {
            if(elegidoPelea.length===0){
                alert("no tenes pokemon para pelear, anda a tus pokemon disponibles y selecciona almenos 1!!")
                
            } else { 
            btnpokebola.style.display = "none"  
            cambiarPokemon(elegidoPelea);
          vidaDefecto = 0;
          vidaDefectoEquipo = 0;
          agregarPokedex();
        }
        });
    
}

const calcularAtaque = (ataque, defensa) =>{ //funcion que calcula logica de ataque de los pokemons
    let resultado = 0
    resultado = (ataque - (defensa/2))/2
    if (resultado > 0){
    return resultado
} else{
    return 5
}
}

const cambiarPokemonDerrotado = (pokemonSalvaje, vidaActual, nuevoValorVidaEquipo) =>{ //Funcion que cambia pokemon derrotado
    derrotado = nuevoValorVidaEquipo
    console.log(derrotado)
    const pokemonSalvajeActual = pokemonSalvaje;

    // Crea el contenedor del selector personalizado
    const seleccionPelea = document.createElement("div");
    seleccionPelea.className = "custom-select";

    const optionsList = document.createElement("div");
    optionsList.className = "custom-options";

    // Variable para rastrear la opción seleccionada
    let selectedOption = null;
    const optionConfirm = document.createElement("span")

    elegidoPelea.forEach((pokemon) => {
        const option = document.createElement("div");
        option.className = "custom-option";
        option.dataset.value = `elegido-${pokemon.id}`;

        // Agrega la miniatura del sprite como imagen en la opción
        const spriteImage = document.createElement("img");
        spriteImage.src = pokemon.sprites.front_default ;
        spriteImage.alt = pokemon.name;
        option.appendChild(spriteImage);
        // Agrega un evento de clic a la opción para manejar la selección
        option.addEventListener("click", () => {
        selectedOption = option
        optionConfirm.textContent=`elegido: ${pokemon.name}`    
    
            });
        optionsList.appendChild(option);
    });
seleccionPelea.appendChild(optionConfirm)
seleccionPelea.appendChild(optionsList);
const confirmButton = document.createElement("button");
confirmButton.classList.add("btn", "btn-secondary")
confirmButton.textContent = "Confirmar Selección";
confirmButton.addEventListener("click", () => {
    // Obtiene el valor seleccionado del select
    const selectedValue = selectedOption.dataset.value;
    if (selectedOption){ 
    // Encuentra el Pokémon correspondiente en 'elegidoPelea' basado en el valor seleccionado
    const selectedPokemon = elegidoPelea.find(pokemon => `elegido-${pokemon.id}` === selectedValue);
    const maxLength = 1
    if (selectedPokemon) {
        pokemonSeleccionado.shift() //borramos el primer indice para que no quede rastro y se elija por defecto
        if(pokemonSeleccionado.length < maxLength){
        pokemonSeleccionado.unshift(selectedPokemon);
    }
        document.body.appendChild(seleccionPelea);
        generarPokemon(pokemonSeleccionado, { ...pokemonSalvajeActual, stats: [{ base_stat: vidaActual }, ...
        pokemonSalvajeActual.stats.slice(1)] },nuevoValorVidaEquipo)
        actualizarBarraVida(vidaActual,vidaDefecto)
        seleccionPelea.remove()
        resetearPokebolas()
        selectedOption = null
        }
    }
});

  seleccionPelea.appendChild(confirmButton);

// Agrega el elemento contenedor al contenedor principal (pokemonContainer)
pokemonContainer.appendChild(seleccionPelea);
if(elegidoPelea.length === 0){  
    seleccionPelea.remove()
    }
}

const actualizarBarraVida = (vidaActual, vidaMaxima) => { //funcion que muestra barra de vida enemigo
    const porcentajeBarra = (vidaActual / vidaMaxima) * 100;
    console.log("El porcentaje de vida es: " + porcentajeBarra);
    const barraVida = document.querySelector(".progress-enemigo");
    barraVida.style.width = porcentajeBarra + "%";
    if (porcentajeBarra <=0){
        barraVida.style.width = "0%";
    }
    if (porcentajeBarra <=50){
        barraVida.classList.replace("bg-success", "bg-warning")
    }
    if (porcentajeBarra <=25){
        barraVida.classList.replace("bg-warning", "bg-danger")
    }
};

  const actualizarBarraVida1 = (vidaActual, vidaMaxima) => { //funcion que muestra barra de vida equipo
    const porcentajeBarra = (vidaActual / vidaMaxima) * 100;
    console.log("El porcentaje de vida es: " + porcentajeBarra);
    const barraVida1 = document.querySelector(".progress-equipo");
    barraVida1.style.width = porcentajeBarra + "%";
    if (porcentajeBarra <=0){
        barraVida1.style.width = "0%";
    }
    if (porcentajeBarra <=50){
        barraVida1.classList.replace("bg-success", "bg-warning")
    }
    if (porcentajeBarra <=25){
        barraVida1.classList.replace("bg-warning", "bg-danger")
    }
  };

const logicaPelea = (pokemon, pokemonSalvaje, vidaDefecto, arrayPelea) => { //Funcion que realiza la logica de la pelea
    const huir =document.getElementById(`huir-${pokemon.id}`)
    const divEquipo = document.getElementById("equipo-pokemon")
    const btnCambiar = document.getElementById("btn-cambiar")
    const capturarPokemon = document.getElementById(`btn-capturar-${pokemon.id}`);
    const peleaDiv = document.querySelector(".pelea");
    const atacarPokemon = document.querySelector(".btn-atacar");
    const poderAtaque = parseInt(document.querySelector(".ataque-equipo").textContent.split(" ")[1]);
    let vidaSalvajeActual = parseInt(document.querySelector(".hp-enemigo").textContent.split(" ")[1])
    console.log("La vida por defecto es: "+ vidaDefecto)
    console.log(poderAtaque);
    
    btnCambiar.addEventListener("click", () =>{
     divEquipo.remove();
                    cambiarPokemonDerrotado(pokemonSalvaje, vidaSalvajeActual)
                    verificarCard = false;
                    verificarCard1 = false;
    })

    if (atacarPokemon) {
    if (capturarPokemon) {
        capturarPokemon.disabled = true; // Se desactiva cuando la vida del pokemon llegue a 0.
    }
        atacarPokemon.addEventListener("click", () => {
            const defensaEnemigo = parseInt(document.querySelector(".defensa-enemigo").textContent.split(" ")[1]);
            const poderEnemigo = parseInt(document.querySelector(".ataque-enemigo").textContent.split(" ")[1]);
            const defensaEquipo = parseInt(document.querySelector(".defensa-equipo").textContent.split(" ")[1]);
            const vidaEnemigo = parseInt(document.querySelector(".hp-enemigo").textContent.split(" ")[1]);
            let poderAtaquef = calcularAtaque(poderAtaque, defensaEnemigo);
            const nuevoValorVida = vidaEnemigo - poderAtaquef;
            let poderAtaquee = calcularAtaque(poderEnemigo, defensaEquipo);
            const vidaEquipo = parseInt(document.querySelector(".hp-equipo").textContent.split(" ")[1]);
            const nuevoValorVidaEquipo = vidaEquipo - poderAtaquee;
            vidaSalvajeActual = nuevoValorVida
            actualizarBarraVida(vidaSalvajeActual,vidaDefecto)
            actualizarBarraVida1(nuevoValorVidaEquipo,vidaDefectoEquipo)
            document.querySelector(".hp-equipo").textContent = `HP: ${nuevoValorVidaEquipo}`;
            console.log(poderAtaquef);
            
            document.querySelector(".hp-enemigo").textContent = `HP: ${nuevoValorVida}`;
            
            if (nuevoValorVidaEquipo <= 0) {
                // Guarda la vida actual del Pokémon salvaje antes de cambiar la tarjeta
                vidaSalvajeActual = nuevoValorVida
                vidaSalvajeActual = parseInt(document.querySelector(".hp-enemigo").textContent.split(" ")[1])
                divEquipo.innerHTML = `<span>Has sido derrotado!</span>`;
                setTimeout(() => {
                    console.log(divEquipo)
                    divEquipo.remove();
                    const quitarPokemon = elegidoPelea.filter(pokemon => arrayPelea.includes(pokemon))
                    quitarPokemon.forEach(pokemon =>{
                    const index = elegidoPelea.indexOf(pokemon)
                    if (index!==-1){
                        elegidoPelea.splice(index,1)
                        }
                    })
                    if (elegidoPelea.length === 0){
                        peleaDiv.remove();
                        pokemonContainer.innerHTML = ``;                
                        verificarCard = false;
                        verificarCard1 = false;
                        capturar.disabled = false
                        btnpokebola.style.display = "block"
                        resetearPokebolas()
                        cont=0
                        eliminarPokemon(pokemon.id)
            }    
                    cambiarPokemonDerrotado(pokemonSalvaje, vidaSalvajeActual, nuevoValorVidaEquipo)
                    verificarCard = false;
                    verificarCard1 = false;
                    resetearPokebolas()
                }, 3000);
            }
            // Comprueba si la vida del Pokémon salvaje es igual o menor que 0
            if (nuevoValorVida <= 0 || nuevoValorVida<10) {
                capturarPokemon.disabled= false;
                atacarPokemon.disabled = true; // Deshabilita el botón de ataque
            }
        })
    }
    
    if (capturarPokemon) { 
        capturarPokemon.addEventListener("click", () => {
            pokemonContainer.innerHTML = ` 
            <div class="d-flex justify-content-center">
            <div class="spinner-border text-light" role="status">
            <img  class="pokebolaCatch" src="img/pokebola-llena.png" alt="">
            </div>
            </div>`;
            
            setTimeout(() => {                           
                pokemonContainer.innerHTML = `<span>Capturado!</span>`;
                setTimeout(() => {
                    peleaDiv.remove();
                    pokemonContainer.innerHTML = ``;
                    agregarPokemon({ ...pokemonSalvaje, stats: [{ base_stat: vidaDefecto }, ...pokemonSalvaje.stats.slice(1)] })                    
                    agregarPokedex();
                    guardarPokemonStorage(array)                
                    verificarCard = false;
                    verificarCard1 = false;
                    capturar.disabled = false
    btnpokebola.style.display = "block"                    
                }, 3000);
                
            }, 5000);
        });    
    }
    huir.addEventListener("click", () =>{
        pokemonContainer.innerHTML = `<span>Huiste sin problemas!</span>`;
                    peleaDiv.remove();
                    pokemonContainer.innerHTML = ``;
                    console.log("Huiste de la batalla")
                    btnpokebola.style.display = "block"
                    verificarCard = false;
                    verificarCard1 = false;
                    capturar.disabled = false
    })

}

const generarPokemon = (pokemonSeleccionado, pokemonSalvaje) => { 
    // funcion para mostrar pokemon aleatorio y capturarlo, usar foreach para recorrer array, y de ahi mostrarlo.

    
    btnpokebola.style.display = "none"
    if ((pokemonSalvaje && vidaDefecto===0)) {
        vidaDefecto = pokemonSalvaje.stats[0].base_stat;
        console.log("La vida del pokemon enemigo es: "+vidaDefecto);
    }
    if ((pokemonSeleccionado[0] && vidaDefectoEquipo===0)) {
        vidaDefectoEquipo = pokemonSeleccionado[0].stats[0].base_stat;
        console.log("La vida del pokemon amigo es: "+vidaDefectoEquipo);
    }
let arrayPelea = pokemonSeleccionado.concat(pokemonSalvaje);   
pokemonContainer.innerHTML = ""
arrayPelea.map((pokemon, i) =>{
    const containerPelea = document.createElement("div")
    containerPelea.classList.add("pelea")
    if (i === 0){ 
        if(verificarCard1){
            console.log("ya hay un pokemon de tu equipo peleando")
            return
        } else { 
            verificarCard1 = true
        containerPelea.innerHTML +=`
    <div class="pelea equipo-pokemon ${pokemon.types[0].type.name}-background" id="equipo-pokemon">
    <div class="p-name"><h6 class="pokemon pokemon-name">Pokemon: ${pokemon.name}</h6></div>
    <div class="img-container">
    <img class="img-pkmn" src="${pokemon.sprites.back_default}" alt="1">
    </div>
    <div class="card-body"> 
        
        <h6 class="pokemon hp-equipo">HP: ${pokemon.stats[0].base_stat}</h6>
        <div class="progress" role="progressbar"  aria-label="Success example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-equipo bg-success" style="width: 100%"></div>
        </div>
        <h6 class="pokemon ataque-equipo">Ataque: ${pokemon.stats[1].base_stat}</h6>
        <h6 class="pokemon defensa-equipo">Defensa: ${pokemon.stats[2].base_stat}</h6>
        <button class="botones-celulares btn-atacar btn btn-secondary" id="btn-atacar-${pokemon.id}">Atacar</button>
        <button class="botones-celulares btn-cambiar btn btn-secondary" id="btn-cambiar">Cambiar pokemon</button>
    </div>
</div>
`

    pokemonContainer.appendChild(containerPelea);

    const cambiarPkmn = document.getElementById("btn-cambiar")
    cambiarPkmn.addEventListener("click", ()=>{
        
        
    })

} } else if (i === 1){
   if(verificarCard){

    console.log("ya hay un pokemon salvaje")
        return
    } else { 
   
        verificarCard = true
        const containerPelea1 = document.createElement("div")
        containerPelea1.classList.add("pelea")
    containerPelea1.innerHTML +=`
    <div class="pelea enemigo ${pokemon.types[0].type.name}-background" id="equipo-enemigo">
    <div class="p-name"><h6 class="pokemon pokemon-name">Pokemon: ${pokemon.name}</h6></div>
    <div class="img-container">
    <img class="img-pkmn" src="${pokemon.sprites.front_default}" alt="1">
    </div>
    <div class="card-body"> 
        <h6 class=" pokemon hp-enemigo" id:"vida-enemigo">HP: ${pokemon.stats[0].base_stat}</h6>
        <div class="progress" role="progressbar"  aria-label="Success example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-enemigo bg-success" style="width: 100%"></div>
        </div>
        <h6 class="pokemon ataque-enemigo">Ataque: ${pokemon.stats[1].base_stat}</h6>
        <h6 class="pokemon defensa-enemigo">Defensa: ${pokemon.stats[2].base_stat}</h6>
        <button class="botones-celulares btn-capturar btn btn-secondary" id="btn-capturar-${pokemon.id}">Capturar</button>
        <button class="botones-celulares btn-huir btn btn-secondary" id="huir-${pokemon.id}">Huir</button>
        
    </div>  
</div>`
    pokemonContainer.appendChild(containerPelea1);
    
}
capturar.disabled = true
logicaPelea(pokemon, pokemonSalvaje, vidaDefecto, arrayPelea)
    agregarVisto(arrayPelea)
}
})
};



const cambiarPokemon = () =>{ // funcion que cambia pokemon amigo durante la pelea
    const maxId = pokedex.length;
    const idRandom = Math.floor(Math.random() * maxId) + 1;
    const pokemonSalvaje = pokedex.find(pokemon => pokemon.id === idRandom);

const seleccionPelea = document.createElement("div");
seleccionPelea.classList.add("seleccion")
const pokemonSelector = document.createElement("select");
pokemonSelector.id = "pokemon-selector";

elegidoPelea.forEach((pokemon) => {
  const option = document.createElement("option");
  option.value = `elegido-${pokemon.id}`;
  option.textContent = pokemon.name;
  pokemonSelector.appendChild(option);
});


const confirmButton = document.createElement("button");
confirmButton.classList.add("btn", "btn-secondary")
confirmButton.textContent = "Confirmar Selección";

confirmButton.addEventListener("click", () => {
    const selectedValue = pokemonSelector.value;
    
    const selectedPokemon = elegidoPelea.find(pokemon => `elegido-${pokemon.id}` === selectedValue);
    const maxLength = 1
    if (selectedPokemon) {
        pokemonSeleccionado.shift() //borramos el primer indice para que no quede rastro y se elija por defecto
        if(pokemonSeleccionado.length < maxLength){
        pokemonSeleccionado.push(selectedPokemon);
    }
    generarPokemon(pokemonSeleccionado, pokemonSalvaje)      
      pokemonSelector.value = "";
    }
  });
  
const label = document.createElement("label");
label.textContent = `El pokemon salvaje es ${pokemonSalvaje.name}, selecciona un Pokémon:`;
label.htmlFor = "pokemon-selector";
seleccionPelea.appendChild(label);
seleccionPelea.appendChild(pokemonSelector);
pokemonContainer.appendChild(seleccionPelea);
seleccionPelea.appendChild(confirmButton); 
}


const filtrarPokemon = () => { //Funcion para elegir el pokemon inicial
    btnpokebola.style.display = "none"
    const pokemonInicial = pokedex.filter(pokemon => pokemon.name === "bulbasaur" || pokemon.name === "squirtle" || pokemon.name === "charmander");

    pokemonInicial.forEach((pokemon, length) => {
    const card = document.createElement("div")
    card.classList.add("pokemon-card")
    const spriteContainer = document.createElement("div")
    spriteContainer.classList.add("img-pkmn")
    const sprite = document.createElement("img")
    sprite.src = pokemon.sprites.front_default
    sprite.classList.add("oculto")
    spriteContainer.appendChild(sprite)

    const number = document.createElement("p")
    number.textContent = `#${pokemon.id}`

    const nombre = document.createElement("p")
    nombre.classList.add("nombre")
    nombre.textContent = pokemon.name
    const status = document.createElement("div")
        status.innerHTML = `
        <h6 class="pokemon" id="pokemon-hp" >HP: ${pokemon.stats[0].base_stat}</h6>
        <h6 class="pokemon" id="pokemon-atq">Ataque: ${pokemon.stats[1].base_stat}</h6>
        <h6 class="pokemon" id="pokemon-dfs">Defensa: ${pokemon.stats[2].base_stat}</h6>
        `
    const divbtn = document.createElement("div")
    divbtn.innerHTML = `<button class="btn btn-secondary" id="seleccionado-${length}">Elegir</button>`
    card.appendChild(spriteContainer)
    card.appendChild(number)
    card.appendChild(nombre)
    card.appendChild(divbtn)
    card.appendChild(status)
    pokemonContainer.appendChild(card)
    const seleccionPokemon = document.getElementById(`seleccionado-${length}`)
    seleccionPokemon.addEventListener("click", () => {
        agregarPokemon(pokemon)
        document.querySelectorAll(".pokemon-card").forEach(card => {
            card.remove()
        })
        agregarPokedex()
        guardarPokemonStorage(array)
        btnpokebola.style.display = "block"
    })
})
}

const agregarVisto = (pokemonAvistado) =>{ // Funcion para agregar pokemon a la pokedex y marcarlo como visto
    pokemonAvistado.forEach((pokemon)=>{
        pokemonVisto.push(pokemon.name)
        guardarPokemonsVistosEnLocalStorage()
    })
console.log("avistado: " + pokemonVisto.join(", "))
    pokedex.forEach((pokemon) => {
        if (pokemonsVistos.has(pokemon.name)) {
            console.log(`Ya tienes a ${pokemon.name} en la Pokédex.`)
        } else if (pokemonVisto.includes(pokemon.name) && !pokemonsVistos.has(pokemon.name)) {
                
            const vistos = document.getElementsByClassName(`imagen-pokedex imagen-pokedex-${pokemon.id}`)
            const bordeVisto = document.getElementById(`atrapado${pokemon.id}`)
            for (const visto of vistos) {
                visto.style.filter = "grayscale(0)" 
                bordeVisto.style.filter = "grayscale(0)" 
                pokemonsVistos.add(pokemon.name)
                guardarPokemonsVistosEnLocalStorage()
            }                      
             
        }
    })
}

const actualizarVistosEnLaPokedex = () => {
    pokedex.forEach((pokemon) => {
        if (pokemonsVistos.has(pokemon.name)) {
            const vistos = document.getElementsByClassName(`imagen-pokedex imagen-pokedex-${pokemon.id}`);
            const bordeVisto = document.getElementById(`atrapado${pokemon.id}`)
            for (const visto of vistos) {
                visto.style.filter = "grayscale(0)";
                bordeVisto.style.filter = "grayscale(0)"
            }
        }
    });
}

//funcion que compara si ya tenes ese pokemon se la llama cada vez que se captura un pokemon
const agregarPokedex = () => {
    array.forEach((pokemon) => {
        pokemonCapturado.push(pokemon.name)

    })
    pokedex.forEach((pokemon) => {
        if (pokemonsAtrapados.has(pokemon.name)) {
        } else if (pokemonCapturado.includes(pokemon.name) && !pokemonsAtrapados.has(pokemon.name)) {      
            const capturados = document.getElementsByClassName(`imagen-pokedex imagen-pokedex-${pokemon.id}`)
            const bordeVisto = document.getElementById(`atrapado${pokemon.id}`)
            for (const capturado of capturados) {
                capturado.style.filter = "grayscale(0)"
                bordeVisto.style.filter = "grayscale(0)"
                const ocultarPbkl = document.getElementById(`atrapado-${pokemon.id}`)
                                ocultarPbkl.style.display = "inherit";
                                ocultarPbkl.style.width = "85px";
                                ocultarPbkl.style.cursor = "pointer";
                                ocultarPbkl.style.position = "absolute";
                                ocultarPbkl.style.marginLeft = "1px";
                                ocultarPbkl.style.marginTop = "22px";
                                ocultarPbkl.style.zIndex ="2"
                pokemonsAtrapados.add(pokemon.name)
            }       
        }
    })
}

document.addEventListener('DOMContentLoaded', inicializarJuego);
