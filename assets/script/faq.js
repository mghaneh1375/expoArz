$(document).ready(function () {

    $(".nav-link").on("click", function () {
        select($(this));
    });

    $(".card-header .btn-link").on("click", function () {
        toggleOpenQuestions($(this));
    });

    var url_string = window.location.href;
    var url = new URL(url_string);
    var idx = -1;

    if(url.searchParams.get("section") != null) {

        try {
            idx = parseInt(url.searchParams.get("section")) - 1;
            var links = jQuery(this).find(".nav-link");

            if(links.length > idx) {
                select($('#' + links[idx].getAttribute("id")));
            }
        }
        catch (e) {
            idx = -1;
        }
    }

    if(url.searchParams.get("question") != null && idx !== -1) {

        try {
            var qIdx = parseInt(url.searchParams.get("question")) - 1;
            var buttons = jQuery(this).find("#accordion-" + (idx + 1) + " .card-header .btn-link");

            if(buttons.length > qIdx) {
                toggleOpenQuestions($(buttons[qIdx]));
                $("#accordion-" + (idx + 1)).animate({
                    scrollTop: $(buttons[qIdx]).offset().top - $("#accordion-" + (idx + 1)).offset().top
                }, 1000);
            }
        }
        catch (e) {}

    }

    var base_url = "https://expoarz.com/faq.html?section=";
    // section=1&question=1

    $('div[data-toggle="tooltip"]').tooltip({
        animated: 'fade',
        placement: 'top',
        trigger: 'manual'
    }).on('click', function () {
        $(this).tooltip('show');
        var node = $(this);
        var parentId = node.parent().parent().attr("id");
        var num = parseInt(parentId.match(/\d+/g)[0]) + 1;
        var letr = parentId.match(/[a-zA-Z\-]+/g)[0];

        var section = (letr === "general") ? 1 :
            (letr === "sellers-buyers") ? 2 :
                (letr === "transfer-methods") ? 3 : 4;

        copyTextToClipboard(base_url + section + "&question=" + num);
        setTimeout(function () {
            node.tooltip('hide');
        }, 1500);
    });

});

function fallbackCopyTextToClipboard(text) {

    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {

    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function select(node) {
    $(".tab-pane").removeClass("show").removeClass("active").removeClass("in");
    $(".nav-link").removeClass("active");
    node.addClass("active");
    $("#" + node.attr("aria-controls")).addClass("show").addClass("active").addClass("in");

    $(".card .collapse").removeClass("show").removeClass("in");
    $(".card-header .btn-link").addClass("collapsed").attr("aria-expanded", "false");
}

function toggleOpenQuestions(node) {

    var isHidden = node.attr("aria-expanded") === "false";

    $(".card .collapse").removeClass("show").removeClass("in");
    $(".card-header .btn-link").addClass("collapsed").attr("aria-expanded", "false");

    if(isHidden) {
        node.removeClass("collapsed");
        $(node.attr("data-target")).addClass("show");
        node.attr("aria-expanded", "true");
    }
}