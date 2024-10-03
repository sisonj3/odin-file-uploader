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

// Render rename folder form
const renderRenameFolder = (req, res) => {
    if (req.user) {
        res.render('renameFolder.ejs', { path: req.params[0] });
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

const renameFolder = async (req, res) => {
    console.log("Renaming folder...");

    const folders = req.params[0].split('/');

    let oldPath = defaultPath + req.params[0];
    let newPath;

    if ((folders.length - 1) <= 0) {
        newPath = defaultPath + req.body.folder;
    } else {
        folders.pop();

        newPath = defaultPath + folders.join('/') + '/' + req.body.folder;
    }

    console.log(oldPath);
    console.log(newPath);

    await fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.error("Error renaming file/folder: " + err);
        }
    });

    if (req.params[0].split('/').length < 2) {
        res.redirect("/");
    } else {
        const itemPath = req.params[0].split('/');

        itemPath.pop();

        res.redirect(`/folder/path/${itemPath.join('/')}`);
    }


}

const deleteFolder = async (req, res) => {
    const currentPath = defaultPath + req.params[0];
    const stats = await fs.stat(currentPath);

    console.log(`Deleting ${currentPath}...`);



    // Delete file/folder
    if (stats.isDirectory()) {

        // Delete directory and all its contents
        await fs.rm(currentPath, { recursive: true }, (err) => {
            if (err) {
                console.error(`Error deleting directory: ${err}`);
            } else {
                console.log("Directory deleted");
            }
        });

    } else {
        
        // Delete file
        await fs.unlink(currentPath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err}`);
            } else {
                console.log("File deleted");
            }
        });

    }

    if (req.params[0].split('/').length < 2) {
        res.redirect("/");
    } else {
        const itemPath = req.params[0].split('/');

        itemPath.pop();

        res.redirect(`/folder/path/${itemPath.join('/')}`);
    }
}

module.exports = {
    renderCreateFolder,
    renderRenameFolder,
    createFolder,
    renderFolder,
    renameFolder,
    deleteFolder,
}