const TIMING = {
  HUNGRY_DURATION: 2000,
  TRANSITION: 500,
  MIN_WAIT: 2000,
  MAX_WAIT_SPREAD: 18001,
};

class Mole {
  constructor(id) {
    this.id = id;
    this.status = "wait";
    this.prevStatus = "";
    this.runAgainAt = Date.now();
    this.isKing = false;
  }
}

const holes = [...document.querySelectorAll(".hole")];
const worm = document.querySelector(".worm-img");

const moles = [];
let score = 1;
let gameOver = false;

function createMoles() {
  holes.forEach((hole) => {
    const holeId = hole.id;
    const mole = new Mole(holeId);

    const image = document.getElementById(holeId).firstElementChild;

    image.addEventListener("click", () => handleScore(mole));

    moles.push(mole);
  });
}

function getImageStatus(status, isKing) {
  let imageUrl = "";

  if (status === "wait") {
    return imageUrl;
  }

  if (isKing) {
    imageUrl = `./assets/images/king-mole-${status}.png`;
  } else {
    imageUrl = `./assets/images/mole-${status}.png`;
  }

  return imageUrl;
}

function handleScore(mole) {
  if (mole.prevStatus !== "hungry") return;

  if (mole.isKing) {
    score += 2;
  } else {
    score++;
  }

  if (score >= 10) {
    gameOver = true;

    const gameContainer = document.getElementById("game");
    const winImage = document.getElementById("gameWinningImage");

    gameContainer.classList.add("hide");
    winImage.classList.add("show");

    return;
  }

  mole.status = "fed";
  mole.runAgainAt = Date.now();

  worm.style.clipPath = `polygon(0 0, ${score * 10}% 0, ${score * 10}% 100%, 0 100%)`;
}

function handleMakeAKing(moles) {
  const waiting = moles.filter((m) => m.status === "wait");
  if (!waiting.length) return;
  waiting[Math.floor(Math.random() * waiting.length)].isKing = true;
}

function tick() {
  const isAnyMoleKing = moles.some((mole) => mole.isKing);

  if (!isAnyMoleKing) handleMakeAKing(moles);

  moles.forEach((mole) => {
    const runAgainAt = mole.runAgainAt;

    if (Date.now() > runAgainAt) {
      const image = document.getElementById(mole.id).firstElementChild;

      const moleIsKing = mole.isKing;
      const moleStatus = mole.status;

      image.src = getImageStatus(moleStatus, moleIsKing);

      const oldStatus = mole.prevStatus;
      if (oldStatus) image.classList.remove(oldStatus);
      image.classList.add(moleStatus);

      switch (moleStatus) {
        case "hungry":
          mole.prevStatus = moleStatus;
          mole.status = "sad";
          mole.runAgainAt = Date.now() + TIMING.HUNGRY_DURATION;
          break;
        case "sad":
        case "fed":
          mole.prevStatus = moleStatus;
          mole.status = "leaving";
          mole.runAgainAt = Date.now() + TIMING.TRANSITION;
          break;
        case "leaving":
          mole.prevStatus = moleStatus;
          mole.status = "wait";
          mole.runAgainAt = Date.now() + TIMING.TRANSITION;
          break;
        default:
          if (mole.isKing) mole.isKing = false;
          mole.prevStatus = moleStatus;
          mole.status = "hungry";
          mole.runAgainAt =
            Date.now() +
            Math.floor(Math.random() * TIMING.MAX_WAIT_SPREAD) +
            TIMING.HUNGRY_DURATION;
          break;
      }
    }
  });

  if (!gameOver) requestAnimationFrame(tick);
}

function init() {
  createMoles();
  requestAnimationFrame(tick);
}

init();
