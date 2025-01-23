const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Disponibilite",
  tableName: "disponibilite",
  columns: {
    id_prestation: {
      primary: true,
      type: "int",
      name: "id_prestation",
    },
    id_jour_ouverture: {
      primary: true,
      type: "int",
      name: "id_jour_ouverture",
    },
  },
  relations: {
    prestation: {
      target: "Prestation",
      type: "many-to-one",
      joinColumn: { name: "id_prestation" },
    },
    jour_ouverture: {
      target: "JourOuverture",
      type: "many-to-one",
      joinColumn: { name: "id_jour_ouverture" },
    },
  },
});
