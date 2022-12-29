import { birdsData } from "./birds.js";

const questionItem = document.querySelectorAll('.question__item');
const answerItems = document.querySelectorAll('.answer__item');
const answerLabel = document.querySelectorAll('.answer__label');
const answerInput = document.querySelectorAll('.answer__input');
const playerImg = document.querySelector('.player__img');
const playerBirdname = document.querySelector('.player__birdname');
const playerSource = document.querySelector('.player__source');
const descImg = document.querySelector('.description__img');
const descBirdname = document.querySelector('.description__birdname');
const descSpecies = document.querySelector('.description__species');
const descSource = document.querySelector('.description__source');
const descText = document.querySelector('.description__text');
const score = document.querySelector('.score');
const levelBtn = document.querySelector('.next-level__btn');
const audioRight = new Audio('../assets/right.mp3');
const audioWrong = new Audio('../assets/error.mp3');


function animateDescImg() {
  answerItems.forEach((answerItem, k) => {
    answerItem.addEventListener('click', () => {
      document.querySelector('.description__img').classList.add('animation');
      setTimeout(function() {
        document.querySelector('.description__img').classList.remove('animation');
      }, 1000);
    });
  });
}

function animatePlayerImg() {
  playerImg.classList.add('animation');
  setTimeout(function() {
    playerImg.classList.remove('animation');
  }, 1000);
}

function playRight() {
  audioRight.currentTime = 0;
  audioRight.play();
}

function pauseRight() {
  audioRight.pause();
}

function playWrong() {
  audioWrong.currentTime = 0;
  audioWrong.play();
}

function pauseWrong() {
  audioWrong.pause();
}

function playerPause() {
  playerSource.pause();
}


let randomBird0 = birdsData[0][Math.floor(Math.random() * birdsData[0].length)];
playerSource.src = `${randomBird0.audio}`;
console.log(randomBird0.name);
let step0 = 0;

answerItems.forEach((answerItem, k) => {
  answerItem.addEventListener('click', () => {
    answerLabel.forEach((answer, i) => {
      if ((answer.textContent === randomBird0.name) && (i === k)) {
        playerPause();
        pauseWrong();
        playRight();
        answerInput.forEach((input, j) => {
          if (j === i) {
            answer.classList.add('answer__label-true');
            input.classList.add('answer__input-true');
            if (step0 > 5) {
              score.innerHTML = 0;
            } else {
              score.innerHTML = `${5 - step0}`;
            }
          }
        });
        levelBtn.disabled = false;
        playerImg.src = `${birdsData[0][i].image}`;
        playerImg.style.border = "2px solid rgb(120, 120, 120)";
        playerImg.style.boxShadow = "0px 0px 20px 0px rgba(20, 20, 20, 0.5)";
        playerBirdname.innerHTML = `${birdsData[0][i].name}`;
        animatePlayerImg();
      } else if ((answer.textContent !== randomBird0.name) && (levelBtn.disabled === true) && (i === k)) {
        pauseRight();
        playWrong();
        answerInput.forEach((input, j) => {
          if (j === i) {
            input.classList.add('answer__input-false');
            step0 += 1;
          }
        });
      } else if ((answer.textContent !== randomBird0.name) && (levelBtn.disabled !== true) && (i === k)) {
        pauseRight();
        pauseWrong();
        answerInput.forEach((input, j) => {
          if (j === i) {
            input.classList.add('answer__input-base');
          }
        });
      }
    });
  }, {once: true});

  answerItem.addEventListener('click', () => {
    answerLabel.forEach((answer, i) => {
        if (i === k) {
            document.querySelector('.description__lead-in').style.display = 'none';
            document.querySelector('.description__photo').style.display = 'block';
            document.querySelector('.description__block').style.display = 'flex';
            document.querySelector('.description').style.minHeight = '370px';

            descImg.src = `${birdsData[0][i].image}`;
            descBirdname.innerHTML = `${birdsData[0][i].name}`;
            descSpecies.innerHTML = `${birdsData[0][i].species}`;
            descSource.src = `${birdsData[0][i].audio}`;
            descText.innerHTML = `${birdsData[0][i].description}`;
            animateDescImg();
        }
    });
  });
});

levelBtn.addEventListener('click', () => {
  if (!levelBtn.disabled) {
    if (questionItem[0].classList.contains('question__item-active')) {
      questionItem[1].classList.add('question__item-active');
      questionItem[0].classList.remove('question__item-active');
      questionItem[2].classList.remove('question__item-active');
      questionItem[3].classList.remove('question__item-active');
      questionItem[4].classList.remove('question__item-active');
      questionItem[5].classList.remove('question__item-active');
      playerImg.src = "../assets/bird_cover.svg";
      playerImg.style.border = "none";
      playerImg.style.boxShadow = "none";
      playerBirdname.innerHTML = "*******";
      descImg.src = "#0";
      descBirdname.innerHTML = "*******";
      descSpecies.innerHTML = "*******";
      descSource.src = "#0";

      let randomBird1 = birdsData[1][Math.floor(Math.random() * birdsData[1].length)];
      playerSource.src = `${randomBird1.audio}`;
      console.log(randomBird1.name);

      document.querySelector('.description__lead-in').style.display = 'block';
      document.querySelector('.description__photo').style.display = 'none';
      document.querySelector('.description__block').style.display = 'none';
      document.querySelector('.description').style.minHeight = '';
      levelBtn.disabled = true;

      answerLabel.forEach((label, j) => {
        answerLabel[j].innerHTML = `${birdsData[1][j].name}`;
        answerLabel[j].classList.remove('answer__label-true');
      });

      answerInput.forEach((input, i) => {
        answerInput[i].classList.remove('answer__input-true');
        answerInput[i].classList.remove('answer__input-false');
        answerInput[i].classList.remove('answer__input-base');
        answerInput[i].checked = false;
      });

      let result = Number(score.innerHTML);
      let step1 = 0;

      answerItems.forEach((answerItem, k) => {
        answerItem.addEventListener('click', () => {
          answerLabel.forEach((answer, i) => {
            if ((answer.textContent === randomBird1.name) && (i === k)) {
              playerPause();
              pauseWrong();
              playRight();
              answerInput.forEach((input, j) => {
                if (j === i) {
                  answer.classList.add('answer__label-true');
                  input.classList.add('answer__input-true');
                  input.classList.remove('answer__input-false');
                  if (step1 > 5) {
                    score.innerHTML = `${result}`;
                  } else {
                    score.innerHTML = `${result + 5 - step1}`;
                  }
                }
              });
              levelBtn.disabled = false;
              playerImg.src = `${birdsData[1][i].image}`;
              playerImg.style.border = "2px solid rgb(120, 120, 120)";
              playerImg.style.boxShadow = "0px 0px 20px 0px rgba(20, 20, 20, 0.5)";
              playerBirdname.innerHTML = `${birdsData[1][i].name}`;
              animatePlayerImg();
            } else if ((answer.textContent !== randomBird1.name) && (levelBtn.disabled === true) && (i === k)) {
              pauseRight();
              playWrong();
              answerInput.forEach((input, j) => {
                if (i === j) {
                  input.classList.add('answer__input-false');
                  step1 += 1;
                }
              });
            } else if ((answer.textContent !== randomBird1.name) && (levelBtn.disabled !== true) && (i === k)) {
              pauseRight();
              pauseWrong();
              answerInput.forEach((input, j) => {
                if (i === j) {
                  input.classList.add('answer__input-base');
                }
              });
            }
          });
        }, {once: true});

        answerItem.addEventListener('click', () => {
          answerLabel.forEach((answer, i) => {
            if (i === k) {
              document.querySelector('.description__lead-in').style.display = 'none';
              document.querySelector('.description__photo').style.display = 'block';
              document.querySelector('.description__block').style.display = 'flex';
              document.querySelector('.description').style.minHeight = '370px';

              descImg.src = `${birdsData[1][i].image}`;
              descBirdname.innerHTML = `${birdsData[1][i].name}`;
              descSpecies.innerHTML = `${birdsData[1][i].species}`;
              descSource.src = `${birdsData[1][i].audio}`;
              descText.innerHTML = `${birdsData[1][i].description}`;
              animateDescImg();
            }
          });
        });
      });

    } else if (questionItem[1].classList.contains('question__item-active')) {
      questionItem[2].classList.add('question__item-active');
      questionItem[0].classList.remove('question__item-active');
      questionItem[1].classList.remove('question__item-active');
      questionItem[3].classList.remove('question__item-active');
      questionItem[4].classList.remove('question__item-active');
      questionItem[5].classList.remove('question__item-active');
      playerImg.src = "../assets/bird_cover.svg";
      playerImg.style.border = "none";
      playerImg.style.boxShadow = "none";
      playerBirdname.innerHTML = "*******";
      descImg.src = "#0";
      descBirdname.innerHTML = "*******";
      descSpecies.innerHTML = "*******";
      descSource.src = "#0";

      let randomBird2 = birdsData[2][Math.floor(Math.random() * birdsData[2].length)];
      playerSource.src = `${randomBird2.audio}`;
      console.log(randomBird2.name);

      document.querySelector('.description__lead-in').style.display = 'block';
      document.querySelector('.description__photo').style.display = 'none';
      document.querySelector('.description__block').style.display = 'none';
      document.querySelector('.description').style.minHeight = '';
      levelBtn.disabled = true;

      answerLabel.forEach((label, j) => {
        answerLabel[j].innerHTML = `${birdsData[2][j].name}`;
      });

      answerInput.forEach((input, i) => {
        answerInput[i].classList.remove('answer__input-true');
        answerInput[i].classList.remove('answer__input-false');
        answerInput[i].classList.remove('answer__input-base');
        answerInput[i].checked = false;
      });

      answerLabel.forEach((label, i) => {
        answerLabel[i].classList.remove('answer__label-true');
      });

      let result = Number(score.innerHTML);
      let step2 = 0;

      answerItems.forEach((answerItem, k) => {
        answerItem.addEventListener('click', () => {
          answerLabel.forEach((answer, i) => {
            if ((answer.textContent === randomBird2.name) && (i === k)) {
              playerPause();
              playerPause();
              pauseWrong();
              playRight();
              answerInput.forEach((input, j) => {
                if (j === i) {
                  answer.classList.add('answer__label-true');
                  input.classList.add('answer__input-true');
                  input.classList.remove('answer__input-false');
                  if (step2 > 5) {
                    score.innerHTML = `${result}`;
                  } else {
                    score.innerHTML = `${result + 5 - step2}`;
                  }
                }
              });
              levelBtn.disabled = false;
              playerImg.src = `${birdsData[2][i].image}`;
              playerImg.style.border = "2px solid rgb(120, 120, 120)";
              playerImg.style.boxShadow = "0px 0px 20px 0px rgba(20, 20, 20, 0.5)";
              playerBirdname.innerHTML = `${birdsData[2][i].name}`;
              animatePlayerImg();
            } else if ((answer.textContent !== randomBird2.name) && (levelBtn.disabled === true) && (i === k)) {
              pauseRight();
              playWrong();
              answerInput.forEach((input, j) => {
                if (i === j) {
                  input.classList.add('answer__input-false');
                  step2 += 1;
                }
              });
            } else if ((answer.textContent !== randomBird2.name) && (levelBtn.disabled !== true) && (i === k)) {
              pauseRight();
              pauseWrong();
              answerInput.forEach((input, j) => {
                if (i === j) {
                  input.classList.add('answer__input-base');
                }
              });
            }
          });
        }, {once: true});

        answerItem.addEventListener('click', () => {
          answerLabel.forEach((answer, i) => {
            if (i === k) {
              document.querySelector('.description__lead-in').style.display = 'none';
              document.querySelector('.description__photo').style.display = 'block';
              document.querySelector('.description__block').style.display = 'flex';
              document.querySelector('.description').style.minHeight = '370px';

              descImg.src = `${birdsData[2][i].image}`;
              descBirdname.innerHTML = `${birdsData[2][i].name}`;
              descSpecies.innerHTML = `${birdsData[2][i].species}`;
              descSource.src = `${birdsData[2][i].audio}`;
              descText.innerHTML = `${birdsData[2][i].description}`;
              animateDescImg();
            }
          });
        });
      });

    } else if (questionItem[2].classList.contains('question__item-active')) {
      questionItem[3].classList.add('question__item-active');
      questionItem[0].classList.remove('question__item-active');
      questionItem[1].classList.remove('question__item-active');
      questionItem[2].classList.remove('question__item-active');
      questionItem[4].classList.remove('question__item-active');
      questionItem[5].classList.remove('question__item-active');
      playerImg.src = "../assets/bird_cover.svg";
      playerImg.style.border = "none";
      playerImg.style.boxShadow = "none";
      playerBirdname.innerHTML = "*******";
      descImg.src = "#0";
      descBirdname.innerHTML = "*******";
      descSpecies.innerHTML = "*******";
      descSource.src = "#0";

      let randomBird3 = birdsData[3][Math.floor(Math.random() * birdsData[3].length)];
      playerSource.src = `${randomBird3.audio}`;
      console.log(randomBird3.name);

      document.querySelector('.description__lead-in').style.display = 'block';
      document.querySelector('.description__photo').style.display = 'none';
      document.querySelector('.description__block').style.display = 'none';
      document.querySelector('.description').style.minHeight = '';
      levelBtn.disabled = true;

      answerLabel.forEach((label, j) => {
        answerLabel[j].innerHTML = `${birdsData[3][j].name}`;
      });

      answerInput.forEach((input, i) => {
        answerInput[i].classList.remove('answer__input-true');
        answerInput[i].classList.remove('answer__input-false');
        answerInput[i].classList.remove('answer__input-base');
        answerInput[i].checked = false;
      });

      answerLabel.forEach((label, i) => {
        answerLabel[i].classList.remove('answer__label-true');
      });

      let result = Number(score.innerHTML);
      let step3 = 0;
      answerItems.forEach((answerItem, k) => {
        answerItem.addEventListener('click', () => {
          answerLabel.forEach((answer, i) => {
            if ((answer.textContent === randomBird3.name) && (i === k)) {
              playerPause();
              pauseWrong();
              playRight();
              answerInput.forEach((input, j) => {
                if (j === i) {
                  answer.classList.add('answer__label-true');
                  input.classList.add('answer__input-true');
                  input.classList.remove('answer__input-false');
                  if (step3 > 5) {
                    score.innerHTML = `${result}`;
                  } else {
                    score.innerHTML = `${result + 5 - step3}`;
                  }
                }
              });
              levelBtn.disabled = false;
              playerImg.src = `${birdsData[3][i].image}`;
              playerImg.style.border = "2px solid rgb(120, 120, 120)";
              playerImg.style.boxShadow = "0px 0px 20px 0px rgba(20, 20, 20, 0.5)";
              playerBirdname.innerHTML = `${birdsData[3][i].name}`;
              animatePlayerImg();
            } else if ((answer.textContent !== randomBird3.name) && (levelBtn.disabled === true) && (i === k)) {
              pauseRight();
              playWrong();
              answerInput.forEach((input, j) => {
                if (i === j) {
                  input.classList.add('answer__input-false');
                  step3 += 1;
                }
              });
            } else if ((answer.textContent !== randomBird3.name) && (levelBtn.disabled !== true) && (i === k)) {
              pauseRight();
              pauseWrong();
              answerInput.forEach((input, j) => {
                if (i === j) {
                  input.classList.add('answer__input-base');
                }
              });
            }
          });
        }, {once: true});

        answerItem.addEventListener('click', () => {
          answerLabel.forEach((answer, i) => {
            if (i === k) {
              document.querySelector('.description__lead-in').style.display = 'none';
              document.querySelector('.description__photo').style.display = 'block';
              document.querySelector('.description__block').style.display = 'flex';
              document.querySelector('.description').style.minHeight = '370px';

              descImg.src = `${birdsData[3][i].image}`;
              descBirdname.innerHTML = `${birdsData[3][i].name}`;
              descSpecies.innerHTML = `${birdsData[3][i].species}`;
              descSource.src = `${birdsData[3][i].audio}`;
              descText.innerHTML = `${birdsData[3][i].description}`;
              animateDescImg();
            }
          });
        });
      });


    } else if (questionItem[3].classList.contains('question__item-active')) {
      questionItem[4].classList.add('question__item-active');
      questionItem[0].classList.remove('question__item-active');
      questionItem[1].classList.remove('question__item-active');
      questionItem[2].classList.remove('question__item-active');
      questionItem[3].classList.remove('question__item-active');
      questionItem[5].classList.remove('question__item-active');
      playerImg.src = "../assets/bird_cover.svg";
      playerImg.style.border = "none";
      playerImg.style.boxShadow = "none";
      playerBirdname.innerHTML = "*******";
      descImg.src = "#0";
      descBirdname.innerHTML = "*******";
      descSpecies.innerHTML = "*******";
      descSource.src = "#0";

      let randomBird4 = birdsData[4][Math.floor(Math.random() * birdsData[4].length)];
      playerSource.src = `${randomBird4.audio}`;
      console.log(randomBird4.name);

      document.querySelector('.description__lead-in').style.display = 'block';
      document.querySelector('.description__photo').style.display = 'none';
      document.querySelector('.description__block').style.display = 'none';
      document.querySelector('.description').style.minHeight = '';
      levelBtn.disabled = true;

      answerLabel.forEach((label, j) => {
        answerLabel[j].innerHTML = `${birdsData[4][j].name}`;
      });

      answerInput.forEach((input, i) => {
        answerInput[i].classList.remove('answer__input-true');
        answerInput[i].classList.remove('answer__input-false');
        answerInput[i].classList.remove('answer__input-base');
        answerInput[i].checked = false;
      });

      answerLabel.forEach((label, i) => {
        answerLabel[i].classList.remove('answer__label-true');
      });

      let result = Number(score.innerHTML);
      let step4 = 0;
      answerItems.forEach((answerItem, k) => {
        answerItem.addEventListener('click', () => {
          answerLabel.forEach((answer, i) => {
            if ((answer.textContent === randomBird4.name) && (i === k)) {
              playerPause();
              pauseWrong();
              playRight();
              answerInput.forEach((input, j) => {
                if (j === i) {
                  answer.classList.add('answer__label-true');
                  input.classList.add('answer__input-true');
                  input.classList.remove('answer__input-false');
                  if (step4 > 5) {
                    score.innerHTML = `${result}`;
                  } else {
                    score.innerHTML = `${result + 5 - step4}`;
                  }
                }
              });
              levelBtn.disabled = false;
              playerImg.src = `${birdsData[4][i].image}`;
              playerImg.style.border = "2px solid rgb(120, 120, 120)";
              playerImg.style.boxShadow = "0px 0px 20px 0px rgba(20, 20, 20, 0.5)";
              playerBirdname.innerHTML = `${birdsData[4][i].name}`;
              animatePlayerImg();
            } else if ((answer.textContent !== randomBird4.name) && (levelBtn.disabled === true) && (i === k)) {
              pauseRight();
              playWrong();
              answerInput.forEach((input, j) => {
                if (i === j) {
                  input.classList.add('answer__input-false');
                  step4 += 1;
                }
              });
            } else if ((answer.textContent !== randomBird4.name) && (levelBtn.disabled !== true) && (i === k)) {
              pauseRight();
              pauseWrong();
              answerInput.forEach((input, j) => {
                if (i === j) {
                  input.classList.add('answer__input-base');
                }
              });
            }
          });
        }, {once: true});
                            
        answerItem.addEventListener('click', () => {
          answerLabel.forEach((answer, i) => {
            if (i === k) {
              document.querySelector('.description__lead-in').style.display = 'none';
              document.querySelector('.description__photo').style.display = 'block';
              document.querySelector('.description__block').style.display = 'flex';
              document.querySelector('.description').style.minHeight = '370px';

              descImg.src = `${birdsData[4][i].image}`;
              descBirdname.innerHTML = `${birdsData[4][i].name}`;
              descSpecies.innerHTML = `${birdsData[4][i].species}`;
              descSource.src = `${birdsData[4][i].audio}`;
              descText.innerHTML = `${birdsData[4][i].description}`;
              animateDescImg();
            }
          });
        });
      });


    } else if (questionItem[4].classList.contains('question__item-active')) {
      questionItem[5].classList.add('question__item-active');
      questionItem[0].classList.remove('question__item-active');
      questionItem[1].classList.remove('question__item-active');
      questionItem[2].classList.remove('question__item-active');
      questionItem[3].classList.remove('question__item-active');
      questionItem[4].classList.remove('question__item-active');
      playerImg.src = "../assets/bird_cover.svg";
      playerImg.style.border = "none";
      playerImg.style.boxShadow = "none";
      playerBirdname.innerHTML = "*******";
      descImg.src = "#0";
      descBirdname.innerHTML = "*******";
      descSpecies.innerHTML = "*******";
      descSource.src = "#0";

      let randomBird5 = birdsData[5][Math.floor(Math.random() * birdsData[5].length)];
      playerSource.src = `${randomBird5.audio}`;
      console.log(randomBird5.name);

      document.querySelector('.description__lead-in').style.display = 'block';
      document.querySelector('.description__photo').style.display = 'none';
      document.querySelector('.description__block').style.display = 'none';
      document.querySelector('.description').style.minHeight = '';
      levelBtn.disabled = true;

      answerLabel.forEach((label, j) => {
        answerLabel[j].innerHTML = `${birdsData[5][j].name}`;
      });

      answerInput.forEach((input, i) => {
        answerInput[i].classList.remove('answer__input-true');
        answerInput[i].classList.remove('answer__input-false');
        answerInput[i].classList.remove('answer__input-base');
        answerInput[i].checked = false;
      });

      answerLabel.forEach((label, i) => {
        answerLabel[i].classList.remove('answer__label-true');
      });

      let result = Number(score.innerHTML);
      let step5 = 0;

      answerItems.forEach((answerItem, k) => {
        answerItem.addEventListener('click', () => {
          answerLabel.forEach((answer, i) => {
            if ((answer.textContent === randomBird5.name) && (i === k)) {
              playerPause();
              pauseWrong();
              playRight();
              answerInput.forEach((input, j) => {
                if (j === i) {
                  answer.classList.add('answer__label-true');
                  input.classList.add('answer__input-true');
                  input.classList.remove('answer__input-false');
                  if (step5 > 5) {
                    score.innerHTML = `${result}`;
                  } else {
                    score.innerHTML = `${result + 5 - step5}`;
                  }
                  localStorage.setItem('resultScore', score.innerHTML);
                }
              });
              levelBtn.disabled = false;
              levelBtn.innerHTML = `Результаты`;
              playerImg.src = `${birdsData[5][i].image}`;
              playerImg.style.border = "2px solid rgb(120, 120, 120)";
              playerImg.style.boxShadow = "0px 0px 20px 0px rgba(20, 20, 20, 0.5)";
              playerBirdname.innerHTML = `${birdsData[5][i].name}`;
              animatePlayerImg();
            } else if ((answer.textContent !== randomBird5.name) && (levelBtn.disabled === true) && (i === k)) {
              pauseRight();
              playWrong();
              answerInput.forEach((input, j) => {
                if (i === j) {
                  input.classList.add('answer__input-false');
                  step5 += 1;
                }
              });
            } else if ((answer.textContent !== randomBird5.name) && (levelBtn.disabled !== true) && (i === k)) {
              pauseRight();
              pauseWrong();
              answerInput.forEach((input, j) => {
                if (i === j) {
                  input.classList.add('answer__input-base');
                }
              });
            }
          });
        }, {once: true});
                            
        answerItem.addEventListener('click', () => {
          answerLabel.forEach((answer, i) => {
            if (i === k) {
              document.querySelector('.description__lead-in').style.display = 'none';
              document.querySelector('.description__photo').style.display = 'block';
              document.querySelector('.description__block').style.display = 'flex';
              document.querySelector('.description').style.minHeight = '370px';

              descImg.src = `${birdsData[5][i].image}`;
              descBirdname.innerHTML = `${birdsData[5][i].name}`;
              descSpecies.innerHTML = `${birdsData[5][i].species}`;
              descSource.src = `${birdsData[5][i].audio}`;
              descText.innerHTML = `${birdsData[5][i].description}`;
              animateDescImg();
            }
          });
        });
      });

    } else if (levelBtn.textContent === "Результаты") {
      window.location.href = 'result.html';
    }
  }
});