const fs = require('fs');

const defaultPath = 'downloads/';

// Render createFolder form
const renderCreateFolder = (req, res) => {
    if (req.user) {
        // Render
        res.render('createFolder');
    } else {
        res.redirect("/");
    }
}

// Add folder to downloads directory
const createFolder = (req, res) => {
    console.log("Creating folder...");

    let newPath = defaultPath + req.body.folder;

    fs.mkdir(newPath, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
        } else {
            console.log('Directory created successfully!');
        }
    })

    console.log("Done!");

    res.redirect("/");
}

module.exports = {
    renderCreateFolder,
    createFolder,
}