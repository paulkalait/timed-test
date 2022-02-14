
var questions = [
    {
    question: "What does CSS stand for?",
    choices: ["Computer Style Sheets", "Cascading Style Sheets","Colorful Style Sheets","Creative Style Sheets"],
    answer: "Cascading Style Sheets"
    },
    {
     question: "Which HTML tag is used to define an internal style sheet?",
     choices: ["<style>", "<css>", "<script>", "<yur>"],
     answer: "<style>"
    }, {
     question: "Which property is used to change the background color?",
     choices: ["background-color", "bgcolor", "color", "yur"],
     answer: "background-color"
    }, {
     question: "Which CSS property controls the text size?",
     choices: ["font-size", "font-style", "text-size", "text-style"],
     answer: "font-size"
}];

//define html references as variables
var ViewHighScoreEl = document.querySelector('#viewHighScore')
var highScoreEl = document.querySelector('#high-score')
var timerEl = document.querySelector('.timer')
var questionsEl = document.querySelector('.questions')
var startQuizBtn = document.querySelector('#start-btn')
var welcomeSlideEl = document.querySelector('.welcome-slide')
var formEl = document.querySelector("#submit-score")
var questionContainerEl = document.querySelector('.question-container')
var questionNameEl = document.querySelector('#question-name')
var summaryEl = document.querySelector('#summary')
var playerScoreEl = document.querySelector('#player-score')
var submitFormEl = document.querySelector('#submit-form-btn')
var leaderBoardEl = document.querySelector('#leaderBoard')
var TryAgainBtnEl = document.querySelector('#try-again-btn')
var listOfHighScore = document.querySelector('#listOfHighScores')
// var listOfHighScore = document.querySelector('#listOfHighScores')
var clearHighScoreEl = document.querySelector('#clear-highscore-btn')


console.log(submitFormEl);

//grab buttons from html and make them variables
var choiceA = document.querySelector("#btn1");
var choiceB = document.querySelector("#btn2");
var choiceC = document.querySelector("#btn3");
var choiceD = document.querySelector("#btn4");
var showAnswer = document.querySelector("#showanswer");


//variables for quiz tracker
var questionNumber = 0;
var questionIndex = 0;
var correctAnswer = 0;


//timer properties
var timer
var counter = 75;
//when i click start button, timer begins and welcome slide disapears
var startQuiz = function(){
    questionIndex = 0;
    counter = 75

    leaderBoardEl.setAttribute("style", "display: none")
    showAnswer.setAttribute("style", "display: block");
    formEl.setAttribute("style", "display: block");
    questionContainerEl.setAttribute("style", "display: block")
    welcomeSlideEl.setAttribute("style", "display: none;");
    formEl.setAttribute("style", "display: none;");

     timer = setInterval(function() {
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
    nextQuestion();
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
         showAnswer.textContent = "Incorrect! The Correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    //repeat with the rest of the questions
    if(questionIndex < questions.length){
        nextQuestion();
    } else{
        counter = 0
        //once user reaches last question, run the endQuiz function
        endQuiz()
    }
};

var endQuiz = function(){

    clearInterval(timer);
    //show final score 
    playerScoreEl.textContent = counter
    highScoreEl.setAttribute("style", "display: none")
    formEl.setAttribute("style", "display: block")
    summaryEl.setAttribute("style", "display: block")
    questionContainerEl.setAttribute("style", "display: none")
    welcomeSlideEl.setAttribute("style", "display: none")
    timerEl.setAttribute("style", "display: none")
    // localStorage.setItem("Highscore", counter)
}
var highScore = function(){
    var result = parseInt(localStorage.getItem("Highscore"))
   if(counter > result){
       localStorage.setItem("Highscore", counter)
   }

 highScoreEl.textContent = localStorage.getItem("Highscore");
}
    
    // [{
    //     initials: aa,
    //     result: 10
    // },
    // {
    //     initials: bb,
    //     result: 20

    // }
    // ]

var savedScored = []

//get the arrays to be for looped and then displayed 
var leaderBoard = function(event){
    event.preventDefault()

   var initalsInputEl = document.querySelector('#initials')
   console.log(initalsInputEl.value)
   
   var savedScored = JSON.parse(localStorage.getItem("Highscore"))

    if( savedScored === null){
        savedScored =[];
        
    }
    var playerdata = {
        initials: initalsInputEl.value,
        result: counter
    }
    savedScored.push(playerdata);

    //for loop to append strings onto inner html 
    var i = 0
    for(; i < savedScored.length; i ++){
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.setAttribute("style","padding: 3px; margin: 2%;" )
        eachNewHighScore.innerHTML = savedScored[i].initials + ": " + savedScored[i].result;
        listOfHighScore.appendChild(eachNewHighScore);
    }


    localStorage.setItem("Highscore", JSON.stringify(savedScored))
    leaderBoardEl.setAttribute("style", "display: block")
    ViewHighScoreEl.setAttribute("style", "display: none")
    formEl.setAttribute("style", "display: none")
    summaryEl.setAttribute("style", "display: none")
    questionContainerEl.setAttribute("style", "display: none")
    welcomeSlideEl.setAttribute("style", "display: none")
    timerEl.setAttribute("style", "display: none")

}
var clearScore = function(){
    localStorage.removeItem("Highscore")
    listOfHighScore.textContent = "High Scores Cleared!"
    
}

var showHighScores = function(){
    leaderBoardEl.setAttribute("style", "display: block")
    formEl.setAttribute("style", "display: none")
    summaryEl.setAttribute("style", "display: none")
    questionContainerEl.setAttribute("style", "display: none")
    welcomeSlideEl.setAttribute("style", "display: none")
    timerEl.setAttribute("style", "display: none")
}



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

//view high score through by being brought to leaderboard screen
ViewHighScoreEl.addEventListener("click", showHighScores)

startQuizBtn.addEventListener("click", startQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);
submitFormEl.addEventListener("click", leaderBoard);
//replacing starQuiz to tryAagain
TryAgainBtnEl.addEventListener("click", startQuiz)
clearHighScoreEl.addEventListener("click", clearScore)




// nextQuestion();