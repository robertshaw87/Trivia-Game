// declare some variables

// object to store the player's score
var playerScore = {
    correct: 0,
    wrong: 0,
    skipped: 0}

var questions = {
    questionsIndex : 0,
    maxQuestions: 3,
    questionsList : [],
    curQuestion: false}

var difficultySelect = [questionsBank, questionsBank2];

// Timer object for the questions countdown
// time allotted is how much time i want to give the player per question
var timer = {
    timeAllotted: 2,
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
    // this is the timer setup
    decrement: function() {
        console.log(timer.timerCount);
        console.log(timer)
        timer.timerCount -= 1;
        if (timer.timerCount<0){
            $("#buttons-area").empty()
            $("#message-area").html("Time's up!")
            timer.stop();
            playerScore.skipped += 1;
            // reduce the wrong count because we're increasing it on the function call
            playerScore.wrong -= 1;
            setTimeout(questionWrong, 1000);
        } else {
            $("#message-area").html($("<h5>").html("Time Remaining: " + timer.timerCount));
        }
    }
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

// generate a centered button div
    // takes in the string and the class you want on the button
    // will carry one data value that defaults to false if not provided
    // 4th argument will be the id you want for the button, also optional
function generateButton(str, btnClass, data=false, btnID=""){
    // make the wrapper we're returning that centers the button
    var tempButtonWrap = $("<div>").attr("class", "row mt-3 bg-secondary");
    // this is the actual button
    var tempButton = $("<div>").attr("class","button btn-dark btn-lg col-10 p-3");
    tempButton.addClass(btnClass);
    tempButton.attr("id", btnID);
    tempButton.attr("data-correct", data);
    tempButton.text(str);
    // add the padding on both sides of the button
    tempButtonWrap.prepend($("<div>").addClass("col"));
    tempButtonWrap.append(tempButton);
    tempButtonWrap.append($("<div>").addClass("col"));
    return tempButtonWrap;
}

// reset the game, showing the default home screen
// set all the variables
// add difficulty select buttons to the buttons area
function resetGame() {
    playerScore = {
        correct: 0,
        wrong: 0,
        skipped: 0};
    questions = {
        questionsIndex : 0,
        maxQuestions: 3,
        questionsList : [],
        curQuestion: false
    }
    $("#title-area").html("<h1 class='text-center'>Trivia Game</h1>");   
    $("#message-area").html('<p>Welcome the to trivia game! Select your difficulty. </p>');
    for (var i=0; i<difficultySelect.length; i++){
        $("#buttons-area").append(generateButton(difficultySelect[i].name,"difficulty-button", i));
    }
    console.log("Game Reset");
}

// find the next question in the array and display it
function nextQuestion() {
    if (questions.questionsIndex < questions.maxQuestions) {
        questions.curQuestion = questions.questionsList[questions.questionsIndex];
        $("#buttons-area").empty();
        $("#message-area").empty();
        $("#title-area").html($("<h2>").html(questions.curQuestion.q));
        shuffleArr(questions.curQuestion.s);
        console.log(questions.curQuestion.s);
        var solutionNum = randInt(3);
        for (var i=0; i<4; i++){
            if (i !== solutionNum){
                $("#buttons-area").append(generateButton(questions.curQuestion.s[i],"answer-button", false));
            } else {
                $("#buttons-area").append(generateButton(questions.curQuestion.a,"answer-button", true, "solution-button"));
            }
        }
        questions.questionIndex--;
        timer.start();
    } else {
        completeGame();
    }
}

// page display on incorrect answer
function questionWrong() {
    playerScore.wrong -= 1;
    $("#message-area").empty();
    $("#message-area").html(($("<h4>").attr("class", "text-center")).html("The correct answer was " + questions.curQuestion.a));
    $("#buttons-area").empty();
    $("#buttons-area").html(questions.curQuestion.blurb);
    setTimeout(nextQuestion, 3000);
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
        questions.questionsList = difficultySelect[parseInt(currButton.attr("data-correct"))].qList;
        // // randomize the questions
        shuffleArr(questions.questionsList);
        console.log(questions.questionsList);
        nextQuestion();
    });

});