var isDot = false;
var isValid = false;
var timer = null;

var
    persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
    arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
    fixNumbers = function (str)
    {
        if(typeof str === 'string')
        {
            for(var i=0; i<10; i++)
            {
                str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
            }
        }
        return str;
    };

var values = [];

function del(evt, id) {

    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if(charCode == 8) {
        delValue(id);
        evt.preventDefault();
        return;
    }
    else if(charCode < 40)
        return;

    if(id === "in1")
        isNumber(evt, id);
    else
        isJustNumber(evt, id);
}

var getKeyCode = function (str) {
    return str.charCodeAt(str.length - 1);
};

function isNumberInPhone(evt, id) {

    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode == 0 || charCode == 229) //for android chrome keycode fix
        charCode = getKeyCode($("#" + id).val());
    else
        return false;

    if(charCode >= 1728)
        charCode = String.fromCharCode(charCode - 1728).charCodeAt(0);

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

    addToValue(id, String.fromCharCode(charCode));
    $("#" + id).val(values[id]);

    return true;
}

function isJustNumberInPhone(evt, id) {

    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode == 0 || charCode == 229) //for android chrome keycode fix
        charCode = getKeyCode($("#" + id).val());
    else
        return false;

    if(charCode >= 1728)
        charCode = String.fromCharCode(charCode - 1728).charCodeAt(0);

    isValid = false;
    isDot = false;

    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    isValid = true;

    addToValue(id, String.fromCharCode(charCode));
    $("#" + id).val(values[id]);

    return true;
}


function isNumber(evt, id) {

    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    evt.preventDefault();

    if (charCode == 0 || charCode == 229) { //for android chrome keycode fix
        return false;
    }

    if(charCode >= 1728)
        charCode = String.fromCharCode(charCode - 1728).charCodeAt(0);

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

    addToValue(id, String.fromCharCode(charCode));
    return true;
}

function isJustNumber(evt, id) {

    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if(charCode >= 1728)
        charCode = String.fromCharCode(charCode - 1728).charCodeAt(0);

    isValid = false;
    isDot = false;

    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    isValid = true;

    addToValue(id, String.fromCharCode(charCode));
    evt.preventDefault();
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

function delValue(id) {

    var found = null;

    for(var key in values) {
        if(key === id) {
            found = values[key];
            break;
        }
    }

    if(found === null)
        return;

    values[id] = found.substr(0, found.length - 1);
    $("#" + id).val(values[id]);

}

function addToValue(id, char) {

    var found = null;

    for(var key in values) {
        if(key === id) {
            found = values[key];
            break;
        }
    }

    if(found === null)
        values[id] = char;
    else
        values[id] = found + char;

    $("#" + id).val(values[id]);

}

function setValue(id, val) {

    if(val === undefined)
        return;

    var found = null;

    for(var key in values) {
        if(key === id) {
            found = values[key];
            break;
        }
    }

    if(found === null)
        values[id] = val;
    else
        values[id] = val;

    $("#" + id).val(values[id]);

}

function calc() {

    // alert(isValid);

    if((!isValid && !isDot) || isDot)
        return;

    var in1 = fixNumbers($("#in1").val());

    if(in1.length !== 0) {
        in1 = parseFloat(in1.replace(new RegExp(",", 'g'), ""));
        setValue("in1", formatMoney(in1));
    }

    var in2 = fixNumbers($("#in2").val());

    if(in2.length !== 0) {
        in2 = parseInt(in2.replace(new RegExp(",", 'g'), ""));
        setValue("in2", formatMoney(parseInt(in2)));
    }

    if(in1.length === 0 || in2.length === 0) {
        setValue("result", "0");
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

    setValue("result", formatMoney(Math.max(0, x - karmozd)));

    $("#karmozd").val(formatMoney(karmozd));

}

function calcRev() {

    if((!isValid && !isDot) || isDot)
        return;

    var result = fixNumbers($("#result").val());
    var in2 = fixNumbers($("#in2").val());

    if(result.length === 0) {
        setValue("in1", "0");
        $("#karmozd").val(0);
        return;
    }

    if(timer != null)
        clearTimeout(timer);

    result = parseInt(result.replace(new RegExp(",", 'g'), ""));
    setValue("result", formatMoney(result));

    timer = setTimeout(function () {
        spinner2(result, in2);
    }, 200);
}

function doCalcRev(result, in2) {

    var karmozd = Math.ceil(result / 1000000) * 2500;
    $("#karmozd").val(formatMoney(karmozd));

    var x = parseInt(result) + parseInt(karmozd);
    // $("#total").html(formatMoney(x));

    if(in2.length === 0)
        return;

    in2 = parseInt(in2.replace(new RegExp(",", 'g'), ""));

    setValue("in1", formatMoney((x / in2).toFixed(2)));
}

$(document).ready(function () {

    var firstChoice = $(".dropdown-item:first-child");

    $("#admin").attr("href", firstChoice).text(firstChoice.attr("data-contact"));

    $(".dropdown-item").on("click", function () {
        $("#btnGroupDrop1Val").text($(this).text());
        $("#admin").attr("href", $(this).attr("data-href")).text($(this).attr("data-contact"));
    });

});