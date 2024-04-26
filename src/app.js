
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

        wordsHandler.domElements.wordInput.addEventListener("keyup", (e) => {
            wordsHandler.handleInput(e, wordsHandler.wordIndex, wordsHandler.letterIndex)
        })

        // wordsHandler.domElements.wordInput.addEventListener("keydown", (e) => {
        //     if(e.keyCode === 8) {
        //         if(wordsHandler.letterIndex > 0) {
        //             wordsHandler.letterIndex = wordsHandler.letterIndex - 1
        //         }else {
        //             console.log("TU ne peux pas suppr !")
        //         }
        //     }
        // })

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

    handleInput: (event, wordIndex, letterIndex) => {
        

        const input = wordsHandler.domElements.wordInput
        const currentWord = wordsHandler.domElements.getAllWords[wordIndex]
        let currentLetter = wordsHandler.domElements.getAllLetters[letterIndex]
            
        input.setAttribute("maxlength", currentWord.textContent.length)

        if(event.keyCode !== 8 && 32) {
            if(event.target.value[letterIndex] === currentLetter.textContent) {
                currentLetter.classList.remove("letter--incorrect")
                currentLetter.classList.add("letter--correct")
                wordsHandler.letterIndex++
            }else {
                currentLetter.classList.add("letter--incorrect")
                wordsHandler.letterIndex++
            }
        }
        if(event.keyCode === 8) {
            if(wordsHandler.letterIndex > 0) {
                
                wordsHandler.letterIndex = wordsHandler.letterIndex - 1
                wordsHandler.domElements.getAllLetters[wordsHandler.letterIndex].classList.remove("letter--correct")
                console.log(currentLetter.textContent)

            }else {
                console.log("tu ne peux pas supprimé")
            }
        }else if(event.keyCode === 32) {
            console.log("tu espace")
        }
        

        
       


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