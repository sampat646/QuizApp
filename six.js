const question = [
    {
        question: "What is the primary purpose of the meta tag in web development?",
        answer: [
            { text: "To set the character encoding of the document", correct: false },
            { text: "To provide metadata about the HTML document for browsers and search engines", correct: true },
            { text: "To define links between pages", correct: false },
            { text: "To create line breaks in text", correct: false }
        ]
    },
    {
        question: "Which HTML attribute is used to apply inline styles directly to an element?",
        answer: [
            { text: "style", correct: true },
            { text: "class", correct: false },
            { text: "font", correct: false },
            { text: "styles", correct: false }
        ]
    },
    {
        question: "Which attribute specifies the destination of a hyperlink?",
        answer: [
            { text: "href", correct: true },
            { text: "link", correct: false },
            { text: "src", correct: false },
            { text: "url", correct: false }
        ]
    },
    {
        question: "What is the purpose of using a div element inside a span element?",
        answer: [
            { text: "It works without any issues", correct: false },
            { text: "It causes a validation error as span should not contain div elements", correct: true },
            { text: "It automatically expands the span element", correct: false },
            { text: "The div element will not display", correct: false }
        ]
    },
    {
        question: "Which CSS property is used to control the text size of an element?",
        answer: [
            { text: "font-size", correct: true },
            { text: "text-size", correct: false },
            { text: "font-style", correct: false },
            { text: "text-style", correct: false }
        ]
    },
    {
        question: "How can you apply a CSS style to all paragraph elements on a page?",
        answer: [
            { text: "By using the selector p { ... }", correct: true },
            { text: "By using the selector .p { ... }", correct: false },
            { text: "By using the selector #p { ... }", correct: false },
            { text: "By using the selector paragraph { ... }", correct: false }
        ]
    },
    {
        question: "What effect does the position: absolute property have on an element?",
        answer: [
            { text: "It positions an element relative to its closest positioned ancestor", correct: true },
            { text: "It positions an element relative to the viewport", correct: false },
            { text: "It removes the element from the document flow", correct: false },
            { text: "It fixes an element at the top of the page", correct: false }
        ]
    },
    {
        question: "What is the purpose of the z-index property in CSS?",
        answer: [
            { text: "To set the stack order of elements", correct: true },
            { text: "To define the size of an element", correct: false },
            { text: "To set the opacity of an element", correct: false },
            { text: "To specify the margin of an element", correct: false }
        ]
    },
    {
        question: "What is the result of applying display: none to an element?",
        answer: [
            { text: "The element will be visible", correct: false },
            { text: "The element will be hidden and take up no space in the layout", correct: true },
            { text: "The element will be invisible but take up space", correct: false },
            { text: "The element will be displayed as a block element", correct: false }
        ]
    },
    {
        question: "Which of the following is a valid CSS selector format?",
        answer: [
            { text: "div#id", correct: true },
            { text: "#id div", correct: true },
            { text: ".class div", correct: true },
            { text: "div.class", correct: true }
        ]
    },
    {
        question: "What does the float property do in CSS?",
        answer: [
            { text: "Positions an element relative to the viewport", correct: false },
            { text: "Floats an element to the left or right of its container", correct: true },
            { text: "Removes an element from the document flow", correct: false },
            { text: "Sets the alignment of text within an element", correct: false }
        ]
    },
    {
        question: "What is the function of the :hover pseudo-class in CSS?",
        answer: [
            { text: "It styles an element when the mouse hovers over it", correct: true },
            { text: "It styles an element when clicked", correct: false },
            { text: "It styles an element when it is focused", correct: false },
            { text: "It styles an element when it is active", correct: false }
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
