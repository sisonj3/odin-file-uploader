const multer = require('multer');
const path = require('path');

const defaultPath = './downloads/';

// Set upload destination
let upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            let path = defaultPath + req.params[0];

            console.log(`Uploading file to ${path}...`)

            callback(null, path);
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname);
        }
    })
});

const renderUploadForm = (req, res) => {
    if (req.user) {
        res.render("fileUploadForm", { path: req.params[0]} );
    } else {
        res.redirect("/");
    }
    
}

const uploadFile = [upload.single('userFile'),
    (req, res) => {

        console.log(req.file);

        console.log("Done");

        if (req.params[0]) {
            res.redirect(`/folder/path/${req.params[0]}`);
        } else {
            res.redirect("/");
        }
        
    }
];

module.exports = {
    renderUploadForm,
    uploadFile,
}