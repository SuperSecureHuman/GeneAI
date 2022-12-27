let result_history=[""];

document.getElementById("Gen-generate").addEventListener("click", () => {
    console.log("Generate Button Clicked");
    let text = document.getElementById("Gen-text").value;
    let dropdown = document.getElementById("Gen-dropdown").value;
    if(result_history.length==1){
        result_history.push(text);
    }
    text=result_history[result_history.length-1];
    if (dropdown=="generate"){

        if (text.length > 0) {
            chrome.runtime.sendMessage({ text: text, dropdown: dropdown }, (response) => {
                console.log(response);
                let result = response.result;
                result_history.push(result);

                let i=0;
                let nspeed = 10;
                function typeWriter() {
                    text=response.result;

                    if (i < text.length) {
                        if(i<result_history[result_history.length-2].length){
                            nspeed=0;
                        }
                        else{
                            nspeed=10;
                        }
                        i++;
                        document.getElementById("Gen-result").value = text.substring(0, i);
                        setTimeout(typeWriter, nspeed);
                    }
                }

                typeWriter();
                console.log("Temp:"+text);
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

// document.getElementById("Undo").addEventListener("click", () => {
//     console.log("Undo Button Clicked");
//     // replace the text in the text box with the last text in the temp array
//     document.getElementById("Gen-text").value = temp[temp.length - 2];
//     // remove the last element from the temp array
//     temp.pop();
//     // clear the result text box
//     document.getElementById("Gen-result").value = "";
// });



document.getElementById("Gen-clear").addEventListener("click", () => {
    document.getElementById("Gen-text").value = "";
    document.getElementById("Gen-result").value = "";
    result_history=[""];
}   
);
