
# Proyecto 3 - FrontendFullStack Developer
Frontend del proyecto fullstack que renderizará los datos datos obtenidos, con una navegación fluída para el usuario

## Objetivos
- Diseñar una web en la que se pueda navegar entre routas internas renderizando solo la parte que sea necesaria para conseguir optimizar la navegación.
- Uso de diseños y componentes reutilizables.
- Uso correcto de hooks.
- Full responsive adaptada a todos los dispositivos

## Dependencias
- Vite como estructura en base a módulos.
- @chakra-ui/react, @emotion/react, @emotion/styled (Para dar estilos reutilizable con componentes semánticos)
- react, react-dom (Libreria para manipular los elementos del dom)
- react-router-dom (Gestión de rutas de navegación en la web)
- EsLint (para mantener código limpio)
- React-icons (Para los iconos de la web)
- React-hook-form  (Para control de formularios)# Proyecto 3 - Frontend FullStack Developer

Frontend del proyecto fullstack que renderizará los datos obtenidos del backend, con una navegación fluida para el usuario.

## Objetivos

- Diseñar una web en la que se pueda navegar entre rutas internas renderizando solo la parte que sea necesaria para optimizar la navegación.
- Uso de diseños y componentes reutilizables.
- Uso correcto de hooks.
- Full responsive adaptada a todos los dispositivos.

## Dependencias

- Vite como estructura en base a módulos.
- @chakra-ui/react, @emotion/react, @emotion/styled (para dar estilos reutilizables con componentes semánticos).
- react, react-dom (librería para manipular los elementos del DOM).
- react-router-dom (gestión de rutas de navegación en la web).
- ESLint (para mantener código limpio).
- React-icons (para los iconos de la web).
- React-hook-form (para control de formularios).

## Configuración

- El proyecto necesita un fichero `.env` en la raíz con la URL base del backend:

```
VITE_API_URL=http://localhost:3000/api/v1
```

- Para correr el proyecto en local:

```bash
git clone https://github.com/TamezeDev/Proyecto-3---Frontend-FullStack-Developer.git
cd Proyecto-3---Frontend-FullStack-Developer
npm i
npm run dev
```

- Es necesario tener el backend del proyecto corriendo en paralelo, ya que este frontend consume sus endpoints para todo (catálogo, usuarios, tarjetas, planes premium, etc.).

- El proyecto se encuentra actualmente desplegado y funcionando realmente. Puedes acceder desde [aquí](https://elrincondelatinta.netlify.app/)
- Conecta con el backend para este mismo proyecto que también se encuentra en producción, por lo que los datos registrados y recibidos son reales y permanentes

## Roles y permisos

La navegación y las acciones disponibles cambian según el estado de la sesión:

- **Visitante sin cuenta**: puede ver el catálogo público y los planes premium, pero se le redirige a registro si intenta añadir un libro a su biblioteca o pagar un plan.
- **Usuario registrado**: puede gestionar sus tarjetas de pago, ver su biblioteca y perfil, pero necesita cuenta premium activa para añadir libros a su biblioteca o leerlos.
- **Usuario premium**: además de lo anterior, puede añadir libros a su biblioteca, empezar a leerlos y guardar su progreso de lectura.
- **Administrador**: accede a los paneles de gestión de usuarios, tarjetas, planes premium y catálogo de libros (activar/desactivar/añadir).

## Estructura de páginas

- `Catalog`: catálogo público de libros, con scroll infinito.
- `Library` / `Reading` / `ReadingSession`: biblioteca personal, lista de lectura actual y simulador de lectura por páginas.
- `Cards` / `Premium`: gestión de tarjetas de pago propias y contratación/renovación de planes premium.
- `Profile`: datos de la cuenta, imagen de perfil y estado de la cuenta premium.
- `AdminUsers` / `AdminCards` / `AdminPlans` / `AdminBooks`: paneles exclusivos de administración.

## Usuarios de prueba

Para probar los distintos roles sin tener que registrar cuentas nuevas:

| Rol                      | Email                     | Contraseña |
| ------------------------ | ------------------------- | ---------- |
| Administrador            | alba.delgado@example.com  | Clave_123  |
| Premium                  | sofia.lopez@example.com   | Clave_123  |
| Registrado (sin premium) | claudia.ramos@example.com | Clave_123  |
