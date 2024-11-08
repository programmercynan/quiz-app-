// Define global variables
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Fetch the questions from the JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data; // Save the questions to the global variable
    showQuestion();
  })
  .catch(error => console.error('Error loading the questions:', error));

// Function to display the current question
function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showFinalScore();
    return;
  }

  const question = questions[currentQuestionIndex];
  const questionText = document.getElementById('question-text');
  const answerButtons = document.getElementById('answer-buttons');
  const timer = document.getElementById('time-remaining');

  // Set the question text and image
  questionText.innerHTML = question.question;
  document.getElementById('question-container').style.backgroundImage = `url(${question.image})`;

  // Clear previous answer buttons and create new ones
  answerButtons.innerHTML = '';
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.classList.add('answer-btn');
    button.onclick = () => checkAnswer(answer);
    answerButtons.appendChild(button);
  });

  // Reset the timer
  let timeRemaining = 30;
  timer.textContent = timeRemaining;
  const countdown = setInterval(() => {
    timeRemaining--;
    timer.textContent = timeRemaining;
    if (timeRemaining <= 0) {
      clearInterval(countdown);
      nextQuestion();
    }
  }, 1000);
}

// Function to check the user's answer
function checkAnswer(selectedAnswer) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  if (selectedAnswer === correctAnswer) {
    score++;
  }
  nextQuestion();
}

// Function to move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  showQuestion();
}

// Function to show the final score
function showFinalScore() {
  const quizContainer = document.getElementById('quiz-container');
  const scoreSummary = document.getElementById('score-summary');
  const finalScore = document.getElementById('final-score');
  
  quizContainer.style.display = 'none';
  scoreSummary.style.display = 'block';
  finalScore.textContent = score;
}

// Function to restart the quiz
document.getElementById('restart-btn').onclick = () => {
  score = 0;
  currentQuestionIndex = 0;
  document.getElementById('quiz-container').style.display = 'block';
  document.getElementById('score-summary').style.display = 'none';
  showQuestion();
};
