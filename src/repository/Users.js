// users.js collecte et envoies les données recu par le formulaire a la base de donnéee
// Connection a la base de donnée
require('../../app/bdd_connect.js');

// On rappelle/active notre methode mongoose qui sert a se connecter a la base de données
const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    email: { type: String },
    password: { type: String },
    civility: { type: String, match: /^[1-2]{1}$/ },
    firstname: { type: String, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
    lastname: { type: String, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
    phone: { type: String, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
    date: { type: Date, default: Date.now },
    role: { type: String }

},
    // versionKey en mode false :permet de retirer le champs de numero de version du schéma "__v"
    { versionKey: false });

module.exports = class User {
    constructor() {
        this.db = mongoose.model('User', UserSchema);
    }
    // ajoute les données recolté dans UserSchema dans la base de donnée
    // add(userEntity) {
    //     return this.db.create(userEntity);

    // }

    add(userEntity) {
        return new Promise((resolve, reject) => {
            this.db.create(userEntity, function (err, user) {
                if (err) reject(err);
                resolve(user);
            });
        });
    }

    // On verifie que l email de l utilisateur a deja été inséré ou non
    emailExists(email) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ email }, (err, user) => {
                // si pas d'erreur, email trouvé
                if (!err && user !== null) {
                    resolve(true);
                }
                resolve(false);
            })
        })
    }

    log_in_Exists(email) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ email }, (err, userQueLonChercheAllDatas) => {
                // si pas d'erreur, email et password trouvé
                if (!err && userQueLonChercheAllDatas !== null) {
                    resolve(userQueLonChercheAllDatas);
                }
                resolve(false);
            })
        })
    }

    // FONCTION DE RECUPERATION DE TOUTES LES DONNÉES DE CHAQUE SELLER DE BIENS
    // UTILISÉE DANS LE CONTROLLEURS HOMELIST
    getallUsersinMyBdd() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, allUsersinMyBdd) => {
                // si pas d'erreur, email trouvé
                if (!err) {
                    console.log(allUsersinMyBdd)
                    // console.log(`je suis ds Sellers ds getallSellersinMyBdd`)
                    resolve(allUsersinMyBdd);
                }
                resolve(false);
            })
        })
    }

    getUserById(id) {
        return new Promise((resolve, reject) => {
            //  _id: id on cherche l'id quia pour valeur votre variable _id _id = id
            this.db.findById(id, (err, thisUserinMyDbb) => {

                // si pas d'erreur, seller trouvé
                if (!err && thisUserinMyDbb !== null) {
                    resolve(thisUserinMyDbb);
                }
                reject();
            })
        })
    }

    UpdateUser(id, entity) {
        // findOneandUpdate() Updates a single document based on the filter and sort criteria.
        return new Promise((resolve, reject) => {

            //  _id: req.body._id on cherche l'id quia pour valeur votre variable _id _id = req.body._id
            this.db.findOneAndUpdate({ _id: id }, entity, { new: true }, (err, thisUserinMyDbb) => {

                // si pas d'erreur, seller trouvé
                if (!err && thisUserinMyDbb !== null) {
                    resolve(thisUserinMyDbb);
                }
                reject();
            })
        })
    }

    deleteOne(filter = {}) {
        return new Promise((resolve, reject) => {
            this.db.deleteOne(filter, function (err) {
                console.log(err);
                if (err) reject(err);
                resolve();
            });
        });
    };
};
