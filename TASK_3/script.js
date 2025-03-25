document.getElementById('answerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const correctAnswer = '4'; 
  const userAnswer = document.getElementById('answer').value;

  if (userAnswer === correctAnswer) {
    window.location.href = 'success.html';
  } else {
    alert('Incorrect answer. Please try again.');
  }
});