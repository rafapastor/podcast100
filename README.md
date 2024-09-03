# Podcast100

Podcast100 es una aplicación de podcasts musicales que permite a los usuarios explorar los 100 podcasts más populares del momento, ver detalles de cada podcast y reproducir episodios específicos.

## Características

- **Vista Principal**: Muestra una lista de los 100 podcasts más populares.
- **Detalle de Podcast**: Muestra la descripción, autor, y episodios de un podcast seleccionado.
- **Detalle de Episodio**: Muestra información detallada de un episodio y permite reproducirlo.

## Tecnologías Utilizadas

- **React** con TypeScript
- **React Router** para la navegación
- **Axios** para la gestión de peticiones HTTP
- **Sass** para los estilos
- **Vite** como herramienta de construcción

## Arquitectura del Proyecto

El proyecto sigue principios SOLID para garantizar un código mantenible y escalable. La lógica de presentación y obtención de datos está separada:

- **Componentes**: Se encargan solo de la presentación de datos y la interacción del usuario.
- **Servicios**: Gestionan la lógica de negocio, como las llamadas a APIs, y están desacoplados de los componentes.

## Instalación y Ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/rafapastor/podcast100
   ```
