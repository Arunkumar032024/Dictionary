const searchBtn = document.querySelector("#btn");
const inputText = document.querySelector("#input");
const error = document.querySelector(".error");
const output = document.querySelector(".output-box")
const outputWord = document.querySelector(".output h4")
const speakBtn = document.querySelector(".output .fa-volume-high")
const crossBtn = document.querySelector(".fa-circle-xmark");
async function getData(word) {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    let response = await fetch(url);
    error.classList.remove("hide");
    error.innerText = "Fetching data...";
    if(response.status === 200){
        error.classList.add("hide");
        error.innerText = "";
        let parseData = await response.json();
        output.classList.remove("hide");
        outputWord.innerText = parseData[0].word;
        console.log(parseData[0])
        parseData[0].phonetics.forEach(value => {
            if(value.text != ""){
                document.querySelector(".output p").innerText = value.text
            }
        })
        parseData[0].meanings.forEach(value => {
            if(value.definitions[0].definition != ""){
                document.querySelector(".meaning p").innerText = value.definitions[0].definition
            }
        });
    }else{
        showError('server error...')
    }
    
}

function showError(err) {
    error.style.visibility = 'visible';
    error.innerText = `${err}`;
    setTimeout(() => {
        error.style.visibility = 'hidden';
    }, 1500);
}

crossBtn.addEventListener("click", ()=>{
    inputText.value = '';
    crossBtn.classList.add("hide");
})

searchBtn.addEventListener("click", () => {
    if (inputText.value != '') {
        getData(inputText.value);
    } else {
        showError('Please enter a word!...')
    }
})

inputText.addEventListener("focus", () => {
    output.classList.add("hide");
    crossBtn.classList.remove("hide")
})

function wordSpeak(word){
    let speech = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(speech);
}

speakBtn.addEventListener("click", () => {
    wordSpeak(outputWord.innerText);
})
