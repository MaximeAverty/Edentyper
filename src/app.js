
const wordsHandler = {

    domElements: {
        wordContainer: document.getElementById("wordsContainer"),
        getAllOptionsNumber: document.querySelectorAll(".options__number"),
        wordInput: document.getElementById("wordInput"),
        getAllWords: null,
        getAllLetters: null,
        
    },
    wordIndex: 0,
    letterIndex: 0,
    wordsList: localWords.words,
    choosedWords: [],
    options: {
        wordsNumber : 50,
    },

    init: () => {
        wordsHandler.getRandomWords()

        wordsHandler.changeWordsNumber()
        

        wordsHandler.domElements.wordContainer.addEventListener("click", () => {
            wordsHandler.domElements.wordInput.focus()
        })

        wordsHandler.domElements.wordInput.value = ""

        wordsHandler.domElements.wordInput.addEventListener("keydown", (e) => {
            const wordLength = wordsHandler.domElements.getAllWords[wordsHandler.wordIndex].textContent.length.toString()
            wordsHandler.domElements.wordInput.setAttribute("maxLength", wordLength)
            wordsHandler.handleInput(e, wordsHandler.wordIndex, wordsHandler.letterIndex)
        })

    },

    getRandomWords: () => {
        wordsHandler.choosedWords = []
        for(let i = 0; i < wordsHandler.options.wordsNumber; i++) {
            const randomWord = Math.floor(Math.random() * wordsHandler.wordsList.length)
            wordsHandler.choosedWords.push(wordsHandler.wordsList[randomWord])
        }
        wordsHandler.createWords()
    },

    createWords: () => {
        wordsHandler.choosedWords.forEach(word => {
            word = word.toLowerCase()
            const wordDiv = document.createElement("div")
            wordDiv.classList.add("word")
            wordsHandler.domElements.wordContainer.appendChild(wordDiv)
            const letters = [...word]
            letters.forEach(letter => {
                const customLetter = document.createElement("span")
                customLetter.classList.add("letter")
                customLetter.textContent = letter
                wordDiv.appendChild(customLetter)
            })
            wordsHandler.domElements.getAllWords = document.querySelectorAll(".word")
            wordsHandler.domElements.getAllLetters = document.querySelectorAll(".letter")
        })
    },

    changeWordsNumber: () => {
        wordsHandler.domElements.getAllOptionsNumber.forEach(opt => {
            opt.addEventListener("click", () => {
                wordsHandler.domElements.getAllOptionsNumber.forEach(btn => { 
                    btn.classList.remove("option__number--active")
                })
                opt.classList.add("option__number--active")
                wordsHandler.options.wordsNumber = Number(opt.textContent)
                wordsHandler.domElements.getAllWords.forEach(word => {
                    word.remove()
                })
                wordsHandler.getRandomWords()
            })
        })
    },

    handleInput: (event) => {
        
        const SPACE_KEYCODE = 32
        const DEL_KEYCODE = 8

        let input = wordsHandler.domElements.wordInput
        
        let letterIndex = wordsHandler.letterIndex
        let currentWord = wordsHandler.domElements.getAllWords[wordsHandler.wordIndex]

        let allSpanLetters = currentWord.querySelectorAll(".letter")
        let currentSpanLetter = allSpanLetters[letterIndex]
        

        if(event.key === allSpanLetters[wordsHandler.letterIndex].textContent) {
            allSpanLetters[wordsHandler.letterIndex].classList.add("letter--correct")
            if(wordsHandler.letterIndex != currentWord.textContent.length -1 ) {
                wordsHandler.letterIndex++
            }
            
        }else if (event.keyCode === SPACE_KEYCODE || event.keyCode === DEL_KEYCODE){
            event.preventDefault()
            if(event.keyCode === SPACE_KEYCODE) {
                if(input.value.length === currentWord.textContent.length) {
                    wordsHandler.wordIndex++
                    wordsHandler.letterIndex = 0
                    input.value = ""
                }else {
                    input.value += " "
                    allSpanLetters[wordsHandler.letterIndex].classList.add("letter--incorrect")
                    if(wordsHandler.letterIndex != currentWord.textContent.length -1 ) {
                        wordsHandler.letterIndex++
                    }
                }
            }else if(event.keyCode === DEL_KEYCODE) {
                if(wordsHandler.letterIndex > 0) {
                    if(input.value.length === currentWord.textContent.length) {
                        allSpanLetters[wordsHandler.letterIndex].classList.remove("letter--correct", "letter--incorrect")
                        input.value = input.value.slice(0, -1)
                        
                    }else {
                        allSpanLetters[wordsHandler.letterIndex - 1].classList.remove("letter--correct", "letter--incorrect")
                        input.value = input.value.slice(0, -1)
                        wordsHandler.letterIndex = wordsHandler.letterIndex - 1
                    }
                }
            }
            
            
        }else {
            allSpanLetters[wordsHandler.letterIndex].classList.add("letter--incorrect")
            if(wordsHandler.letterIndex != currentWord.textContent.length -1 ) {
                wordsHandler.letterIndex++
            }
        }


    }

}

wordsHandler.init()


