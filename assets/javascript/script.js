
var questions = [
    {
    question: "1. question 1",
    choices: ["option 1", "option 2","option 3","option 4"],
    answer: "correct answer"
    },
    {
     question: "2. question 2",
     choices: ["option 1", "option 2", "option 3", "option 4"],
     answer: "correct answer"
    }, {
     question: "3. question 3",
     choices: ["correct answer", "option 2", "option 3", "option 4"],
     answer: "correct answer"
    }, {
     question: "4. question four",
     choices: ["correct answer", "option 2", "option 3", "option 4"],
     answer: "correct answer"
}];

//define html references as variables
var timerEl = document.querySelector('.timer')
var questionsEl = document.querySelector('.questions')
var startQuizBtn = document.querySelector('#start-btn')
var welcomeSlideEl = document.querySelector('.welcome-slide')
var initalsInputEl = document.querySelector('#initials-input')
var formEl = document.querySelector("#submit-score")
var questionContainerEl = document.querySelector('.question-container')
var questionNameEl = document.querySelector('#question-name')

//grab buttons from html and make them variables
var choiceA = document.querySelector("#btn1");
var choiceB = document.querySelector("#btn1");
var choiceC = document.querySelector("#btn1");
var choiceD = document.querySelector("#btn1");
var showAnswer = document.querySelector("#showanswer");

//variables for quiz tracker
var questionNumber = 0;
var questionIndex = 0;
var correctAnswer = 0;
var scoreResult;

//timer properties
var counter = 75;
//when i click start button, timer begins and welcome slide disapears
var startQuiz = function(){
    questionIndex = 0;
    welcomeSlideEl.setAttribute("style", "display: none;");
    formEl.setAttribute("style", "display: none;");

    var timer = setInterval(function() {
        counter--;
        timerEl.innerHTML = "Time:" + counter;
        if(counter === 0){
            clearTimeout(timer);
            //call high score function here
        }else{
            timerEl.innerHTML = "Time:" + counter;
            counter--;
        }
    },1000);
}
console.log(questions[questionIndex].question);
// console.log(questions[questionIndex].choices);
//when i click on the start quiz button, it will display my question on the buttons
//function that will hold generated questions
var generateQuestion = function(){
    nextQuestion()
}

var nextQuestion = function(){
    questionNameEl.textContent = questions[questionIndex].question;
    questionNameEl.setAttribute("style", "color: black;")
    choiceA.textContent = questions[questionIndex].choices[0]
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

//show if question is wrong or incorrect
function checkAnswer(checkTheAnswer) {
    if(questions[questionIndex].answer === questions[questionIndex].choices[checkTheAnswer]){
        //correct answer
        showAnswer.textContent = "Correct";
    }else {
        //wrong answer, deduct 15 seconds from timer
         counter = counter - 15;
         timerEl.textContent = counter;
         showAnswer = "Incorrect! The Correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    //repeat with the rest of the questions
    if(questionIndex < questions.length){
        nextQuestion();
    } 
    checkAnswer();
};

var chooseA = function () {
    checkAnswer(0);
}
var chooseB = function () {
    checkAnswer(1);
}
var chooseC = function () {
    checkAnswer(2);
}
var chooseD = function () {
    checkAnswer(3);
}

//once the game is down 
startQuizBtn.addEventListener("click", startQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

nextQuestion();