// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.


// statements
(function () {
    "use strict";
    var alltypes = ["ccr", "cch", "mcp", "rrt", "lcp", "eer", "yyt", "upl"];
    var qrcode = {};
    var centerDatabase = {};
    var ProductsDictionary = {};
    var socket = io.connect("http://192.168.0.154:3000");
    var nowMoment = new moment();
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    $(document).on("mobileinit", function () {

        $.mobile.autoInitializePage = false;

    });

    function onDeviceReady() {
        try {

            window.location.hash = 'diagnosticPluginPage';

            try {
                $("#TestGpsEnabled").click(function () {
                    cordova.plugins.diagnostic.getLocationMode(function (locationMode) {
                        switch (locationMode) {
                            case cordova.plugins.diagnostic.locationMode.HIGH_ACCURACY:
                                navigator.notification.alert("High accuracy");
                                break;
                            case cordova.plugins.diagnostic.locationMode.BATTERY_SAVING:
                                navigator.notification.alert("Battery saving");
                                break;
                            case cordova.plugins.diagnostic.locationMode.DEVICE_ONLY:
                                navigator.notification.alert("Device only");
                                break;
                            case cordova.plugins.diagnostic.locationMode.LOCATION_OFF:
                                navigator.notification.alert("Location off");
                                break;
                        }
                    }, function (error) {
                        console.error("The following error occurred: " + error);
                    });
                })
            } catch (e) {
                swal(e.message)
            }
            try {

                initMap();

            } catch (e) {
                swal(e.message);
            }
            try {
                $("#QrcodeScannerBtn").click(function () {

                    scan();

                });
                $("#ShowSCannedItemsBtn").click(function () {

                    navigator.notification.alert(scannedItems);
                    navigator.notification.alert(scannedItems.length);

                });
                //initMap();
            } catch (e) {
                swal(e.message);
            }

            //Test Socket.io
            socket.on('news', function (data) {
                swal(data);
            });

            socket.emit("Server", "Barcode Test!!");


            //End of socket.io
            socket.on('news', function (data) {
                swal(data);
            });


            AddDynamicControls();
            InitQrCodeObject().then(function (qrObj) {
                qrcode = qrObj;
                qrcode.makeCode("http://www.facebook.com");
            });

            $("#cButtonSave111").click(function () {
                try {
                    GetStringForPrinting("www.eng_mohammad_abdullah.com").then(function (str) {

                        //cordova.plugins.printer.print(str);
                        cordova.plugins.printer.print(str, {
                            printerId: "MG3600 series(192.168.0.206)",

                        });


                    })

                } catch (e) {
                    swal(e.message);
                }

            });

            $("#qrcode img").load(function () {
                $("#ttee .testimg").remove();
                var uu = $("#qrcode img");
                var imgstr = '<img  class="testimg" src="' + uu.attr("src")
                    + '" alt="Alternate Text" />';
                $("#ttee").append(imgstr);


            });

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
                $("#printButton").click(function () {

                    var dd = $('<html xmlns="http://www.w3.org/1999/xhtml"><head> <title></title> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,maximum-scale=1.0"> <style type="text/css" media="screen"></style> <style type="text/css" media="print"></style> <style> body { margin: 0; padding: 0; background-color: #FAFAFA; font: 12pt "Tahoma"; } * { box-sizing: border-box; -moz-box-sizing: border-box; } .page { width: 10cm; max-height: 15cm; border: 1px #D3D3D3 solid; border-radius: 5px; background: white; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); } .subpage { border: 5px red solid; height: 150mm; padding: 2cm; font-size:40px; } @page { size: 10cm 15cm; margin: 0; } @media print { .page { margin: 0; border: initial; border-radius: initial; width: initial; min-height: initial; box-shadow: initial; background: initial; page-break-after: always; } } </style></head><body> <div class="book"> <div class="page"> <div class="subpage" id="rrr"></div> </div> </div></body></html>');

                    var divPage = dd.getElementById("rrr");
                    divPage.text("HHHHHHH");

                    //cordova.plugins.printer.print(dd, { duplex: 'long' }, function (res) {
                    //    swal(res ? 'Done' : 'Canceled');
                    //});

                    cordova.plugins.printer.print(dd, {
                        printerId: "MG3600 series(192.168.0.206)",

                    });


                });

                //هنا يجب إعادة تنفيذه 

                //GetGroupedProducts().then(function (gProducts) {
                //    createGroupedProductsList(gProducts);
                //    $("#clistNumber").append('<span>' + gProducts.length + '</span >')
                //});


            }) //End of   openDatabase()


            //لا أعلم ماهذا التابع ؟؟؟
            // myfunction();



            $("#printButton2").click(function () {

                var elText = $("#textQrocode");

                var dd = '<html xmlns="http://www.w3.org/1999/xhtml"><head> <title></title> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,maximum-scale=1.0"> <style type="text/css" media="screen"></style> <style type="text/css" media="print"></style> <style> body { margin: 0; padding: 0; background-color: #FAFAFA; font: 12pt "Tahoma"; } * { box-sizing: border-box; -moz-box-sizing: border-box; } .page { width: 10cm; max-height: 15cm; border: 1px #D3D3D3 solid; border-radius: 5px; background: white; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); } .subpage { border: 5px red solid; height: 150mm; padding: 2cm; font-size:40px; } @page { size: 10cm 15cm; margin: 0; } @media print { .page { margin: 0; border: initial; border-radius: initial; width: initial; min-height: initial; box-shadow: initial; background: initial; page-break-after: always; } } </style></head><body> <div class="book"> <div class="page"> <div class="subpage" id="rrr">' + + '</div> </div> </div></body></html>';



                cordova.plugins.printer.print(dd, { printerId: "Save as PDF" });



            });

        } catch (e) {
            swal(e.message)
        }

    }; //End Of OnDeviceReady

    //Init QrCode
    function InitQrCodeObject() {
        return new Promise(function (resolve, reject) {
            try {

                var qObject = {

                    text: "http://jindo.dev.naver.com/collie",
                    width: 180,
                    height: 180,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H

                };

                $("#ttee").append('<div id="qrcode"></div>');
                $("#qrcode").hide();
                var qrcode = new QRCode("qrcode", {

                    text: "http://jindo.dev.naver.com/collie",
                    width: 180,
                    height: 180,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H

                });
                resolve(qrcode);
            } catch (e) {
                navigator.notification.alert(e.message)
            }
        })

    }

    var scannedItems = [];

    function scan() {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if (!result.cancelled) {
                    // In this case we only want to process QR Codes
                    if (result.format == "QR_CODE") {
                        var value = result.text;
                        // This is the retrieved content of the qr code
                        saveItem(value).then(function () {
                            scan();
                        })

                    } else {
                        alert("Sorry, only qr codes this time ;)");
                    }
                } else {
                    alert("The user has dismissed the scan");
                }
            },
            function (error) {

            }
        );
    }

    function saveItem(value) {
        return new Promise((resolve, reject) => {

            scannedItems.push(value);
            resolve();

        })
    }




    // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.


    function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var geocoder = new google.maps.Geocoder;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: { lat: 51.1253664, lng: 4.2096528 }
        });
        directionsDisplay.setMap(map);


        GetCurrentLocation().then((pos) => {
            geocodeLatLng(geocoder, pos).then(function (address) {
                calculateAndDisplayRoute(directionsService, directionsDisplay, address);
            });

            GetLatLngFromAddress(geocoder, "Boodtsstraat 12, 9140 Temse").
                then((pos2) => {

                    try {
                        var tt = getDistance(pos, pos2);
                        alert(tt + "m");
                    } catch (e) {
                        swal(e.message);
                    }

                });

        });





        // var onChangeHandler = function () {

        //   };
        //document.getElementById('start').addEventListener('change', onChangeHandler);
        //document.getElementById('end').addEventListener('change', onChangeHandler);

        //   calculateAndDisplayRoute(directionsService, directionsDisplay);
    }

    var rad = function (x) {
        return x * Math.PI / 180;
    };

    var getDistance = function (p1, p2) {

        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.lat - p1.lat);
        var dLong = rad(p2.lng - p1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // returns the distance in meter
    };

    function GetCurrentLocation() {
        return new Promise((resolve, reject) => {

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    //geocodeLatLng(geocoder, "51.1253357,4.207866").then(function (address) {
                    //    calculateAndDisplayRoute(directionsService, directionsDisplay, address);
                    //})

                    resolve(pos);

                }, function () {
                    handleLocationError();
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError();
            }

        })
    }

    function handleLocationError() {
        swal("error")
    }
    function geocodeLatLng(geocoder, pos) {
        return new Promise((resolve, reject) => {
            geocoder.geocode({ 'location': pos }, function (results, status) {
                if (status === 'OK') {
                    alert(pos.lat);
                    if (results[0]) {
                        resolve(results[0].formatted_address);
                        alert(results[0].formatted_address);
                    } else {
                        reject('No results found');
                        swal('No results found');
                    }
                } else {
                    reject('Geocoder failed due to: ' + status);
                    swal('Geocoder failed due to: ' + status);
                }
            });


        })


    }


    function GetLatLngFromAddress(geocoder, address) {

        return new Promise((resolve, reject) => {

            geocoder.geocode({ 'address': address }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    var pos = { lat: latitude, lng: longitude };
                    resolve(pos);
                }
            });

        });
    }
    function calculateAndDisplayRoute(directionsService, directionsDisplay, address) {

        directionsService.route({
            origin: address,
            destination: "Boodtsstraat 12, 9140 Temse",
            travelMode: google.maps.TravelMode["WALKING"]
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                swal('Directions request failed due to ' + status);
            }
        });
    }


    function AddDynamicControls() {


        var element = $('<div class="ui-grid-b" style="height:55px">    </div>');

        var elementa = $('<div class="ui-block-a" style="height:100%">   </div>');

        var elementb = $('<div class="ui-block-b" style="height:100%">  </div>');

        var elementc = $('<div class="ui-block-c" style="height:100%">  </div>');


        for (var i = 0; i < alltypes.length; i++) {

            var e;


            switch ((i + 1) % 3) {

                case 1:
                    {
                        e = element.clone();
                        var ea = elementa.clone();
                        var aa = $('<a class="ui-btn  ui-btn-b">' +
                            alltypes[i] + '</a>').clone();

                        aa.click(function () {
                            /* Act on the event */

                            socket.emit("GetProductNumber", $(this).text());

                            GetStringForPrinting($(this).text())
                                .then(function (str) {

                                    //cordova.plugins.printer.print(str);
                                    cordova.plugins.printer.print(str, {
                                        printerId: "MG3600 series(192.168.0.206)",

                                    });


                                });



                        });

                        ea.append(aa)


                        e.append(ea);
                    }
                    break;
                case 2:
                    {
                        var eb = elementb.clone();
                        var aa = $('<a class="ui-btn  ui-btn-b">' + alltypes[i] + '</a>').clone();

                        aa.click(function () {
                            GetStringForPrinting($(this).text())
                                .then(function (str) {

                                    //cordova.plugins.printer.print(str);
                                    cordova.plugins.printer.print(str, {
                                        printerId: "MG3600 series(192.168.0.206)",

                                    });


                                });
                        });
                        eb.append(aa)


                        e.append(eb);
                    }
                    break;
                case 0:
                    {
                        var ec = elementc.clone();
                        var aa = $('<a class="ui-btn  ui-btn-b">' + alltypes[i] + '</a>').clone();

                        aa.click(function () {
                            GetStringForPrinting($(this).text())
                                .then(function (str) {

                                    //cordova.plugins.printer.print(str);
                                    cordova.plugins.printer.print(str, {
                                        printerId: "MG3600 series(192.168.0.206)",

                                    });


                                });
                        });
                        ec.append(aa)
                        e.append(ec);



                    }
                    break;
            }//End Of Switch


            $("#testDiv").append($("<br/>"));
            $("#testDiv").append(e);


        }



    }//enf of the AddDynamicControls


    function GetStringForPrinting(qrCodeString) {

        return new Promise(function (resolve, reject) {
            try {

                socket.on("SetProductNumber", function (productNumber) {

                    swal(productNumber);
                    qrcode.makeCode(productNumber);

                    $("#qrcode img").load(function () {
                        var uu = $("#qrcode img");
                        var imgstr = '<br /> <img src="' + uu.attr("src")
                            + '" alt="Alternate Text" />';
                        //$("#ttee").append(imgstr);
                        var documentToPrint = '<html xmlns="http://www.w3.org/1999/xhtml"><head> <title></title> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,maximum-scale=1.0"> <style type="text/css" media="screen"></style> <style type="text/css" media="print"></style>  <style> body { margin: 0; padding: 0; background-color: #FAFAFA; font: 12pt "Tahoma"; } * { box-sizing: border-box; -moz-box-sizing: border-box; } @page { size: 10cm 15cm; margin: 0; } @media print { .page { margin: 0; border: initial; border-radius: initial; width: initial; min-height: initial; box-shadow: initial; background: initial; } .subpage { border: 0px #fff solid; height: 140mm; font-size: 24px; margin-left: 2cm; margin-top: 0; padding-bottom: 30px; } h2 { margin: 0; margin-left:1.5cm } } </style>  </head><body> <div class="book"> <div class="page"> <div class="subpage" id="rrr"> <h2>' + productNumber + '</h2> <br />' + imgstr + '</div> </div> </div></body></html>';

                        resolve(documentToPrint);


                    });

                });


            } catch (e) {
                navigator.notification.alert(e.message)
            }
        })



    }


    function myfunction() {

        var $popover = $('.popover-markup>.trigger').popover({
            html: true,
            placement: 'bottom',
            // title: '<?= lang("Select passengers");?><a class="close demise");">×</a>',
            content: function () {
                return $(this).parent().find('.content').html();
            }
        });

        // open popover & inital value in form
        var passengers = [1, 0, 0];
        $('.popover-markup>.trigger').click(function (e) {
            e.stopPropagation();
            $(".popover-content input").each(function (i) {
                $(this).val(passengers[i]);
            });
        });
        // close popover
        $(document).click(function (e) {
            if ($(e.target).is('.demise')) {
                $('.popover-markup>.trigger').popover('hide');
            }
        });
        // store form value when popover closed
        $popover.on('hide.bs.popover', function () {
            $(".popover-content input").each(function (i) {
                passengers[i] = $(this).val();
            });
        });
        // spinner(+-btn to change value) & total to parent input 
        $(document).on('click', '.number-spinner a', function () {
            var btn = $(this),
                input = btn.closest('.number-spinner').find('input'),
                total = $('#passengers').val(),
                oldValue = input.val().trim();

            if (btn.attr('data-dir') == 'up') {
                if (oldValue < input.attr('max')) {
                    oldValue++;
                    total++;
                }
            } else {
                if (oldValue > input.attr('min')) {
                    oldValue--;
                    total--;
                }
            }
            $('#passengers').val(total);
            input.val(oldValue);
        });
        $(".popover-markup>.trigger").popover('show');

    }

})();
