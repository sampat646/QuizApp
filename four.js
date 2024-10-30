const question = [
    {
        question: "What is the default value of an int variable in Java?",
        answer: [
            { text: "0", correct: true },
            { text: "1", correct: false },
            { text: "null", correct: false },
            { text: "undefined", correct: false }
        ]
    },
    {
        question: "Which of the following is a valid declaration of an array in Java?",
        answer: [
            { text: "int[] arr;", correct: true },
            { text: "int arr[];", correct: true },
            { text: "int arr = new int[5];", correct: true },
            { text: "All of the above", correct: true }
        ]
    },
    {
        question: "What keyword is used to define a constant in Java?",
        answer: [
            { text: "constant", correct: false },
            { text: "final", correct: true },
            { text: "static", correct: false },
            { text: "immutable", correct: false }
        ]
    },
    {
        question: "Which of the following is not a primitive data type in Java?",
        answer: [
            { text: "int", correct: false },
            { text: "boolean", correct: false },
            { text: "String", correct: true },
            { text: "char", correct: false }
        ]
    },
    {
        question: "What is the correct way to create a constructor in Java?",
        answer: [
            { text: "public ClassName() {}", correct: true },
            { text: "ClassName() {}", correct: false },
            { text: "void ClassName() {}", correct: false },
            { text: "new ClassName() {}", correct: false }
        ]
    },
    {
        question: "Which method is called when an object is created in Java?",
        answer: [
            { text: "initialize()", correct: false },
            { text: "constructor()", correct: false },
            { text: "main()", correct: false },
            { text: "Constructor", correct: true }
        ]
    },
    {
        question: "What will be the output of the following code: System.out.println(3 + 2 + '5');?",
        answer: [
            { text: "55", correct: true },
            { text: "25", correct: false },
            { text: "8", correct: false },
            { text: "35", correct: false }
        ]
    },
    {
        question: "Which of the following is the correct syntax to handle exceptions in Java?",
        answer: [
            { text: "try { ... } catch { ... }", correct: false },
            { text: "try { ... } catch (Exception e) { ... }", correct: true },
            { text: "catch (Exception e) { ... } try { ... }", correct: false },
            { text: "finally { ... } catch { ... }", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'super' keyword in Java?",
        answer: [
            { text: "To call the parent class constructor", correct: true },
            { text: "To access private methods", correct: false },
            { text: "To define a static method", correct: false },
            { text: "To declare a new class", correct: false }
        ]
    },
    {
        question: "How do you declare a method in Java that returns an integer?",
        answer: [
            { text: "int methodName()", correct: true },
            { text: "void methodName(int)", correct: false },
            { text: "methodName() int", correct: false },
            { text: "return int methodName()", correct: false }
        ]
    },
    {
        question: "Which of the following access modifiers allows the widest access level?",
        answer: [
            { text: "private", correct: false },
            { text: "protected", correct: false },
            { text: "public", correct: true },
            { text: "default", correct: false }
        ]
    },
    {
        question: "What is the size of an int in Java?",
        answer: [
            { text: "16 bits", correct: false },
            { text: "32 bits", correct: true },
            { text: "64 bits", correct: false },
            { text: "8 bits", correct: false }
        ]
    },
    {
        question: "Which of the following statements is true regarding Java?",
        answer: [
            { text: "Java is a platform-dependent language.", correct: false },
            { text: "Java is a purely object-oriented language.", correct: false },
            { text: "Java can run on any platform with a Java Virtual Machine.", correct: true },
            { text: "Java uses pointers.", correct: false }
        ]
    },
    {
        question: "How do you create an object of a class named 'Car'?",
        answer: [
            { text: "Car myCar = new Car();", correct: true },
            { text: "Car myCar;", correct: false },
            { text: "new Car myCar;", correct: false },
            { text: "myCar = Car();", correct: false }
        ]
    },
    {
        question: "Which of the following is the correct way to start a thread in Java?",
        answer: [
            { text: "myThread.start();", correct: true },
            { text: "myThread.run();", correct: false },
            { text: "Thread.start(myThread);", correct: false },
            { text: "start(myThread);", correct: false }
        ]
    },
    {
        question: "What does the 'static' keyword signify in Java?",
        answer: [
            { text: "Belongs to the instance of a class", correct: false },
            { text: "Belongs to the class itself", correct: true },
            { text: "Indicates a private variable", correct: false },
            { text: "Cannot be accessed by methods", correct: false }
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
