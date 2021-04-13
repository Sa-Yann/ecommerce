const express = require('express');
const app = express();
const path = require('path');
const config = require('./app/config');
 
//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');
 
//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
 

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
    sourceMap : true
}));

//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
require('./app/routes')(app);

 
//-------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(config.port,() => {
    console.log(`Le serveur est démarré : http://localhost:${config.port}`);
    if (process.send) {
        process.send('online');
    }

});
