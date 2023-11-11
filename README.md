# PokeFight

## Descripción del Proyecto

Este proyecto es un simulador de batallas de Pokémon implementado en JavaScript. Permite a los usuarios seleccionar y pelear con sus Pokémon, capturar nuevos Pokémon y gestionar su equipo. La aplicación también incluye una Pokédex que muestra información detallada sobre los Pokémon capturados.

## Características Principales

- **Selección de Pokémon para la Batalla:** Los usuarios pueden elegir hasta seis Pokémon para formar su equipo de batalla.
  
- **Simulación de Batallas:** Implementación de un sistema de batalla que simula los encuentros entre Pokémon, con opciones para atacar, cambiar de Pokémon o huir.

- **Captura de Pokémon:** Después de derrotar a un Pokémon salvaje, los usuarios tienen la opción de capturarlo para agregarlo a su equipo.

- **Pokédex:** Una Pokédex integrada que muestra información detallada sobre los Pokémon capturados, incluyendo estadísticas y tipos.

## Tecnologías Utilizadas

### Lenguajes de Programación

- **JavaScript:** El núcleo de la aplicación está escrito en JavaScript, permitiendo la interactividad y dinamismo en la interfaz de usuario.

- **HTML5 y CSS3:** Utilizados para estructurar y estilizar las páginas web.

### Metodologías y Técnicas

- **Manipulacion de Dom:**

- **Lógica del Juego y Simulación:**
  - Hay una lógica de juego implementada, como la simulación de una batalla entre un Pokémon salvaje y el Pokémon del jugador.
  - Se realizan cálculos de daño en la función calcularAtaque.
  - Se maneja la captura de Pokémon y la actualización de la interfaz de usuario en consecuencia.

-**Operacion Asincronas y promesas:** La función fetchPokemon utiliza async/await para manejar operaciones asíncronas y esperar la respuesta de la solicitud Fetch.

-**Manejo de Arrays:** Se utilizan varios métodos de arrays, como push, shift, find, y forEach para manipular y acceder a los elementos de los arrays (pokedex, elegidoPelea, pokemonVisto, pokemonCapturado, etc.).

-**Manejo de Eventos y Callbacks:** Se asignan eventos a elementos HTML, como botones, y se utilizan funciones de devolución de llamada (callbacks) para manejar esos eventos.

- **Flexbox:** Se utiliza para el diseño de varias secciones de la página, como el contenedor principal, la lista de Pokémon y otros elementos.

- **Filtros CSS:** Se aplican filtros CSS, como `grayscale`, para cambiar el aspecto de ciertos elementos, como las imágenes de la Pokédex.

- **Estilos para Tipos de Pokémon:** Se aplican estilos específicos para diferentes tipos de Pokémon utilizando clases como `.fire-background`, `.water-background`, etc.

- **Estilos para Botones:** Los botones tienen estilos personalizados, ajustando el tamaño, la forma y aplicando estilos al pasar el ratón sobre ellos.

- **Estilos para Modales:** Se personaliza el aspecto de los modales, incluyendo el encabezado, el cuerpo y el pie de página.

- **LocalStorage:** Se utiliza para guardar información como el estado actual del equipo Pokémon y los Pokémon capturados, permitiendo a los usuarios continuar su juego después de cerrar la aplicación.

## Instalación y Uso

1. Clona este repositorio en tu máquina local.
   ```bash
   git clone https://github.com/Tomy0793/PokeFight.git
   ```

2. Abre el archivo `index.html` en tu navegador web.

3. ¡Disfruta del simulador de batallas de Pokémon!

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún problema o tienes sugerencias para mejorar el proyecto, por favor abre un problema o envía una solicitud de extracción.

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
