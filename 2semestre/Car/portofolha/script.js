// Esconder header automaticamente
let prevScrollPos = window.pageYOffset;
window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
        document.querySelector("header").style.top = "0";
    } else {
        document.querySelector("header").style.top = "-3rem";
    }

    prevScrollPos = currentScrollPos;
};

// Calcular idade que se atualiza com o tempo
const birthDate = new Date("2004-07-16");
const idadeElement = document.getElementById("idade");

function calculateAge(birthDate) {
    const now = new Date();
    return now.getFullYear() - birthDate.getFullYear() - (now < new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate()));
}

function updateAge() {
    idadeElement.textContent = `Idade: ${calculateAge(birthDate)} anos`;
}

window.addEventListener("load", updateAge);

//hamburgui
function toggleMenu() {
    const floatingMenu = document.getElementById('floatingMenu');
    const bar3 = document.getElementById('bar3');
    
    floatingMenu.classList.toggle('active'); // Toggle the floating menu's active class
    bar3.classList.toggle('active'); // Toggle the animation class for the third bar
}
