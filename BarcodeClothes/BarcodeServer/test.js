try {


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

    var type = require("./Mongo/ProductTypes.js");

    type.GetTypeNumber("ccr").then(function (types) {

        console.log(types);
        //for (var i = 0; i < types.length; i++) {
        //    var obj = types[i];
        //    console.log(obj);
        //}
    });

} catch (e) {
    console.log(e.message);
}


//product.createProduct().then(function (product) {

//    return new product();

//}).then(product.generateContainerProducts).then(pp => {
//    console.log(pp.productNumbers)
//    console.log(pp.productNumbers.length)
//}).catch((err) => {
//    console.log(err)

//})