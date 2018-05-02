
// declare some variables
var playerScore, curQuestion, questionsList;

var difficultySelect = {
    0:questionsBank,
    1:questionsBank2
}

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

function generateButton(str, id, value=0){
    return '<button type="button" class="btn btn-dark btn-lg p-3 pr-5 pl-5" id='+id+' value='+value+'>'+str+'</button>';
}

function titleArea(str) {
    $("#title-area").html(str);
}

function messageArea(str) {
    $("#message-area").html(str);
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
    buttonsArea('');
    console.log(generateButton("wee","b"))
    console.log(playerScore);
}

// convert a question object into something that will add its own
resetGame();