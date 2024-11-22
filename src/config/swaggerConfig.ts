import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const swaggerConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentación de Pawsome',
      version: '1.0.0',
      description:
        'Pawsome es una solución tecnológica diseñada para conectar refugios caninos con personas interesadas en adoptar, ' +
        'donar o colaborar como voluntarios. La plataforma combina una robusta arquitectura backend, una interfaz intuitiva ' +
        'y una base de datos optimizada para gestionar todo lo relacionado con animales en adopción, solicitudes, necesidades ' +
        'de los refugios y oportunidades de voluntariado. Es una herramienta que facilita la gestión y amplifica el impacto ' +
        'de los refugios en la comunidad.\n\n' +
        '## Instructivo para Ejecutar la Aplicación\n' +
        '\n' +
        '### Prerequisitos\n' +
        'Asegúrate de tener los siguientes programas instalados en tu sistema:\n' +
        '- **Node.js**: La aplicación está construida usando Node.js. Puedes verificar si lo tienes instalado ejecutando el siguiente comando en tu terminal:\n' +
        '  ```bash\n' +
        '  node -v\n' +
        '  ```\n' +
        '  Si no está instalado, puedes descargarlo desde [aquí](https://nodejs.org/).\n' +
        '- **npm**: El gestor de paquetes de Node.js. Puedes verificar si tienes npm instalado con:\n' +
        '  ```bash\n' +
        '  npm -v\n' +
        '  ```\n' +
        '\n' +
        '### Pasos para Ejecutar la Aplicación\n' +
        '1. **Clonar el repositorio**\n' +
        '   Lo primero es clonar el repositorio de la aplicación desde GitHub (o la fuente donde esté alojado el código). Abre una terminal y ejecuta el siguiente comando:\n' +
        '   ```bash\n' +
        '   git clone <URL_DEL_REPOSITORIO>\n' +
        '   ```\n' +
        '   Ejemplo:\n' +
        '   ```bash\n' +
        '   git clone gh repo clone https://github.com/igrowker/i004-pawsome-back' +
        '   ```\n' +
        '2. **Instalar las dependencias**\n' +
        '   Navega al directorio del proyecto que acabas de clonar:\n' +
        '   ```bash\n' +
        '   cd pawsome\n' +
        '   ```\n' +
        '   Luego, instala las dependencias necesarias usando `npm`:\n' +
        '   ```bash\n' +
        '   npm install\n' +
        '   ```\n' +
        '3. **Ejecutar la aplicación**\n' +
        '   Una vez que las dependencias estén instaladas, puedes iniciar el servidor de la aplicación con el siguiente comando:\n' +
        '   ```bash\n' +
        '   npm run start\n' +
        '   ```\n' +
        '   Esto ejecutará el servidor usando el archivo principal (usualmente `server.js` o `app.js`) en Node.js, y la aplicación debería estar corriendo en `http://localhost:3000`.\n' +
        '\n' +
        '   - **Ver en el navegador**: Abre tu navegador web y ve a la URL `http://localhost:3000` para ver la aplicación en ejecución.\n' +
        '\n' +
        '### Swagger UI\n' +
        'Si la documentación de la API está configurada correctamente con **Swagger UI**, podrás acceder a ella a través de la siguiente URL:\n' +
        '```\n' +
        'http://localhost:3000/api\n' +
        '```\n' +
        'Esto te permitirá ver y probar los endpoints de la API directamente desde el navegador.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [], 
      },
    ],
  },
  apis: [path.join(__dirname, '..', 'swagger', '**', '*.ts')], 
};

const swaggerSpec = swaggerJSDoc(swaggerConfig);

export default swaggerSpec;
