const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "JourOuverture",
  tableName: "jour_ouverture",
  columns: {
    id_jour_ouverture: {
      primary: true,
      type: "int",
      generated: true,
      name: "id_jour_ouverture",
    },
    horaire_debut: {
      type: "time",
      nullable: false,
    },
    horaire_fin: {
      type: "time",
      nullable: false,
    },
    jour_semaine: {
      type: "enum",
      enum: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
      nullable: false,
    },
    debut_pause: {
      type: "time",
      nullable: true,
    },
    fin_pause: {
      type: "time",
      nullable: true,
    },
  },
});
