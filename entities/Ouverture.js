const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Ouverture",
  tableName: "ouverture",
  columns: {
    id_jour_ouverture: {
      primary: true,
      type: "int",
      name: "id_jour_ouverture",
    },
    id_etablissement: {
      primary: true,
      type: "int",
      name: "id_etablissement",
    },
  },
  relations: {
    jour_ouverture: {
      target: "JourOuverture",
      type: "many-to-one",
      joinColumn: { name: "id_jour_ouverture" },
    },
    etablissement: {
      target: "Etablissement",
      type: "many-to-one",
      joinColumn: { name: "id_etablissement" },
    },
  },
});
