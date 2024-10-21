# Backend-ConsultorioKinesiologia
Para instalar el proyecto debes utilizar un proyect manager, recuerda colocarte en la ruta ./Backend-ConsultorioKinesiologia:

```bash
npm i
# or
pnpm install
# or
bun i
```

## Init Docker
Crea y ejecuta el contenedor de MySQL:
``` bash 
docker run --name mysql-nibble -v "C:\Users\PC\docker-volumes\consultoriomysql:\var\lib\mysql" -e MYSQL_ROOT_HOST="%" -e MYSQL_ALLOW_EMPTY_PASSWORD="yes" -e MYSQL_DATABASE="consultorio" -e MYSQL_USER="nibble" -e MYSQL_PASSWORD="nibble" -p 3306:3306 percona/percona-server
```
obs: modificar la ruta```C:\Users\PC\docker-volumes\...``` dependiendo la compu de cada uno
