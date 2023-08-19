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

//hamburgui
function toggleMenu() {
    const floatingMenu = document.getElementById('floatingMenu');
    const bar3 = document.getElementById('bar3');
    
    floatingMenu.classList.toggle('active'); // Toggle the floating menu's active class
    bar3.classList.toggle('active'); // Toggle the animation class for the third bar
}
