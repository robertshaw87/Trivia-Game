
// declare some variables
var playerScore, curQuestion, questionsList;

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

function questionArea(str) {
    $("#question-area").html(str);
}

// reset the game, showing the default home screen
// set all the variables
function resetGame() {
    playerScore = {
        correct: 0,
        incorrect: 0,
        skipped: 0};
    questionsList = [];
    questionArea("<h1 class='text-center'>Trivia Game</h1>");
    console.log(playerScore)
}

// convert a question object into something that will add its own
resetGame();