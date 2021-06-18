const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion={}
let acceptingAnswers = true
let score = 0
let questionCounter = 0 
let availableQuestions = {}

let questions = [
    {
        question: 'What is 2+2?',
        choice1: '2', 
        choice2: '3', 
        choice3: '4', 
        choice4: '5', 
        answer: 3, //choice no.=3
    },
    {
        question: 'Where is the tallest building in the world located??',
        choice1: 'Dubai', 
        choice2: 'New York', 
        choice3: 'Shanghai', 
        choice4: 'India', 
        answer: 1, 
    },
    {
        question: 'I am a furry animal that loves to play, be around people and bark! I am very loyal. Who am I?',
        choice1: 'Dog', 
        choice2: 'Cat', 
        choice3: 'Squirrel', 
        choice4: 'Cow', 
        answer: 1, 
    }
]

const SCORE_POINTS = 100 /*capitalized so that javascript knows that this field shouldn't be altered; this is the points that the player gets for each question*/
const MAX_QUESTIONS = 3

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions] //spread syntax: gets all the questions
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS)
    {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++

    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)  //math.random returns random number from 0(inclusive) to 1(exclusive); w math.floor, it returns a random integer from 0 to length-1
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1) /*removes the question with index=questionIndex [args: (start of array from where we've to remove, no. of elts to remove) ]*/

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers)   return

        acceptingAnswers=false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply == 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000) // second argument: time till which the current page stays after clicking on the answer
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()