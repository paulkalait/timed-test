
var questions = [{
    
    question: "1. question 1",
    choices: ["option 1", "option 2","option 3","option 4"],
    answer: 2
    },
    {
     question: "2. question 2",
     choices: ["option 1", "option 2", "option 3", "option 4"],
     answer: 2
    }, {
     question: "3. question 3",
     choices: ["correct answer", "option 2", "option 3", "option4"],
     answer: 1
    }, {
     question: "4. question four",
     choices: ["correct answer", "option 2", "option 3", "option 4"],
     answer: 0
}],


//define html referneces as variables
var timerEl = document.querySelector('.timer')
var questionsEl = document.querySelector('.questions')
var startQuizBtn = document.querySelector('#start-btn')
var welcomeSlideEl = document.querySelector('.welcome-slide')
var initalsInputEl = document.querySelector('#initials-input')
var formEl = document.querySelector("#submit-score")
var questionContainerEl = document.querySelector('.question-container')
var questionTitleEl = document.querySelector('#question-name')

//grab buttons from html and make them variables
var choiceA = document.querySelector("#btn1");
var choiceB = document.querySelector("#btn1");
var choiceC = document.querySelector("#btn1");
var choiceD = document.querySelector("#btn1");
var showAnswer = document.querySelector("#showanswer");

//variables for quiz tracker
var questionNumber = 0;
var questionIndex = 0;
var correctAnswer = 0
var scoreResult;


//when i click start button, timer starts and welcome slide dissapears
var startQuiz = function(){
    questionIndex = 0;
    initalsInputEl.textContent = null;
    welcomeSlideEl.setAttribute("style", "display: none;");
    formEl.setAttribute("style", "display: none;");


    countdown();
} 

//when i click on the start quiz button, it will display my question on the buttons
//function that will hold generated questions
var generateQuestion = function(){
    nextQuestion()
}

var nextQuestion = function(){
    questionTitleEl.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0]
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

//show if question is wrong or incorrect
function checkAnswer(answer) {
    if(questions[questionIndex].answer === questions[questionsIndex].choices[answer]){
        //correct answer
        showAnswer.textContent = "Correct";
    }else {
        //wrong answer, deduct 15 seconds from timer
         counter -= 15;
    }

}

//timer properties
var counter = 75;
var timer = setInterval(countdown, 1000);
//timer function
function countdown(){
    if(counter === 0){
        clearTimeout(timer);
    }else{
        timerEl.innerHTML = "Time:" + counter;
        counter--;
    }
}



startQuizBtn.addEventListener("click", startQuiz);