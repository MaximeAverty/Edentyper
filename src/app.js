
const wordsHandler = {

    wordsList: [],
    options: {
        wordsNumber : 50,
    },

    getRandomWords: async () => {
        for(let i = 0; i < wordsHandler.options.wordsNumber; i++) {
            try{
                const response = await fetch("https://random-word-api.herokuapp.com/word")
                if(!response.ok) {
                    throw new Error("Failed to fetch data")
                }
                const data = await response.json()
                wordsHandler.wordsList.push(data[0])
            } catch(e) {
                console.error(e)
            }
        }
        wordsHandler.createWords()
    },

    createWords: () => {
        const wordContainer = document.querySelector(".words-container")
        wordsHandler.wordsList.forEach(word => {
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
    }

}

