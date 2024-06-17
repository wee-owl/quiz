const linkPlay = document.querySelector('.link__to-play');
const againBtn = document.querySelector('.start__btn-again');
const resultFelici = document.querySelector('.result__felici');
const resultText = document.querySelector('.result__text');
const resultGif = document.querySelector('.result__gif');
const audioZero = new Audio('../assets/0ballov.mp3');
const audioWin = new Audio('../assets/win.mp3');
let getResultScore = localStorage.getItem('resultScore');


function playZero() {
  audioZero.currentTime = 0;
  audioZero.play();
}

function playWin() {
  audioWin.currentTime = 0;
  audioWin.play();
}

if (+getResultScore === 0) {
  playZero();
  resultFelici.innerHTML = "Печалька!";
  resultFelici.style.color = "rgb(150, 20, 20)";
  resultFelici.style.textShadow = "0px 0px 20px rgba(20, 20, 20, 0.5)";
  resultText.innerHTML = "Вы не прошли квиз... Ваш результат 0 баллов";
  resultGif.src = "https://i.gifer.com/3n7y.gif";
  againBtn.innerHTML = "Играть снова!";
  linkPlay.href = "main.html";
} else if (+getResultScore === 30) {
  playWin();
  resultFelici.innerHTML = "Поздравляем!";
  resultText.innerHTML = "Вы прошли квиз и набрали 30 баллов!";
  resultGif.src = "https://i.gifer.com/5lfT.gif";
  againBtn.innerHTML = "На главную";
  linkPlay.href = "../index.html";
} else {
  playWin();
  resultFelici.innerHTML = "Поздравляем!";
  resultText.innerHTML = `Вы прошли квиз и набрали ${getResultScore} из 30 баллов`;
  resultGif.src = "https://i.gifer.com/6r2l.gif";
  againBtn.innerHTML = "Играть снова!";
  linkPlay.href = "main.html";
}

againBtn.addEventListener('click', () => {
  if (+getResultScore === 30) {
    window.location.href = '../index.html';
  } else {
    window.location.href = 'main.html';
  }
});