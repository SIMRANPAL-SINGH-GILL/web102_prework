import GAMES_DATA from './games.js';

const GAMES_JSON = JSON.parse(GAMES_DATA)

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
  for (let i = 0; i < games.length; i++) {
    const gamesCard = document.createElement("div");

    gamesCard.classList.add("game-card");
    gamesCard.innerHTML = `
            <img src="${games[i].img}" alt="${games[i].name}" class="game-img">
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
            <p>Pledged: $${games[i].pledged.toLocaleString()}</p>
            <p>Goal: $${games[i].goal.toLocaleString()}</p>
            <p>Backers: ${games[i].backers}</p>
        `;

    gamesContainer.appendChild(gamesCard);
  }
}

addGamesToPage(GAMES_JSON);

const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);

contributionsCard.textContent = totalContributions.toLocaleString();

const raisedCard = document.getElementById("total-raised");
const totalPledged = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

raisedCard.textContent = `$${totalPledged.toLocaleString()}`;

const gamesCard = document.getElementById("num-games");
gamesCard.textContent = GAMES_JSON.length;

function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);
  const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
  console.log(unfundedGames.length);
  addGamesToPage(unfundedGames);
}
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
        console.log(fundedGames.length);
    addGamesToPage(fundedGames);
}

function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);

}
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
const descriptionContainer = document.getElementById("description-container");

const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

const raisedAmount = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
const totalGames = GAMES_JSON.length;

const unfundedString = `So far, we've raised $${raisedAmount.toLocaleString()} across ${totalGames} games. ${
  numUnfundedGames > 0 ? `Currently, ${numUnfundedGames} games are still unfunded.` : 'All games are funded!'
}`;

const descriptionParagraph = document.createElement("p");

descriptionParagraph.innerHTML = unfundedString;

descriptionContainer.appendChild(descriptionParagraph);

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

const [firstGame, secondGame, ...rest] = sortedGames;

const firstGameElement = document.createElement("p");
firstGameElement.textContent = `🥇 ${firstGame.name}`;

firstGameContainer.appendChild(firstGameElement);
const secondGameElement = document.createElement("p");
secondGameElement.textContent = `🥈 ${secondGame.name}`;

secondGameContainer.appendChild(secondGameElement);