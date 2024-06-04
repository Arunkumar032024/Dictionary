// defined constants variable
const searchBtn = document.querySelector("#btn");
const inputText = document.querySelector("#input");
const error = document.querySelector(".error");
const output = document.querySelector(".output-box")
const outputWord = document.querySelector(".output h4")
const speakBtn = document.querySelector(".output .fa-volume-high")
const crossBtn = document.querySelector(".fa-circle-xmark");

// defined async function to fetch data from api
async function getData(word) {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    let response = await fetch(url);
    error.style.visibility = 'visible'
    error.innerText = "Fetching data...";
    // if response is success then show the result outherwise not
    if(response.status === 200){
        error.style.visibility = 'hidden';
        error.innerText = "";
        let parseData = await response.json();
        output.classList.remove("hide")
        outputWord.innerText = parseData[0].word;
        parseData[0].phonetics.forEach(value => {
            if(value.text != "" && value.text != undefined){
                output.querySelector(".output").classList.remove("hide")
                document.querySelector(".output p").innerText = value.text
            }
        })
        parseData[0].meanings.forEach(value => {
            if(value.definitions[0].definition != "" && value.definitions[0].definition != undefined){
                output.querySelector(".meaning").classList.remove("hide")
                document.querySelector(".meaning p").innerText = value.definitions[0].definition
            }
        });
        parseData[0].meanings.forEach(value => {
            if(value.definitions[0].example != "" && value.definitions[0].example != undefined){
                output.querySelector(".example").classList.remove("hide")
                document.querySelector(".example p").innerText = value.definitions[0].example
            }
        });
        parseData[0].meanings.forEach(value => {
            if(value.synonyms != "" && value.synonyms != undefined){
                output.querySelector(".synonyms").classList.remove("hide")
                document.querySelector(".synonyms p").innerText = value.synonyms.join(", ");
            }
        });
        parseData[0].meanings.forEach(value => {
            if(value.antonyms != "" && value.antonyms != undefined){
                output.querySelector(".antonyms").classList.remove("hide")
                document.querySelector(".antonyms p").innerText = value.antonyms.join(", ");
            }
        });
    }else{
        showError('server error...')
    }
    
}

// defined a showError() function which show an error for a particular time of period
function showError(err) {
    error.style.visibility = 'visible';
    error.innerText = `${err}`;
    setTimeout(() => {
        error.style.visibility = 'hidden';
    }, 1500);
}


// added a click event on cross button which happen input box empty
crossBtn.addEventListener("click", ()=>{
    inputText.value = '';
    crossBtn.classList.add("hide");
})


// added a click event on search button to fetch data from api
searchBtn.addEventListener("click", () => {
    if (inputText.value != '') {
        getData(inputText.value);
    } else {
        showError('Please enter a word!...')
    }
})

// added a focus event which hide the result box
inputText.addEventListener("focus", () => {
    output.classList.add("hide");
    crossBtn.classList.remove("hide")
})

// defined a wordSpeak() function which speak the word 
function wordSpeak(word){
    let speech = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(speech);
}

// added a click event which call the wordSpeak() function 
speakBtn.addEventListener("click", () => {
    wordSpeak(outputWord.innerText);
})
