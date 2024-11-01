let diceCounts = {};

function selectDice(type) {
    if (!diceCounts[type]) {
        diceCounts[type] = 0;
        document.getElementById(`input-${type}`).style.display = 'flex';
    }
}

function adjustDiceCount(type, change) {
    const input = document.getElementById(type);
    let count = parseInt(input.value) + change;
    if (count < 0) count = 0;

    input.value = count;
    diceCounts[type] = count;

    const totalDice = Object.values(diceCounts).reduce((sum, value) => sum + value, 0);
    document.getElementById('rollButton').style.display = totalDice > 0 ? 'block' : 'none';
}

function rollDice() {
    let grandTotal = 0;
    const resultsBody = document.getElementById('resultsBody');
    resultsBody.innerHTML = '';
    document.getElementById('resultsTable').style.display = 'block';

    for (const [diceType, count] of Object.entries(diceCounts)) {
        if (count > 0) {
            let diceSides = parseInt(diceType.slice(1));
            let total = 0;
            let rolls = [];

            for (let i = 0; i < count; i++) {
                const finalRoll = Math.floor(Math.random() * diceSides) + 1;
                rolls.push(finalRoll);

                // Create a new row for each individual dice roll
                const row = document.createElement('tr');
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

    document.getElementById('grandTotal').innerText = `Grand Total: ${grandTotal}`;
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
            rollCell.classList.add('highlight');
        }
    });
}
