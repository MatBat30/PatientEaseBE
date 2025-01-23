const { EntitySchema } = require("typeorm");
const Ticket = require("./Ticket");

module.exports = new EntitySchema({
  name: "Retour",
  tableName: "retour",
  columns: {
    id_retour: {
      primary: true,
      type: "int",
      generated: true,
      name: "id_retour",
    },
    commentaire: {
      type: "varchar",
      length: 500,
      nullable: false,
    },
    date_creation: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    ticket: {
      target: "Ticket",
      type: "one-to-one",
      joinColumn: { name: "id_ticket" },
      inverseSide: "retour",
    },
  },
});
