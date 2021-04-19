let repoSellers = require('../repository/Sellers.js')

module.exports = class Admin_page {
    print(request, response) {
        if (typeof request.session.user !== 'undefined') {
            // response.render fait appel au fichier admin_page.pug
            // { formInfoNewHome: {} } stipule a la requete app.get que lle formulaire d'inscription
            // est remplie via les valeur de entity a qui il est attribue/associé dans  le code pug
            response.render('admin/admin_page', { formInfoNewHome: {} });
            return;
        }
        request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
        response.redirect('/log_in');
    }

};
