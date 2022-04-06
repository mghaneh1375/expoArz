$(document).ready(function () {

    $(".nav-link").on("click", function () {

        $(".tab-pane").removeClass("show").removeClass("active").removeClass("in");
        $(".nav-link").removeClass("active");
        $(this).addClass("active");
        $("#" + $(this).attr("aria-controls")).addClass("show").addClass("active").addClass("in");

        $(".card .collapse").removeClass("show").removeClass("in");
        $(".card-header .btn-link").addClass("collapsed").attr("aria-expanded", "false");

    });

    $(".card-header .btn-link").on("click", function () {

        var isHidden = $(this).attr("aria-expanded") === "false";

        $(".card .collapse").removeClass("show").removeClass("in");
        $(".card-header .btn-link").addClass("collapsed").attr("aria-expanded", "false");

        if(isHidden) {
            $(this).removeClass("collapsed");
            $($(this).attr("data-target")).addClass("show");
            $(this).attr("aria-expanded", "true");
        }
    });

});