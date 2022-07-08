var questions = [{
    question: "What is the baby of a Moth known as?",
    choices: ["baby", "infant", "kit", "larva"],
    correctAnswer: 3
}, {
    question: "What is the adult of a kid called",
    choices: ["calf", "doe", "goat", "chick"],
    correctAnswer: 2
}, {
    question: "What is a baby Aligator called?",
    choices: ["baby", "gator", "hatching", "calf"],
    correctAnswer: 2
}, {
    question: "What is a young Bufalo called?",
    choices: ["calf", "baby", "pup", "cow"],
    correctAnswer: 0
}, {
    question: "What is a baby goose called?",
    choices: ["gooser", "gosling", "gup", "pup"],
    correctAnswer: 1
}];


var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;  

$(document).ready (function(){  //.ready checks if the page has loaded fully before executing the code 
    displayCurrentQuestion();   //this will display the very first question
    $(this).find(".quizMessage").hide();
    $ (this).find(".nextButton").on("click", function (){ //finds the next question
        if (!quizOver) {
            value = $("input[type='radio']:checked").val();
            if (value ==undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizmessage").show();
            } else {
                $(document).find(".quizMessage").hide();
                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else {
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });
});

function displayCurrentQuestion() {
    console.log ("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find (".quizContainer > .question");
    var choiceList = $(document).find ("quizContainer > .choiceList");
    var numChoices = questions [currentQuestion].choices.length;

    //set the questionClass text to the current question 
    $(questionClass).text(question);

    //Remove all current <li> elements (if any)
    $(choiceList).find ("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz () {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find("quizContainer > .result").text("You scored: "+ correctAnswers  + "out of: " + questions.length);
    $(document).find("quizContainer > .result").show();
}

function hideScore () {
    $(document).find(".result").hide();
}