const fs = require('fs').promises;
const path = require('path');

const defaultPath = 'downloads/';

const renderFile = async (req, res) => {
    if (req.user) {
        const currentPath = defaultPath + req.params[0];

        const fileStats = await fs.stat(currentPath);

        const fileName = req.params[0].split('/').pop();

        console.log(fileName);
        console.log(fileStats);

        res.render("file", { name: fileName, size: fileStats.size, uploadTime: fileStats.birthtime });
    } else {
        res.redirect('/');
    }
    
};

module.exports = {
    renderFile,
};