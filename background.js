/*
TODO: Summarizers,ParaPhaser
*/

chrome.contextMenus.create({
  id: "Generate",
  title: "Generate Text",
  contexts: ["all"],
});

// "https://api-inference.huggingface.co/models/gpt2",
// "https://api-inference.huggingface.co/models/EleutherAI/gpt-j-6B",

async function Generator(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/bigscience/bloom",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    
    }
  );
  const result = await response.json();
  return result;
}

async function ParaPhaser(text,tone) {
  const response=await fetch(
    "https://www.everyprompt.com/api/v0/calls/gene-ai/paraphraser-nMFO5t",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer jOjKAhl6_idAGYiie900L",
      },
      body: JSON.stringify({
        "variables": {
          "paragraph": `${text}`,
          "tone": `${tone}`,
        },
        "user": "testing"
      }),
    }
  );
  const result=await response.json();
  console.log(result);
  return result;
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "Generate") {
    console.log("Input");
    console.log(info.selectionText);
    Generator({ inputs: info.selectionText }).then((response) => {
      console.log("Generated From Background.js");
      console.log(response[0].generated_text);
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let text = request.text;
  let dropdown = request.dropdown;
  let key_number=   request.number;
  let tone=request.tone;
  if (dropdown == "generate"){

    Generator({ inputs: text }).then((response) => {
      let result = response[0].generated_text;
      sendResponse({ result: result });
      console.log(response[0].generated_text);
    });
  }
  else if (dropdown == "ParaPhraser"){
    console.log("ParaPhaser");
    ParaPhaser(text,key_number,tone).then((response) => {
      let result = response;
      sendResponse({ result: result.choices[0].text });
      console.log(result);
    });
  }
  return true;
});
