// declare some variables

// object to store the player's score
var playerScore = {
    correct: 0,
    wrong: 0,
    skipped: 0}

var questions = {
    questionsIndex : 0,
    maxQuestions: 6,
    questionsList : [],
    curQuestion: false}

var difficultySelect = [questionsBank, questionsBank2];

var animations =["body-flip-vert", "body-flip-horiz", "left-right", "right-left", "bottom-up", "top-down", "grow"];

// Timer object for the questions countdown
// time allotted is how much time i want to give the player per question
var timer = {
    timeAllotted: 7,
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
        timer.timerCount -= 1;
        if (timer.timerCount<0){
            $("#buttons-area").empty()
            $("#message-area").html($("<h5>").html("Time's up!"));
            timer.stop();
            playerScore.skipped += 1;
            // reduce the wrong count because we're increasing it on the function call
            playerScore.wrong -= 1;
            setTimeout(evaluateAnswer, 1000);
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

function randomAnimation() {
    return animations[randInt(animations.length - 1)];
}

function clearAnimation(targetDiv) {
    for (var i=0; i<animations.length; i++){
        targetDiv.removeClass(animations[i]);
    }
}

// generate a centered button div
    // takes in the string and the class you want on the button
    // will carry one data value that defaults to false if not provided
    // 4th argument will be the id you want for the button, also optional
function generateButton(str, btnClass, data=false, btnID=""){
    // make the wrapper we're returning that centers the button
    var tempButtonWrap = $("<div>").attr("class", "row mt-3");
    // this is the actual button
    var tempButton = $("<button>").attr("class","btn text-light btn-lg col-md-6 col-8 p-3");
    tempButton.addClass(btnClass);
    tempButton.attr("id", btnID);
    tempButton.attr("data-correct", data);
    tempButton.text(str);
    // adding a background color to the button
    tempButton.css("background-color", "rgba(" + randInt(90) + "," + randInt(90) + "," + randInt(90) + ",0.7");
    tempButton.addClass(randomAnimation());
    // add the padding on both sides of the button
    tempButtonWrap.append($("<div>").attr("class","col"));
    tempButtonWrap.append(tempButton);
    tempButtonWrap.append($("<div>").attr("class","col"));
    return tempButtonWrap;
}

// reset the game, showing the default home screen
// set all the variables
// add difficulty select buttons to the buttons area
function resetGame() {
    playerScore.correct = 0;
    playerScore.wrong = 0;
    playerScore.skipped = 0;
    questions.questionsIndex = 0;
    questions.questionsList = [];
    questions.curQuestion = false;
    $("#title-area").empty();
    $("#message-area").empty();
    $("#buttons-area").empty();
    clearAnimation($("#title-area"));
    clearAnimation($("#trivia-body"));
    $("#title-area").html("<h1 class='text-center'>Animal Facts!</h1>");   
    $("#message-area").html('<p>Welcome the to trivia game! Select your difficulty. </p>');
    for (var i=0; i<difficultySelect.length; i++){
        var tempButton = generateButton(difficultySelect[i].name,"difficulty-button", i);
        tempButton.addClass(randomAnimation());
        $("#buttons-area").append(tempButton);
        
    }
}

// find the next question in the array and display it
function nextQuestion() {
    clearAnimation($("#trivia-body"));
    if (questions.questionsIndex < questions.maxQuestions) {
        questions.curQuestion = questions.questionsList[questions.questionsIndex];
        $("#buttons-area").empty();
        $("#message-area").empty();
        $("#title-area").html($("<h2>").html(questions.curQuestion.q));
        shuffleArr(questions.curQuestion.s);
        var solutionNum = randInt(3);
        for (var i=0; i<4; i++){
            if (i !== solutionNum){
                $("#buttons-area").append(generateButton(questions.curQuestion.s[i],"answer-button", false));
            } else {
                $("#buttons-area").append(generateButton(questions.curQuestion.a,"answer-button", true, "solution-button"));
            }
        }
        questions.questionsIndex += 1;
        timer.start();
    } else {
        completeGame();
    }
}

// page display on answer, passed true on correct, defaults to incorrect answer
function evaluateAnswer(answer=false) {
    (answer ? playerScore.correct += 1 : playerScore.wrong += 1);
    $("#trivia-body").addClass(randomAnimation());
    $("#message-area").empty();
    $("#message-area").html(($("<div>").attr("class", "text-center")).html((answer ? "You were right! " : "Better luck next time! ") + "The correct answer was " + questions.curQuestion.a));
    $("#buttons-area").empty();
    var tempDiv = $("<div>")
    tempDiv.attr("class", "card text-white p-0 col-12")
    tempDiv.append($("<img>").attr("src", questions.curQuestion.img).attr("alt", questions.curQuestion.a).attr("width", "100%").attr("height", "auto"));
    tempDiv.append($("<div>").attr("class", "card-img-overlay").append($("<p>").text(questions.curQuestion.blurb)));
    $("#buttons-area").append(tempDiv);
    // tempDiv = $("<img>");
    // tempDiv.attr("src", questions.curQuestion.img);
    // tempDiv.attr("alt", questions.curQuestion.a)
    // tempDiv.attr("width", "100%");
    // tempDiv.attr("height", "auto");
    // tempDiv.attr("class", "col-12 col-sm-5 col-md-3 float-right")
    // $("#buttons-area").append(tempDiv);
    setTimeout(nextQuestion, 3000);
}

function completeGame() {
    $("#title-area").empty();
    $("#message-area").empty();
    $("#buttons-area").empty();
    $("#message-area").html($("<p>").html("Out of " + questions.maxQuestions + " questions, you answered:"));
    $("#message-area").append($("<p>").html(playerScore.correct + " questions correctly, " + playerScore.wrong + " incorrectly,"));
    $("#message-area").append($("<p>").html("and skipped " + playerScore.skipped + " questions."));
    $("#buttons-area").empty();
    $("#buttons-area").append(generateButton("Play Again","reset-button").addClass(randomAnimation()));
    if (playerScore.correct > (playerScore.wrong + playerScore.skipped)){
        ($("#title-area").html("<h1 class='text-center'>The love for all living creatures is the most noble attribute of man.</h1><h2 class='text-center'>-Charles Darwin</h2>")).addClass("grow");
    } else {
        $("#title-area").html("<h1 class='text-center'>Congratulations you've completed the quiz! See if you can get a better score next time!</h1>");
    }
}

// wait for the dom to finish loading before doing the work
$(document).ready(function() {

    resetGame();

    // reset the game when the reset button is clicked
    $(document).on("click", ".reset-button", resetGame);

    // listen for clicks on the difficulty select buttons
    $(document).on("click", ".difficulty-button", function () {
        // save the this pointer in order to easily reference
        var currButton = $(this);
        // select the questions associated with the difficulty selected
        questions.questionsList = difficultySelect[parseInt(currButton.attr("data-correct"))].qList;
        // // randomize the questions
        shuffleArr(questions.questionsList);
        nextQuestion();
    });


    $(document).on("click", ".answer-button", function () {
        var currButton = $(this);
        timer.stop();
        evaluateAnswer(currButton.data("correct"))
    });

});