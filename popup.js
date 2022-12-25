
document.getElementById("Gen-generate").addEventListener("click", () => {
    console.log("Generate Button Clicked");
    let text = document.getElementById("Gen-text").value;
    let dropdown = document.getElementById("Gen-dropdown").value;
    if (dropdown == "Summarizer") {
        document.getElementById("Gen-result").value = "Coming Soon..... ";
        return;
    }
    if (text.length > 0) {
        chrome.runtime.sendMessage({ text: text, dropdown: dropdown }, (response) => {
            console.log(response);
            let result = response.result;
            document.getElementById("Gen-result").value = result;
        });
    }
    
});

document.getElementById("Gen-clear").addEventListener("click", () => {
    document.getElementById("Gen-text").value = "";
    document.getElementById("Gen-result").value = "";
}   
);
