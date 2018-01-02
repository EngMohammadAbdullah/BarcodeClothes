var mongoose = require('mongoose');
var randomize = require('randomatic');
var ProductTypes = {

    createType: function () {
        return new Promise((resolve, reject) => {

            var Schema = mongoose.Schema;

            // create a schema
            var TypesSchema = new Schema({
                types: []
            });


            // the schema is useless so far
            // we need to create a model using it
            var Types = mongoose.model('Types', TypesSchema);

            resolve(Types);

        });
    },
    readTypes: function () {
        return new Promise((resolve, reject) => {

            ProductTypes.createType().then(function (Types) {
                Types.find(function (err, types) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(types[0].types);
                })
            })

        });
    }
};

module.exports = ProductTypes;