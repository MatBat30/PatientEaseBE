const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Utilisateur",
  tableName: "utilisateur",
  columns: {
    id_utilisateur: {
      primary: true,
      type: "int",
      generated: true,
      name: "id_utilisateur",
    },
    nom: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    numero_telephone: {
      type: "varchar",
      length: 13,
      nullable: false,
    },
    prenom: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    date_naissance: {
      type: "date",
      nullable: false,
    },
    methode_creation: {
      type: "varchar",
      length: 9,
      nullable: false,
    },
  },
  relations: {
    ticket: {
      target: "Ticket",
      type: "one-to-one",
      joinColumn: { name: "id_ticket" },
    },
  },
});
