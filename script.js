const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById("date-picker");
const countdownEl =document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElement = document.querySelectorAll('span');
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

second = 1000;
minute = second*60;
hour = minute*60;
day = hour*24;

//set date input min with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

//Populate countdown and update UI
function updateDom () {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue-now;
        const days = Math.floor(distance/day);
        const hours = Math.floor((distance%day)/hour);
        const minutes = Math.floor((distance%hour)/minute);
        const secondes = Math.floor((distance%minute)/second);
        
         //hide input 
         inputContainer.hidden = true;

         // if countdown has ended, show complete
         if(distance<0) {
             countdownEl.hidden = true;
             clearInterval(countdownActive);
             completeElInfo.textContent = `${countdownTitle} Finished in ${countdownDate}`;
             completeEl.hidden = false;
         }else {
             //Show the count down in progress
             countdownElTitle.textContent = `${countdownTitle}`;
             timeElement[0].textContent = `${days}`;
             timeElement[1].textContent = `${hours}`;
             timeElement[2].textContent = `${minutes}`;
             timeElement[3].textContent = `${secondes}`;
             completeEl.hidden = true;
             countdownEl.hidden = false;
         } 
    }, second);

}
// take values from input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title : countdownTitle,
        date: countdownDate,
    }
   
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));
   // Check for valid date
   if (countdownDate=== '') {
       alert('please select a date !!');
   }else {
        //Get number version of current date, updatedown
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
   }
}

//Reset all values
function reset() {
    //Hide countDown, and show inpute
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;

    //stop the count down
    clearInterval(countdownActive);

    //Reset values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
    // Get countdown from local storage if availaible
    if( localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDom();
    }
}

// Event listeners
countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click',reset);

// on load check localStorage 
restorePreviousCountdown();