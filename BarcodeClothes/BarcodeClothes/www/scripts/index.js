// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    var centerDatabase = {};
    var ProductsDictionary = {};
    var nowMoment = new moment();
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        openDatabase().then(function () {
            //var product = {};
            //product.productType = "CCR";
            //product.productNumber = "123456";
            //product.containerID = "11";
            //AddProduct(product)
            //    .then(GetProducts)
            //    .then(function (product) {
            //        createProductsList(product);
            //        $("#clistNumber").val(product.length);
            //        $("#clistNumber").append('<span>' + product.length + '</span >')
            //    })

            GetGroupedProducts().then(function (gProducts) {
                createGroupedProductsList(gProducts);
                $("#clistNumber").append('<span>' + gProducts.length + '</span >')
            })


        })
    };


})();