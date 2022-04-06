var isDot = false;
var isValid = false;
var timer = null;

function isNumber(evt) {

    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    isValid = false;
    isDot = false;

    if(charCode === 46) {
        isDot = true;
        return true;
    }

    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    isValid = true;
    isDot = false;

    return true;
}

function isJustNumber(evt) {

    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    isValid = false;
    isDot = false;

    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    isValid = true;
    return true;
}

function spinner(in1, in2) {

    $("#blur").removeClass('hidden');
    $("#loader-div").removeClass('hidden');

    setTimeout(function () {
        $("#blur").addClass('hidden');
        $("#loader-div").addClass('hidden');
        doCalc(in1, in2);
    }, 300);

}

function spinner2(in1, in2) {

    $("#blur").removeClass('hidden');
    $("#loader-div").removeClass('hidden');

    setTimeout(function () {
        $("#blur").addClass('hidden');
        $("#loader-div").addClass('hidden');
        doCalcRev(in1, in2);
    }, 300);

}

function formatMoney(num) {

    var str = num.toString().split('.');

    if (str[0].length >= 3) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length > 2) {
        str[1] = str[1].substring(0, 2);
    }

    return str.join('.');
}

// function formatMoney(number) {
//     return number.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
// }

function calc() {

    if((!isValid && !isDot) || isDot)
        return;

    var in1 = $("#in1").val();

    if(in1.length !== 0) {
        in1 = parseFloat(in1.replace(new RegExp(",", 'g'), ""));
        $("#in1").val(formatMoney(in1));
    }

    var in2 = $("#in2").val();

    if(in2.length !== 0) {
        in2 = parseInt(in2.replace(new RegExp(",", 'g'), ""));
        $("#in2").val(formatMoney(parseInt(in2)));
    }

    if(in1.length === 0 || in2.length === 0) {
        // $("#total").html("...");
        $("#result").html(0);
        $("#karmozd").val(0);
        return;
    }

    if(timer != null)
        clearTimeout(timer);

    timer = setTimeout(function () {
        spinner(in1, in2);
    }, 200);

}

function doCalc(in1, in2) {

    var karmozdRate = 2500;

    if($("#btnGroupDrop1Val").text().indexOf("کرون") !== -1)
        karmozdRate = 2000;


    var x = in1 * in2;
    // $("#total").html(formatMoney(x));
    var karmozd = Math.ceil(x / 1000000) * karmozdRate;
    $("#result").val(formatMoney(Math.max(0, x - karmozd)));
    $("#karmozd").val(formatMoney(karmozd));

}

function calcRev() {

    if((!isValid && !isDot) || isDot)
        return;

    var result = $("#result").val();
    var in2 = $("#in2").val();

    if(result.length === 0) {
        $("#in1").val(0);
        $("#karmozd").val(0);
        // $("#total").html(0);
        return;
    }

    if(timer != null)
        clearTimeout(timer);

    timer = setTimeout(function () {
        spinner2(result, in2);
    }, 200);
}

function doCalcRev(result, in2) {

    result = parseInt(result.replace(new RegExp(",", 'g'), ""));
    $("#result").val(formatMoney(result));

    var karmozd = Math.ceil(result / 1000000) * 2500;
    $("#karmozd").val(formatMoney(karmozd));

    var x = parseInt(result) + parseInt(karmozd);
    // $("#total").html(formatMoney(x));

    if(in2.length === 0)
        return;

    in2 = parseInt(in2.replace(new RegExp(",", 'g'), ""));
    var in1 = (x / in2).toFixed(2);

    $("#in1").val(formatMoney(in1));
}

$(document).ready(function () {

    $(".dropdown-item").on("click", function () {
        $("#btnGroupDrop1Val").text($(this).text());
    });

});