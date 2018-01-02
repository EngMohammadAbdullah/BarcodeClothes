var mongoose = require('mongoose');
var randomize = require('randomatic');

var Container = {

    createContainer: function () {
        return new Promise((resolve, reject) => {
            var Schema = mongoose.Schema;

            // create a schema
            var containerSchema = new Schema({
                container_number: []
            });

            // the schema is useless so far
            // we need to create a model using it
            var Container = mongoose.model('Container', containerSchema);

            resolve(Container);
        })

    },
    generateContainerNumbers: function (container) {
        return new Promise((resolve, reject) => {

            for (var i = 0; i < 1000; i++) {
                var temp = randomize('0', 4);
                while (container.container_number.indexOf(temp) != -1) {
                    var temp = randomize('0', 4);
                }
                container.container_number.push(temp);

            }

            container.save(function (err) {
                if (err) {
                    return reject(err)
                }
                console.log("created!!");
                resolve()
            })

        });
    }
};

module.exports = Container;