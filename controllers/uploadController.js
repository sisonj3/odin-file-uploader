const multer = require('multer');
const upload = multer({ dest: 'downloads/' })


const renderUploadForm = (req, res) => {
    if (req.user) {
        res.render("fileUploadForm");
    } else {
        res.redirect("/");
    }
    
}

const uploadFile = [upload.single('userFile'), (req, res) => {
    console.log("Uploading file...");

    // Save file to file system
    console.log(req.file);

    console.log("Done");

    res.redirect("/");
}]

module.exports = {
    renderUploadForm,
    uploadFile,
}