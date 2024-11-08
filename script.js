// define global variables 
let currentQuestionIndex = 0;
let score = 0;
let question =  [];

// fetch the questions from the json file 
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    question = data;// save the questions to the global variables
    showQuestion();
  })
  .catch(error => console.error('Error loading the questions:', error));

  // function to dispaly the current question
  function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showFinalScore();
        return;
    }
    const 
  }