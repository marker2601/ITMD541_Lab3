document.querySelector('form').addEventListener('input', calculateTip);

//  to calculate the tip based on the bill amount, tip percentage, and number of people
function calculateTip() {
    var billAmt = parseFloat(document.getElementById("billamt").value);
    var tipAmt = parseFloat(document.getElementById("tipamt").value);
    var numOfPeople = parseInt(document.getElementById("peopleamt").value);

    if (billAmt === "" || numOfPeople == 0) {
        alert("Please enter values");
        return;
    }

    var tipPercent = (tipAmt / billAmt) * 100;
    document.getElementById("serviceQual").value = tipPercent.toFixed(2) + "%";

    var total = (billAmt * tipPercent) / 100 / numOfPeople;
    total = Math.round(total * 100) / 100;
    total = total.toFixed(2);

    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = total;

    updateEmoji(tipPercent);
}

// to update the value of the tip percentage input when the slider changes
function updateTipValue() {
    let tipValue = document.getElementById('tip').value;
    document.getElementById('tipInput').value = tipValue;
    calculateTip();
}

//  to update the value of the slider when the tip percentage input changes
function updateSliderValue() {
    let tipInputValue = parseFloat(document.getElementById('tipInput').value);
    document.getElementById('tip').value = tipInputValue;
    calculateTip();
}

//  to adjust the tip percentage based on the selected service quality
function adjustTipBasedOnService() {
    let serviceMultiplier = parseFloat(document.getElementById('serviceQuality').value);
    let newTip = parseFloat(document.getElementById('tip').value) * serviceMultiplier;
    newTip = Math.min(newTip, 100);
    document.getElementById('tip').value = newTip;
    document.getElementById('tipInput').value = newTip;
    calculateTip();
}

//  to update the emoji based on the tip percentage
function updateEmoji(tip) {
    let emojiElement = document.getElementById('tipEmoji');
    if (tip <= 10) {
        emojiElement.innerHTML = '&#128542;';
    } else if (tip > 10 && tip <= 20) {
        emojiElement.innerHTML = '&#128528;';
    } else {
        emojiElement.innerHTML = '&#128578;';
    }
}


//  to print the filled details
function printDetails() {
    let billAmt = document.getElementById("billamt").value;
    let tipAmt = document.getElementById("tipamt").value;
    let numOfPeople = document.getElementById("peopleamt").value;
    let totalTipElem = document.getElementById("totalTip");


    if (billAmt !== "" && numOfPeople !== 0 && totalTipElem.style.display !== "none") {
        let printContent = `
            <div class="print-container">
                <h2>Tip Details</h2>
                <p>Bill Amount: ${billAmt}</p>
                <p>Tip Amount: ${tipAmt}</p>
                <p>Number of People: ${numOfPeople}</p>
                <p>Total Tip per Person: ${totalTipElem.innerHTML}</p>
            </div>
        `;

        let printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    } else {
        alert("Please fill in the details before printing.");
    }
}



document.getElementById("totalTip").style.display = "none";
