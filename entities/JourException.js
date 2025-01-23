const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "JourException",
  tableName: "jour_exception",
  columns: {
    id_jour_exception: {
      primary: true,
      type: "int",
      generated: true,
      name: "id_jour_exception",
    },
    date_exception: {
      type: "date",
      nullable: false,
    },
    horaire_debut: {
      type: "time",
      nullable: false,
    },
    horaire_fin: {
      type: "time",
      nullable: false,
    },
    commentaire: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
  },
});
