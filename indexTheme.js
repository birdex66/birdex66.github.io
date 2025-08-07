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
                    hideLoader();
                    firstThemeSwitch = false;
                });
            });
        }
    };
    document.head.appendChild(newThemeLink);
});

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
