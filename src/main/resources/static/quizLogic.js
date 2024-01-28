document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "What is Canada’s national sport?",
            options: ["Soccer", "Hockey", "Lacrosse", "Figure Skating"],
            correct: 2
        },
        {
            question: "Which Canadian province has the highest population?",
            options: ["British Columbia", "Ontario", "Alberta", "Manitoba"],
            correct: 1
        },
        {
            question: "Fin the Whale, is the official mascot of what Canadian NHL team?",
            options: ["Ottowa Senators", "Toronto Maple Leafs", "Edmonton Oilers", "Vancouver Canucks"],
            correct: 3
        },
        {
            question: "Statistically, who is the worst prime minister in Canadian history?",
            options: ["Stephen Harper", "Justin Trudeau", "Paul Martin", "Pierre Trudeau"],
            correct: 1
        },
    ];

    let currentQuestionIndex = 0;
    let answers = Array(questions.length).fill(null);

    const questionElement = document.querySelector('.question');
    const optionsElement = document.querySelector('.options');
    const nextButton = document.getElementById('next-btn');
    const previousButton = document.getElementById('previous-btn');
    const submitButton = document.getElementById('submit-btn');
    const resultsElement = document.querySelector('.results');
    const scoreElement = document.getElementById('score');
    const correctAnswersElement = document.getElementById('correct-answers');

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = '';

        currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.innerHTML = `<input type="radio" name="answer" id="option${index}" value="${index}"><label for="option${index}">${option}</label>`;
            optionsElement.appendChild(optionElement);

            if (answers[currentQuestionIndex] === index) {
                optionElement.firstChild.checked = true;
            }
        });
    }

    function getSelectedOption() {
        const options = document.querySelectorAll('.options input[type="radio"]');
        for (let option of options) {
            if (option.checked) {
                return parseInt(option.value);
            }
        }
        return null;
    }

    function calculateScore() {
        let score = 0;
        answers.forEach((answer, index) => {
            if (answer === questions[index].correct) {
                score++;
            }
        });
        return score;
    }

    function showResults() {
        console.log("Showing results");
        const score = calculateScore();
        resultsElement.style.display = 'block';
        console.log(resultsElement.classList);
        scoreElement.textContent = `${score} / ${questions.length}`;
        correctAnswersElement.innerHTML = '';
        questions.forEach((question, index) => {
            const userAnswer = answers[index] !== null ? question.options[answers[index]] : "No answer";
            const correctAnswer = question.options[question.correct];
            correctAnswersElement.innerHTML += `<p>Q${index + 1}: ${question.question} <br> Your answer: ${userAnswer} <br> Correct answer: ${correctAnswer}</p>`;
        });
        console.log("Score:", score);
        console.log("Answers:", answers);   
        console.log(resultsElement.classList);
    }

    nextButton.addEventListener('click', () => {
        const selectedOption = getSelectedOption();
        if (selectedOption === null) {
            alert('Please select an answer.');
            return;
        }

        answers[currentQuestionIndex] = selectedOption;
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        }
    });

    previousButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            answers[currentQuestionIndex] = getSelectedOption();
            currentQuestionIndex--;
            loadQuestion();
        }
    });

    submitButton.addEventListener('click', () => {
        answers[currentQuestionIndex] = getSelectedOption();
    
        // Check if all questions have been answered
        const isAllAnswered = answers.every(answer => answer !== null);
        if (!isAllAnswered) {
            alert('Please answer all questions before submitting the quiz.');
            return;
        }
    
        showResults();
        nextButton.disabled = true;
        previousButton.disabled = true;
        submitButton.disabled = true;
    });

    loadQuestion();
});
