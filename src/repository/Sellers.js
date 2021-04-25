// Sellers.js collecte et envoies les données recu par le formulaire a la base de donnéee
// Connection a la base de donnée
require('../../app/bdd_connect.js');

// On rappelle/active notre methode mongoose qui sert a se connecter a la base de données
const mongoose = require('mongoose');
slug = require('mongoose-slug-updater');
mongoose.plugin(slug);



const SellerSchema = mongoose.Schema({
    // lastnameSeller: { type: String, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
    lastnameSeller: { type: String },
    adress: { type: String },
    adress_more: { type: String },
    postalCode: { type: Number },
    city: { type: String },
    info_compl1: { type: String },
    firstname: { type: String, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
    lastname: { type: String, match: /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž-]+$/i },
    civility: { type: String, match: /^[1-2]{1}$/ },
    email: { type: String },
    mobil: { type: String, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
    phone: { type: String, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
    info_compl2: { type: String },
    titreDescription: { type: String },
    typedeVendeur: { type: String },
    postalCodeDuBien: { type: Number },
    cityDuBien: { type: String },
    priceHome: { type: Number },
    annonceurStatus: { type: String, match: /^[1-2]{1}$/ },
    // slug option unique: true pour avoir un slug unique pour chaque élement
    slug: { type: String, slug: ['postalCode', 'city'], unique: true }
    // slug: 
},
    // {
    //     titreDescription: { type: String },
    //     typedeVendeur: { type: String },
    //     postalCodeDuBien: { type: String },
    //     cityDuBien: { type: String },
    //     annonceurStatus: { type: String },

    // },
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
    // FONCTION DE RECUPERATION DE TOUTES LES DONNÉES DE CHAQUE SELLER DE BIENS
    // UTILISÉE DANS LE CONTROLLEURS HOMELIST
    getallSellersinMyDbb() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, allSellersinMyDbb) => {
                // si pas d'erreur, email trouvé
                if (!err) {
                    // console.log(allSellersinMyDbb)
                    // console.log(`je suis ds Sellers ds getallSellersinMyDbb`)
                    resolve(allSellersinMyDbb);
                }
                resolve(false);
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


    getSellerById(id) {
        return new Promise((resolve, reject) => {
            //  _id: id on cherche l'id quia pour valeur votre variable _id _id = id
            this.db.findById(id, (err, thisSellersinMyDbb) => {

                // si pas d'erreur, seller trouvé
                if (!err && thisSellersinMyDbb !== null) {
                    resolve(thisSellersinMyDbb);
                }
                reject();
            })
        })
    }


    getSellerBySlug(slug) {
        return new Promise((resolve, reject) => {
            //  _id: id on cherche l'id quia pour valeur votre variable _id _id = id
            this.db.findOne({ slug }, (err, thisSellersinMyDbb) => {

                // si pas d'erreur, seller trouvé
                if (!err && thisSellersinMyDbb !== null) {
                    resolve(thisSellersinMyDbb);
                }
                reject();
            })
        })
    }

    UpdateSeller(id, entity) {
        // findOneandUpdate() Updates a single document based on the filter and sort criteria.
        return new Promise((resolve, reject) => {

            //  _id: req.body._id on cherche l'id quia pour valeur votre variable _id _id = req.body._id
            this.db.findOneAndUpdate({ _id: id }, entity, { new: true }, (err, thisSellersinMyDbb) => {

                // si pas d'erreur, seller trouvé
                if (!err && thisSellersinMyDbb !== null) {
                    resolve(thisSellersinMyDbb);
                }
                reject();
            })
        })
    }



};
