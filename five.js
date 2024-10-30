const question = [
    {
        question: "What will be the output of the following code: print(type([]) is list)?",
        answer: [
            { text: "True", correct: true },
            { text: "False", correct: false },
            { text: "TypeError", correct: false },
            { text: "None", correct: false }
        ]
    },
    {
        question: "What is the output of the expression: 1 == True?",
        answer: [
            { text: "1", correct: false },
            { text: "True", correct: true },
            { text: "False", correct: false },
            { text: "TypeError", correct: false }
        ]
    },
    {
        question: "What does the following list comprehension produce: [x for x in range(5) if x % 2]?",
        answer: [
            { text: "[1, 3]", correct: true },
            { text: "[0, 2, 4]", correct: false },
            { text: "[0, 1, 2, 3, 4]", correct: false },
            { text: "[]", correct: false }
        ]
    },
    {
        question: "What will the following code print: print('Hello' + None)?",
        answer: [
            { text: "HelloNone", correct: false },
            { text: "TypeError", correct: true },
            { text: "Hello", correct: false },
            { text: "None", correct: false }
        ]
    },
    {
        question: "What will be the output of: print([1, 2, 3] * 2)?",
        answer: [
            { text: "[1, 2, 3, 1, 2, 3]", correct: true },
            { text: "[2, 4, 6]", correct: false },
            { text: "[1, 2, 3, 2]", correct: false },
            { text: "[3, 6, 9]", correct: false }
        ]
    },
    {
        question: "What does the following code output: print({}.get('key', 'default'))?",
        answer: [
            { text: "'default'", correct: true },
            { text: "None", correct: false },
            { text: "'key'", correct: false },
            { text: "{}.get('key')", correct: false }
        ]
    },
    {
        question: "Which of the following statements creates a shallow copy of a list?",
        answer: [
            { text: "list.copy()", correct: true },
            { text: "list[:] ", correct: true },
            { text: "copy.deepcopy(list)", correct: false },
            { text: "list.copy() and list[:]", correct: true }
        ]
    },
    {
        question: "What will be the output of: print(1, 2, 3, sep='-')?",
        answer: [
            { text: "1-2-3", correct: true },
            { text: "123", correct: false },
            { text: "1 2 3", correct: false },
            { text: "1:2:3", correct: false }
        ]
    },
    {
        question: "What is the output of the following code: print((lambda x: x * 2)(3))?",
        answer: [
            { text: "6", correct: true },
            { text: "3", correct: false },
            { text: "2", correct: false },
            { text: "None", correct: false }
        ]
    },
    {
        question: "What will be the output of: print(bool(''))?",
        answer: [
            { text: "True", correct: false },
            { text: "False", correct: true },
            { text: "TypeError", correct: false },
            { text: "None", correct: false }
        ]
    },
    {
        question: "What is the output of: print(isinstance([], list))?",
        answer: [
            { text: "True", correct: true },
            { text: "False", correct: false },
            { text: "TypeError", correct: false },
            { text: "None", correct: false }
        ]
    },
    {
        question: "What will the following code print: print(0.1 + 0.2 == 0.3)?",
        answer: [
            { text: "True", correct: false },
            { text: "False", correct: true },
            { text: "TypeError", correct: false },
            { text: "None", correct: false }
        ]
    },
    {
        question: "What does the following code return: print([1, 2, 3].pop())?",
        answer: [
            { text: "3", correct: true },
            { text: "1", correct: false },
            { text: "[1, 2]", correct: false },
            { text: "None", correct: false }
        ]
    },
    {
        question: "What will be the output of: print('abc' == 'abc')?",
        answer: [
            { text: "True", correct: true },
            { text: "False", correct: false },
            { text: "TypeError", correct: false },
            { text: "None", correct: false }
        ]
    },
];

const questionElement = document.getElementsByClassName("questions")[0];
const answerButtons = document.getElementsByClassName("answer-button")[0];
const nextButton = document.getElementsByClassName("next-btn")[0];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showquestions();
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showquestions() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showquestions();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < question.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

startQuiz();
