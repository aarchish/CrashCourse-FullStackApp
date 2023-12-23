import { func } from "prop-types";
import "./style.css";

function App() {
  return (
    <>
      {/* HEADER Component */}
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
        <button className="btn btn-large btn-open">Share a Fact</button>
      </header>
      <NewFactForm />
      <GenreFilter />
    </>
  );
}

function NewFactForm() {
  return <form>Fact Form!</form>;
}

function GenreFilter() {
  return <aside>GenreFilter</aside>;
}

export default App;
