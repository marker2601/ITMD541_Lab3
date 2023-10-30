let billTotal = document.getElementById("billTotal");
let people = document.getElementById("people");
let serviceQuality = document.getElementById("serviceQuality");
let tipSlider = document.getElementById("tip");
let tipInput = document.getElementById("tipInput");
let tipPercentage = document.getElementById("tipPercentage");
let tipAmount = document.getElementById("tipAmount");
let totalBillWithTip = document.getElementById("totalBillWithTip");
let roundUp = document.getElementById("roundUp");

function calculateTip() {
    let bill = parseFloat(billTotal.value);
    let numberOfPeople = parseInt(people.value);
    let tipPercent = parseInt(tipInput.value) / 100;
    let serviceFactor = parseFloat(serviceQuality.value);
    
    let tipValue = bill * tipPercent * serviceFactor;
    let totalTipAmount = tipValue / numberOfPeople;
    
    
    let totalBillValue = bill + tipValue;
    
    if (roundUp.checked) {
        totalBillValue = Math.ceil(totalBillValue);
    }

    tipAmount.value = totalTipAmount.toFixed(2);
    totalBillWithTip.value = totalBillValue.toFixed(2);
    setTipEmoji(parseInt(tipInput.value));
}

function setTipEmoji(tipPercentage) {
    const tipEmoji = document.getElementById("tipEmoji");

    if (tipPercentage < 10) {
        tipEmoji.innerHTML = "🙁";
    } else if (tipPercentage >= 10 && tipPercentage < 15) {
        tipEmoji.innerHTML = "😐";
    } else if (tipPercentage >= 15 && tipPercentage < 20) {
        tipEmoji.innerHTML = "😊";
    } else {
        tipEmoji.innerHTML = "🤩";
    }
}


function adjustTipBasedOnService() {
    let baseTip = parseFloat(tipSlider.value) / 100;
    let serviceFactor = parseFloat(serviceQuality.value);
    let adjustedTip = baseTip * serviceFactor;
    
    tipInput.value = (adjustedTip * 100).toFixed(0);
    calculateTip();
}

function updateTipValue() {
    let tipVal = tipSlider.value;
    tipInput.value = tipVal;
    calculateTip();
    setTipEmoji(parseInt(tipInput.value));
}

function updateSliderValue() {
    let inputVal = tipInput.value;
    if (inputVal > 100) inputVal = 100;
    if (inputVal < 0) inputVal = 0;
    
    tipSlider.value = inputVal;
    calculateTip();
    setTipEmoji(parseInt(tipInput.value));
}

function printDetails() {
    let details = "Bill Total: $" + billTotal.value + "\n";
    details += "Number of People: " + people.value + "\n";
    details += "Service Quality: " + serviceQuality.options[serviceQuality.selectedIndex].text + "\n";
    details += "Tip Percentage: " + tipInput.value + "%\n";
    details += "Tip Amount: $" + tipAmount.value + "\n";
    details += "Total Bill with Tip: $" + totalBillWithTip.value + "\n";
    
    alert(details);
}

document.querySelector("input[type='reset']").addEventListener("click", function() {
    billTotal.value = "";
    people.value = 1;
    serviceQuality.value = 1;
    tipSlider.value = 15;
    tipInput.value = 15;
    tipAmount.value = "";
    totalBillWithTip.value = "";
    roundUp.checked = false;
});
