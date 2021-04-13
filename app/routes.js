module.exports = (app) => {
    app.get('/', (req, res) => {
        // res.send("Hello World");
        let Home = require('../src/controllers/Home.js');
        (new Home()).print(req, res);
    });
};
