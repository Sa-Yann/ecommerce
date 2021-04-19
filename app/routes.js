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
    app.get('/admin_page', (req, res) => {
        let admin_page = require('../src/controllers/Admin_page.js');
        (new admin_page()).print(req, res);
    });
    app.get('/admin_page/create_seller', (req, res) => {
        let SellersClass = require('../src/controllers/AdminSeller.js');
        (new SellersClass()).printFormAdmin(req, res);
    });
    app.post('/admin_page/create_seller', (req, res) => {
        // res.send("Hello World");
        let SellersClass = require('../src/controllers/AdminSeller.js');
        // On utilise processForm pour indiquer qu on app.post 
        // les données collecter dans la données collectés via la function processForn()
        (new SellersClass()).processFormAdmin(req, res);
    });
};
