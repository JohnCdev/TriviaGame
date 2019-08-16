var TriviaGame = {
    questions: [{
        q: "Question 1",
        a1: "Answer 1",
        a2: "Answer 2",
        a3: "Answer 3",
        a4: "Answer 4",
        correct: 1,
    },
    {
        q: "Question 2",
        a1: "Answer 1",
        a2: "Answer 2",
        a3: "Answer 3",
        a4: "Answer 4",
        correct: 1,
    },
    {
        q: "Question 3",
        a1: "Answer 1",
        a2: "Answer 2",
        a3: "Answer 3",
        a4: "Answer 4",
        correct: 1,
    },
    {
        q: "Question 4",
        a1: "Answer 1",
        a2: "Answer 2",
        a3: "Answer 3",
        a4: "Answer 4",
        correct: 1,
    },
    {
        q: "Question 5",
        a1: "Answer 1",
        a2: "Answer 2",
        a3: "Answer 3",
        a4: "Answer 4",
        correct: 1,
    },
    {
        q: "Question 6",
        a1: "Answer 1",
        a2: "Answer 2",
        a3: "Answer 3",
        a4: "Answer 4",
        correct: 1,
    },
    {
        q: "Question 7",
        a1: "Answer 1",
        a2: "Answer 2",
        a3: "Answer 3",
        a4: "Answer 4",
        correct: 1,
    },
    {
        q: "Question 8",
        a1: "Answer 1",
        a2: "Answer 2",
        a3: "Answer 3",
        a4: "Answer 4",
        correct: 1,
    }],
}

var qTime = 5;
var aTime = 2;

var correctCount = 0;
var questionCount = 0;
var wrongCount = 0;

var questionTimer;
var answerTimer;

var $questionContent = $(".question-wrapper");
var $startButton = $("#startButton");
var $endScreen = $("#endScreen");

function start() {
    clearInterval(questionTimer);
    questionTimer = setInterval(questionTime, 1000);
    $startButton.detach();
    $endScreen.detach();
    $(".content").append($questionContent);
    $(".answer").removeClass("invisible");
    $("#timer").text(qTime);
    $("#question").text(TriviaGame.questions[0].q);
    $("#answerOne").text(TriviaGame.questions[0].a1);
    $("#answerTwo").text(TriviaGame.questions[0].a2);
    $("#answerThree").text(TriviaGame.questions[0].a3);
    $("#answerFour").text(TriviaGame.questions[0].a4);
}

function questionTime() {
    qTime--;
    $("#timer").text(qTime);
    if (qTime === 0) {
        qTime = 5
        $("#timer").text(aTime);
        clearInterval(questionTimer);
        answerTimer = setInterval(answerTime, 1000);
        $(".answer").addClass("invisible");
        $("#question").text("Out of Time"); 
    }
}

function answerTime() {
    aTime--;
    $("#timer").text(aTime);
    if (aTime === 0) {
        aTime = 2
        $("#timer").text(qTime);
        clearInterval(answerTimer);
        questionTimer = setInterval(questionTime, 1000);
        nextQuestion();
        $(".answer").removeClass("invisible");
    }
}

function checkAnswer() {
    var ans = $(this).attr("data");
    console.log(ans);
    if (ans == TriviaGame.questions[questionCount].correct) {
        correctCount++;
        qTime = 5;
        $("#timer").text(aTime);
        clearInterval(questionTimer);
        answerTimer = setInterval(answerTime, 1000);
        $(".answer").addClass("invisible");  
        $("#question").text("Correct Answer!"); 
    } else {
        wrongCount++;
        qTime = 5;
        $("#timer").text(aTime);
        clearInterval(questionTimer);
        answerTimer = setInterval(answerTime, 1000);
        $(".answer").addClass("invisible");  
        $("#question").text("Wrong Answer!"); 
    }
}

function nextQuestion() {
    if ((questionCount + 1) === TriviaGame.questions.length) {
        endGame();
    } else {
        questionCount++;
        $("#question").text(TriviaGame.questions[questionCount].q);
        $("#answerOne").text(TriviaGame.questions[questionCount].a1);
        $("#answerTwo").text(TriviaGame.questions[questionCount].a2);
        $("#answerThree").text(TriviaGame.questions[questionCount].a3);
        $("#answerFour").text(TriviaGame.questions[questionCount].a4);
    }
}

function endGame() {
    clearInterval(answerTimer);
    clearInterval(questionTimer);
    $(".content").append($endScreen);
    $(".content").append($startButton);
    $questionContent.detach();
    $("#correct").text("Correct Answers: " + correctCount);    
    $("#incorrect").text("Incorrect Answers: " + wrongCount);
    $("#unanswered").text("Unaswered Answers: " + (TriviaGame.questions.length - (correctCount + wrongCount)));   
    $("#buttonText").text("Start Over");
}

window.onload = function () {
    $("#startButton").on("click", start);
    $("#stopButton").on("click", stop);
    $(".answer").on("click", checkAnswer);
    $questionContent.detach();
    $endScreen.detach();
};