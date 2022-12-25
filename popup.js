let temp=[];


document.getElementById("Gen-generate").addEventListener("click", () => {
    console.log("Generate Button Clicked");
    let text = document.getElementById("Gen-text").value;
    let dropdown = document.getElementById("Gen-dropdown").value;
    if (dropdown=="generate"){

        if (text.length > 0) {
            chrome.runtime.sendMessage({ text: text, dropdown: dropdown }, (response) => {
                console.log(response);
                let result = response.result;
                document.getElementById("Gen-result").value = result;
                temp.push(result);
                console.log("Temp:"+text);
                document.getElementById("Gen-text").value = result;
            });
        }
    }
    else if (dropdown=="Summarizer"){
        if (text.length > 0) {
            chrome.runtime.sendMessage({ text: text, dropdown: dropdown }, (response) => {
                console.log(response);
                let result = response.result;
                document.getElementById("Gen-result").value = result;
                temp.push(result);
            });
        }
    }
        
});

document.getElementById("Gen-dropdown").addEventListener("change", () => {
    let dropdown = document.getElementById("Gen-dropdown").value;
    if (dropdown == "Summarizer") {
        document.getElementById("Gen-generate").innerHTML = "Summarize";
    } else {
        document.getElementById("Gen-generate").innerHTML = "Generate";
    }

});

document.getElementById("Undo").addEventListener("click", () => {
    console.log("Undo Button Clicked");
    // replace the text in the text box with the last text in the temp array
    document.getElementById("Gen-text").value = temp[temp.length - 2];
    // remove the last element from the temp array
    temp.pop();
    // clear the result text box
    document.getElementById("Gen-result").value = "";
});



document.getElementById("Gen-clear").addEventListener("click", () => {
    document.getElementById("Gen-text").value = "";
    document.getElementById("Gen-result").value = "";
}   
);
