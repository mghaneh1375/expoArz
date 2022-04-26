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

});

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