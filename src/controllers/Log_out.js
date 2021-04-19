let RepoLog_out = require('../repository/Users.js');

module.exports = class Log_out {
    disconnect(request, response) {
        request.session.user = null;
        request.flash('notify', 'Vous êtes maintenant déconnecté.');
        response.redirect('/');
    }

}