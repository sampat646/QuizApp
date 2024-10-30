const question = [
    // Existing questions...

    {
        question: "What is the best data structure to implement an LRU (Least Recently Used) cache?",
        answer: [
            { text: "Array", correct: false },
            { text: "Queue", correct: false },
            { text: "Hash Map with Doubly Linked List", correct: true },
            { text: "Stack", correct: false }
        ]
    },
    {
        question: "What is the most efficient way to check if a binary tree is balanced?",
        answer: [
            { text: "Using Depth-First Search with a height check", correct: true },
            { text: "Using Breadth-First Search", correct: false },
            { text: "Checking each level's node count", correct: false },
            { text: "Using In-Order Traversal", correct: false }
        ]
    },
    {
        question: "Which sorting algorithm maintains the order of equal elements (i.e., is stable)?",
        answer: [
            { text: "Quick Sort", correct: false },
            { text: "Merge Sort", correct: true },
            { text: "Heap Sort", correct: false },
            { text: "Selection Sort", correct: false }
        ]
    },
    {
        question: "Which algorithm efficiently finds the shortest path from a single source to all other vertices in a weighted graph?",
        answer: [
            { text: "Depth-First Search (DFS)", correct: false },
            { text: "Dijkstra’s Algorithm", correct: true },
            { text: "Breadth-First Search (BFS)", correct: false },
            { text: "Bellman-Ford Algorithm", correct: false }
        ]
    },
    {
        question: "What is a good choice of data structure for efficiently finding the k smallest elements in an array?",
        answer: [
            { text: "Stack", correct: false },
            { text: "Queue", correct: false },
            { text: "Min Heap", correct: true },
            { text: "Set", correct: false }
        ]
    },
    {
        question: "Which traversal method would allow you to retrieve nodes in sorted order from a Binary Search Tree?",
        answer: [
            { text: "Pre-Order Traversal", correct: false },
            { text: "In-Order Traversal", correct: true },
            { text: "Post-Order Traversal", correct: false },
            { text: "Level-Order Traversal", correct: false }
        ]
    },
    {
        question: "Which algorithm is commonly used to find connected components in an undirected graph?",
        answer: [
            { text: "Depth-First Search (DFS)", correct: true },
            { text: "Dijkstra’s Algorithm", correct: false },
            { text: "Bellman-Ford Algorithm", correct: false },
            { text: "Binary Search", correct: false }
        ]
    },
    {
        question: "What is the time complexity of accessing an element by index in an array?",
        answer: [
            { text: "O(1)", correct: true },
            { text: "O(n)", correct: false },
            { text: "O(log n)", correct: false },
            { text: "O(n^2)", correct: false }
        ]
    },
    {
        question: "Which data structure can be used to check for balanced parentheses in an expression?",
        answer: [
            { text: "Queue", correct: false },
            { text: "Stack", correct: true },
            { text: "Heap", correct: false },
            { text: "Linked List", correct: false }
        ]
    },
    {
        question: "Which algorithm uses a priority queue to find the minimum spanning tree of a graph?",
        answer: [
            { text: "Kruskal's Algorithm", correct: false },
            { text: "Prim's Algorithm", correct: true },
            { text: "Bellman-Ford Algorithm", correct: false },
            { text: "Binary Search", correct: false }
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
