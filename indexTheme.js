var themeCur = false;
var visitedDark = false;
var themeWatcher = document.getElementById('lighting_mode');
var firstThemeSwitch = true;
var buttonWatcher = document.querySelectorAll('.btns a, a.btns');

buttonWatcher.forEach(btn => {
    btn.addEventListener('click',(e) => {
        e.preventDefault();
        if(!themeCur) updateParam(btn,'theme','light');
        else updateParam(btn,'theme','dark');
    });
});

function updateParam(btn,key,val){
    const url = new URL(btn.href);
    url.searchParams.set(key,val);
    window.location.href = url.toString();
}

window.addEventListener('load', () => {
    hideLoader();
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const theme = params.get('theme');
    // console.log(theme);
    if(theme === 'dark'){
        visitedDark = true;
        switchTheme();
    }
});

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

themeWatcher.addEventListener('click', () => {
    switchTheme();
});


function switchTheme(){
    if (firstThemeSwitch){
        if(visitedDark) document.getElementById('loader').style.background = '#442D52';
        showLoader();
    }

    const newHref = themeCur ? "indexLightStyle.css" : "indexDarkStyle.css";
    const newThemeLink = document.createElement('link');
    newThemeLink.rel = "stylesheet";
    newThemeLink.href = newHref;

    newThemeLink.onload = async () => {
        const oldLink = document.getElementById("pagestyle");
        if (oldLink) oldLink.remove();
        newThemeLink.id = "pagestyle";

        if(firstThemeSwitch){
            await waitForImagesToLoad();

            await preloadBackgroundImages([
                'img/Lawrencium.jpg',
                'img/github-mark/github-mark-white.png',
                'img/in-logo/in-logo/InBug-White.png',
                'img/github-mark/github-mark.png',
                'img/in-logo/in-logo/InBug-Black.png'
            ]);
            firstThemeSwitch = !firstThemeSwitch;
        }

        themeWatcher.textContent = themeCur ? "☼" : "☾";
        themeCur = !themeCur;
        applyMobileStyles();
        hideLoader();
    };
    document.head.appendChild(newThemeLink);
}

function preloadBackgroundImages(urls) {
  return Promise.all(urls.map(url => new Promise((res, rej) => {
    const img = new Image();
    img.src = url;
    img.onload = res;
    img.onerror = res;
  })));
}

function waitForImagesToLoad() {
  return new Promise((resolve) => {
    const images = Array.from(document.images);
    let loaded = 0;

    if (images.length === 0) {
      resolve();
    }

    images.forEach((img) => {
      if (img.complete && img.naturalHeight !== 0) {
        loaded++;
      } else {
        img.addEventListener('load', check);
        img.addEventListener('error', check);
      }
    });

    function check() {
      loaded++;
      if (loaded === images.length) {
        resolve();
      }
    }
  });
}



function applyMobileStyles() {
    if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if(window.location.pathname.split('/').pop() === 'index.html'){
            var buttons = document.getElementsByClassName('buttons');
            var top = document.getElementById('top');
            var intro = document.querySelector('.intro');

            top.style.marginTop = "4em";

             for (var i = 0; i < buttons.length; i++) {
                buttons[i].style.flexDirection = "column";
                buttons[i].style.gap = "5em";
            }

            intro.style.transformOrigin = "top";
            intro.style.transform = "scale(1.3)";
        }

        var header = document.querySelector('header');
        var themeWatcher = document.getElementById('lighting_mode');
        var home = document.getElementById('home');

        themeWatcher.style.height = "4.063rem";
        themeWatcher.style.fontSize="2.813rem";

        header.style.width = "78%";
        header.style.height = "5rem"

        home.style.width = "2.813rem";
        home.style.height = "4.063rem";

        header.style.transformOrigin = "top";
        header.style.transform = "scale(1.3)";

    }
}

document.addEventListener('DOMContentLoaded', function () {
    applyMobileStyles();
});
