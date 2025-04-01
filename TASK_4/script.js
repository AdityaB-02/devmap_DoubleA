function calculate() {
    try {
        let expression = document.getElementById("expression").value;
        if (!/[\d+\-*/().]/.test(expression)) {
            throw new Error("Invalid characters detected.");
        }
        let result = eval(expression);
        document.getElementById("result").innerText = "Result: " + result;
    } catch (error) {
        document.getElementById("result").innerText = "Error: Invalid Expression";
    }
}
//Enter key event listener
document.getElementById('expression').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      calculate();
    }
  });