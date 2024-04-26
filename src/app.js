
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
        wordsHandler.handleInput()

        wordsHandler.domElements.wordContainer.addEventListener("click", () => {
            wordsHandler.domElements.wordInput.focus()
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

    handleInput: () => {
        

        wordsHandler.domElements.wordInput.addEventListener("keyup", (e) => {
            const wordIndex = wordsHandler.wordIndex;
            const letterIndex = wordsHandler.letterIndex;
            const currentWord = wordsHandler.domElements.getAllWords[wordIndex]
            const currentLetter = currentWord.querySelectorAll(".letter")[letterIndex]
            
            console.log(currentLetter.textContent)

            if(e.target.value === currentLetter.textContent) {
                e.target.value = ""
                currentLetter.classList.add("word--correct")
                wordsHandler.letterIndex = letterIndex+1
            } else {
                e.target.value = ""
                currentLetter.classList.add("word--incorrect")
            }
        })


    }

}

wordsHandler.init()

// J'écrit dans l'input.
// Ca me place dans le premier mot et ca verifei que chaque charactere correspond a chaque lettre
// SI ca correspond pas => je met la lettre en rouge Sinon => en blanc
// 


// const shortCut = wordsHandler.domElements.getAllWords
//         let wordCount = 0;

//         wordsHandler.domElements.wordInput.addEventListener("keyup", (e) => {
            
//             const lettersOfWord = shortCut[wordCount].querySelectorAll(".letter")
//             lettersOfWord.forEach(letter => {
//                 console.log(letter.textContent)
//             })

//         })


// const currentWord = wordsHandler.domElements.getAllWords[wordIndex];
//         const abcdefg =  wordsHandler.domElements.getAllLetters[letterIndex]

//         console.log(abcdefg.textContent)