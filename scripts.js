function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }

    const inputVal = evt.target.value;
    if (charCode == 46 && inputVal.indexOf('.') !== -1) {
        return false;
    }
    return true;
}

let billTotal = document.getElementById("billTotal");

billTotal.addEventListener('keypress', function(event) {
    if (!isNumberKey(event)) {
        event.preventDefault();
    }

    validateBillInput();
});



let people = document.getElementById("people");
let serviceQuality = document.getElementById("serviceQuality");
let tipSlider = document.getElementById("tip");
let tipInput = document.getElementById("tipInput");
let tipAmount = document.getElementById("tipAmount");
let totalBillWithTip = document.getElementById("totalBillWithTip");
let roundUp = document.getElementById("roundUp");

function calculateTip() {
    let bill = parseFloat(billTotal.value) || 0;
    let numberOfPeople = parseInt(people.value);
    
    let tipPercent = parseInt(tipInput.value.replace('%', '')) / 100; 
    let serviceFactor = parseFloat(serviceQuality.value);
    
    let tipValue = bill * tipPercent * serviceFactor;
    let totalTipAmount = tipValue / numberOfPeople;
    let totalBillValue = bill + tipValue;
    
    if (roundUp.checked) {
        totalBillValue = Math.ceil(totalBillValue);
    }

    tipAmount.value = totalTipAmount.toFixed(2);
    totalBillWithTip.value = totalBillValue.toFixed(2);
    setTipEmoji(tipPercent);
}


function setTipEmoji(tipPercentage) {
    const tipEmoji = document.getElementById("tipEmoji");

    if (tipPercentage < 0.10) {
        tipEmoji.innerHTML = "🙁";
    } else if (tipPercentage < 0.15) {
        tipEmoji.innerHTML = "😐";
    } else if (tipPercentage < 0.20) {
        tipEmoji.innerHTML = "😊";
    } else {
        tipEmoji.innerHTML = "🤩";
    }
}

function updateTipValue() {
    let tipVal = tipSlider.value;
    tipInput.value = tipVal;
    calculateTip();
}

function updateSliderValue() {
    let inputVal = tipInput.value;
    if (inputVal > 100) inputVal = 100;
    if (inputVal < 0) inputVal = 0;
    
    tipSlider.value = inputVal;
    calculateTip();
}

function printDetails() {
    if (!billTotal.value || parseFloat(billTotal.value) === 0) {
        alert("Please enter the bill total amount.");
        return;  
    }
    
    let details = "Bill Total: $" + billTotal.value + "\n";
    details += "Number of People: " + people.value + "\n";
    details += "Service Quality: " + serviceQuality.options[serviceQuality.selectedIndex].text + "\n";
    details += "Tip Percentage: " + tipInput.value + "%\n";
    details += "Tip Amount: $" + tipAmount.value + "\n";
    details += "Total Bill with Tip: $" + totalBillWithTip.value + "\n";
    
    alert(details);
}
function updateSliderValueWithPercentage() {
    let inputVal = parseInt(tipInput.value.replace('%', ''));
    if (inputVal > 100) inputVal = 100;
    if (inputVal < 0) inputVal = 0;
    
    tipSlider.value = inputVal;
    tipInput.value = inputVal + "%"; 
    calculateTip();
}
function validateBillInput() {
    const billInput = document.getElementById("billTotal");
    const errorSpan = document.getElementById("errorBill");
    
    if (billInput.validity.valid) {
        errorSpan.style.display = "none";
    } else {
        errorSpan.style.display = "block";
    }
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

billTotal.addEventListener('keyup', validateBillInput);


people.addEventListener("input", calculateTip);
serviceQuality.addEventListener("change", calculateTip);
tipSlider.addEventListener("input", updateTipValue);
tipInput.addEventListener("input", updateSliderValue);
roundUp.addEventListener("change", calculateTip);
