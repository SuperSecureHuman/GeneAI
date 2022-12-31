let result_history = [""];

document.getElementById("Gen-generate").addEventListener("click", () => {
    console.log("Generate Button Clicked");
    let text = document.getElementById("Gen-Input").value;
    let dropdown = document.getElementById("Gen-dropdown").value;
    if (result_history.length == 1) {
        result_history.push(text);
    }
    text = result_history[result_history.length - 1];
    if (dropdown == "generate") {

        if (text.length > 0) {
            chrome.runtime.sendMessage({ text: text, dropdown: dropdown }, (response) => {
                console.log(response);
                let result = response.result;
                result_history.push(result);

                let i = 0;
                let nspeed = 10;
                function typeWriter() {
                    text = response.result;

                    if (i < text.length) {
                        if (i < result_history[result_history.length - 2].length) {
                            nspeed = 0;
                        }
                        else {
                            nspeed = 10;
                        }
                        i++;
                        document.getElementById("Gen-result").value = text.substring(0, i);
                        setTimeout(typeWriter, nspeed);
                    }
                }

                typeWriter();
                console.log("Temp:" + text);
            });
        }
    }
    else if (dropdown == "ParaPhraser") {
        let tone = document.getElementById("Tone-dropdown").value;
        if (text.length > 0) {
            chrome.runtime.sendMessage({ text: text, dropdown: dropdown, tone: tone }, (response) => {
                console.log(response);
                let i = 0;
                let nspeed = 10;
                function typeWriter() {
                    text = response.result;
                    if (i < text.length) {
                        i++;
                        document.getElementById("Gen-result").value = text.substring(0, i);
                        setTimeout(typeWriter, nspeed);
                    }
                }
                typeWriter();

            });
        }
    }

    else if (dropdown == "SummarizerV2") {
        let number = document.getElementById("Gen-number").value;
        if (text.length > 0) {
            chrome.runtime.sendMessage({ text: text, dropdown: dropdown, number: number }, (response) => {
                console.log(response);
                let i = 0;
                let nspeed = 10;
                function typeWriter() {
                    text = response.result;
                    i++;
                    document.getElementById("Gen-result").value = text.substring(0, i);
                    setTimeout(typeWriter, nspeed);
                }
                typeWriter();
            });
        }
    }

});

document.getElementById("Gen-dropdown").addEventListener("change", () => {
    let dropdown = document.getElementById("Gen-dropdown").value;
    if (dropdown == "SummarizerV2") {
        document.getElementById("Gen-generate").innerHTML = "Summarize it";
        document.getElementById("Gen-number").hidden = false;
        document.getElementsByClassName("select-dropdown")[1].hidden = true;
        document.getElementById("Gen-Input").placeholder = "Enter the text to summarize";

    } else if (dropdown == "generate") {
        document.getElementById("Gen-generate").innerHTML = "Generate it";
        document.getElementById("Gen-number").hidden = true;
        document.getElementsByClassName("select-dropdown")[1].hidden = true;

    }
    else if (dropdown == "ParaPhraser") {
        document.getElementById("Gen-generate").innerHTML = "Paraphrase it";
        document.getElementsByClassName("select-dropdown")[1].hidden = false;
        document.getElementById("Gen-number").hidden = true;
        document.getElementById("Gen-Input").placeholder = "Enter the text to paraphrase";

    }

});


document.getElementById('copyToClipboard-a').addEventListener('click', () => {
    let text = document.getElementById("Gen-result").value;
    if (text.length > 0) {
        navigator.clipboard.writeText(text);
    }
    document.getElementById("")
});



document.getElementById("Gen-clear").addEventListener("click", () => {
    document.getElementById("Gen-Input").value = "";
    document.getElementById("Gen-result").value = "";
    result_history = [""];
}
);
