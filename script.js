/* API PARA RECONHECIMENTO DE VOZ */
const card_text = document.getElementById("text");
const btn_mic_on = document.getElementById("btn-mic-on");
const btn_mic_off = document.getElementById("btn-mic-off");
const btn_remove = document.getElementById("btn-remove");
const btn_down = document.getElementById("btn-down");

class SpeechApi {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    this.speechApi = new SpeechRecognition()
    this.output = card_text.output
    this.speechApi.continuous = true
    this.speechApi.lang = "pt-BR"

    this.speechApi.onresult = e => {
      console.log(e);
      let resultIndex = e.resultIndex;
      let transcript = e.results[resultIndex][0].transcript;

      card_text.value += transcript
    };
  };

  start() {
    this.speechApi.start();
  };

  stop() {
    this.speechApi.stop();
  };
};

const speech = new SpeechApi();

btn_mic_on.addEventListener("click", () => {
  btn_mic_on.disabled = true;
  btn_mic_off.disabled = false;
  speech.start();
});

btn_mic_off.addEventListener("click", () => {
  btn_mic_on.disabled = false;
  btn_mic_off.disabled = true;
  speech.stop();
});

btn_remove.addEventListener("click", () => {
  card_text.value = "";
});

function download(text, filename) {
  const element = document.createElement("a");

  element.setAttribute("href", `data:text/plaincharset=utf-8, ${encodeURIComponent(text)}` );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

btn_down.addEventListener("click", () => {
  const text = card_text.value;
  const filename = "speech.text";
  
  download(text, filename)
});
