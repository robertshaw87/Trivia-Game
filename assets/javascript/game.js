
// declare some variables
var playerScore, curQuestion, questionsList, questionsIndex;


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
    $("#title-area").html(curQuestion.q);
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