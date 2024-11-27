# queuebuddy


## Conteneur MariaDB

Si MySQL n'est pas installer : 
- apt-get update

- apt-get install mariadb-client
ou 
- apt-get install mysql-client


Si MySQL installer :
- docker exec -it <nom_du_conteneur> mysql -u root -p


- CREATE USER 'externe'@'%' IDENTIFIED BY 'externepswd';
- GRANT ALL PRIVILEGES ON *.* TO 'externe'@'%' WITH GRANT OPTION;
- FLUSH PRIVILEGES;

- SHOW GRANTS FOR 'externe'@'%';