const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Etablissement",
  tableName: "etablissement",
  columns: {
    id_etablissement: {
      primary: true,
      type: "int",
      generated: true,
      name: "id_etablissement",
    },
    nom: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    telephone: {
      type: "varchar",
      length: 13,
      nullable: false,
    },
    rue: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    code_postal: {
      type: "varchar",
      length: 10,
      nullable: false,
    },
    ville: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    numero_rue: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
  },
});
