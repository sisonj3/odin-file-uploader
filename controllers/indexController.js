const fs = require('fs').promises;
const path = require('path');

const defaultPath = 'downloads/';

const renderHome = async (req, res) => {
    if (req.user) {

        const fileList = [];

        const files = await fs.readdir(defaultPath);

        console.log(files);

        for(const file of files) {
            const filePath = path.join(defaultPath, file);
            const stats = await fs.stat(filePath);

            console.log(stats);

            fileList.push({ name: file, isFile: stats.isFile() });
        }

        console.log('Finished waiting');
        console.log(fileList);
        res.render("home", { name: req.user.username, files: fileList });

    } else {
        res.redirect("/log-in");
    }
    
}

module.exports = {
    renderHome,
}