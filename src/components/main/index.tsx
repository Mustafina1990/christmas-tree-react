import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <main className="main">
      <div className="container">
        <section className="main__inner">
          <div className="main__title_wrapper">
            <h1 className="main__title">
              Help Grandma dress up the Christmas tree
            </h1>
          </div>
          <Link to="/toys">
            <button className="button button__start_play">Start</button>
          </Link>
        </section>
      </div>
    </main>
  );
}
