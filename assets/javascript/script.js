
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
     choices: ["option 1", "option 2", "option 3", "option 4"],
     answer: "correct answer"
}];

//define html references as variables
var highScoreEl = document.querySelector('#high-score')
var timerEl = document.querySelector('.timer')
var questionsEl = document.querySelector('.questions')
var startQuizBtn = document.querySelector('#start-btn')
var welcomeSlideEl = document.querySelector('.welcome-slide')
var initalsInputEl = document.querySelector('#initials-input')
var formEl = document.querySelector("#submit-score")
var questionContainerEl = document.querySelector('.question-container')
var questionNameEl = document.querySelector('#question-name')
var summaryEl = document.querySelector('#summary')
var playerScoreEl = document.querySelector('#player-score')
var submitFormEl = document.querySelector('#submit-form-btn')
var initialsTextEl = document.querySelector('#initialsText')
var leaderBoardEl = document.querySelector('#leaderBoard')
var listOfHighScoresEl = document.querySelector('#listOfHighScores')
var goBackBtnEl = document.querySelector('go-back-btn')
var clearHighScoreEl = document.querySelector('cleer-highscore-btn')
var viewHighScoreEl = document.querySelector('viewHighScore')



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
        //once user reaches last question, run the endQuiz function
        endQuiz()
    }
};

var endQuiz = function(){

    clearInterval(timer);
    //show final score 
    playerScoreEl.textContent = counter
    formEl.setAttribute("style", "display: block")
    summaryEl.setAttribute("style", "display: block")
    questionContainerEl.setAttribute("style", "display: none")
    welcomeSlideEl.setAttribute("style", "display: none")
    timerEl.setAttribute("style", "display: none")
    // localStorage.setItem("Highscore", counter)
}

var highScore = function(event){
    event.preventDefault();

    if(initialsTextEl.value === ""){
        alert("Please enter Your initials")
        return
    }
    leaderBoardEl.setAttribute("style", "display: block")
    formEl.setAttribute("style", "display: none")
    summaryEl.setAttribute("style", "display: none")
    questionContainerEl.setAttribute("style", "display: none")
    welcomeSlideEl.setAttribute("style", "display: none")
    timerEl.setAttribute("style", "display: none")

    highScoreEl = LocalStorage.setItem("Highscore", scoresArrayString)
    var scoresArray;

    if(highScoreEl === null) {
        scoresArray = [];
    } else{
        scoresArray = JSON.parse(highScoreEl)
    }

    var userScore = {
        Initials: initialsTextEl.value,
        score: counter.textContent
    }

    console.log(userScore)
    scoresArray.push(userScore);

    //stringify array to store in local array
    var scoresArrayString = JSON.stringify(scoresArray);
    localStorage.getItem("Highscore")

    leaderBoard();
}
// highScoreEl.textContent = localStorage.getItem("Highscore");

//leader board section
var i = 0
var leaderBoard= function(){

    leaderBoardEl.setAttribute("style", "display: block")
    formEl.setAttribute("style", "display: none")
    summaryEl.setAttribute("style", "display: none")
    questionContainerEl.setAttribute("style", "display: none")
    welcomeSlideEl.setAttribute("style", "display: none")
    timerEl.setAttribute("style", "display: none")

    var highScoreEl = localStorage.getItem("HighScore")
    

    if(highScoreEl === null){
        return;
    }
    console.log(highScoreEl);
    
    var storedHighScores = JSON.parse(highScoreEl);

    for(; i < storedHighScores.length; i++){
        var HighScoreList = document.createElement("li");
        HighScoreList.textContent = storedHighScores[i].Initials + ": " + storedHighScores[i].score;
        listOfHighScoresEl.appendChild(HighScoreList);

    }
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
startQuizBtn.addEventListener("click", startQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);
submitFormEl.addEventListener("submit", highScore);
viewHighScoreEl.addEventListener("click", leaderBoard)

// submitFormEl.addEventListener("submit", highScore);



// nextQuestion();