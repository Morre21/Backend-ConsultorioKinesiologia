create database if not exists nibble;

create user if not exists nibble@'%' identified by 'nibble';
grant all on nibble.* to nibble'%';