const EnumMethodeCreation = {
    QR_CODE: "qrCode",
    BORNES: "borne",
    PHONE: "téléphone"
};

const EnumPersonnelRole = {
    ADMINISTRATEUR: "administrateur",
    MEDECIN: "medecin",
    SECRETAIRE: "secretaire"
};

const EnumTicket = {
    TERMINE: "termine",
    ENPAUSE: "enPause",
    ANNULE: "annule",
    ENATTENTE: "enAttente",
    ENCOURS: "enCours",
};

module.exports = {
    EnumMethodeCreation,
    EnumPersonnelRole,
    EnumTicket,
};