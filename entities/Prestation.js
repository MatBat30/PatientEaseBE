const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Prestation",
  tableName: "prestation",
  columns: {
    id_prestation: {
      primary: true,
      type: "int",
      generated: true,
      name: "id_prestation",
    },
    nom_prestation: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    temps_approximatif: {
      type: "time",
      nullable: false,
    },
  },
  relations: {
    etablissement: {
      target: "Etablissement",
      type: "many-to-one",
      joinColumn: { name: "id_etablissement" },
    },
  },
});
