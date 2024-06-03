const questions = [
    {
        question: "What is the most popular sport in the world?",
        answers: [
            {text: "Football", correct: true},
            {text: "Basketball", correct: false},
            {text: "Cricket", correct: false},
            {text: "Tennis", correct: false}
        ]
    },
    {
        question: "How many people watched the 2023 NBA Finals?",
        answers: [
            {text: "11.6 Million", correct: true},
            {text: "2.5 Million", correct: false},
            {text: "8.4 Million", correct: false},
            {text: "20.3 Million", correct: false}
        ]
    }
    ,
    {
        question: "How many people watched the 2023 Champions League Final?",
        answers: [
            {text: "340 Million", correct: false},
            {text: "168 Million", correct: false},
            {text: "840 Million", correct: false},
            {text: "450 Million", correct: true}
        ]
    }
];

const questionElement =  document.getElementById("questions");
const answerButtons =  document.getElementById("answer-buttons");
const nextButton =  document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo =  currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    //Display answers
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML =  answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button)
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score ++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex ++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();