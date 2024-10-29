const question = [
    {
        question: "Which SQL keyword is used to retrieve data from a database?",
        answer: [
            { text: "FETCH", correct: false },
            { text: "SELECT", correct: true },
            { text: "RETRIEVE", correct: false },
            { text: "GET", correct: false }
        ]
    },
    {
        question: "Which SQL statement is used to update data in a table?",
        answer: [
            { text: "MODIFY", correct: false },
            { text: "ALTER", correct: false },
            { text: "UPDATE", correct: true },
            { text: "CHANGE", correct: false }
        ]
    },
    {
        question: "What does the SQL WHERE clause do?",
        answer: [
            { text: "Filters records based on conditions", correct: true },
            { text: "Sorts records in ascending order", correct: false },
            { text: "Groups records", correct: false },
            { text: "Creates a new table", correct: false }
        ]
    },
    {
        question: "Which command is used to remove all records from a table without removing the table itself?",
        answer: [
            { text: "DROP TABLE", correct: false },
            { text: "DELETE TABLE", correct: false },
            { text: "TRUNCATE TABLE", correct: true },
            { text: "REMOVE TABLE", correct: false }
        ]
    },
    {
        question: "How do you add a new column to an existing table in SQL?",
        answer: [
            { text: "MODIFY TABLE table_name ADD column_name", correct: false },
            { text: "ALTER TABLE table_name ADD column_name", correct: true },
            { text: "CHANGE TABLE table_name ADD column_name", correct: false },
            { text: "UPDATE TABLE table_name ADD column_name", correct: false }
        ]
    },
    {
        question: "Which SQL function is used to count the number of rows in a table?",
        answer: [
            { text: "SUM()", correct: false },
            { text: "COUNT()", correct: true },
            { text: "NUMBER()", correct: false },
            { text: "TOTAL()", correct: false }
        ]
    },
    {
        question: "Which keyword is used to sort the result set in ascending or descending order?",
        answer: [
            { text: "GROUP BY", correct: false },
            { text: "ORDER BY", correct: true },
            { text: "SORT BY", correct: false },
            { text: "FILTER BY", correct: false }
        ]
    },
    {
        question: "What does the SQL JOIN clause do?",
        answer: [
            { text: "Deletes rows in a table", correct: false },
            { text: "Combines rows from two or more tables", correct: true },
            { text: "Creates a new table", correct: false },
            { text: "Filters records based on conditions", correct: false }
        ]
    },
    {
        question: "How do you remove duplicate records from a query result in SQL?",
        answer: [
            { text: "UNIQUE", correct: false },
            { text: "DELETE", correct: false },
            { text: "DISTINCT", correct: true },
            { text: "GROUP BY", correct: false }
        ]
    },
    {
        question: "Which SQL clause is used to group rows that have the same values in specified columns?",
        answer: [
            { text: "ORDER BY", correct: false },
            { text: "GROUP BY", correct: true },
            { text: "UNION", correct: false },
            { text: "HAVING", correct: false }
        ]
    },
    {
        question: "Which SQL clause is used to filter records after grouping?",
        answer: [
            { text: "WHERE", correct: false },
            { text: "GROUP BY", correct: false },
            { text: "HAVING", correct: true },
            { text: "ORDER BY", correct: false }
        ]
    },
    {
        question: "Which SQL function returns the maximum value in a column?",
        answer: [
            { text: "MAX()", correct: true },
            { text: "MIN()", correct: false },
            { text: "HIGH()", correct: false },
            { text: "GREATEST()", correct: false }
        ]
    },
    {
        question: "Which command is used to delete rows based on a condition?",
        answer: [
            { text: "REMOVE FROM table_name WHERE condition", correct: false },
            { text: "DELETE FROM table_name WHERE condition", correct: true },
            { text: "DROP ROWS WHERE condition", correct: false },
            { text: "CLEAR FROM table_name WHERE condition", correct: false }
        ]
    },
    {
        question: "What does the SQL function AVG() do?",
        answer: [
            { text: "Finds the average of values in a numeric column", correct: true },
            { text: "Returns the total of values in a column", correct: false },
            { text: "Counts the number of rows", correct: false },
            { text: "Returns the maximum value in a column", correct: false }
        ]
    },
    {
        question: "Which SQL statement is used to return only different values?",
        answer: [
            { text: "SELECT UNIQUE", correct: false },
            { text: "SELECT DISTINCT", correct: true },
            { text: "SELECT DIFFERENT", correct: false },
            { text: "SELECT VARIANCE", correct: false }
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
