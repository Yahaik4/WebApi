const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let destPath = path.join(__dirname, '../public/img/products');
        cb(null, destPath);
    },
    filename: (req, file, cb) => {        
        cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, ''));
    },
});

const upload = multer({
    storage: storage,
});

module.exports = upload;
