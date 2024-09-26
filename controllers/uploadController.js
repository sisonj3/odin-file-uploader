
const renderUploadForm = (req, res) => {
    if (req.user) {
        res.render("fileUploadForm");
    } else {
        res.redirect("/");
    }
    
}

const uploadFile = (req, res) => {
    console.log("Uploading file...");

    // Save file to file system

    console.log("Done");

    res.redirect("/");
}

module.exports = {
    renderUploadForm,
    uploadFile,
}