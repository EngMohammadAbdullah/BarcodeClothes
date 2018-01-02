//Import the mongoose module
var mongoose = require('mongoose');

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Set up default mongoose connection
var mongoDB = 'mongodb://eng_mohammad:mohammad224@ds123312.mlab.com:23312/barcode_clothes';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//Define a schema
var Schema = mongoose.Schema;

// create a schema
var containerSchema = new Schema({
    container_number: []
});

// the schema is useless so far
// we need to create a model using it
var Container = mongoose.model('Container', containerSchema);

// create a new user called chris
var fabrikContainer = new Container();


/**
 * Products Schema  ***
 */
var productSchema = new Schema({
    containerNumber: String,
    productNumbers: []
});

// the schema is useless so far
// we need to create a model using it
var product = mongoose.model('product', productSchema);

// create a new user called chris





// call the built-in save method to save to the database

var randomize = require('randomatic');

//for (var i = 0; i < 1000; i++) {
//    var temp = randomize('0', 4);
//    while (fabrikContainer.container_number.indexOf(temp) != -1) {
//        var temp = randomize('0', 4);
//    }
//    fabrikContainer.container_number.push(temp);

//}

//fabrikContainer.save(function (err) {
//    if (err) throw err;

//    console.log('User saved successfully!');
//})

Container.find(function (err, container) {
    if (err) {
        console.log(err)
    }

    var containerProduct = new product();
    containerProduct.containerNumber = container[0].container_number[0];
    for (var i = 0; i < 1000; i++) {
        var temp = randomize('0', 4);
        while (containerProduct.productNumbers.indexOf(temp) != -1) {
            var temp = randomize('0', 4);
        }

        containerProduct.productNumbers.push(temp);

    }

    containerProduct.save(function (err) {
        if (err) throw err;

        console.log('containerProduct saved successfully!');
    })
    //console.log(container[0].container_number.length);
    //container[0].container_number.splice(0, 1);
    //container[0].save(function (err) {
    //    if (err) throw err;

    //    console.log('User saved successfully!');

    //})
})


//for (var i = 0; i < 1000; i++) {
//    console.log(fabrikContainer.container_number[i])
//}

//fabrikContainer.container_number[999] = fabrikContainer.container_number[0];
//for (var i = 0; i < 1000; i++) {
//    console.log(i + " : " + fabrikContainer.container_number[i])

//    for (var j = 0; j < 1000; j++) {
//        if (i == j) {
//            continue;
//        }
//        if (fabrikContainer.container_number[i].indexOf(fabrikContainer.container_number[j]) != -1) {
//            console.log("true")
//        }
//    }
//}
