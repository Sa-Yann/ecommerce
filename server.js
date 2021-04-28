const express = require('express');
const app = express();
const path = require('path');
const config = require('./app/config');
const jwt = require('jsonwebtoken');
const Cookies = require("cookies");


// //--------------------------------------------------------------------
// //      Test JWT Token
// //--------------------------------------------------------------------

// const logInfo = [
//     {
//         firstname: 'Charlie',
//         lastname: 'Toto',
//         role: 'admin'
//     },
//     {
//         firstname: 'Charlene',
//         lastname: 'Tata',
//         role: 'user'
//     }
// ]

// app.get('/logInfo', (req, res) => {
//     res.json(logInfo)
// })

// // User authentication example
// // Create a login route inpost to create a token
// app.post('/loginRoute', (req, res) => {
//     // route loginRoute to authenticate user 
//     const username = req.body.username
//     const userTest = { name: usernam }
//     //  on veut serialiser notre utilisateur/lui donner
//     constAccessToken = jwt.sign(logInfo, process.env)
//     res.json({ accesToken: accesToken})

// })

//--------------------------------------------------------------------
//      Ajout du midlleware crypto
//--------------------------------------------------------------------






//--------------------------------------------------------------------
//      Ajout du midlleware express session
//--------------------------------------------------------------------
const session = require('express-session');
app.use(session({
    // ppKey se situe dans le dossier config.js
    secret: config.appKey, resave: false, saveUninitialized: false,
    cookie: { maxAge: 3600000 }
}));

///--------------------------------------------------------------------
// Ajout d'une commande qui spécifie un utilisateur constant pour
// ne pas avoir a se reconnecter tt le temps peendant la construction de l'app
// bien mettre entre guillemets, tous les paramettres de connexion récupérés via le consol log 
// dans Users.js 
//--------------------------------------------------------------------
// app.use((req, res, next) => {
//     req.session.user = {
//         _id: "60794aba0de09233f2e9163c",
//         email: 'test1021@gmail.com',
//         password: '$2a$10$VUz6hMKQfgbphQ/JMXWu/eCZmkioPywxzjZ68nxLwPoruZxpy9ty6',
//         civility: '1',
//         firstname: 'Yann',
//         lastname: 'Le',
//         phone: '0123456782',
//         date: '2021 - 04 - 16T08: 28: 42.024Z'
//     };
//     next()
// })


//--------------------------------------------------------------------
//      Ajout du midlleware express res.locals.session
//--------------------------------------------------------------------
app.use((req, res, next) => {
    // pug récupere res.local.session de req.session qui a été defini 
    // ds le controlleur log_in
    // res.locals.session = req.session;
    // comme on utilise des JWT on repmplace: res.locals.session = req.session par;
    // res.locals permet de renvoyer ds variables dans la vue
    res.locals.session = {};
    // console.log(res.locals.session);
    res.locals.route = req._parsedUrl.pathname;
    res.locals.user = {};
    // res.locals.csrf = req.session.token
    // permet de voir l'url venant après host:port(localhost://3000)req._parsedUrl.pathname
    console.log(res.locals.route);

    next();
});



//--------------------------------------------------------------------
//      Ajout du midlleware express flash messages
//--------------------------------------------------------------------
const flash = require('express-flash-messages');
app.use(flash());

//--------------------------------------------------------------------
//      Mise en place du moteur de template
// we choose the folder templates that we create to host all the pug views
// NB: WHEN A VIEW IS REQUESTED PUG AUTO GENRATE THE / FROM layout/VIEWTHATWEWONNA BE CALLED 
// EXAMPLE response.render('listPages/singleOfferView'
// NB : WHEN WE REDIRECT WE HAVE TO ADD THE / exemple : response.redirect('/listOffers')
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
// C'est ici qu'on defini notre repertoire/dossier puclid comme dossier de reference pour 
// les donnés css/images et js necessaisres pour les affichage et fonctionenement frontend
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
