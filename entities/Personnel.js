const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Personnel",
  tableName: "personnel",
  columns: {
    id_personnel: {
      primary: true,
      type: "int",
      generated: true,
      name: "id_personnel",
    },
    mail: {
      type: "varchar",
      length: 254,
      nullable: false,
    },
    password: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    nom: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    prenom: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    numero_telephone: {
      type: "varchar",
      length: 13,
      nullable: false,
    },
    date_naissance: {
      type: "date",
      nullable: false,
    },
    date_creation: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
    },
    role: {
      type: "enum",
      enum: ["administrateur", "medecin", "secretaire"],
      nullable: false,
    },
  },
  relations: {
    etablissement: {
      target: "Etablissement",
      type: "many-to-one",
      joinColumn: { name: "id_etablissement" },
    },
    prestation: {
      target: "Prestation",
      type: "many-to-one",
      joinColumn: { name: "id_prestation" },
    },
  },
});
