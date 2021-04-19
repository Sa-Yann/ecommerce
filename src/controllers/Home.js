module.exports = class Home {
    print(req, res) {
        // On lui demande d'afficher la page home.pug
        res.render('home');
    }
};
