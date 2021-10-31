const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById("date-picker");
const countdownEl =document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElement = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;

second = 1000;
minute = second*60;
hour = minute*60;
day = hour*24;

//set date input min with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

//Populate countdown and update UI
function updateDom () {
    const now = new Date().getTime();
    const distance = countdownValue-now;
    console.log(countdownValue);
    console.log(distance);
    
    const days = Math.floor(distance/day);
    const hours = Math.floor((distance%day)/hour);
    const minutes = Math.floor((distance%hour)/minute);
    const secondes = Math.floor((distance%minute)/second);
    console.log(days, hours, minutes, secondes);

    
}


// take values from input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    console.log(countdownTitle,countdownDate);
    //Get number version of current date, updatedown
    countdownValue = new Date(countdownDate).getTime();
    console.log('countdown vale', countdownValue);
    updateDom();

}

// Event listeners
countdownForm.addEventListener('submit',updateCountdown);