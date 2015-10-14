
window.onload = function() {
    updateSliderControl();
    animateLogo();
    animateRobot();
    addSmoothScrolling();
}


window.onscroll = function() {
    updateSliderControl();
}



function updateSliderControl() {
    // get all the slider links
    var links = document.querySelectorAll("#slider-control a")

    for (var i = 0; i < links.length; i++) {
        var link = links[i];

        // Get the section pointed to by the link
        var name = link.getAttribute('href');
        var section = document.querySelector(name);
        var sectionTop = section.offsetTop;
        var sectionBottom = section.offsetTop + section.offsetHeight;

        // Check if window.scrollY is between the section.
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            link.className = "active";
        } else {
            link.className = "";
        }
    }
}

function animateLogo() {
    TweenMax.fromTo("#logo", 2,
        {
            css:{
                transform: "translate(0, -30px)"
            }
        },
        {
            css:{
                transform: "translate(0, 30px)"
            },
            repeat: -1,
            yoyo: true,
            ease: Power2.easeInOut,
        }
    )
}


function animateRobot() {
    var t = new TimelineMax({repeat: -1});
    t.to("#android-robot",0.3,{rotation: "-=10deg"})
        .to("#android-robot",0.6,{rotation: "+=20deg"})
        .to("#android-robot",0.3,{rotation: "-=10deg"});
}

function scrollToElement(element) {
    var topOfElement = element.offsetTop;

    TweenMax.to(window, 1, {
        scrollTo: {
            y: topOfElement,
        },

        ease: Power2.easeInOut,
    });
}

function addSmoothScrolling() {
    var links = document.querySelectorAll("#slider-control a, .links a");

    for (var i = 0; i < links.length; i++) {
        var link = links[i];

        link.addEventListener("click", function (wrapLink) {
            return function(event) {
                // `event` is the mouse click event
                event.preventDefault();

                // BUG WARNING! Fix with a closure or ES6 `let`.
                var href = wrapLink.getAttribute('href');

                scrollToElement(document.querySelector(href));
            };
        }(link));
    }
}