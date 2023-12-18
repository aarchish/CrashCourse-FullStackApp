const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    genre: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    genre: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    genre: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const GENRES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// Selecting DOM Elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

// Create DOM elemts: Render Facts in List
factsList.innerHTML = "";

// Load data from SupaBase
async function loadFacts() {
  const res = await fetch(
    "https://hypqsgzxqphuxjpqqtqa.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHFzZ3p4cXBodXhqcHFxdHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyOTg2OTgsImV4cCI6MjAxNzg3NDY5OH0.3WlvTdBujzeSISIpRFO4mQX_jjr-fTSqnDAM27OGuYc",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHFzZ3p4cXBodXhqcHFxdHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyOTg2OTgsImV4cCI6MjAxNzg3NDY5OH0.3WlvTdBujzeSISIpRFO4mQX_jjr-fTSqnDAM27OGuYc",
      },
    }
  );
  const data = await res.json();
  console.log(data);
  //const filteredData = data.filter((fact) => fact.genre === "society");
  //console.log(filteredData);
  createFacts(data);
}

loadFacts();

//createFacts(initialFacts);

function createFacts(dataArray) {
  const htmlArray = dataArray.map(
    (fact) => `<li class="fact">
      <p>${fact.text}
        <a href="${fact.source}" 
        target="_blank" class="source">(Source)</a>
      </p>
      <span class="tag" style="background-color: ${
        GENRES.find((genre) => genre.name === fact.genre).color
      }">${fact.genre}</span>
    </li>`
  );
  const html = htmlArray.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

// Toggle Fact-Form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share A Fact";
  }
});

const allGenre = GENRES.map((el) => el.name);

const factAges = initialFacts.map((el) => calcFactAge(el.createdIn));

function calcFactAge(year) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  if (age >= 0) return age;
  else
    return `Impossible year. Year needs to be less or equal to ${currentYear}`;
}
