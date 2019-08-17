var TriviaGame = {
    questions: [{
        q: "What number is between 4 and 6?",
        a1: "3",
        a2: "5",
        a3: "6",
        a4: "4",
        correct: 2,
    },
    {
        q: "Which of these is not a trig function?",
        a1: "Sin",
        a2: "Cos",
        a3: "Tan",
        a4: "Wave",
        correct: 4,
    },
    {
        q: "Which planet is the biggest?",
        a1: "Earth",
        a2: "Venus",
        a3: "Jupiter",
        a4: "Neptune",
        correct: 3,
    },
    {
        q: "Which of these is a video game console?",
        a1: "zbox",
        a2: "Staystation",
        a3: "Atari",
        a4: "Nintendont",
        correct: 3,
    },
    {
        q: "Which country lines United States northern border?",
        a1: "Iceland",
        a2: "Alaska",
        a3: "Mexico",
        a4: "Canada",
        correct: 4,
    },
    {
        q: "What is the name of the star in the center of our solar system?",
        a1: "Orion",
        a2: "Sun",
        a3: "Blue Dwarf",
        a4: "Big Red",
        correct: 2,
    },
    {
        q: "What is a space rock that enters Earth's atomsphere and impacts its' surface?",
        a1: "Meteor",
        a2: "Asteroid",
        a3: "Comet",
        a4: "Meteorite",
        correct: 4,
    },
    {
        q: "Which genre of music is objectively the best?",
        a1: "Vaporwave",
        a2: "Classical",
        a3: "Country",
        a4: "Rock",
        correct: 1,
    }],
}

var qTime = 10;
var aTime = 3;

var correctCount = 0;
var questionCount = 0;
var wrongCount = 0;

var questionTimer;
var answerTimer;

var $questionContent = $(".question-wrapper");
var $startButton = $("#startButton");
var $endScreen = $("#endScreen");

function start() {
    correctCount = 0;
    questionCount = 0;
    wrongCount = 0;
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
        qTime = 10
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
        aTime = 3
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
        qTime = 10;
        $("#timer").text(aTime);
        clearInterval(questionTimer);
        answerTimer = setInterval(answerTime, 1000);
        $(".answer").addClass("invisible");
        $("#question").text("Correct Answer!");
    } else {
        wrongCount++;
        qTime = 10;
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