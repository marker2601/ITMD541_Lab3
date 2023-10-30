document.querySelector('form').addEventListener('input', calculateTip);

function calculateTip() {
    let billTotal = parseFloat(document.getElementById('billTotal').value);
    let tip = parseInt(document.getElementById('tip').value);
    let people = parseInt(document.getElementById('people').value);

    if(isNaN(billTotal) || billTotal <= 0) {
        alert("Please enter a valid positive number for Bill Total!");
        return;
    }

    let tipAmount = (billTotal * tip / 100).toFixed(2);
    let totalBillWithTip = (billTotal + parseFloat(tipAmount)).toFixed(2);

    if(document.getElementById('roundUp').checked) {
        totalBillWithTip = Math.ceil(totalBillWithTip);
        tipAmount = (totalBillWithTip - billTotal).toFixed(2);
    }

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
    newTip = Math.min(newTip, 100);  // Ensure tip doesn't exceed 100%
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
