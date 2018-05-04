
// declare some variables
var playerScore, curQuestion, questionsList, questionsIndex;


var questions, maxQuestions;


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

function generateButton(str, btnClass, data=false){
    var tempButtonWrap = $("<div>").attr("class", "row mt-3 bg-secondary");
    var tempButton = $("<div>").attr("class","button btn-dark btn-lg col-10 p-3");
    tempButton.addClass(btnClass);
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

function titleArea(str) {
    $("#title-area").html(str);
}

function messageArea(str) {
    $("#message-area").html(str);
}

function buttonsArea(str) {
    $("#buttons-area").html(str);
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
    titleArea("<h1 class='text-center'>Trivia Game</h1>");   
    messageArea('<p>Welcome the to trivia game! Select your difficulty. </p>');
    for (i=0; i<difficultySelect.length; i++){
        $("#buttons-area").append(generateButton(difficultySelect[i].name,"difficulty-button", i));
    }
    console.log("Game Reset");
}

// find the next question in the array and display it
function nextQuestion() {
    var curQuestion = questionsList[questionsIndex];
    console.log(curQuestion);
    titleArea(curQuestion.q);
    var tempArray
    // for 
    // buttonsArea()
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
        console.log(questionsList)
        nextQuestion();
    });

});