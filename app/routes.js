const { request } = require('express');

const csrf = require('../src/controllers/csrf-mdlllware.js')
// const csrfPost = require('../src/controllers/csrf-mdlllwarPost.js')

module.exports = (app) => {

    // let generateTk() = require('../src/controllers/csrf-mdlllware.js')

    app.get('/', (req, res) => {
        // res.send("Hello World");
        let Home = require('../src/controllers/Home.js');
        (new Home()).print(req, res);
    });

    // Get All articles on the Homepage
    app.get('/list_homeView', (req, res) => {
        let instenceHomeListClass = require('../src/controllers/Sellers_list.js');
        (new instenceHomeListClass()).printTableGoodForSaleUsersSide(req, res);
    });

    // Get Single article Full Description on on page
    app.get('/homeDescriptionDetails/:slug', (req, res) => {
        let Home = require('../src/controllers/Home.js');
        (new Home()).printSingleArticle(req, res);
    });

    // app.post('/routeTestJWT', (res, req) => {
    //     let Home = require('../src/controllers/Home.js');
    //     (new Home()).postTokenInfo(req, res);
    // })


    app.use('/', (req, res, next) => {
        // Récupération du token dans le cookie
        let jwt = require('jsonwebtoken');
        let Cookies = require("cookies");
        let token = new Cookies(req, res).get('le_cookie_jwt');
        let config = require('./config.js')
        // Si le cookie (access_token) n'existe pas
        if (token == null) return res.sendStatus(401);

        // sinon on vérifie le jwt
        jwt.verify(token, config.appKey, (err, dataJwt) => {
            // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
            if (err) return res.sendStatus(403);
            res.locals.user = dataJwt;
            res.locals.user.connected = true;
            next();
        });
    });

    app.use('/dashboardView', (req, res, next) => {
        if (typeof res.locals.user.roles != 'undefined' && res.locals.user.roles == 'admin') {
            next();
        }
        else {
            // si on n'est pas admin
            return res.sendStatus(401);;
        }
    })

    app.get('/admin/test-jwt', (req, res) => {
        // Récupération du token dans le cookie
        let jwt = require('jsonwebtoken');
        let Cookies = require("cookies");
        let token = new Cookies(req, res).get('le_cookie_jwt');
        let config = require('./config.js')
        // Si le cookie (access_token) n'existe pas
        if (token == null) return res.sendStatus(401);

        // sinon on vérifie le jwt
        jwt.verify(token, config.appKey, (err, dataJwt) => {
            // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
            if (err) return res.sendStatus(403);

            // A partir de là le JWT est valide on a plus qu'à vérifier les droits
            // Si on est admin
            if (typeof dataJwt.roles != 'undefined' && dataJwt.roles == 'admin') {
                return res.send(`Admin ${dataJwt.firstname}`);
            }
            else {
                // si on n'est pas admin
                return res.send(`${dataJwt.firstname} PAS ADMIN !!!!`);
            }
        });
    });


    // Pagination
    app.get('/', (req, res) => {
        // res.send("Hello World");
        let Home = require('../src/controllers/Home.js');
        (new Home()).list(req, res);
    });

    app.get('/inscription', csrf.generateTk, (req, res) => {
        // res.send("Hello World");
        let Inscription = require('../src/controllers/Inscription.js');
        (new Inscription()).print(req, res);
    });
    app.post('/inscription', csrf.controlTk, (req, res) => {
        // res.send("Hello World");
        let Inscription = require('../src/controllers/Inscription.js');
        // On utilise processForm pour indiquer qu on app.post 
        // les données collecter dans la données collectés via la function processForn()
        (new Inscription()).processForm(req, res);
    });
    app.get('/log_in', csrf.generateTk, (req, res) => {
        // res.send("Hello World");
        let Log_in = require('../src/controllers/Log_in.js');
        (new Log_in()).print(req, res);
    });
    app.post('/log_in', csrf.controlTk, (req, res) => {
        // res.send("Hello World");
        let Log_in = require('../src/controllers/Log_in.js');
        // On utilise processForm pour indiquer qu on app.post 
        // les données collecter dans la données collectés via la function processForn()
        (new Log_in()).processLog_in(req, res);
    });
    app.get('/log_out', (req, res) => {
        let Log_out = require('../src/controllers/Log_out.js');
        // (new Log_out()).print(req, res);
        (new Log_out()).disconnect(req, res);
    });


    ///---- ADMIN
    app.get('/dashboardView', (req, res) => {
        let instenceDashboardClass = require('../src/controllers/Dashboard.js');
        (new instenceDashboardClass()).print(req, res);
    });

    // function generateTk(req, res, next) {
    //     let token = require('crypto').createHash('sha1').update(`${new Date().toDateString()}${Math.random()}`).digest('hex').toLowerCase();
    //     // console.log(token)
    //     // on le stoke dans la sesion
    //     // stock dans la session en request
    //     req.session.csrf = token
    //     // stock ds local pour y avoir acces dans la vue en response
    //     res.locals.token_csrf = token
    //     // l'avoir dans session permet de comparer avec c qui va arriver en local pour confirmer 
    //     next()
    // }

    app.get('/dashboardView/list_homeView', (req, res) => {
        let instenceDeSellersClass = require('../src/controllers/RegisterHomes.js');
        (new instenceDeSellersClass()).list(req, res);
    });

    app.get('/dashboardView/registerHomesView', csrf.generateTk, (req, res) => {
        let instenceDeSellersClass = require('../src/controllers/RegisterHomes.js');
        (new instenceDeSellersClass()).printFormAdmin(req, res);
    });


    app.post('/dashboardView/registerHomesView', csrf.controlTk, (req, res) => {
        // res.send("Hello World");
        let instenceDeAdminSellerClass = require('../src/controllers/RegisterHomes.js');
        // On utilise processFormAdmin pour indiquer qu on app.post 
        // les données collecter dans la données collectés via la function processForn()
        (new instenceDeAdminSellerClass()).processFormAdmin(req, res);
    });

    app.get('/dashboardView/edit/:id', (req, res) => {
        // console.log(`j suis passé par la route app.get qui utilise  printFormAdminEdit du controlleurs registeurHomes`)
        let controllerRegisterHomes = require('../src/controllers/RegisterHomes.js');
        (new controllerRegisterHomes()).printFormAdminEdit(req, res);
        // () => { console.log('test route') };
    });
    app.post('/dashboardView/edit/:id', (req, res) => {
        // console.log(`j suis passé par la route app.get qui utilise  printFormAdminEdit du controlleurs registeurHomes`)
        let controllerRegisterHomes = require('../src/controllers/RegisterHomes.js');
        (new controllerRegisterHomes()).processFormAdmin(req, res);
        // () => { console.log('test route') };
    });
    app.get('/dashboardView/deleteSeller/:id', (req, res) => {
        // console.log(`j suis passé par la route app.get qui utilise  deleteHome du controlleurs Sellers_list.js`)
        let controllerHomeList = require('../src/controllers/Sellers_list.js');
        (new controllerHomeList()).deleteHome(req, res);
    });
    // app.get('/dashboardView/AllUsersandAdmin', (req, res) => {
    //     console.log(`j suis passé par la route app.get qui utilise  renderListRegisteredUsers du controlleurs RegisteredUsersBck.js`)
    //     let controllerRegsiteredAll = require(`../src/controllers/RegisteredUsersBck.js`);
    //     (new controllerRegsiteredAll()).renderListRegisteredUsers(req, res);
    // })

    // render la page Colaborateurs et affiche le tableau avec tous les utiisateurs referencés ds la Bdd
    app.get('/dashboardView/AllUsersandAdmin', (req, res) => {
        let controllerListdAllUsers = require(`../src/controllers/RegisteredUsersBck.js`);
        // console.log(`j suis passé par la route app.get qui utilise  printTableListUsersBck du controlleurs RegisteredUsersBck.js`);
        (new controllerListdAllUsers()).printTableListUsersBck(req, res);
    })

    // envoie vers la page d edit dun  utilisaterus
    app.get('/dashboardView/updateUserBck/:id', (req, res) => {
        // console.log(`j suis passé par la route app.get qui utilise  printFormAdminEdit du controlleurs registeurHomes`)
        let controllerRegisterHomes = require('../src/controllers/RegisteredUsersBck.js');
        (new controllerRegisterHomes()).printFormClientEditBck(req, res);
        // () => { console.log('test route') };
    });
};
