var themeCur = false;
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
    if (firstThemeSwitch) showLoader();

    const newHref = themeCur ? "indexLightStyle.css" : "indexDarkStyle.css";
    const newThemeLink = document.createElement('link');
    newThemeLink.rel = "stylesheet";
    newThemeLink.href = newHref;

    newThemeLink.onload = () => {
        const oldLink = document.getElementById("pagestyle");
        if (oldLink) oldLink.remove();

        newThemeLink.id = "pagestyle";
        themeWatcher.textContent = themeCur ? "☼" : "☾";
        themeCur = !themeCur;
        applyMobileStyles();

        if (firstThemeSwitch) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    waitForAllImagesToDecode();
                    hideLoader();
                    firstThemeSwitch = false;
                });
            });
        }
    };
    document.head.appendChild(newThemeLink);
}


function waitForAllImagesToDecode() {
  const images = Array.from(document.images);
  const decodingPromises = images.map(img => {
    if (img.complete) {
      return img.decode ? img.decode() : Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      img.onload = () => {
        if (img.decode) {
          img.decode().then(resolve).catch(resolve);
        } else {
          resolve();
        }
      };
      img.onerror = () => resolve();
    });
  });
  return Promise.all(decodingPromises);
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
