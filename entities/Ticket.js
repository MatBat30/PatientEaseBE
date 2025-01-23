const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Ticket",
  tableName: "ticket",
  columns: {
    id_ticket: {
      primary: true,
      type: "int",
      generated: true,
      name: "id_ticket",
    },
    date_creation: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
    },
    statut: {
      type: "varchar",
      length: 50,
      default: "enCours",
      nullable: false,
    },
    date_cloture: {
      type: "datetime",
      nullable: false,
    },
    delai: {
      type: "time",
      default: "00:00:00",
      nullable: false,
    },
  },
  relations: {
    prestation: {
      target: "Prestation",
      type: "many-to-one",
      joinColumn: { name: "id_prestation" },
    },
  },
});
