const multer = require('multer');
const path = require('path');

// Définir le dossier de destination pour enregistrer les images téléchargées
const uploadDir = path.join(__dirname,'..', 'uploads');

// Définir le stockage de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Générer un nom de fichier unique en ajoutant un timestamp au nom d'origine
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Définir les types de fichiers acceptés
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

// Configurer Multer avec les options de stockage et de filtrage
const upload = multer({ storage, fileFilter });

module.exports = upload;
