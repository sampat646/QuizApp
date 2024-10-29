const question = [
    {
        question: "What is the time complexity of selection sort?",
        answer: [
            { text: "O(log n)", correct: false },
            { text: "O(n)", correct: false },
            { text: "O(n^2)", correct: true },
            { text: "O(n^3)", correct: false }
        ]
    },
    {
        question: "What is the time complexity of bubble sort in the worst case?",
        answer: [
            { text: "O(n)", correct: false },
            { text: "O(n^2)", correct: true },
            { text: "O(n log n)", correct: false },
            { text: "O(n^3)", correct: false }
        ]
    },
    {
        question: "Which data structure uses LIFO (Last In First Out) principle?",
        answer: [
            { text: "Queue", correct: false },
            { text: "Stack", correct: true },
            { text: "Linked List", correct: false },
            { text: "Tree", correct: false }
        ]
    },
    {
        question: "What is the space complexity of a recursive function with a depth of n?",
        answer: [
            { text: "O(n)", correct: true },
            { text: "O(log n)", correct: false },
            { text: "O(n^2)", correct: false },
            { text: "O(1)", correct: false }
        ]
    },
    {
        question: "Which algorithm divides the array into two halves recursively?",
        answer: [
            { text: "Quick Sort", correct: false },
            { text: "Merge Sort", correct: true },
            { text: "Bubble Sort", correct: false },
            { text: "Selection Sort", correct: false }
        ]
    },
    {
        question: "Which data structure is best for implementing a FIFO queue?",
        answer: [
            { text: "Array", correct: false },
            { text: "Stack", correct: false },
            { text: "Linked List", correct: true },
            { text: "Tree", correct: false }
        ]
    },
    {
        question: "What is the purpose of a hash function in a hash table?",
        answer: [
            { text: "To sort the elements", correct: false },
            { text: "To map keys to unique indices", correct: true },
            { text: "To traverse a tree", correct: false },
            { text: "To perform binary search", correct: false }
        ]
    },
    {
        question: "What is the best case time complexity of quicksort?",
        answer: [
            { text: "O(n log n)", correct: true },
            { text: "O(n)", correct: false },
            { text: "O(n^2)", correct: false },
            { text: "O(log n)", correct: false }
        ]
    },
    {
        question: "Which of the following data structures is non-linear?",
        answer: [
            { text: "Array", correct: false },
            { text: "Linked List", correct: false },
            { text: "Stack", correct: false },
            { text: "Graph", correct: true }
        ]
    },
    {
        question: "Which algorithm is commonly used for shortest path in a weighted graph?",
        answer: [
            { text: "DFS", correct: false },
            { text: "BFS", correct: false },
            { text: "Dijkstra’s Algorithm", correct: true },
            { text: "Binary Search", correct: false }
        ]
    },
    {
        question: "What data structure is used in Breadth First Search (BFS)?",
        answer: [
            { text: "Stack", correct: false },
            { text: "Queue", correct: true },
            { text: "Linked List", correct: false },
            { text: "Tree", correct: false }
        ]
    },
    {
        question: "Which sorting algorithm is stable?",
        answer: [
            { text: "Merge Sort", correct: true },
            { text: "Quick Sort", correct: false },
            { text: "Heap Sort", correct: false },
            { text: "Selection Sort", correct: false }
        ]
    },
    {
        question: "In Binary Search, what condition allows it to work?",
        answer: [
            { text: "Array must be sorted", correct: true },
            { text: "Array must contain unique elements", correct: false },
            { text: "Array must contain no duplicates", correct: false },
            { text: "Array must be in descending order", correct: false }
        ]
    },
    {
        question: "Which of the following data structures can be used to detect a cycle in a directed graph?",
        answer: [
            { text: "Stack", correct: false },
            { text: "Queue", correct: false },
            { text: "Hash Table", correct: false },
            { text: "DFS with Recursion Stack", correct: true }
        ]
    },
    {
        question: "What is the minimum height of a binary search tree with n nodes?",
        answer: [
            { text: "O(n)", correct: false },
            { text: "O(log n)", correct: true },
            { text: "O(n^2)", correct: false },
            { text: "O(1)", correct: false }
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
