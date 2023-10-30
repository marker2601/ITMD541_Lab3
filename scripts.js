document.querySelector('form').addEventListener('input', calculateTip);

function calculateTip() {
    var billAmt = document.getElementById("billamt").value;
    var tipAmt = document.getElementById("tipamt").value;
    var numOfPeople = document.getElementById("peopleamt").value;

    if (billAmt === "" || numOfPeople == 0) {
        alert("Please enter values");
        return;
    }
    

    var tipPercent = (tipAmt / billAmt) * 100;
    document.getElementById("serviceQual").value = tipPercent;

    var total = (billAmt * tipPercent) / 100 / numOfPeople;
    total = Math.round(total * 100) / 100;
    total = total.toFixed(2);

    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = total;
}


document.getElementById("totalTip").style.display = "none";


    document.getElementById('tipPercentage').value = tip + "%";
    document.getElementById('tipAmount').value = tipAmount;
    document.getElementById('totalBillWithTip').value = totalBillWithTip / people;

    updateEmoji(tip);
}

function updateTipValue() {
    let tipValue = document.getElementById('tip').value;
    document.getElementById('tipInput').value = tipValue;
    calculateTip();
}

function updateSliderValue() {
    let tipInputValue = document.getElementById('tipInput').value;
    document.getElementById('tip').value = tipInputValue;
    calculateTip();
}

function adjustTipBasedOnService() {
    let serviceMultiplier = parseFloat(document.getElementById('serviceQuality').value);
    let newTip = parseInt(document.getElementById('tip').value) * serviceMultiplier;
    newTip = Math.min(newTip, 100);  
    document.getElementById('tip').value = newTip;
    document.getElementById('tipInput').value = newTip;
    calculateTip();
}

function updateEmoji(tip) {
    if (tip <= 10) {
        document.getElementById('tipEmoji').innerHTML = '&#128542;';
    } else if (tip > 10 && tip <= 20) {
        document.getElementById('tipEmoji').innerHTML = '&#128528;';
    } else {
        document.getElementById('tipEmoji').innerHTML = '&#128578;';
    }
}

function printDetails() {
    let printContent = document.querySelector('.container').outerHTML;
    let printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}
