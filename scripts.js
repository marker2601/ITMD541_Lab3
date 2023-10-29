document.querySelector('form').addEventListener('input', function() {
    let billTotal = parseFloat(document.getElementById('billTotal').value);
    let tip = parseInt(document.getElementById('tip').value);

    if(isNaN(billTotal)) {
        alert("Please enter a valid number for Bill Total!");
        return;
    }

    document.getElementById('tipPercentage').value = tip + "%";
    let tipAmount = (billTotal * tip / 100).toFixed(2);
    document.getElementById('tipAmount').value = tipAmount;

    let totalBillWithTip = (billTotal + parseFloat(tipAmount)).toFixed(2);
    document.getElementById('totalBillWithTip').value = totalBillWithTip;

    if (tip <= 10) {
        document.getElementById('tipEmoji').innerText = '😞'; // sad
    } else if (tip > 10 && tip <= 20) {
        document.getElementById('tipEmoji').innerText = '😐'; // neutral
    } else {
        document.getElementById('tipEmoji').innerText = '😄'; // smiling
    }
});
