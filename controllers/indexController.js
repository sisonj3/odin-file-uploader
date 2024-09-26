const { render } = require("ejs");

const renderHome = (req, res) => {
    if (req.user) {
        res.render("home", { name: req.user.username });
    } else {
        res.redirect("/log-in");
    }
    
}

module.exports = {
    renderHome,
}