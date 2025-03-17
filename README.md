# SASE UNEG - Frontend Alternativo

Este proyecto es un **frontend alternativo y no oficial** para el Sistema de Apoyo a los Servicios Estudiantiles (SASE) de la Universidad Nacional Experimental de Guayana (UNEG). Su objetivo es ofrecer una interfaz de usuario moderna y potencialmente más intuitiva para acceder a la información y servicios proporcionados por el SASE.

**Importante:** Este proyecto realiza **web scraping** a la página web oficial del SASE para obtener la información. Ten en cuenta las implicaciones y posibles limitaciones de esta técnica (ver sección de "Advertencia").

## Motivación

La motivación principal detrás de este proyecto es ofrecer a los estudiantes de la UNEG una experiencia de usuario mejorada al interactuar con el SASE. Buscamos una interfaz más ágil, accesible y visualmente atractiva.

## Tecnologías Utilizadas

- [React](https://react.dev/) - Biblioteca de JavaScript para construir interfaces de usuario.
- [Vite](https://vitejs.dev/) - Herramienta de build que proporciona una experiencia de desarrollo extremadamente rápida.
- [TanStack Router](https://tanstack.com/router/latest) - Enrutador flexible y tipado para aplicaciones web de React.
- [ky](https://github.com/sindresorhus/ky) - Cliente HTTP pequeño y elegante para navegadores.
- [Cheerio](https://cheerio.js.org/) - Biblioteca rápida, flexible y elegante de análisis y manipulación de HTML.
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS para construir diseños personalizados rápidamente.

## Instalación

Sigue estos pasos para ejecutar el proyecto localmente:

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/Gabo-div/uneg-sase-scrapping
    cd uneg-sase-scrapping
    ```

2.  **Instala las dependencias:**

    ```bash
    pnpm install
    ```

3.  **Ejecuta la aplicación en modo de desarrollo:**
    ```bash
    pnpm dev
    ```

Esto iniciará el servidor de desarrollo y podrás ver la aplicación en tu navegador (normalmente en `http://localhost:5173`).

## Uso

Una vez que la aplicación esté en ejecución, podrás navegar por las diferentes secciones para acceder a la información del SASE. La interfaz intentará replicar o mejorar la funcionalidad del sitio oficial.

**Ten en cuenta que al ser un frontend alternativo que realiza web scraping, la estructura y contenido de la página oficial del SASE pueden cambiar, lo que podría afectar la funcionalidad de esta aplicación.**

## Advertencia

**Este proyecto no está afiliado, asociado ni respaldado por la Universidad Nacional Experimental de Guayana (UNEG).**

El uso de **web scraping** para obtener información de un sitio web puede tener implicaciones legales y técnicas. Es posible que la UNEG implemente medidas para bloquear o dificultar el acceso a través de técnicas de web scraping.

**El desarrollador de este proyecto no se hace responsable del uso que se le dé a esta aplicación ni de las posibles consecuencias derivadas del web scraping.** Los usuarios deben ser conscientes de los riesgos y utilizar esta herramienta bajo su propia responsabilidad.

## Contribución

Si deseas contribuir a este proyecto, eres bienvenido. Puedes hacerlo de las siguientes maneras:

- Reportando errores o problemas (Issues).
- Proponiendo nuevas funcionalidades o mejoras.
- Enviando Pull Requests con correcciones o nuevas características.

Por favor, asegúrate de seguir las guías de contribución (si las hay) y mantener un código limpio y bien documentado.
