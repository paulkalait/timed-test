var timerEl = document.querySelector('.timer')
var questionsEl = document.querySelector('.questions')
// var questionNumberEl = document.querySelector('#')
var questionNumbers = 0;


//timer 75 seconds
var timerCountdown = 75;

// timer countdwon use countdown method
var countdown = function(timerCountdown) {
    for(var i = timerCountdown; i > 0; i--){
        console.log(i);
    }
}

//function that will hold generated questions
var generateQuestion = function(){
    var questionContainerEl = document.createElement("div");
    questionContainerEl.className = "questions"


}
