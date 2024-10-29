const question = [
    {
        question: "Which command initializes a new Git repository?",
        answer: [
            { text: "git init", correct: true },
            { text: "git start", correct: false },
            { text: "git begin", correct: false },
            { text: "git create", correct: false }
        ]
    },
    {
        question: "Which command stages all changes for the next commit?",
        answer: [
            { text: "git stage", correct: false },
            { text: "git commit -a", correct: false },
            { text: "git add .", correct: true },
            { text: "git prepare", correct: false }
        ]
    },
    {
        question: "What is the purpose of 'git commit -m'?",
        answer: [
            { text: "To stage changes", correct: false },
            { text: "To create a commit with a message", correct: true },
            { text: "To merge branches", correct: false },
            { text: "To push commits to remote", correct: false }
        ]
    },
    {
        question: "Which command shows the commit history?",
        answer: [
            { text: "git history", correct: false },
            { text: "git log", correct: true },
            { text: "git show", correct: false },
            { text: "git track", correct: false }
        ]
    },
    {
        question: "How do you create a new branch?",
        answer: [
            { text: "git branch new_branch", correct: true },
            { text: "git checkout new_branch", correct: false },
            { text: "git create-branch new_branch", correct: false },
            { text: "git add-branch new_branch", correct: false }
        ]
    },
    {
        question: "Which command switches to an existing branch?",
        answer: [
            { text: "git switch", correct: false },
            { text: "git checkout <branch_name>", correct: true },
            { text: "git branch <branch_name>", correct: false },
            { text: "git change <branch_name>", correct: false }
        ]
    },
    {
        question: "What command pushes your local commits to a remote repository?",
        answer: [
            { text: "git save", correct: false },
            { text: "git push", correct: true },
            { text: "git upload", correct: false },
            { text: "git send", correct: false }
        ]
    },
    {
        question: "Which command fetches and merges changes from the remote to your local branch?",
        answer: [
            { text: "git fetch", correct: false },
            { text: "git pull", correct: true },
            { text: "git clone", correct: false },
            { text: "git update", correct: false }
        ]
    },
    {
        question: "How do you view differences between the working directory and the staging area?",
        answer: [
            { text: "git diff", correct: true },
            { text: "git status", correct: false },
            { text: "git log", correct: false },
            { text: "git check", correct: false }
        ]
    },
    {
        question: "What does 'git clone' do?",
        answer: [
            { text: "Creates a copy of a remote repository locally", correct: true },
            { text: "Pushes code to the remote repository", correct: false },
            { text: "Deletes the repository", correct: false },
            { text: "Creates a new branch", correct: false }
        ]
    },
    {
        question: "Which command is used to stage all modified files but exclude untracked files?",
        answer: [
            { text: "git add --all", correct: false },
            { text: "git add .", correct: true },
            { text: "git add *", correct: false },
            { text: "git add -u", correct: false }
        ]
    },
    {
        question: "How can you view the details of a specific commit?",
        answer: [
            { text: "git show <commit_id>", correct: true },
            { text: "git log <commit_id>", correct: false },
            { text: "git details <commit_id>", correct: false },
            { text: "git info <commit_id>", correct: false }
        ]
    },
    {
        question: "How can you delete a branch named 'feature'?",
        answer: [
            { text: "git branch delete feature", correct: false },
            { text: "git branch -d feature", correct: true },
            { text: "git delete branch feature", correct: false },
            { text: "git remove feature", correct: false }
        ]
    },
    {
        question: "What does 'git stash' do?",
        answer: [
            { text: "Saves changes to the remote repository", correct: false },
            { text: "Temporarily stores modified files", correct: true },
            { text: "Deletes all untracked files", correct: false },
            { text: "Creates a backup of the repository", correct: false }
        ]
    },
    {
        question: "How do you rebase your branch onto another branch?",
        answer: [
            { text: "git rebase <branch>", correct: true },
            { text: "git merge <branch>", correct: false },
            { text: "git pull <branch>", correct: false },
            { text: "git apply <branch>", correct: false }
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
