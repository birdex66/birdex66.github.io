var themeCur = false;
var themeWatcher = document.getElementById('lighting_mode');

themeWatcher.addEventListener('click', () => {
    if (!themeCur) {
        document.getElementById("pagestyle").setAttribute("href", "indexDarkStyle.css");
        themeWatcher.textContent = "☾";
        themeCur = true;
    } else {
        document.getElementById("pagestyle").setAttribute("href", "indexLightStyle.css");
        themeWatcher.textContent = "☼";
        themeCur = false;
    }

    setTimeout(applyMobileStyles, 100); // 100ms delay
});


function applyMobileStyles() {
    if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        var buttons = document.getElementsByClassName('buttons');
        var top = document.getElementById('top');
        var header = document.querySelector('header');
        var intro = document.querySelector('.intro');
        var themeWatcher = document.getElementById('lighting_mode');
        var home = document.getElementById('home');

        top.style.marginTop = "4em";
        themeWatcher.style.height = "65px";

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.flexDirection = "column";
            buttons[i].style.gap = "5em";
        }

        header.style.width = "78%";
        header.style.height = "80px"
        home.style.width = "45px";
        home.style.height = "65px";
        header.style.transformOrigin = "top";
        header.style.transform = "scale(1.3)";
        intro.style.transformOrigin = "top";
        intro.style.transform = "scale(1.3)";
    }
}




document.addEventListener('DOMContentLoaded', function () {
    applyMobileStyles();
});




