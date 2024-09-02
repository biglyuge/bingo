const side = 7;
const squares = side * side;
const indexes = Array.from({length: squares}, (e, i) => i);
const cells = Array(side);

const padNumber = i => i.padStart(2, 0);
const lottery2hash = lottery => inversePermutation(lottery).map(n => padNumber(n.toString())).join("-");
const hash2lottery = hash => {
  const numbers = hash.slice(1).split("-");
  if(numbers.length != squares)
    return null;
  const parsed = numbers.map(x => Number.parseInt(x));
  if(parsed.some(x => x < 0 || x >= squares))
    return null;
  const sorted = Array.from(parsed).sort((a,b) => a - b);
  if(sorted.some((e,i) => e != i))
    return null;
  return inversePermutation(parsed);
};

const roll = () => {
  const lottery = Array.from(indexes);
  shuffle(lottery);
  location.hash = lottery2hash(lottery);
  return lottery;
};

const inversePermutation = permutation => {
  const inverse = Array.from(permutation);
  permutation.forEach((e,i) => inverse[e] = i);
  return inverse;
};

const renderCard = lottery => lottery.forEach((e,i) => cells[i].node.style.order = e);

const loadCard = () => hash2lottery(window.location.hash) || roll();

const main = () => {
  document.body.style.margin = "0px";

  const root = document.getElementById("root");
  root.setAttribute("style", "padding:20px; display:flex; flex-direction:column; justify-content:flex-start; align-items:center; font-size:calc(min(16px, 1.5vw, 1.5vh)); gap:10px");

  const card = document.createElement("div");
  card.setAttribute("style", "display:flex; flex-direction:column; justify-content:start; align-items:center");

  const grid = document.createElement("div");
  grid.setAttribute("style", "width:calc(min(90vw, 90vh)); max-width:1067px; display:grid; grid-template-columns:repeat(" + side.toString() + ", minmax(0, 1fr)); text-align:center;");
  for(let i = 0; i < side*side; i++) {
    const cell = grid.appendChild(document.createElement("div"));
    cells[i] = { node: cell, checked: false }; ;
    cell.setAttribute("style", "aspect-ratio:1; display:flex; justify-content:center; align-items:center; border:solid black 1px; cursor:pointer;");
    cell.addEventListener("click", () => {
      cells[i].checked ^= true;
      cell.style.background = cells[i].checked ? "url(orange.png) center center / cover" : "";
    });

    cell.append(bingo[i]);
  }

  card.appendChild(grid);

  const intro = document.createElement("div");
  intro.setAttribute("style", "padding:20px; display:flex; flex-direction:column; justify-content:flex-start; align-items:center; font-size: 2em");
  intro.appendChild(document.createElement("div")).append("Tuesday Night Bingo");

  const rules = document.createElement("ul");
  rules.setAttribute("style", "list-style: disc");
  rules.appendChild(document.createElement("li")).append("Roll the dice until you're happy with the card");
  rules.appendChild(document.createElement("li")).append("Share your starting card by copying the URL");
  rules.appendChild(document.createElement("li")).append("Click a square to (un)mark it");
  rules.appendChild(document.createElement("li")).append("Have so much winning you bankrupt the casino");

  const dice = document.createElement("img");
  dice.setAttribute("src", "dice.jpg");
  dice.setAttribute("style", "width: 150px; cursor: pointer");

  const howToPlay = document.createElement("div");
  howToPlay.setAttribute("style", "display:flex; flex-direction:row; justify-content:space-evenly; align-items:center; gap:100px");
  howToPlay.appendChild(dice);
  howToPlay.appendChild(rules);

  dice.addEventListener("click", () => renderCard(roll()));
  window.addEventListener("hashchange", () => renderCard(loadCard()));
  renderCard(loadCard());

  root.appendChild(intro);
  root.appendChild(howToPlay);
  root.appendChild(card);
};

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const bingo = [
  "ACCORDION HANDS",
  "ORANGE MAKEUP",
  "CAESAR WORD SALAD BUFFET",
  "NUKE HURRICANES",
  "DISINFECTANT ON THE LUNGS",
  "VACCINE SKEPTICISM",
  "THE BEST AND MOST SERIOUS PEOPLE",
  "THE LATE GREAT HANNIBAL LECTER",
  "THEY CALLED ME, I DIDN'T CALL THEM",
  "MANY PEOPLE ARE SAYING IT",
  "I'M NOT WEIRD",
  "THAT GUY IS SO STRAIGHT",
  "DID NOT HAVE SEXUAL RELATIONS WITH THAT COUCH",
  "DIDN'T HAVE SEX WITH A PORN STAR",
  "I KNOW NOTHING ABOUT PROJECT 2025. ANYTHING THEY DO, I WISH THEM LUCK",
  "PRESIDENTIAL IMMUNITY",
  "PATRIOT HOSTAGES",
  "WEAPONIZED DEPARTMENT OF JUSTICE",
  "WITCH HUNT",
  "PERSECUTION OF A POLITICAL OPPONENT",
  "DEEP STATE",
  "FAKE NEWS",
  "FAKE CROWDS",
  "ELECTION INTERFERENCE 2016 EDITION",
  "ELECTION INTERFERENCE 2020 EDITION",
  "ELECTION INTERFERENCE 2024 EDITION",
  "NOMINATION FANFICTION",
  "REIMBURSEMENT KAREN",
  "LAPTOP FROM HELL",
  "ALLUCINATE ABOUT HELICOPTER RIDE",
  "GET CONFUSED ABOUT MIXED RACE",
  "RED SCARE",
  "CHAMELEON",
  "BORDER CZAR",
  "WE HAVE A BORDER THAT IS THE MOST DANGEROUS PLACE ANYWHERE IN THE WORLD",
  "FOREIGN CRIMINALS FROM MENTAL INSTITUTIONS AND INSANE ASYLUMS",
  "THEY'RE TAKING BLACK JOBS AND HISPANIC JOBS",
  "POISONING THE BLOOD OF OUR COUNTRY",
  "FAILING NATION",
  "WORLD WAR III",
  "ONLY I CAN SAVE AMERICA",
  "BITCOIN MADE IN THE USA",
  "BEST PRESIDENT FOR THE BLACK POPULATION SINCE ABRAHAM LINCOLN",
  "FRANKLY, I HAVE DONE MORE FOR ISRAEL THAN ANY PERSON, AND IT'S NOT EVEN CLOSE",
  "FLIP-FLOP ON REPRODUCTIVE RIGHTS",
  "RANT ABOUT ELECTRIC ENERGY, VEHICLES, BATTERIES OR SHARKS",
  "AGE IS JUST A NUMBER",
  "BILLIONAIRE SIMPING",
  "DICTATOR SIMPING",
];
