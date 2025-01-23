const { EntitySchema } = require("typeorm");
const JourOuverture = require("./JourOuverture");
const JourException = require("./JourException");

module.exports = new EntitySchema({
  name: "Fermeture",
  tableName: "fermeture",
  columns: {
    id_jour_ouverture: {
      primary: true,
      type: "int",
      name: "id_jour_ouverture",
    },
    id_jour_exception: {
      primary: true,
      type: "int",
      name: "id_jour_exception",
    },
  },
  relations: {
    jourOuverture: {
      target: "JourOuverture",
      type: "many-to-one",
      joinColumn: { name: "id_jour_ouverture" },
    },
    jourException: {
      target: "JourException",
      type: "many-to-one",
      joinColumn: { name: "id_jour_exception" },
    },
  },
});
