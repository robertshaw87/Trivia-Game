// declare some variables

// object to store the player's score
var playerScore = {
    correct: 0,
    incorrect: 0,
    skipped: 0
}

var curQuestion, questionsList, questionsIndex;


var questions, maxQuestions;
maxQuestions = 3;

var difficultySelect = [questionsBank, questionsBank2];

// returns a random integer between 0 and the argument(inclusive)
function randInt(maxInt){
    return (Math.floor(Math.random() * (maxInt+1)))
}

// randomizes the order of the elements within an array
function shuffleArr(arr) {
    for (var i = 0; i<arr.length; i++) {
        var j = randInt(i);
        var temp = arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }
    return arr;
}

// Timer object for the questions countdown
// time allotted is how much time i want to give the player per question

var timer = {
    timeAllotted: 3,
    timerCount: 0,
    timerPointer: false,
    start: function() {
        clearInterval(timer.timerPointer);
        timer.timerCount = timer.timeAllotted;
        timer.timerPointer = setInterval(timer.decrement, 1000);
        $("#message-area").html($("<h5>").html("Time Remaining: " + timer.timerCount));
    },
    stop: function() {
        clearInterval(timer.timerPointer);
    },
    decrement: function() {
        console.log(timer.timerCount);
        console.log(timer)
        timer.timerCount -= 1;
        if (timer.timerCount<0){
            $("#buttons-area").empty()
            $("#message-area").html("Time's up!")
            timer.stop();
            playerScore.skipped += 1;
            setTimeout(questionWrong, 1000);
        } else {
            $("#message-area").html($("<h5>").html("Time Remaining: " + timer.timerCount));
        }
    }
}


// generate a centered button div
    // takes in the string and the class you want on the button
    // will carry one data value that defaults to false if not provided
    // 4th argument will be the id you want for the button, also optional
function generateButton(str, btnClass, data=false, btnID=""){
    var tempButtonWrap = $("<div>").attr("class", "row mt-3 bg-secondary");
    var tempButton = $("<div>").attr("class","button btn-dark btn-lg col-10 p-3");
    tempButton.addClass(btnClass);
    tempButton.attr("id", btnID);
    tempButton.attr("data-correct", data);
    tempButton.text(str);
    tempButtonWrap.prepend($("<div>").addClass("col"));
    tempButtonWrap.append(tempButton);
    tempButtonWrap.append($("<div>").addClass("col"));
    return tempButtonWrap;

    // return '<div class="row mt-3 bg-secondary"><div class="col"></div><div class="button btn-dark btn-lg col-10 p-3 '
    //     + btnClass + '" data-correct='
    //     + correct + '>' 
    //     + str + '</div><div class="col"></div></div>';
}


// reset the game, showing the default home screen
// set all the variables
// add difficulty select buttons to the buttons area
function resetGame() {
    playerScore = {
        correct: 0,
        incorrect: 0,
        skipped: 0};
    questionsList = [];
    questionsIndex = 0;
    $("#title-area").html("<h1 class='text-center'>Trivia Game</h1>");   
    $("#message-area").html('<p>Welcome the to trivia game! Select your difficulty. </p>');
    for (var i=0; i<difficultySelect.length; i++){
        $("#buttons-area").append(generateButton(difficultySelect[i].name,"difficulty-button", i));
    }
    console.log("Game Reset");
}

// find the next question in the array and display it
function nextQuestion() {
    curQuestion = questionsList[questionsIndex];
    console.log(curQuestion);
    $("#buttons-area").empty();
    $("#message-area").empty();
    $("#title-area").html($("<h2>").html(curQuestion.q));
    shuffleArr(curQuestion.s);
    console.log(curQuestion.s);
    var solutionNum = randInt(3);
    for (var i=0; i<4; i++){
        if (i !== solutionNum){
            $("#buttons-area").append(generateButton(curQuestion.s[i],"answer-button", false));
        } else {
            $("#buttons-area").append(generateButton(curQuestion.a,"answer-button", true, "solution-button"));
        }
    }
    timer.start();
}

function questionWrong() {
    $("#message-area").empty();
    // var tempDiv = $("<h4>").attr("class", "text-center");
    // tempDiv.html();
    $("#message-area").html(($("<h4>").attr("class", "text-center")).html("The correct answer was " + curQuestion.a));
    $("#buttons-area").empty();
    $("#buttons-area").html(curQuestion.blurb);

}

function questionRight() {
    console.log("question right!");
}

// wait for the dom to finish loading before doing the work
$(document).ready(function() {

    resetGame();

    // listen for clicks on the difficulty select buttons
    $(document).on("click", ".difficulty-button", function () {
        // save the this pointer in order to easily reference
        var currButton = $(this);
        // select the questions associated with the difficulty selected
        questionsList = difficultySelect[parseInt(currButton.attr("data-correct"))].qList;
        // // randomize the questions
        shuffleArr(questionsList);
        console.log(questionsList);
        nextQuestion();
    });

});