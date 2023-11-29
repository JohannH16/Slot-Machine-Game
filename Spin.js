const btn = document.getElementById("btn");
const addCashBtn = document.getElementById("add-cash");
const removeCashBtn = document.getElementById("remove-cash");
const cashElement = document.getElementById("cash");
const playCashElement = document.getElementById("play-cash");

let currentCash = 10;  // Starting cash
let playCash = 1;  // Starting bet amount

cashElement.textContent = currentCash;
playCashElement.textContent = playCash;

btn.addEventListener("click", spinAndDeductCash);
removeCashBtn.addEventListener("click", () => modifyPlayCash(1));
addCashBtn.addEventListener("click", () => modifyPlayCash(-1));

function modifyPlayCash(amount) {
    playCash += amount;
    if (playCash < 1) playCash = 1;
    if (playCash > currentCash) playCash = currentCash;
    playCashElement.textContent = playCash;
}

function spinAndDeductCash() {
    if (currentCash >= playCash) {
        currentCash -= playCash;
        cashElement.textContent = currentCash;
        getRandomImage();
    } else {
        alert("Not enough cash to spin!");
    }
}

function getRandomImage() {
    var randomImage = [
        'bar.png', 'bell.png', 'diamond.png', 'heart.png',
        'horse.png', 'lemon.png', 'seven.png', 'watermellon.png'
    ];

    var number = Math.floor(Math.random() * randomImage.length);
    var number2 = Math.floor(Math.random() * randomImage.length);
    var number3 = Math.floor(Math.random() * randomImage.length);

    document.getElementById("slot-1").innerHTML = '<img src="' + randomImage[number] + '" />';
    document.getElementById("slot-2").innerHTML = '<img src="' + randomImage[number2] + '" />';
    document.getElementById("slot-3").innerHTML = '<img src="' + randomImage[number3] + '" />';

    updatePoints(number, number2, number3);
}

function updatePoints(img1, img2, img3) {
    let pointsEarned = 0;
    if (img1 === img2 && img2 === img3) {
        pointsEarned = playCash * 5; // Earn 5x the bet amount for 3 matches
    } else if (img1 === img2 || img2 === img3 || img1 === img3) {
        pointsEarned = playCash * 2; // Earn 2x the bet amount for 2 matches
    }

    if (pointsEarned > 0) {
        currentCash += pointsEarned;
        cashElement.textContent = currentCash;
    }
}
