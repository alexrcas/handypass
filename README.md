# Handypass

Aplicación de escritorio para el almacenamiento local y gestion de contraseñas.

### Tecnologías
* Electron
* Vue3 + Typescript
* Bootstrap 5.2

### Funcionamiento

De manera intencionada, la aplicación no posee servidor ni realiza comunicación alguna, siendo únicamente un almacén local. La persistencia de los datos se encuentra en un fichero de texto, pero estos están cifrados y son legibles solamente por la aplicación. Cuando un usuario accede por primera vez, la aplicación le solicita crear una contraseña segura que deberá utilizar para acceder a la misma a partir de entonces. Con esa contraseña, la aplicación cifra los datos de forma que el fichero de persistencia sea ilegible si se accede desde el sistema.

### Líneas futuras

El uso debe ser extremadamente ágil o los usuarios seguirán prefiriendo almacenar sus credenciales en ficheros de texto para copiar y pegar. Lo ideal sería crear teclas de acceso rápido configurables que escribirán directamente en el portapepeles del usuario la contraseña deseada.

Puede ser interesante la exportación e importación de contraseñas. Puede exportarse un fichero con una clave de cifrado que otro usuario podría importar.

### Capturas

#### Acceso a la aplicación por primera vez

![](/docs/signin.png)

#### Acceso a la aplicación las veces sucesivas

![](/docs/login.png)

#### Bóveda de contraseñas

![](/docs/boveda.png)

#### Creación de una nueva entrada

![](/docs/nueva.png)

#### Buscador dinámico

![](/docs/busqueda.gif)
