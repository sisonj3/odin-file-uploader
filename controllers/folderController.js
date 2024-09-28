const fs = require('fs').promises;
const path = require('path');

const defaultPath = 'downloads/';

// Render createFolder form
const renderCreateFolder = (req, res) => {
    if (req.user) {
        // Render
        res.render('createFolder', { path: req.params[0] });
    } else {
        res.redirect("/");
    }
}

// Add folder to downloads directory
const createFolder = (req, res) => {
    console.log("Creating folder...");

    let newPath = defaultPath + req.params[0] + "/" + req.body.folder;

    console.log(newPath);

    fs.mkdir(newPath, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
        } else {
            console.log('Directory created successfully!');
        }
    })

    console.log("Done!");

    if (req.params[0] == "") {
        res.redirect("/");
    } else {
        const folders = req.params[0].split('/');
        console.log(folders.join('/'));
        res.redirect(`/folder/path/${folders.join('/')}`);
    }
    
}

// Render current folder w/ its contents
const renderFolder = async (req, res) => {
    if (req.user) {

        const currentPath = defaultPath + req.params[0];
        const folderName = req.params[0].split('/');

        console.log(currentPath);

        const fileList = [];  

        const files = await fs.readdir(currentPath);

        //console.log(files);

        for(const file of files) {
            const filePath = path.join(currentPath, file);
            const stats = await fs.stat(filePath);

            //console.log(stats);

            fileList.push({ name: file, isFile: stats.isFile() });
        }

        console.log('Finished waiting');
        console.log(fileList);

        res.render("folder", { name: folderName[folderName.length - 1], files: fileList, path: `${req.params[0]}` });

    } else {
        res.redirect("/log-in");
    }
}

module.exports = {
    renderCreateFolder,
    createFolder,
    renderFolder,
}