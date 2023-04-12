# Handypass

Aplicación de escritorio para el almacenamiento local y gestion de contraseñas.

### Tecnologías
* Electron
* Vue3 + Typescript
* Bootstrap 5.2

### Descripción

Si bien los navegadores hoy en día almacenan las contraseñas, hay muchos casos donde no es posible explotar esta funcionalidad, como a la hora de conectarse con aplicaciones de escritorio a bases de datos, máquinas virtuales, sesiones SSH, etc... En estos casos los usuarios suelen almacenar las contraseñas en un fichero de texto o en el mejor de los casos en un gestor de contraseñaa como LastPass. El problema de esta última opción es que estas aplicaciones están conectadas a internet y son objetivo de ataques como ya ha ocurrido en varias ocasiones.

HandyPass solo pretende ser como un fichero de texto pero más cómodo y seguro. De manera intencionada, la aplicación no posee servidor ni realiza comunicación alguna, siendo únicamente un almacén local. La persistencia de los datos se encuentra en un fichero de texto. Cuando un usuario accede por primera vez, la aplicación le solicita crear una contraseña segura que deberá utilizar para acceder a la misma a partir de entonces. Con esa contraseña se cifran los datos de forma que el fichero de persistencia sea legible únicamente por la aplicación.

### Uso

Los usuarios son reticentes a cambiar sus costumbres y más aún si la nueva solución es más aparatosa. Introducir contraseñas es algo recurrente durante una sesión de trabajo, por lo que el uso de HandyPass debe ser extremadamente ágil, sencillo y rápido o los usuarios seguirán prefiriendo almacenar sus credenciales en un fichero de texto en su escritorio.

Por ello, una vez creadas las contraseñas en la ventana principal de la aplicación, HandyPass ofrece un atajo mediante el cual abre una pequeña ventana emergente que permite rápidamente copiar al portapapeles cualquiera de las contraseñas disponibles.

### Líneas futuras

* Puede ser interesante la exportación e importación de contraseñas. Puede exportarse un fichero con una clave de cifrado que otro usuario podría importar.

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
