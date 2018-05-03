
// declare some variables
var playerScore, curQuestion, questionsList;

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

function generateButton(str, btnClass, value=3){
    return '<div class="row mt-3 bg-secondary"><div class="col"></div><div class="button btn-dark btn-lg col-10 p-3 '
        + btnClass + '" value='
        + value + '>' 
        + str + '</div><div class="col"></div></div>';
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
function resetGame() {
    playerScore = {
        correct: 0,
        incorrect: 0,
        skipped: 0};
    questionsList = [];
    titleArea("<h1 class='text-center'>Trivia Game</h1>");   
    messageArea('<p>Welcome the to trivia game! Select your difficulty. </p>');
    var buttons = "";
    for (i=0; i<difficultySelect.length; i++){
        buttons += generateButton(difficultySelect[i].name,"difficulty-button", i);
    }
    buttonsArea(buttons)
    console.log("Game Reset: " + playerScore);
}

$("#buttons-area").on("click", ".difficulty-button", function () {
    var currButton = $(this);
    console.log(currButton);
    console.log(currButton.attr("value"));
}); 

// convert a question object into something that will add its own
resetGame();