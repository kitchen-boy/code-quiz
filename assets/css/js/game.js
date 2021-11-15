const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionsCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Is JavaScript case-sensitive?",
        choice1: "Yes",
        choice2: "No",
        choice3: "It depends",
        answer: 1,
    },
    {   
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('HelloWorld')",
        choice2: "alert('Hello World')",
        choice3: "alertBox('Hello World')",
        answer: 3,
    },
    {   
        question: "Which operator is used to assign a value to a variable?",
        choice1: "-",
        choice2: "X",
        choice3: "=",
        answer: 3,
    },
    {   
        question: "Which event occurs when the user clicks on an HTML element?",
        choice1: "onmouseover",
        choice2: "onclick",
        choice3: "onchange",
        answer: 2,
    },
    {   
        question: "How can you detect the client's browser name?",
        choice1: "client.navName",
        choice2: "browser.name",
        choice3: "navigator.appName",
        answer: 3,
    },
    {   
        question: "JavaScript is the same as Java.",
        choice1: "False",
        choice2: "True",
        choice3: "Falsey, yet also Truthy",
        answer: 1,
    },
    {   
        question: "How do you find the number with the highest value of x and y?",
        choice1: "top(x, y)",
        choice2: "ceil(x, y)",
        choice3: "Math.max(x, y)",
        answer: 3,
    },
    {   
        question: "How do you round the number 7.25, to the nearest integer?",
        choice1: "Math.round(7.25)",
        choice2: "Math.rnd(7.25)",
        choice3: "round(7.25)",
        answer: 1,
    }, 
    {   
        question: "How to insert a comment that has more than one line?",
        choice1: "//This comment has more than one line//",
        choice2: "/*This comment has more than one line*/",
        choice3: "<!--This comment has more than one line-->", 
        answer: 2,
    },
    {   
        question: "How does a FOR loop start?",
        choice1: "for (i=0; i<=5)",
        choice2: "for(i<=5; i++);", 
        choice3: "for(i=0; i<=5; i++)",
        answer: 3, 
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionsCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign('/end.html')
    }
    questionsCounter++
    progressText.innerText= `Question ${questionsCounter} of ${MAX_QUESTIONS}`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}  

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset ['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)

    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()