// let repoSellers = require('../repository/Sellers.js')

module.exports = class Dashboard {
    print(request, response) {
        if (typeof request.session.user !== 'undefined') {
            // response.render fait appel au fichier admin_page.pug
            // { formInfoNewHome: {} } stipule a la requete app.get que lle formulaire d'inscription
            // est remplie via les valeur de entity a qui il est attribue/associé dans  le code pug
            response.render('admin/dashboardView', { formInfoNewHome: {} });
            return;
        }
        request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
        response.redirect('/log_in');
    }

};
