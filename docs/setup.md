# Links

## Docker

- [install docker](https://docs.docker.com/get-docker/)
- [percona server mongodb](https://hub.docker.com/r/percona/percona-server-mongodb/)

## MongoDB

- [mongodb](https://www.mongodb.com/)
- [mongodb altlas](https://www.mongodb.com/es/atlas)
- [mongodb comunity server](https://www.mongodb.com/try/download/community)
- [mongodb shell](https://www.mongodb.com/products/tools/shell)
- [mongodb for vs code](https://www.mongodb.com/es/products/tools/vs-code)
- [mongodb compass](https://www.mongodb.com/products/tools/compass)
- [mongodb courses](https://learn.mongodb.com/catalog)

# Commands


docker run --name mongodb-dsw -v C:\Users\PC\docker-volumes\percona-mongodb-dsw:\data\db -p 27017:27017 -d percona/percona-server-mongodb:latest

docker run --name mongodb-dsw -v C:\Users\PC\docker-volumes\consultorio:\data\db -p 27017:27017 -d percona/percona-server-mongodb:latest

---------

docker run --name mysql-dsw -v "C:\Users\PC\docker-volumes\consultoriomysql:\var\lib\mysql" -e MYSQL_ROOT_HOST="%" -e MYSQL_ALLOW_EMPTY_PASSWORD="yes" -e MYSQL_DATABASE="consultorio" -e MYSQL_USER="gonz" -e MYSQL_PASSWORD="gonz" -p 3306:3306 percona/percona-server

