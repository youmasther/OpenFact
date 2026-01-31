$(function () {
    var multipleCardCarousel = $("#carouselExampleControls");
    var scrollPosition = 0;
    if (window.matchMedia("(min-width: 768px)").matches) {
        var carousel = new bootstrap.Carousel(multipleCardCarousel[0], {
            interval: false,
        });
        var carouselWidth = ($(".carousel-inner")[0].scrollWidth * 2 != 0) ? $(".carousel-inner")[0].scrollWidth * 3 : $("#card-container").width() * 2;
        console.log("carousel width: ", carouselWidth);

        var cardWidth = $(".carousel-item").width() ? $(".carousel-item").width() : 300;
        console.log("card width: ", cardWidth);
        // cardWidth = $(".carousel-inner")[0].scrollWidth * 2;
        $("#carouselExampleControls .carousel-control-next").on("click", function () {
            // console.log(scrollPosition);

            if (scrollPosition < carouselWidth - (cardWidth * 1)) {
                scrollPosition += cardWidth;
                // console.log(scrollPosition);
                $(".carousel-inner").animate({
                    scrollLeft: scrollPosition
                }, 600);
            }
        });
        $("#carouselExampleControls .carousel-control-prev").on("click", function () {
            // console.log(scrollPosition);
            if (scrollPosition > 0) {
                scrollPosition -= cardWidth;
                // console.log(scrollPosition);
                $(".carousel-inner").animate({
                    scrollLeft: scrollPosition
                }, 600);
            }
        });
    } else {
        multipleCardCarousel.addClass("slide");
    }
});
