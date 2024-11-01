let diceCounts = {};

function selectDice(type) {
  if (!diceCounts[type]) {
    diceCounts[type] = 0;
    document.getElementById(`input-${type}`).style.display = "flex";
  }
}

function adjustDiceCount(type, change) {
  const input = document.getElementById(type);
  let count = parseInt(input.value) + change;
  if (count < 0) count = 0;

  input.value = count;
  diceCounts[type] = count;

  const totalDice = Object.values(diceCounts).reduce(
    (sum, value) => sum + value,
    0
  );
  document.getElementById("rollButton").style.display =
    totalDice > 0 ? "block" : "none";
}

function rollDice() {
  let grandTotal = 0;
  const resultsBody = document.getElementById("resultsBody");
  resultsBody.innerHTML = "";
  document.getElementById("resultsTable").style.display = "block";

  for (const [diceType, count] of Object.entries(diceCounts)) {
    if (count > 0) {
      let diceSides = parseInt(diceType.slice(1));
      let total = 0;
      let rolls = [];

      for (let i = 0; i < count; i++) {
        const finalRoll = Math.floor(Math.random() * diceSides) + 1;
        rolls.push(finalRoll);

        // Create a new row for each individual dice roll
        const row = document.createElement("tr");
        row.innerHTML = `<td>${diceType}</td><td id="${diceType}-roll-${i}">${finalRoll}</td>`;
        resultsBody.appendChild(row);

        // Animate the individual roll
        animateRoll(finalRoll, `${diceType}-roll-${i}`);
      }

      // Delay to ensure all animations complete before highlighting
      setTimeout(() => {
        highlightHighestRoll(rolls, diceType);
      }, 3000 + Math.random() * 1000);

      grandTotal += rolls.reduce((sum, roll) => sum + roll, 0);
    }
  }

  document.getElementById(
    "grandTotal"
  ).innerText = `Grand Total: ${grandTotal}`;
}

function animateRoll(finalRoll, rollId) {
  const rollCell = document.getElementById(rollId);
  let currentRoll = Math.floor(Math.random() * finalRoll) + 1;

  const interval = setInterval(() => {
    rollCell.innerText = currentRoll;
    currentRoll = Math.floor(Math.random() * finalRoll) + 1;
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    rollCell.innerText = finalRoll;
  }, 3000 + Math.random() * 1000);
}

function highlightHighestRoll(rolls, diceType) {
  const maxRoll = Math.max(...rolls);
  rolls.forEach((roll, index) => {
    const rollCell = document.getElementById(`${diceType}-roll-${index}`);
    if (roll === maxRoll) {
      rollCell.classList.add("highlight");
    }
  });
}

// Generate random solid stars with brightness and shadow variations
function createSolidStar() {
  const solidStar = document.createElement("div");
  solidStar.classList.add("solid-star");

  // Position the star randomly within the viewport
  solidStar.style.top = Math.random() * window.innerHeight + "px";
  solidStar.style.left = Math.random() * window.innerWidth + "px";

  // Random brightness and shadow size for a "fuzzy" effect
  const brightness = (Math.random() * 0.8 + 0.2).toFixed(2); // Between 0.2 and 1.0
  const shadowSize = Math.random() * 10 + 5 + "px"; // Random shadow size between 5px and 15px

  // Apply CSS variables for dynamic styling
  solidStar.style.setProperty("--star-brightness", brightness);
  solidStar.style.setProperty("--star-shadow-size", shadowSize);

  document.body.appendChild(solidStar);
}

// Generate more solid stars to fill the background
for (let i = 0; i < 150; i++) {
  // Adjust for higher density
  createSolidStar();
}

// Generate random sparkling stars
function createStar() {
  const star = document.createElement("div");
  star.classList.add("stars");
  star.style.top = Math.random() * window.innerHeight + "px";
  star.style.left = Math.random() * window.innerWidth + "px";
  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 2000);
}

// Create shooting star with random direction and brightness
function createShootingStar() {
  const shootingStar = document.createElement("div");
  shootingStar.classList.add("shooting-star");

  // Randomize the starting position within the viewport
  shootingStar.style.top = Math.random() * window.innerHeight + "px";
  shootingStar.style.left = Math.random() * window.innerWidth + "px";

  // Randomize movement direction and distance for each shooting star
  const moveX = Math.random() * 300 * (Math.random() > 0.5 ? 1 : -1) + "px";
  const moveY = Math.random() * 300 * (Math.random() > 0.5 ? 1 : -1) + "px";

  shootingStar.style.setProperty("--move-x", moveX);
  shootingStar.style.setProperty("--move-y", moveY);

  document.body.appendChild(shootingStar);

  setTimeout(() => {
    shootingStar.remove();
  }, 2000);
}

// Trigger explosion effect on dice roll
document.getElementById("rollButton").addEventListener("click", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  starExplosion(x, y);
});

// Create random stars and increase the frequency of shooting stars
setInterval(createStar, 500);
setInterval(createShootingStar, 1500); // Increased frequency for more activity

// Explosion effect when dice roll is triggered
function starExplosion(x, y) {
  const explosion = document.createElement("div");
  explosion.classList.add("explode-star");
  explosion.style.top = y + "px";
  explosion.style.left = x + "px";
  document.body.appendChild(explosion);

  setTimeout(() => {
    explosion.remove();
  }, 600);
}
