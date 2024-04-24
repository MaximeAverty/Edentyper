const allWords = wordsList.words
const wordContainer = document.querySelector(".words-container")

allWords.forEach(word => {
    word = word.toLowerCase()
    const wordDiv = document.createElement("div")
    wordDiv.classList.add("word")
    wordContainer.appendChild(wordDiv)
    const letters = [...word]
    letters.forEach(letter => {
        const customLetter = document.createElement("letter")
        customLetter.classList.add("letter")
        customLetter.textContent = letter
        wordDiv.appendChild(customLetter)
    })
})