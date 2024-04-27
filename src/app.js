
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
        
        console.log(currentWord.textContent.length)

        if(event.key === allSpanLetters[wordsHandler.letterIndex].textContent) {
            allSpanLetters[wordsHandler.letterIndex].classList.add("letter--correct")
            if(wordsHandler.letterIndex != currentWord.textContent.length -1 ) {
                wordsHandler.letterIndex++
            }
            
        }else if (event.keyCode === SPACE_KEYCODE || event.keyCode === DEL_KEYCODE){
            event.preventDefault()
            if(event.keyCode === SPACE_KEYCODE) {
                
                console.log("test")
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
            wordsHandler.letterIndex++
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





// event.preventDefault()
        // const input = wordsHandler.domElements.wordInput
        // const currentWord = wordsHandler.domElements.getAllWords[wordIndex]
        // let currentLetter = wordsHandler.domElements.getAllLetters[letterIndex]
        // input.maxlength = currentWord.length

// if(event.key === currentLetter.textContent) {
//     currentLetter.classList.add("letter--correct")
//     wordsHandler.letterIndex++
//     input.value += event.key
// }else if(event.keyCode === 8){
//    wordsHandler.letterIndex--
//    wordsHandler.domElements.getAllLetters[letterIndex - 1].classList.remove("letter--correct", "letter--incorrect")      
//     input.value = input.value.slice(0, -1)
// }else if(event.keyCode === 32) {
//     console.log(currentWord.textContent.length)
//     console.log(letterIndex)
//     if(input.value.length >= currentWord.textContent.length) {
//         if(input.value === currentWord.textContent) {
//             currentWord.classList.add("word--correct")
//         }else {
//             currentWord.classList.add("word--incorrect")
//         }
//         wordsHandler.wordIndex++
//         input.value = ""
//     }
// }else {
//     currentLetter.classList.add("letter--incorrect")
//     input.value += event.key
//     wordsHandler.letterIndex = wordsHandler.letterIndex + 1
// }