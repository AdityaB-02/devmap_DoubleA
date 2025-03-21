function displayText() {
    const textInput = document.getElementById('textInput').value;
    const displayLabel = document.getElementById('displayLabel');
    displayLabel.textContent = textInput;
  }

  document.getElementById('textInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      displayText();
    }
  });
  