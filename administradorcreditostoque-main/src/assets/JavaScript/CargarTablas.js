$(document).ready(function () {
    $('.select2').select2(); //initialize 
});

function InicializarSelect2() {
    $('.select2').select2();
    alert("hola como estas");
}

$(document).on('click', '#btnAnadirtipoentrega', function () {
    if ($('#cbotipoentrega').val() === 0 || $('#cbotipoentrega').val() === null || $('#cbotipoentrega').val() === undefined) {
        return;
    }
    else if ($('#txtMontoentrega').val() === 0 || $('#txtMontoentrega').val().trim() === "" || parseFloat($('#txtMontoentrega').val()) <= 0) {
        return;
    }
    else if ($('#txtNotasentrega').val().trim() === "") {
        return;
    }

    var htmltipoentrega = "<tr>" +
        "<td>" + $('#cbotipoentrega').val() + " - " + $('#cbotipoentrega option:selected').text() + "</td>" +
        "<td>" + $('#txtMontoentrega').val() + "</td>" +
        "<td>" + $('#txtNotasentrega').val() + "</td>" +
        '<td><img src="./assets/imagenes/eliminar.png" class="classTamanioIcono accioneliminartipoentrega"></td>' +
        "</tr>";
    $('#dtTipoentregacredito').append(htmltipoentrega);
});

$(document).on('click', '#dtTipoentregacredito .accioneliminartipoentrega', function () {
    $(this).parent().parent().remove();
});

//#region AÑADIR DOCUMENTOS EN NUECO CLIENTE CLIENTE
var vgCountfile = 1;
$(document).on('click', '#dtFilesnewcliente .accionaddnewfile', function () {

    var htmlfilecliente = "<tr>" +
        "<td>" + vgCountfile + "</td>" +
        "<td>" + '<input type="file" id="txtfilecliente' + vgCountfile + '" name="txtfilecliente' + vgCountfile + '" accept="image/png, image/jpeg, application/pdf" style="width:100%">' + "</td>" +
        '<td class="classCentrarfinal"><img src="./assets/imagenes/eliminar.png" class="classTamanioIcono acciondeletefilenewcliente"></td>' +
        "</tr>";
    $('#dtFilesnewcliente').append(htmlfilecliente);
    vgCountfile++;
});

$(document).on('click', '#dtFilesnewcliente .acciondeletefilenewcliente', function () {
    $(this).parent().parent().remove();
});

//#endregion

//#region AÑADIR COBRANZAS NUEVO
var vgCountfile = 1;
$(document).on('click', '#btnaddcobranzacierrediario', function () {

    if ($('#txtclientecierrediario').val().trim() === "") {
        return;
    }
    else if ($('#txtmontocierrediario').val() === 0 || $('#txtmontocierrediario').val().trim() === "" || parseFloat($('#txtmontocierrediario').val()) <= 0) {
        return;
    }
    else if ($('#txtrecibiocierrediario').val().trim() === "") {
        return;
    }

    var htmlfilecliente = "<tr>" +
        "<td>" + $('#txtclientecierrediario').val().trim() + "</td>" +
        '<td style="color: #007bff; font-weight: 600">' + FormatoNumeros(number_format($('#txtmontocierrediario').val().trim(), 2)) + "</td>" +
        "<td>" + $('#txtrecibiocierrediario').val().trim() + "</td>" +
        "<td>" + $('#txtobscierrediario').val().trim() + "</td>" +
        '<td class="classCentrarfinal"><img src="./assets/imagenes/eliminar.png" class="classTamanioIcono acciondeletecobranzaoficina"></td>' +
        "</tr>";
    $('#dtCobranzasOficina').append(htmlfilecliente);

    Calculartotalcobranzaoficina();
});

$(document).on('click', '#dtCobranzasOficina .acciondeletecobranzaoficina', function () {
    $(this).parent().parent().remove();
    Calculartotalcobranzaoficina();
});

function Calculartotalcobranzaoficina() {
    var listCobranzaoficina = $('#dtCobranzasOficinabody').children();
    var montopagoacu = 0;
    for (let i = 0; i < listCobranzaoficina.length; i++) {
        var montopago = listCobranzaoficina[i].children[1].textContent;
        montopagoacu = parseFloat(montopagoacu) + parseFloat(montopago.replace(/,/gi, ''));
        
    }
    $('#thtotalcobranzaoficina').text(FormatoNumeros(number_format(montopagoacu, 2)));
    $('#txttotaloficinacierrediario').val(FormatoNumeros(number_format(montopagoacu, 2)));
    CalcularTotalcierrediario();
}

//#endregion

//#region AÑADIR RESUMEN GATOS
var vgCountfile = 1;
$(document).on('click', '#btnaddresumengastos', function () {

    if ($('#txtdescripciongatocierrediario').val().trim() === "") {
        return;
    }
    else if ($('#txtmontogastocierrediario').val() === 0 || $('#txtmontogastocierrediario').val().trim() === "" || parseFloat($('#txtmontogastocierrediario').val()) <= 0) {
        return;
    }


    var htmlfilecliente = "<tr>" +
        "<td>" + $('#txtdescripciongatocierrediario').val().trim() + "</td>" +
        '<td style="color: #007bff; font-weight: 600">' + FormatoNumeros(number_format($('#txtmontogastocierrediario').val().trim(), 2)) + '</td>' +
        '<td class="classCentrarfinal"><img src="./assets/imagenes/eliminar.png" class="classTamanioIcono acciondetelegastocierrediario"></td>' +
        "</tr>";
    $('#dtResumengastos').append(htmlfilecliente);

    Calculartotalgastos();
});

$(document).on('click', '#dtResumengastos .acciondetelegastocierrediario', function () {
    $(this).parent().parent().remove();
    Calculartotalgastos();
});

function Calculartotalgastos() {
    var listCobranzaoficina = $('#dtResumengastosbody').children();
    var montopagoacu = 0;
    for (let i = 0; i < listCobranzaoficina.length; i++) {
        var montopago = listCobranzaoficina[i].children[1].textContent;
        montopagoacu = parseFloat(montopagoacu) + parseFloat(montopago.replace(/,/gi, ''));
        console.log(montopago);
    }
    $('#thtotalgastoscierrediario').text(FormatoNumeros(number_format(montopagoacu, 2)));
    $('#txttotalgastoscierrediario').val(FormatoNumeros(number_format(montopagoacu, 2)));
    CalcularTotalcierrediario();
}

//#endregion

//#region AÑADIR LISTADO DE COBRANZA

$(document).on('click', '#btnaddlistacobranzacierrediario', function () {

    if ($('#cboListacobranzacierediario').val() === 0 || $('#cboListacobranzacierediario').val() === null || $('#cboListacobranzacierediario').val() === undefined) {
        return;
    }
    if ($('#cboModalidadcobranzacierrediario').val() === 0 || $('#cboModalidadcobranzacierrediario').val() === null || $('#cboModalidadcobranzacierrediario').val() === undefined) {
        return;
    }
    else if ($('#txtmontolistacobranza').val() === 0 || $('#txtmontolistacobranza').val().trim() === "" || parseFloat($('#txtmontolistacobranza').val()) <= 0) {
        return;
    }

    var montoEfectivo = 0;
    var MontoDeposito = 0;
    var subTotal = 0;

    if (parseInt($('#cboModalidadcobranzacierrediario').val())  === 1){
        montoEfectivo = $('#txtmontolistacobranza').val();
    }
    else {
        MontoDeposito = $('#txtmontolistacobranza').val();
    }

    subTotal = parseFloat(montoEfectivo) + parseFloat(MontoDeposito);

    var htmlfilecliente = "<tr>" +
        "<td>" + $('#cboListacobranzacierediario').val() +'-' +$('#cboListacobranzacierediario option:selected').text() + "</td>" +
        '<td style="color: #007bff; font-weight: 600">' + FormatoNumeros(number_format(montoEfectivo, 2)) + '</td>' +
        '<td style="color: #007bff; font-weight: 600">' + FormatoNumeros(number_format(MontoDeposito, 2)) + '</td>' +
        '<td style="color: #007bff; font-weight: 600">' + FormatoNumeros(number_format(subTotal, 2)) + '</td>' +
        '<td class="classCentrarfinal"><img src="./assets/imagenes/eliminar.png" class="classTamanioIcono acciondeleteitemlistacobranza"></td>' +
        "</tr>";
    $('#dtResumenpagoslistacobranza').append(htmlfilecliente);

    Calculartotallistadocobranza();
});

$(document).on('click', '#dtResumenpagoslistacobranza .acciondeleteitemlistacobranza', function () {
    $(this).parent().parent().remove();
    Calculartotallistadocobranza();

});

function Calculartotallistadocobranza() {
    var listListadocobranza = $('#dtResumenpagoslistacobranzabody').children();
    var montoefectivoacu = 0;
    var montodepositoacu = 0;
    var montosubtotalacu = 0;
    for (let i = 0; i < listListadocobranza.length; i++) {
        var montoefec = listListadocobranza[i].children[1].textContent;
        var montodep = listListadocobranza[i].children[2].textContent;
        var montosubt = listListadocobranza[i].children[3].textContent;
        montoefectivoacu = parseFloat(montoefectivoacu) + parseFloat(montoefec.replace(/,/gi, ''));
        montodepositoacu = parseFloat(montodepositoacu) + parseFloat(montodep.replace(/,/gi, ''));
        montosubtotalacu = parseFloat(montosubtotalacu) + parseFloat(montosubt.replace(/,/gi, ''));
    }
    $('#thTotalefectivolistadocobranza').text(FormatoNumeros(number_format(montoefectivoacu, 2)));
    $('#thTotaldepositolistadocobranza').text(FormatoNumeros(number_format(montodepositoacu, 2)));
    $('#thTotalsubtotallistadocobranza').text(FormatoNumeros(number_format(montosubtotalacu, 2)));

    $('#txttotalefectivocierrediario').val(FormatoNumeros(number_format(montoefectivoacu, 2)));
    CalcularTotalcierrediario();
}

//#endregion

$(document).on('click', '#btncalculartotales', function () {
    CalcularTotalcierrediario();
});

function CalcularTotalcierrediario() {
    var totalofi = $('#txttotaloficinacierrediario').val();
    totalofi = totalofi.replace(/,/gi, '');

    var totalefec = $('#txttotalefectivocierrediario').val();
    totalefec = totalefec.replace(/,/gi, '');

    var totalgastos = $('#txttotalgastoscierrediario').val();
    totalgastos = totalgastos.replace(/,/gi, '');

    var totalcierre = parseFloat(totalofi) + parseFloat(totalefec) - parseFloat(totalgastos);
    $('#txttotalcierrediario').val(FormatoNumeros(number_format(totalcierre, 2)));
}

function FormatoNumeros(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function number_format(amount, decimals) {

    amount += '';
    amount = parseFloat(amount.replace(/[^0-9\.]/g, ''));

    decimals = decimals || 0;

    if (isNaN(amount) || amount === 0)
        return parseFloat('0.00').toFixed(decimals);

    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;

    return amount_parts.join('.');
}