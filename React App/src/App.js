import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

// const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     genre: "technology",
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     genre: "society",
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     genre: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//   },
// ];

function App() {
  // 1. define STATE variable
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentGenre, setCurrentGenre] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");
        if (currentGenre !== "all") query.eq("genre", currentGenre);

        const { data: facts, error } = await query
          .order("vote_interesting", { ascending: false })
          .limit(1000);

        if (!error) setFacts(facts);
        else alert("There was a problem fetching the data");
        setIsLoading(false);
      }
      getFacts();
    },
    [currentGenre]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {/* 2. render STATE variable */}
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <GenreFilter setCurrentGenre={setCurrentGenre} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading......</p>;
}

function Header({ showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img
          src=".\logo.png"
          height="68"
          width="68"
          alt="Today I Learned Logo"
        />
        <h1>Today I Learned</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        // 3. update STATE variable
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share a Fact"}
      </button>
    </header>
  );
}

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

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [genre, setGenre] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    e.preventDefault();
    if (text && isValidHttpUrl(source) && genre && textLength <= 200) {
      // 3. Create a new fact object
      // const newFact = {
      //   id: Math.round(Math.random() * 10000000),
      //   text,
      //   source,
      //   genre,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      // 3. Upload new fact to Supabase and recieve the new fact object
      setIsUploading(true);

      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, genre }])
        .select();

      setIsUploading(false);

      // 4. Add the new fact to the UI: add the fact to the state
      if (!error) setFacts((facts) => [newFact[0], ...facts]);

      // 5. reset the input fields to empty
      setText("");
      setSource("");
      setGenre("");

      // 6. close the form.
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the World....."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Trustworth Source...... (http://example.com)"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose Category</option>
        {GENRES.map((genre) => (
          <option key={genre.name} value={genre.name}>
            {genre.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function GenreFilter({ setCurrentGenre }) {
  return (
    <aside>
      <ul>
        <li className="genre">
          <button
            className="btn btn-all-genre"
            onClick={() => setCurrentGenre("all")}
          >
            All
          </button>
        </li>
        {GENRES.map((genre) => (
          <li key={genre.name} className="genre">
            <button
              className="btn btn-genre"
              style={{ backgroundColor: genre.color }}
              onClick={() => setCurrentGenre(genre.name)}
            >
              {genre.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts, setFacts }) {
  if (facts.length === 0) {
    return (
      <p className="message">
        No facts for this genre yet, create your first one !!
      </p>
    );
  }
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.vote_interesting + fact.vote_mindblowing < fact.vote_false;

  async function handleVote(vote_name) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [vote_name]: fact[vote_name] + 1 })
      .eq("id", fact.id)
      .select();

    setIsUpdating(false);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }
  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[DISPUTED!!]</span> : null}
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: GENRES.find((genre) => genre.name === fact.genre)
            .color,
        }}
      >
        {fact.genre}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("vote_interesting")}
          disabled={isUpdating}
        >
          👍 {fact.vote_interesting}
        </button>
        <button onClick={() => handleVote("vote_mindblowing")}>
          🤯 {fact.vote_mindblowing}
        </button>
        <button onClick={() => handleVote("vote_false")}>
          ⛔️ {fact.vote_false}
        </button>
      </div>
    </li>
  );
}

export default App;
