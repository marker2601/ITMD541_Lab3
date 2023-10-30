document.querySelector('form').addEventListener('input', function() {
    let billTotal = parseFloat(document.getElementById('billTotal').value);
    let tip = parseInt(document.getElementById('tip').value);

    if(isNaN(billTotal) || billTotal <= 0) {
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

function printDetails() {
    let oldContent = document.body.innerHTML;
    let printContent = document.querySelector('.container').outerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = oldContent;
}
