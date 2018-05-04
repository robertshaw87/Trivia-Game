// declare some variables

// object to store the player's score
var playerScore = {
    correct: 0,
    wrong: 0,
    skipped: 0}

// store which question we're on, list of all questions, and pointer to the current question object
var questions = {
    questionsIndex : 0,
    maxQuestions: 6,
    questionsList : [],
    curQuestion: false}

// array of the list of questions
var difficultySelect = [questionsBank, questionsBank2];

// used to manipulate the pause and next question buttons on the answer screen
var timeOut, nextButton;

// list of custom css animations
var animations =["body-flip-vert", "body-flip-horiz", "left-right", "right-left", "bottom-up", "top-down", "grow"];

// Timer object for the questions countdown
// time allotted is how much time i want to give the player per question
var timer = {
    timeAllotted: 7,
    timerCount: 0,
    totalTime: 0,
    timerPointer: false,
    start: function() {
        clearInterval(timer.timerPointer);
        timer.timerCount = timer.timeAllotted;
        // set the timer to decrement ever 1 second
        timer.timerPointer = setInterval(timer.decrement, 1000);
        // display time remaining to the html
        $("#message-area").html($("<h5>").html("Time Remaining: " + timer.timerCount));
    },
    stop: function() {
        clearInterval(timer.timerPointer);
    },
    // this is the timer setup
    decrement: function() {
        // increase the total time spent on the quiz and reduce the time left for the current question
        timer.totalTime += 1;
        timer.timerCount -= 1;
        // check if time ran out
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

// return the string associated with a random animation
function randomAnimation() {
    return animations[randInt(animations.length - 1)];
}

// clear all my custom animations from the targetDiv
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
    // adding a random background color to the button
    tempButton.css("background-color", "rgba(" + randInt(90) + "," + randInt(90) + "," + randInt(90) + ", 0.8");
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
    // generate a difficulty button for each question bank available to us
    for (var i=0; i<difficultySelect.length; i++){
        var tempButton = generateButton(difficultySelect[i].name,"difficulty-button", i);
        tempButton.addClass(randomAnimation());
        $("#buttons-area").append(tempButton);
        
    }
}

// find the next question in the array and display it
function nextQuestion() {
    clearAnimation($("#trivia-body"));
    // check if the user has answered the required number of questions
    if (questions.questionsIndex < questions.maxQuestions) {
        // make a pointer to the current question in the questions object
        questions.curQuestion = questions.questionsList[questions.questionsIndex];
        $("#buttons-area").empty();
        $("#message-area").empty();
        // set the question in the title area
        $("#title-area").html($("<h2>").html(questions.curQuestion.q));
        // randomize the incorrect solutions and randomize where the solution will be
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
    // either add to correct answers or incorrect answers based on what the user clicked on
    (answer ? playerScore.correct += 1 : playerScore.wrong += 1);
    // animate the entire body of the html
    $("#trivia-body").addClass(randomAnimation());
    $("#message-area").empty();
    // display the correct answer along with a confirmation of whether the user answered correctly or incorrectly
    $("#message-area").html(($("<div>").attr("class", "text-center")).html((answer ? "You were right! " : "Better luck next time! ") + "The correct answer was " + questions.curQuestion.a));
    $("#buttons-area").empty();
    // create a new empty div
    var tempDiv = $("<div>")
    // make that div a card
    tempDiv.attr("class", "card text-white p-0 col-12 position-relative")
    // add the explanation text of the question from the questions object to our new div
    tempDiv.append($("<div>").attr("class", "card-body").append($("<p>").attr("class", "").text(questions.curQuestion.blurb)));
    // add the image from the questions obj
    tempDiv.append($("<img>").attr("class", "card-img-bottom").attr("src", questions.curQuestion.img).attr("alt", questions.curQuestion.a).attr("width", "100%").attr("height", "auto"));
    // add new div to the display area
    $("#buttons-area").append(tempDiv);
    // make a button that can pause the current countdown and look at the stuff on the solution page
    $("#buttons-area").append(generateButton("Pause", "next-button", false))
    // set the page to automatically move to the next question after 8 seconds
    timeOut = setTimeout(nextQuestion, 8000);
}

// logic for when the game finishes
function completeGame() {
    $("#title-area").empty();
    $("#message-area").empty();
    $("#buttons-area").empty();
    // grab total questions answered
    $("#message-area").html($("<p>").html("Out of " + questions.maxQuestions + " questions, you answered:"));
    // grab total right and wrong answers.
    $("#message-area").append($("<p>").html(playerScore.correct + " questions correctly, " + playerScore.wrong + " incorrectly,"));
    // grab number of questions the user skipped
    $("#message-area").append($("<p>").html("and skipped " + playerScore.skipped + " questions."));
    // grab the total amount of time the user spent on the quiz
    $("#message-area").append($("<p>").html("It took you " + timer.totalTime + " seconds to answer all the questions."));
    $("#buttons-area").empty();
    // add reset button to allow the player to play again without refreshing
    $("#buttons-area").append(generateButton("Play Again","reset-button").addClass(randomAnimation()));
    // show slightly different messages depending on how many questions the user answered
    if (playerScore.correct > (playerScore.wrong + playerScore.skipped)){
        ($("#title-area").html("<h2 class='text-center'>The love for all living creatures is the most noble attribute of man.</h2><h2 class='text-center'>-Charles Darwin</h2>")).addClass("grow");
    } else {
        $("#title-area").html("<h2 class='text-center'>Congratulations you've completed the quiz! See if you can get a better score next time!</h2>");
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

    // pass the data-correct to my answer evaluation function when an answer button is clicked
    $(document).on("click", ".answer-button", function () {
        var currButton = $(this);
        timer.stop();
        evaluateAnswer(currButton.data("correct"));
    });

    // either remove the timeout procedure or move on to the next question when clicked
    // will swap out the text in the button and change the background color the first time it is clicked
    $(document).on("click", ".next-button", function () {
        clearTimeout(timeOut);
        console.log(typeof $(this).data("correct"));
        if ($(this).attr("data-correct") === "true") {
            nextQuestion();
        } else {
            $(this).attr("data-correct", true);
            $(this).text("Next Question");
            $(this).css("background-color", "rgba(" + randInt(90) + "," + randInt(90) + "," + randInt(90) + ", 0.7");
        }
    });

});