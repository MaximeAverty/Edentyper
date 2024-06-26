
const wordsHandler = {

    domElements: {
        wordContainer: document.getElementById("wordsContainer"),
        getAllOptionsNumber: document.querySelectorAll(".options__number"),
        wordInput: document.getElementById("wordInput"),
        resultDiv: document.getElementById("resultDiv"),
        scoreDiv: document.getElementById("bestscoreDiv"),
        restartBtn: document.getElementById("restartBtn"),
        scoreBtn: document.getElementById("scoreBtn"),
        closeScoreBtn: document.getElementById("closeScoreBtn"),
        caret: null,
        getAllWords: null,
        getAllLetters: null,
        
    },
    wordIndex: 0,
    letterIndex: 0,
    caretIndex: 0,
    startedTime: null,
    EndedTime: null,
    isTestStarted: false,
    netWPM: null,
    rawWPM: null,
    accuracy: null,
    accuracyCounter: 0,
    wordsList: localWords.words,
    choosedWords: [],
    options: {
        wordsNumber : 25,
    },

    init: () => {
        wordsHandler.getRandomWords()

        wordsHandler.changeWordsNumber()
        wordsHandler.createCaret()
        wordsHandler.handleCaret()

        document.addEventListener("click", () => {
            wordsHandler.domElements.wordInput.focus()
            
        })

        wordsHandler.domElements.wordInput.value = ""

        wordsHandler.domElements.restartBtn.addEventListener("click", wordsHandler.restartTest)

        wordsHandler.domElements.wordInput.addEventListener("keydown", (e) => {
            const wordLength = wordsHandler.domElements.getAllWords[wordsHandler.wordIndex].textContent.length.toString()
            wordsHandler.domElements.wordInput.setAttribute("maxLength", wordLength)
            wordsHandler.handleInput(e, wordsHandler.wordIndex, wordsHandler.letterIndex)
        })

        wordsHandler.domElements.scoreBtn.addEventListener("click", (e) => {
            e.preventDefault()
            wordsHandler.displayScore()
            const scoreDiv = wordsHandler.domElements.scoreDiv
            scoreDiv.style.top = "0"
            wordsHandler.domElements.closeScoreBtn.addEventListener("click", () => {
                scoreDiv.style.top = "-100%"
            })

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
            
        })
        wordsHandler.domElements.getAllWords = document.querySelectorAll(".word")
        wordsHandler.domElements.getAllLetters = document.querySelectorAll(".letter")
        wordsHandler.accuracyCounter = 0
    },

    changeWordsNumber: () => {
        wordsHandler.domElements.getAllOptionsNumber.forEach(opt => {
            opt.addEventListener("click", () => {
                wordsHandler.domElements.getAllOptionsNumber.forEach(btn => { 
                    btn.classList.remove("option__number--active")
                })
                opt.classList.add("option__number--active")
                wordsHandler.options.wordsNumber = Number(opt.textContent)
                wordsHandler.restartTest()
            })
        })
    },

    restartTest: () => {
        wordsHandler.domElements.getAllWords.forEach(word => {
            word.remove()
        })
        wordsHandler.wordIndex = 0;
        wordsHandler.letterIndex = 0;
        wordsHandler.caretIndex = 0;
        wordsHandler.domElements.wordInput.value = ""
        wordsHandler.getRandomWords()
        wordsHandler.handleCaret()
    },

    createCaret: () => {
        const caret = document.createElement("div")
        caret.classList.add("caret")
        wordsHandler.domElements.wordContainer.appendChild(caret)
        wordsHandler.domElements.caret = document.querySelector(".caret")
        wordsHandler.handleCaret()
    },

    handleCaret: (isEndWord = false, checkLetter) => {
        const letter = wordsHandler.domElements.getAllLetters[wordsHandler.caretIndex]
        let letterPosY = letter.getBoundingClientRect().top
        let letterPosX = letter.getBoundingClientRect().left
        let letterWidth = letter.getBoundingClientRect().width

        if(!isEndWord) {
            wordsHandler.domElements.caret.style.top = `${letterPosY + 10}px`
            wordsHandler.domElements.caret.style.left = `${letterPosX}px`
        }else {
            switch(checkLetter) {
                case("t"):
                    wordsHandler.domElements.caret.style.top = `${letterPosY + 10}px`
                    wordsHandler.domElements.caret.style.left = `${letterPosX + 10}px`
                    break
                case("m"):
                    wordsHandler.domElements.caret.style.top = `${letterPosY + 10}px`
                    wordsHandler.domElements.caret.style.left = `${letterPosX + 25}px`
                    break
                case("l"):
                    wordsHandler.domElements.caret.style.top = `${letterPosY + 10}px`
                    wordsHandler.domElements.caret.style.left = `${letterPosX + 5}px`
                    break
                default:
                    wordsHandler.domElements.caret.style.top = `${letterPosY + 10}px`
                    wordsHandler.domElements.caret.style.left = `${letterPosX + 15}px`
                    break
            }
            
        }
        
    },

    calculateWPM: () => {
        const allCorrectLetters = document.querySelectorAll(".letter--correct").length;
        const allIncorrectLetters = document.querySelectorAll(".letter--incorrect").length;
        
        const totalCorrectLetters = allCorrectLetters + allIncorrectLetters;
        const elapsedTimeInSeconds = (wordsHandler.EndedTime - wordsHandler.startedTime) / 1000;
    
        wordsHandler.rawWPM = ((totalCorrectLetters / 5) / (elapsedTimeInSeconds / 60)).toFixed(2); 
        wordsHandler.netWPM = ((allCorrectLetters / 5) / (elapsedTimeInSeconds / 60)).toFixed(2); 
    },

    caluclateAccuracy: () => {
        

        const totalLetters = wordsHandler.domElements.getAllLetters.length
        const incorrectCount = wordsHandler.accuracyCounter
        
        const accuracy = (1 - (incorrectCount / totalLetters)) * 100
        wordsHandler.accuracy = accuracy.toFixed(2)
        
    },

    displayResult: () => {

        const spanRaw = document.getElementById("spanRaw")
        const spanNet = document.getElementById("spanNet")
        const spanAccuracy = document.getElementById("spanAccuracy")
        const closeBtn = document.getElementById("closeResult")

        spanRaw.textContent = wordsHandler.rawWPM
        spanNet.textContent = wordsHandler.netWPM
        if(wordsHandler.accuracy < 1) {
            spanAccuracy.textContent = `0%`
        }else {
            spanAccuracy.textContent = `${wordsHandler.accuracy}%`
        }

        wordsHandler.domElements.resultDiv.style.top = "0"

        closeBtn.addEventListener("click", () => {
            wordsHandler.domElements.resultDiv.style.top = "-100%"
        })

    },

    handleScore: () => {
        class Score {
            constructor(raw, net) {
                this.raw = raw;
                this.net = net;
            }
        }
    
        const rawWPM = wordsHandler.rawWPM;
        const netWPM = wordsHandler.netWPM;
    
        try {
            if (localStorage.score) {
                const getStoredScore = JSON.parse(localStorage.score);
                if (getStoredScore.raw < rawWPM && getStoredScore.net < netWPM) {
                    const newScore = new Score(rawWPM, netWPM);
                    localStorage.score = JSON.stringify(newScore);
                }
            } else {
                const newScore = new Score(rawWPM, netWPM);
                localStorage.score = JSON.stringify(newScore);
            }
        } catch (error) {
            console.error("Error handling score:", error);

        }
    },

    displayScore: () => {
        const scoreRaw = document.getElementById("scoreRaw");
        const scoreNet = document.getElementById("scoreNet");
    
        if (!localStorage.score) {
            scoreRaw.textContent = `0 wpm`;
            scoreNet.textContent = `0 wpm`;
        } else {
            try {
                const scores = JSON.parse(localStorage.score);
                scoreNet.textContent = `${scores.net} wpm`;
                scoreRaw.textContent = `${scores.raw} wpm`;
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }
    },
    


    handleInput: (event) => {
        
        const SPACE_KEYCODE = 32
        const DEL_KEYCODE = 8

        let input = wordsHandler.domElements.wordInput
        
        let currentWord = wordsHandler.domElements.getAllWords[wordsHandler.wordIndex]
        let allSpanLetters = currentWord.querySelectorAll(".letter")

        let regex = /(tab|shift|escape|control|window|enter|right\shift|alt|fn|caps|cmd|fleche\sdirectionnelle)/;

        if (regex.test(event.key.toLowerCase())) {
            // Empêche l'action par défaut de la touche
            event.preventDefault();
            console.log("Vous ne pouvez pas utiliser cette touche.");
        }else {
            if(!wordsHandler.isTestStarted) {
                wordsHandler.startedTime = new Date().getTime()
                wordsHandler.isTestStarted = true
            }
            if(event.key === allSpanLetters[wordsHandler.letterIndex].textContent) {
                
                allSpanLetters[wordsHandler.letterIndex].classList.add("letter--correct")
                if(wordsHandler.letterIndex != currentWord.textContent.length -1 ) {
                    wordsHandler.letterIndex++
                    wordsHandler.caretIndex++
                    wordsHandler.handleCaret()
                }else {
                    wordsHandler.handleCaret(true, event.key)
                }
                
            }else if (event.keyCode === SPACE_KEYCODE || event.keyCode === DEL_KEYCODE){
                event.preventDefault()
                if(event.keyCode === SPACE_KEYCODE) {
                    if(wordsHandler.wordIndex === wordsHandler.domElements.getAllWords.length - 1) {
                        wordsHandler.EndedTime = new Date().getTime()
                        wordsHandler.wordIndex = 0
                        wordsHandler.calculateWPM()
                        wordsHandler.caluclateAccuracy()
                        wordsHandler.isTestStarted = false
                        wordsHandler.handleScore()
                        wordsHandler.displayResult()
                        wordsHandler.domElements.wordInput.blur()
                        wordsHandler.accuracy = 0;
                    }else {
                        if(input.value.length === currentWord.textContent.length) {
                            if(input.value === currentWord.textContent) {
                                currentWord.classList.add("word--correct")
                            }else {
                                currentWord.classList.add("word--incorrect")
                                wordsHandler.accuracyCounter++
                            }
                            wordsHandler.wordIndex++
                            wordsHandler.caretIndex++
                            wordsHandler.handleCaret()
                            wordsHandler.letterIndex = 0
                            input.value = ""
                        }else {
                            input.value += " "
                            allSpanLetters[wordsHandler.letterIndex].classList.add("letter--incorrect")
                            if(wordsHandler.letterIndex != currentWord.textContent.length -1 ) {
                                wordsHandler.letterIndex++
                                wordsHandler.caretIndex++
                                wordsHandler.handleCaret()
                                wordsHandler.accuracyCounter++
                            }else {
                                wordsHandler.handleCaret(true, allSpanLetters[wordsHandler.letterIndex].textContent)
                            }
                        }
                    }
                    
                }else if(event.keyCode === DEL_KEYCODE) {
                    if(wordsHandler.letterIndex > 0) {
                        if(input.value.length === currentWord.textContent.length) {
                            allSpanLetters[wordsHandler.letterIndex].classList.remove("letter--correct", "letter--incorrect")
                            input.value = input.value.slice(0, -1)
                            wordsHandler.handleCaret()
                        }else {
                            allSpanLetters[wordsHandler.letterIndex - 1].classList.remove("letter--correct", "letter--incorrect")
                            input.value = input.value.slice(0, -1)
                            wordsHandler.letterIndex = wordsHandler.letterIndex - 1
                            wordsHandler.caretIndex = wordsHandler.caretIndex - 1
                            wordsHandler.handleCaret()
                        }
                    }
                }
                
                
            }else {
                allSpanLetters[wordsHandler.letterIndex].classList.add("letter--incorrect")
                wordsHandler.accuracyCounter++
                if(wordsHandler.letterIndex != currentWord.textContent.length -1 ) {
                    wordsHandler.letterIndex++
                    wordsHandler.caretIndex++
                    wordsHandler.handleCaret()
                    
                }else {
                    wordsHandler.handleCaret(true, allSpanLetters[wordsHandler.letterIndex].textContent)
                    
                }
            }
        }

        


    }

}

window.onload = () => {
    wordsHandler.init();
};

