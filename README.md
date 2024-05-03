# Iniciar proyecto para desarrollo
1. Abrir una ventana de `cmd` o `powershell` en la carpeta raíz que contiene el proyecto
2. Ejecutar el comando `npm i`
3. Con una terminal (puede ser la incluida en vs code) ejecutar el script del `package.json` el cual es `npm run dev`
4. Con cualquier navegador, entrar a `http://localhost:3000`.

# Subir cambios
Justo ahora no hay algun estandar para los `commits`, ni planeo ser muy estricto con los cambios que se suban en lo `push`. Mientras funcione y el código este decente.

# Estructura de carpetas
Seguir la documentacion de Next.js para las implementaciones que ya tiene el framework. Layouts, navegación, renderizado de páginas, etc.

# Variables de entorno
Importante, **no subir archivos** `.env`. Porque contienen información sensible que no puede estar en el repositorio.

1. Crear un archivo llamado `.env.local` en la raíz del proyecto.
![ejemplo_visual](https://i.ibb.co/6ZjWMxX/2024-05-03-16-35-41-README-md-estetica-nora-Visual-Studio-Code.png)

2. Colocar las variables de entorno con su valor para hacer funcionar el proyecto.
- `DB_HOST = VALOR_SECRETO_AQUI`
- `DB_NAME = VALOR_SECRETO_AQUI`
- `DB_USER = VALOR_SECRETO_AQUI`
- `DB_PASSWORD = VALOR_SECRETO_AQUI`
- `DB_PORT = VALOR_SECRETO_AQUI`
- `DB_URI = VALOR_SECRETO_AQUI`

![ejemplo_visual](https://i.ibb.co/7jpRWNc/2024-05-03-16-40-16-env-local-estetica-nora-Visual-Studio-Code.png)


## Atomic design
Intentar utilizar `atomic design` para organizar los archivos/carpetas que nextjs no especifica en su documentacion, como la creacion de un `input` por ejemplo.

[Más información de atomic design aqui](https://www.uifrommars.com/atomic-design-ventajas/)

```
├───app/ # Poner aqui todas las pantallas del sistema/prototipo
│   ├───catalogo/
│   ├───citas/
├───atom/ # Aqui va el código de UI que tiene una funcion en especifico
│   ├───button/
│   ├───input/
│   ├───menuItem/
│   └───money/
├───Contexts/ # Para manejar el manejo de props profundas
│   ├───AppContext/
│   ├───CatalogueContext/
│   └───ReservationsContext/
├───customHooks/ # Aqui se pone la abstración de logica para la UI
├───helpers/
├───iniciar-sesion/
│   ├───page.tsx
│   └───styles.module.scss
├───molecule/ # Aqui va el código de UI que ya agrupa o hace cosas más especificas
│   ├───account/
│   ├───dateInput/
│   ├───files/
│   ├───footer/
│   ├───navigation/
│   ├───pagination/
│   ├───reservationItem/
│   ├───Spinner/
│   ├───typeAccount/
│   └───usersSelect/
├───olvide-cuenta/
│   └───page.tsx
├───structure/
│   └───landingItem/
│       ├───index.tsx
│       ├───styles.module.scss
│       └───types.ts
├───favicon.ico
├───globalLaptop.scss
├───globals.css
├───layout.tsx
├───page.module.css
├───page.tsx
├───styles.module.scss
└───variables.scss
```

2. ## CSS
Favor de utilizar `modules` y con `.scss`. No usar `styled-components` si no es muy necesario

3. ## Typescript
Favor de no utilizar la palabra reservada `any`