//Variables //
var header = document.querySelector(".header");
var submitButton = document.getElementById("submitButton");

var quizQuestionHeader = document.getElementById("quizQuestionHeader");
var choice1 = document.getElementById("one");
var choice2 = document.getElementById("two");
var choice3 = document.getElementById("three");
var choice4 = document.getElementById("four");
var correct = document.getElementById("correct");
var answerResponse = document.getElementById("answerResponse");

var finalScoreIs = document.getElementById("finalScoreIs");
var quizQuestionsPage = document.getElementById("quizQuestionsPage");
var questionButton = document.querySelector(".questionButton");

var quizChallengePage = document.getElementById("quizChallengePage");
var finalScorePage = document.getElementById("finalScorePage");
var highScoreButtons = document.getElementById("highScoreButtons");

var initialButton = document.getElementById("initialButton"); 
var initials = document.getElementById("initials"); 
var initialInput = document.getElementById("initialInput"); 

var complete = document.getElementById("complete");
var completeButtons = document.getElementById("form-inline");

var timer = document.getElementById("timer"); 

// Quiz Questions //
var quizQuestions = [
  {
  "quizQuestionHeader" : "Inside which HTML element do we put the JavaScript?:", 
  "one" : "1. < js >",
  "two" : "2. < javascript >",
  "three" : "3. < scripting >",
  "four" : "4. < script >",
  "correct" : "4. < script >",
  },{
  "quizQuestionHeader" : "Where is the correct place to insert a JavaScript?:",
  "one" : "1. The body section",
  "two" : "2. The head section",
  "three" : "3. The footer section",
  "four" : "4. Both 1 and 2 are correct",
  "correct" : "4. Both 1 and 2 are correct",
  },{
   "quizQuestionHeader" : "String values must be enclosed within ________ when being assigned to variables",
   "one" : "1. commas",
   "two" : "2. curly brackets",
   "three" : "3. quotes",
   "four" : "4. parenthesis",
   "correct" : "3. quotes",
  },{
   "quizQuestionHeader" : "A very useful tool used for developing and debugging for printing content to the debugger is:",
   "one" : "1. JavaScript",
   "two" : "2. terminal / bash",
   "three" : "3. for loops",
   "four" : "4. console.log",
   "correct" : "4. console.log",
  },{
  "quizQuestionHeader" : "Arrays in JavaScript can be used to store ________.",
  "one" : "1. numbers and strings",
  "two" : "2. other arrays",
  "three" : "3. booleans",
  "four" : "4. all of the above",
  "correct" : "4. all of the above",
  },
]

var startScore = 0; 
var questionIndex = 0;

// First Page //
function codeQuizChallenge() {
  quizChallengePage.style.display = "block"; // Shows Rules 
  header.style.display = "block"; // Shows Header
  quizQuestionsPage.style.display = "none"; // Hide Quiz Questions Page
  finalScorePage.style.display = "none";   // Hide Final Sore Page 

  var startScore = 0; // Starting time 
  timer.textContent = "Time: " + startScore; // Holder text in nav bar 
}

// RESETTING VARIABLES WHEN RESTART QUIZ  - NOT WORKING //
function resetVariables() {
  startScore = 0; 
  questionIndex = 0;
}

// Starts Quiz //
function startQuiz() { 
quizChallengePage.style.display = "none"; // Hide Rules 
quizQuestionsPage.style.display = "block"; // Show Quiz Questions Page

// TIMER - NOT STOPPING WHEN QUIZ IS FINISHED //
secondsLeft = 80; // seconds in Timer 

  var timerInterval = setInterval(function() { 
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;
    if (secondsLeft === 0 || quizQuestions.length === questionIndex) {
      clearInterval(timerInterval);
      showFinalScore();
    }
  }, 1000);
}

// Show Questions //
function showQuestions() {
  var q = quizQuestions[questionIndex];

  quizQuestionHeader.innerHTML = q.quizQuestionHeader;
  choice1.innerHTML = q.one;
  choice1.setAttribute("data-answer", q.one);
  choice2.innerHTML = q.two;
  choice2.setAttribute("data-answer", q.two);
  choice3.innerHTML = q.three;
  choice3.setAttribute("data-answer", q.three);
  choice4.innerHTML = q.four;
  choice4.setAttribute("data-answer", q.four);
}

// Event listeners for when user clicks answer //
showQuestions();
choice1.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice2.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice3.addEventListener("click", function (event) {
  checkAnswer(event);
})
choice4.addEventListener("click", function (event) {
  checkAnswer(event);
})

 // To see if answer is correct or incorrect //
function checkAnswer(event) {
  event.preventDefault();

  var answer = event.currentTarget.dataset.answer;
  var correctAnswer = null;

  if (quizQuestions[questionIndex].correct === answer) {
      correctAnswer = answer;
  }
  if (answer === correctAnswer) {
  answerResponse.textContent = "Correct!"; // If correct, say correct!
  } else {
  answerResponse.textContent = "Incorrect!"; // If incorrect, say incorrect! & deduct 10 seconds
      secondsLeft -= 10
      if (secondsLeft < 0) {
          secondsLeft = 0;
      }
  }
  if (quizQuestions.length === questionIndex+1) {
    showFinalScore(); // If it has gone through all questions, show final score
    return; // If not, print the next question
  }
  questionIndex++;
  showQuestions();
}

// Complete Page and show final score //
function showFinalScore() { //Function to go to page when time out or quiz complete 
  quizQuestionsPage.style.display = "none"; // Hide Questions Page
  highScoreButtons.style.display = "none"; // Hide Questions Page
  finalScorePage.style.display = "block"; // Show Final Score Page 
  finalScoreIs.style.display = "block" // Show Final Score
  initials.style.display = "block" // Show initial input
  initialButton.style.display = "block" // Show initial button
  initialInput.style.display = "block" // Show initial input

    finalScoreIs.textContent = "Your final score is " + secondsLeft;
    initialButton.textContent = "Submit"; // Form button 
    initials.textContent = "Enter Your Initials: "; // Form text
} // end of showFinalScore

var highScoreArray = [] 

// Highscores //
function showHighScores() {
  header.style.display = "block"; // Hide header 
  complete.style.display = "none"; // Hide all done
  finalScoreIs.style.display = "none" // Hide Final Score
  initials.style.display = "none" // Hide initial input
  initialButton.style.display = "none" // Hide initial button
  initialInput.style.display = "none" // Hide initial button
  highScoreButtons.style.display = "block"; // Show Final Score Page 
  
  var getInitials = document.getElementById("initialInput").value; // captures the value of the initials 

  var highScoreArray = JSON.parse(localStorage.getItem("highScore")) || [];
  
  var localStorageArray = { score: secondsLeft, initials: getInitials };
  highScoreArray.push(localStorageArray)
  localStorage.setItem("highScore", JSON.stringify(highScoreArray)); // Adds array 

  var highScores = getInitials + ": " + secondsLeft; // add in + getInitials when read it

  $("#highScoreList").append(highScores) // Appends high score & initials
}

// Start Quiz //
submitButton.addEventListener("click", function() { 
  startQuiz()
  console.log("start")
})

// Click initial button to show high score //
initialButton.addEventListener("click", function() { 
  showHighScores();
  console.log("initial button")
}) 

// Clear High Scores //
clearHighScore.addEventListener("click", function() {
  localStorage.clear();
  $("#highScoreList").empty()
  console.log
  })

// Main Page //
mainPage.addEventListener("click", function() { // Main Page to the home page
  $("#highScoreList").empty() // clears out container
  $("#initialInput").val("") // clears out the value in initial input 
  resetVariables()
  codeQuizChallenge();
  console.log("restart quiz")
})

// Page starts at home page //
codeQuizChallenge(); 