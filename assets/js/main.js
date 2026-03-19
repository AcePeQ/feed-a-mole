class Mole {
  constructor(id, status, runAgainAt) {
    this.id = id;
    this.status = status;
    this.runAgainAt = runAgainAt;
  }

  set changeStatus(newStatus) {
    this.status = newStatus;
  }
  set changeRunAgainAt(newTime) {
    this.runAgainAt = newTime;
  }
  get getStatus() {
    return this.status;
  }
  get getRunAgainAt() {
    return this.runAgainAt;
  }

  get getMoleId() {
    return this.id;
  }
}

const holes = [...document.querySelectorAll(".hole")];
const worm = document.querySelector(".worm-img");

const moles = [];
let score = 1;

function createMoles() {
  holes.forEach((hole) => {
    const holeId = hole.id;
    const mole = new Mole(holeId, "wait", Date.now());

    moles.push(mole);
  });
}

function getStatusFromClass(element) {
  if (!element) return;

  return element.classList[1];
}

function getImageStatus(status) {
  const imageUrl = `./assets/images/mole-${status}.png`;
  return imageUrl;
}

function tick() {
  moles.forEach((mole) => {
    const image = document.getElementById(mole.getMoleId).firstElementChild;

    let moleStatus = mole.getStatus;
    let runAgainAt = mole.getRunAgainAt;

    if (Date.now() > runAgainAt) {
      switch (moleStatus) {
        case "hungry":
          image.classList.add("hungry");

          image.src = getImageStatus(moleStatus);

          mole.changeRunAgainAt = Date.now() + 2000;
          mole.changeStatus = "sad";
          break;
        case "sad":
          image.classList.remove("hungry");
          image.classList.add("sad");

          image.src = getImageStatus(moleStatus);

          mole.changeRunAgainAt = Date.now() + 500;
          mole.changeStatus = "leaving";
          break;
        case "fed":
          image.classList.remove("hungry");
          image.classList.add("fed");

          image.src = getImageStatus(moleStatus);

          mole.changeRunAgainAt = Date.now() + 500;
          mole.changeStatus = "leaving";
          break;
        case "leaving":
          image.classList.remove("sad");
          image.classList.remove("fed");
          image.classList.add("leaving");

          image.src = getImageStatus(moleStatus);

          mole.changeRunAgainAt = Date.now() + 500;
          mole.changeStatus = "wait";
          break;
        default:
          image.classList.remove("leaving");
          image.classList.add("wait");

          image.src = "";

          mole.changeRunAgainAt =
            Date.now() + Math.floor(Math.random() * 18001) + 2000;
          mole.changeStatus = "hungry";
          break;
      }
    }
  });
  function getImageStatus(status) {
    const imageUrl = `./assets/images/mole-${status}.png`;
    return imageUrl;
  }

  requestAnimationFrame(tick);
}

function init() {
  createMoles();
  requestAnimationFrame(tick);
}

init();

// function handleScore(image) {
//   score++;

//   if (score === 11) {
//     return nothing;
//   }

//   worm.style.clipPath = `polygon(0 0, ${(score + 1) * 10}% 0, ${(score + 1) * 10}% 100%, 0 100%)`;
// }

// holes.forEach((hole) => {
//   const image = hole.firstElementChild;
//   hole.addEventListener("click", () => {
//     if (!image.classList.contains("hungry")) return;

//     handleScore(image);

//     moleStatus = "fed";
//     runAgainAt = Date.now();
//   });

//   let moleStatus = "wait";
//   let runAgainAt = Date.now();

//   function refCounter() {
//     if (Date.now() > runAgainAt) {
//       switch (moleStatus) {
//         case "hungry":
//           image.classList.add("hungry");
//           image.src = getImageStatus("hungry");
//           runAgainAt = Date.now() + 2000;
//           moleStatus = "sad";
//           break;
//         case "sad":
//           image.classList.remove("hungry");
//           image.classList.add("sad");
//           image.src = getImageStatus("sad");
//           runAgainAt = Date.now() + 500;
//           moleStatus = "leaving";
//           break;
//         case "fed":
//           image.classList.remove("hungry");
//           image.classList.add("fed");
//           image.src = getImageStatus("fed");
//           runAgainAt = Date.now() + 500;
//           moleStatus = "leaving";
//           break;
//         case "leaving":
//           image.classList.remove("sad");
//           image.classList.remove("fed");
//           image.classList.add("leaving");

//           image.src = getImageStatus("leaving");
//           runAgainAt = Date.now() + 500;
//           moleStatus = "wait";
//           break;
//         default:
//           image.classList.remove("leaving");
//           image.classList.add("wait");
//           image.src = "";
//           let waitFor = Math.floor(Math.random() * 18001) + 2000;
//           runAgainAt = Date.now() + waitFor;
//           moleStatus = "hungry";
//           break;
//       }
//     }

//     requestAnimationFrame(refCounter);
//   }
//   requestAnimationFrame(refCounter);
// });
