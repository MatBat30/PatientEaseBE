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



# TypeORM
Initialiser TypeORM dans un projet
npx typeorm init --name project-name --database mysql

Générer une migration
npx typeorm migration:generate -n CreateTables

Appliquer la migration
npx typeorm migration:run

Revenir en arrière (rollback)
npx typeorm migration:revert

Vérifier l'état des migrations
npx typeorm migration:show

<!> Désactiver la synchronisation en production  <!>
