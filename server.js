const express = require('express');
const app = express();
const path = require('path');
const config = require('./app/config');


//--------------------------------------------------------------------
//      Ajout du midlleware express session
//--------------------------------------------------------------------
const session = require('express-session');
app.use(session({
    // ppKey se situe dans le dossier config.js
    secret: config.appKey, resave: false, saveUninitialized: false,
    cookie: { maxAge: 3600000 }
}));


//--------------------------------------------------------------------
//      Ajout du midlleware express res.locals.session
//--------------------------------------------------------------------
app.use((req, res, next) => {
    // pug récupere res.local.session de req.session qui a été defini 
    // ds le controlleur log_in
    res.locals.session = req.session;
    next();
});



//--------------------------------------------------------------------
//      Ajout du midlleware express flash messages
//--------------------------------------------------------------------
const flash = require('express-flash-messages');
app.use(flash());

//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');


//--------------------------------------------------------------------
//      handle reading data from the <form> element
//--------------------------------------------------------------------
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


//--------------------------------------------------------------------
//      Dans le fichier server.js  nous devons ajouter le middleware sass :
//--------------------------------------------------------------------
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'build/'),
    dest: path.join(__dirname, 'public/'),
    debug: true,   // true pour voir les traitements effectués
    indentedSyntax: false, // true Compiles files with the .sass extension
    outputStyle: 'compressed',
    // sourceMap : opton pour généré le style.map.css avec sass
    sourceMap: true,
    force: true
}));



//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));


//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
require('./app/routes')(app);


//-------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(config.port, () => {
    console.log(`Le serveur est démarré : http://localhost:${config.port}`);
    if (process.send) {
        process.send('online');
    };
});
