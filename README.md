# Backend-ConsultorioKinesiologia
ta.controller -> AGREGUÉ PRECIOS, PORQUE NO SE PUEDEN CREAR SI NO TIENEN PRECIO.

En kinesiologo.auth.controller pasó esto: No podía exportar login porque tenía que hacerlo promesa y cuando hago una promesa solo devuelve un estado, no modifica nada. Por eso tuve que tirar los returns hacia abajo. HAY QUE VER SI FUNCIONA


En orm.ts Tuve que poner el type de base de datos dentro de una configuración de driver
 driverOptions: {
    connection: {
      type: 'mysql',
    }}

En turno.routes me arrojaba error porque no reconocía el add, entonces averigüé y el problema era que el error es causado porque Express espera que las funciones del controlador no devuelvan explícitamente un objeto Response. Las funciones deben estar tipadas como Promise<void> y no deben devolver el resultado de res.status() o res.json() como un valor. Por lo tanto, solo se debe devolver el status y CREO que los cambios como los que invocamos en el ADD por ejemplo, deberían cambiarse

## Init Docker
Crea y ejecuta el contenedor de MySQL:
``` bash 
docker run --name mysql-nibble -v "C:\Users\PC\docker-volumes\consultoriomysql:\var\lib\mysql" -e MYSQL_ROOT_HOST="%" -e MYSQL_ALLOW_EMPTY_PASSWORD="yes" -e MYSQL_DATABASE="consultorio" -e MYSQL_USER="nibble" -e MYSQL_PASSWORD="nibble" -p 3306:3306 percona/percona-server
```
obs: modificar la ruta```C:\Users\PC\docker-volumes\...``` dependiendo la compu de cada uno