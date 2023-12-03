// Espera a que se cargue completamente el contenido del documento HTML
document.addEventListener("DOMContentLoaded", () => {
    // Define una función llamada updatePokemon que toma un parámetro "id" y un "cardIndex"
const updatePokemon = (id, cardIndex) => {
PeticionApi(id, cardIndex);
};

// Define una función asincrónica llamada PeticionApi que toma un parámetro "id" y un "cardIndex"
const PeticionApi = async (id, cardIndex) => {
try {
    // Realiza una solicitud fetch a la API de Pokémon usando el ID proporcionado
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    // Convierte la respuesta en formato JSON
    const data = await res.json();

    // Crea un objeto "pokemon" con información obtenida de la API
    const pokemon = {
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        nombre: data.name,
        numero: data.id,
        tipo: data.types[0].type.name, // Toma solo el primer tipo
        ataque1: data.moves[0].move.name,
        ataque2: data.moves[1].move.name,
    };

    // Asigna el tipo de elemento como una clase CSS a la tarjeta correspondiente
    const card = document.querySelectorAll('.card')[cardIndex];
    card.className = 'card'; // Restablece las clases de la tarjeta
    card.classList.add(pokemon.tipo); // Agrega la clase del tipo de elemento

    // Accede a elementos HTML por su clase y actualiza su contenido con la información del Pokémon
    const nombrePokemonElement = card.querySelector(".pokemonName");
    const imagenPokemonElement = card.querySelector(".pokemonImage");
    const numeroPokemonElement = card.querySelector(".pokemonNumber");
    const tipoPokemonElement = card.querySelector(".pokemonType");
    const ataque1PokemonElement = card.querySelector(".pokemonAttack1");
    const ataque2PokemonElement = card.querySelector(".pokemonAttack2");

    nombrePokemonElement.textContent = pokemon.nombre;
    imagenPokemonElement.src = pokemon.img;
    imagenPokemonElement.alt = `Imagen de ${pokemon.nombre}`;
    numeroPokemonElement.textContent = `Número: ${pokemon.numero}`;
    tipoPokemonElement.textContent = `Tipo: ${pokemon.tipo}`;
    ataque1PokemonElement.textContent = `Ataque 1: ${pokemon.ataque1}`;
    ataque2PokemonElement.textContent = `Ataque 2: ${pokemon.ataque2}`;
} catch (error) {
    // En caso de error, muestra el error en la consola
    console.log(error);
}
};

// Función para obtener un número aleatorio único
const getRandomUniquePokemonId = (usedIds) => {
let randomId;
do {
    randomId = Math.floor(Math.random() * (151 - 1)) + 1;
} while (usedIds.includes(randomId));
usedIds.push(randomId);
return randomId;
};

// Almacena los IDs de Pokémon utilizados para evitar duplicados
const usedIds = [];

// Llama a updatePokemon con un número aleatorio único para cada tarjeta al cargar la página
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
const randomPokemonId = getRandomUniquePokemonId(usedIds);
updatePokemon(randomPokemonId, index);
});

// Evento de clic al botón "Actualizar" de cada tarjeta para llamar a updatePokemon con un nuevo número aleatorio
const updateButtons = document.querySelectorAll(".updateButton");
updateButtons.forEach((button, index) => {
button.addEventListener("click", () => {
    const randomPokemonId = getRandomUniquePokemonId(usedIds);
    updatePokemon(randomPokemonId, index);
});
});

// Evento de clic al botón "Buscar" para buscar un Pokémon por nombre
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
const searchInput = document.getElementById("searchInput");
const pokemonName = searchInput.value.trim().toLowerCase();
if (pokemonName !== "") {
    // Llama a PeticionApi con el nombre del Pokémon ingresado para la primera tarjeta
    PeticionApi(pokemonName, 0);
    searchInput.value = ""; // Limpia el campo de búsqueda
}
});

// funcionalidad para buscar por nombre de Pokémon cuando se presiona la tecla Enter
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", (event) => {
if (event.key === "Enter") {
    searchButton.click(); // Simula un clic en el botón "Buscar"
}
});

// funcionalidad a los botones de generaciones
const generationButtons = document.querySelectorAll('.generation-button');
generationButtons.forEach((button) => {
button.addEventListener('click', () => {
    const range = button.getAttribute('data-range').split('-');
    const min = parseInt(range[0]);
    const max = parseInt(range[1]);
    const randomPokemonId = Math.floor(Math.random() * (max - min + 1)) + min;
    updatePokemon(randomPokemonId, 0); // Actualiza la primera tarjeta
});
});
});