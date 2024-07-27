$(document).ready(function() {
    let stt = 0;
    let endImg = $("img.slide:last").attr("idx");

    $(".dot").click(function() {
        stt = $(this).attr("idx");
        changeImg(stt);
    });

    $("#next").click(function () {
        if (++stt > endImg) {
            stt = 0;
        }
        changeImg(stt);
    });

    $("#prev").click(function () {
        if (--stt < 0) {
            stt = endImg;
        }
        changeImg(stt);
    });

    let interval;
    let timer = function () {
        interval = setInterval(function () {
            $("#next").click();
        }, 3000);
    };
    timer();

    function changeImg(stt) {
        let img = $("img.slide");
        let dot = $(".dot");

        img.hide();
        img.eq(stt).fadeIn(500);
        dot.removeClass("active");
        dot.eq(stt).addClass("active");

        clearInterval(interval);
        timer();
    }
});


