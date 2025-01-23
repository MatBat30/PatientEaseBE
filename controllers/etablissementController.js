// --- ENTITIES ---
const AppDataSource = require("../data-source");
const { Etablissement } = require("../entities/Personnel");

// --- ROUTER ---
exports.getEtablissementById = (req, res) => {
    res.status(200)
}

exports.getEtablissements = (req, res) => {
    res.status(200)
}

exports.postEtablissement = (req, res) => {
  const nom = req.body.nom
  const telephone = req.body.telephone
  const rue = req.body.rue
  const code_postal = req.body.code_postal
  const numero_telephone = req.body.numero_telephone
  const ville = req.body.ville
  const numero_rue = req.body.numero_rue
  createEtablissement(nom, telephone, rue, code_postal, numero_telephone, ville, numero_rue, res)
}

exports.putEtablissementById = (req, res) => {
    res.status(200)
}

// --- FUNCTIONS TypeORM ---  
async function createEtablissement(nom, telephone, rue, code_postal, numero_telephone, ville, numero_rue, res) {
  try {
      const etablissementRepository = AppDataSource.getRepository("Etablissement");
  
      const newEtablissement = etablissementRepository.create({
        nom: nom,
        telephone: telephone,
        rue: rue,
        code_postal: code_postal,
        numero_telephone: numero_telephone,
        ville: ville,
        numero_rue, numero_rue,
      });
  
      await etablissementRepository.save(newEtablissement);
      res.status(201).json(newEtablissement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  