const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore') //set in game.js

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score  // will return a negative value when b.score<a.score, and then a will be sorted before b//therefore, descending order
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores)) //second argument of setItem, i.e. value, should be a string
    window.location.assign('/')
}

