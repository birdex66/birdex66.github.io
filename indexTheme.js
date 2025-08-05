var themeCur = false;
var themeWatcher = document.getElementById('lighting_mode');

themeWatcher.addEventListener('click', () => {
    if(!themeCur){
        document.getElementById("pagestyle").setAttribute("href", "indexDarkStyle.css");
        themeWatcher.textContent="☾";
        themeCur = true;
    }else{
        document.getElementById("pagestyle").setAttribute("href", "indexLightStyle.css");
        themeWatcher.textContent="☼"
        themeCur = false;
    }
});

document.addEventListener('DOMContentLoaded', function () {
        if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            var buttons = document.getElementsByClassName('buttons');
            var top = document.getElementById('top');
            var header = document.querySelector('header');
            var intro = document.querySelector(".intro");

            top.style.marginTop = "4em";
            themeWatcher.style.height = "40px"

            for (var i = 0; i < buttons.length; i++) {
                buttons[i].style.flexDirection = "column";
                buttons[i].style.gap = "5em";
            }

            header.style.width="78%"
            header.style.transformOrigin="top";
            header.style.transform="scale(1.3)";
            intro.style.transformOrigin = "top";
            intro.style.transform = "scale(1.3)";

        }
});



