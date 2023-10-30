document.querySelector('form').addEventListener('input', function() {
    let billTotal = parseFloat(document.getElementById('billTotal').value);
    let tip = parseInt(document.getElementById('tip').value);

    if (isNaN(billTotal) || billTotal <= 0) {
        alert("Please enter a valid positive number for Bill Total!");
        return;
    }

    document.getElementById('tipPercentage').value = tip + "%";
    let tipAmount = (billTotal * tip / 100).toFixed(2);
    document.getElementById('tipAmount').value = tipAmount;

    let totalBillWithTip = (billTotal + parseFloat(tipAmount)).toFixed(2);
    document.getElementById('totalBillWithTip').value = totalBillWithTip;

    if (tip <= 10) {
        document.getElementById('tipEmoji').innerHTML = '&#128542;'; // sad
    } else if (tip > 10 && tip <= 20) {
        document.getElementById('tipEmoji').innerHTML = '&#128528;'; // neutral
    } else {
        document.getElementById('tipEmoji').innerHTML = '&#128578;'; // smiling
    }
});

function resetCalculator() {
    document.getElementById('billTotal').value = '';
    document.getElementById('tip').value = '10'; 
    document.getElementById('tipPercentage').value = '10%'; 
    document.getElementById('tipAmount').value = '';
    document.getElementById('totalBillWithTip').value = '';
    document.getElementById('tipEmoji').innerHTML = '&#128528;'; 
}

function printDetails() {
    let printContent = document.querySelector('.container').outerHTML;
    let printWindow = window.open('', '_blank');

    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<link rel="stylesheet" href="styles.css" type="text/css" />');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();

    printWindow.onafterprint = function() {
        printWindow.close();
        window.focus();
    };

    resetCalculator();
}
