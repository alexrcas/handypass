# Handypass

Aplicación de escritorio para el almacenamiento local y gestion de contraseñas.

### Tecnologías
* Electron
* Vue3 + Typescript
* Bootstrap 5.2

### Evolución

Esta versión es un primer prototipo conceptual. El almacenamiento de contraseñas se encuentra en memoria (se pierde al cerrar la aplicación).
Las siguientes actualizaciones son:
* Persistencia de la información en fichero.
* Cifrado del fichero de persistencia para que solo sea legible por la aplicación.
* Minimización de la aplicación a segundo plano en el *tray* del sistema.
* Menú rápido desde el *tray* para obtener contraseñas sin necesidad de abrir la aplicación.
* Escuchar atajos de teclado en segundo plano y creación de un launcher que permita buscar y obtener una contraeña rápidamente con un atajo.


### Capturas

#### Bóveda de contraseñas

![](/docs/boveda.png)

#### Creación de una nueva entrada

![](/docs/nuevaEntrada.png)

#### Buscador dinámico

![](/docs/busqueda.gif)
