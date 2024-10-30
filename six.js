const question = [
    {
        question: "What does the `<meta>` tag in HTML do?",
        answer: [
            { text: "Defines the character set", correct: false },
            { text: "Provides metadata about the HTML document", correct: true },
            { text: "Defines a hyperlink", correct: false },
            { text: "Creates a new line", correct: false }
        ]
    },
    {
        question: "Which HTML attribute is used to specify an inline style?",
        answer: [
            { text: "style", correct: true },
            { text: "class", correct: false },
            { text: "font", correct: false },
            { text: "styles", correct: false }
        ]
    },
    {
        question: "Which attribute is used to specify the destination of a hyperlink?",
        answer: [
            { text: "href", correct: true },
            { text: "link", correct: false },
            { text: "src", correct: false },
            { text: "url", correct: false }
        ]
    },
    {
        question: "What will happen if you use a `<div>` inside a `<span>`?",
        answer: [
            { text: "It will work without issues", correct: false },
            { text: "It will cause a validation error", correct: true },
            { text: "The `<span>` will expand", correct: false },
            { text: "The `<div>` will not display", correct: false }
        ]
    },
    {
        question: "Which CSS property controls the text size?",
        answer: [
            { text: "font-size", correct: true },
            { text: "text-size", correct: false },
            { text: "font-style", correct: false },
            { text: "text-style", correct: false }
        ]
    },
    {
        question: "How can you apply a CSS style to all `<p>` elements?",
        answer: [
            { text: "p { ... }", correct: true },
            { text: ".p { ... }", correct: false },
            { text: "#p { ... }", correct: false },
            { text: "paragraph { ... }", correct: false }
        ]
    },
    {
        question: "What does the `position: absolute;` property do?",
        answer: [
            { text: "Positions an element relative to its closest positioned ancestor", correct: true },
            { text: "Positions an element relative to the viewport", correct: false },
            { text: "Removes the element from the document flow", correct: false },
            { text: "Fixes an element at the top of the page", correct: false }
        ]
    },
    {
        question: "Which HTML element defines the footer for a document or section?",
        answer: [
            { text: "<bottom>", correct: false },
            { text: "<footer>", correct: true },
            { text: "<foot>", correct: false },
            { text: "<end>", correct: false }
        ]
    },
    {
        question: "What does the `z-index` property do in CSS?",
        answer: [
            { text: "Sets the stack order of elements", correct: true },
            { text: "Defines the size of an element", correct: false },
            { text: "Sets the opacity of an element", correct: false },
            { text: "Specifies the margin of an element", correct: false }
        ]
    },
    {
        question: "What is the result of applying `display: none;` to an element?",
        answer: [
            { text: "The element will be visible", correct: false },
            { text: "The element will be hidden and take up no space", correct: true },
            { text: "The element will be invisible but take up space", correct: false },
            { text: "The element will be displayed as a block", correct: false }
        ]
    },
    {
        question: "Which of the following is a valid CSS selector?",
        answer: [
            { text: "div#id { ... }", correct: true },
            { text: "#id div { ... }", correct: true },
            { text: ".class div { ... }", correct: true },
            { text: "div.class { ... }", correct: true }
        ]
    },
    {
        question: "What does the `float` property do in CSS?",
        answer: [
            { text: "Positions an element relative to the viewport", correct: false },
            { text: "Floats an element to the left or right of its container", correct: true },
            { text: "Removes an element from the document flow", correct: false },
            { text: "Sets the alignment of text", correct: false }
        ]
    },
    {
        question: "What will be the output of the following code: <div style='color: red;'>Hello</div>?",
        answer: [
            { text: "Hello", correct: true },
            { text: "<div>Hello</div>", correct: false },
            { text: "Error", correct: false },
            { text: "red", correct: false }
        ]
    },
    {
        question: "What does the `:hover` pseudo-class do?",
        answer: [
            { text: "Styles an element when the mouse hovers over it", correct: true },
            { text: "Styles an element when clicked", correct: false },
            { text: "Styles an element when it is focused", correct: false },
            { text: "Styles an element when it is active", correct: false }
        ]
    }
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
