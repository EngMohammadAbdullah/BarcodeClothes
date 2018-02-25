// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.


// statements
(function () {
    "use strict";
    var alltypes = ["CCR", "MCP", "LCP", "MTP", "MMPb", "VVP", "eerr", "eetr"];
    var qrcode = {};
    var centerDatabase = {};
    var ProductsDictionary = {};
    var nowMoment = new moment();
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    $(document).on("mobileinit", function () {

        $.mobile.autoInitializePage = false;

    });

    function onDeviceReady() {
        try {

            window.location.hash = 'testPage';

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


                GetGroupedProducts().then(function (gProducts) {
                    createGroupedProductsList(gProducts);
                    $("#clistNumber").append('<span>' + gProducts.length + '</span >')
                });


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
                        var aa = $('<a class="ui-btn  ui-btn-b">' + alltypes[i] + '</a>').clone();

                        aa.click(function () {
                            /* Act on the event */

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
                qrcode.makeCode(qrCodeString);
                $("#qrcode img").load(function () {
                    var uu = $("#qrcode img");
                    var imgstr = '<br /> <img src="' + uu.attr("src")
                        + '" alt="Alternate Text" />';
                    //$("#ttee").append(imgstr);
                    var documentToPrint = '<html xmlns="http://www.w3.org/1999/xhtml"><head> <title></title> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width,maximum-scale=1.0"> <style type="text/css" media="screen"></style> <style type="text/css" media="print"></style>  <style> body { margin: 0; padding: 0; background-color: #FAFAFA; font: 12pt "Tahoma"; } * { box-sizing: border-box; -moz-box-sizing: border-box; } @page { size: 10cm 15cm; margin: 0; } @media print { .page { margin: 0; border: initial; border-radius: initial; width: initial; min-height: initial; box-shadow: initial; background: initial; } .subpage { border: 0px #fff solid; height: 140mm; font-size: 24px; margin-left: 2cm; margin-top: 0; padding-bottom: 30px; } h2 { margin: 0; margin-left:1.5cm } } </style>  </head><body> <div class="book"> <div class="page"> <div class="subpage" id="rrr"> <h2>' + qrCodeString + '</h2> <br />' + imgstr + '</div> </div> </div></body></html>';

                    resolve(documentToPrint);


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
