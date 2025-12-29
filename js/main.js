var imgGardien = document.getElementById("img-gardien");
var imgFond = document.getElementById("img-fond");
var consigne = document.getElementById("consigne");
var docBody = document.body;
var barre = document.getElementById("barre");
var shotTimingBar = document.getElementById("shot-timing-bar");
var input = document.getElementById("code");
var btn = document.getElementById("btn");
var alarme = new Audio('../assets/alarme.mp3');
var check = new Audio('../assets/check.mp3');
var win = new Audio('../assets/win.mp3');

function reveil_gardien() {
    input.style.display = "none";
    btn.style.display = "none";
    shotTimingBar.style.display = "none";

    imgGardien.src = "assets/gardi_2.png";
    consigne.textContent = "OH LÀ LÀ, NON ! VOUS AVEZ RÉVEILLÉ LE GARDIEN !!!";
    docBody.style.background = "linear-gradient(#FF402C, #A8291E)";
    
    input.disabled = true;
    input.value = "";
    barre.style.animationPlayState = "paused";
    imgGardien.classList.add("game-over");
    alarme.play();

    setTimeout(() => {
        input.disabled = false;
        input.focus();
        barre.style.animationPlayState = "running";
        imgGardien.classList.remove("game-over")
        imgGardien.classList.remove("check")
        sommeil_gardien()
    }, 4000);

}
function sommeil_gardien() {
    input.style.display = "block";
    btn.style.display = "block";
    shotTimingBar.style.display = "block";


    imgGardien.src = "assets/gardi_1.png";
    consigne.textContent = "Ne reveillez surtout pas le gardien du code !";
    docBody.style.background = "linear-gradient(#6180D3, #2A2A5B)";
}


function check_timing(){
    left = parseFloat(getComputedStyle(barre).left);
    width = shotTimingBar.clientWidth;
    p = (left / width) * 100;

    if (p > 45 && p < 55){
        console.log(p);
    }
    else {
        reveil_gardien()
    }
}

function verif_code(){
    input.style.display = "none";
    btn.style.display = "none";
    shotTimingBar.style.display = "none";

    imgGardien.src = "assets/gardi_3.png";
    consigne.textContent = "VERIFICATION DU CODE";
    
    input.disabled = true;
    barre.style.animationPlayState = "paused";
    imgGardien.classList.add("check");
    check.play();

    input.value = input.value.toUpperCase()
    var correct = false;

    if (input.value == "5" || input.value == "ATSAP-OCCIROL" || input.value == "ATSAP OCCIROL" || input.value == "ATSAPOCCIROL"){
        correct = true;
    }
    else {
        correct = false;
    }

    setTimeout(() => {
        if (!correct){
            reveil_gardien()
        }
        else {
            imgGardien.src = "assets/gardi_4.png";
            consigne.innerHTML = 'BRAVO ! VO<span class="r">U</span>S AVEZ <span class="r">R</span>ÉU<span class="r">SS</span>I !!!';
            docBody.style.background = "linear-gradient(#68d361, #2a5b42)";
            imgGardien.classList.remove("check");

            imgFond.style.display = "block";
            win.play();
        }
    }, 12000);
}


input.addEventListener("input", check_timing);
btn.addEventListener("click", verif_code);
