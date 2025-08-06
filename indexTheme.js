var themeCur = false;
var themeWatcher = document.getElementById('lighting_mode');
var firstThemeSwitch = true;

function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.remove('fade-out');
        loader.style.display = 'flex';
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

window.addEventListener('load', () => {
    hideLoader();
});



themeWatcher.addEventListener('click', () => {
    let loaderTimeout;

    if(firstThemeSwitch){
        firstThemeSwitch = !firstThemeSwitch;
        loaderTimeout = setTimeout(showLoader, 100);
    }

    var newHref = themeCur ? "indexLightStyle.css" : "indexDarkStyle.css";
    var newThemeLink = document.createElement('link');


    newThemeLink.rel = "stylesheet";
    newThemeLink.id = "pagestyle";
    newThemeLink.href = newHref;

    newThemeLink.onload = () => {
        clearTimeout(loaderTimeout);
        var oldLink = document.getElementById("pagestyle")
        if(oldLink && oldLink !== newThemeLink){
            oldLink.remove();
        }

        themeWatcher.textContent = themeCur ? "☼" : "☾";
        themeCur = !themeCur;
        applyMobileStyles();
        hideLoader();
    };
    document.head.appendChild(newThemeLink);
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
        themeWatcher.style.height = "4.063rem";
        themeWatcher.style.fontSize="2.813rem";

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.flexDirection = "column";
            buttons[i].style.gap = "5em";
        }

        header.style.width = "78%";
        header.style.height = "5rem"
        home.style.width = "2.813rem";
        home.style.height = "4.063rem";
        header.style.transformOrigin = "top";
        header.style.transform = "scale(1.3)";
        intro.style.transformOrigin = "top";
        intro.style.transform = "scale(1.3)";
    }
}




document.addEventListener('DOMContentLoaded', function () {
    applyMobileStyles();
});




