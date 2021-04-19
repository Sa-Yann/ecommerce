// Sellers.js collecte et envoies les données recu par le formulaire a la base de donnéee
// Connection a la base de donnée
require('../../app/bdd_connect.js');

// On rappelle/active notre methode mongoose qui sert a se connecter a la base de données
const mongoose = require('mongoose');


const SellerSchema = mongoose.Schema({
    lastnameSeller: { type: String, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
    adress: { type: String },
    adress_more: { type: String },
    postalCode: { type: String },
    city: { type: String },
    info_compl1: { type: String },
    email: { type: String },
    firstname: { type: String, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
    lastname: { type: String, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
    civility: { type: String, match: /^[1-2]{1}$/ },
    firstname: { type: String, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
    lastname: { type: String, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
    mobil: { type: String, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
    phone: { type: String, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
    info_compl1: { type: String },
},
    // The versionKey is a property set on each document when first created by Mongoose. 
    // This keys value contains the internal revision of the document. The name of this document property 
    // is configurable. The default is __v.
    { versionKey: false });

module.exports = class SellersClass {
    constructor() {
        // Permet de definir le nom de la badd et le shema qui lui est associé
        this.db = mongoose.model('Sellers', SellerSchema);
    }
    // ajoute les données recolté dans UserSchema dans la base de donnée
    // add(userEntity) {
    //     return this.db.create(userEntity);

    // }

    add(sellerEntity) {
        return new Promise((resolve, reject) => {
            this.db.create(sellerEntity, function (err, user) {
                // le console.log(err) permet de voir les erreues retournées par mongoDB ds le terminal
                console.log(err);
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
    // Recuperer toutes les données d'un utilisateurs après avoir trouvé son adress email
    // log_in_Exists(email) {
    //     return new Promise((resolve, reject) => {
    //         this.db.findOne({ email }, (err, userQueLonChercheAllDatas) => {
    //             // si pas d'erreur, email et password trouvé
    //             if (!err && userQueLonChercheAllDatas !== null) {
    //                 resolve(userQueLonChercheAllDatas);
    //             }
    //             resolve(false);
    //         })
    //     })
    // }

};