module.exports = (app) => {
    app.get('/', (req, res) => {
        // res.send("Hello World");
        let Home = require('../src/controllers/Home.js');
        (new Home()).print(req, res);
    });
    app.get('/inscription', (req, res) => {
        // res.send("Hello World");
        let Inscription = require('../src/controllers/Inscription.js');
        (new Inscription()).print(req, res);
    });
    app.post('/inscription', (req, res) => {
        // res.send("Hello World");
        let Inscription = require('../src/controllers/Inscription.js');
        // On utilise processForm pour indiquer qu on app.post 
        // les données collecter dans la données collectés via la function processForn()
        (new Inscription()).processForm(req, res);
    });
    app.get('/log_in', (req, res) => {
        // res.send("Hello World");
        let Log_in = require('../src/controllers/Log_in.js');
        (new Log_in()).print(req, res);
    });
    app.post('/log_in', (req, res) => {
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
    app.get('/dashboardView', (req, res) => {
        let instenceDashboardClass = require('../src/controllers/Dashboard.js');
        (new instenceDashboardClass()).print(req, res);
    });
    app.get('/dashboardView/registerHomesView', (req, res) => {
        let instenceDeSellersClass = require('../src/controllers/RegisterHomes.js');
        (new instenceDeSellersClass()).printFormAdmin(req, res);
    });
    app.post('/dashboardView/registerHomesView', (req, res) => {
        // res.send("Hello World");
        let instenceDeAdminSellerClass = require('../src/controllers/RegisterHomes.js');
        // On utilise processFormAdmin pour indiquer qu on app.post 
        // les données collecter dans la données collectés via la function processForn()
        (new instenceDeAdminSellerClass()).processFormAdmin(req, res);
    });
    app.get('/list_homeView', (req, res) => {
        let instenceHomeListClass = require('../src/controllers/Homes_list.js');
        (new instenceHomeListClass()).printTableGoodForSale(req, res);
    });
    // app.get('dashboardView/list_homeView/:id', (req, res) => {
    //     let instenceDeClassInModifySellers = require('../src/controllers/ModifySeller.js');
    //     (new instenceDeClassInModifySellers()).getOneSellerDatas(req, res);
    // });
    app.get('/dashboardView/deleteSeller/:id', (req, res) => {
        let controllerHomeList = require('../src/controllers/Homes_list.js');
        (new controllerHomeList()).deleteHome(req, res);
    });

    // let instenceDeHomeListClass = require('../src/controllers/Homes_list.js');
    // (new instenceDeHomeListClass()).print(req, res);
    // res.render('dashboardView/modifySellerView')
    // });
    // app.post('/dashboardView/modifySellerView/:id', (req, res) => {
    //     let instenceDeSellersClass = require('../src/controllers/ModifySeller.js');
    //     (new instenceDeSellersClass()).printFormForChanges(req, res);
    //     // console.log('hello je suis la  en console')
    // });
};
