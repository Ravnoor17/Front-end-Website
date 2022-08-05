import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Styles/search.css";

function Search(props) {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");

  function handleInput(e) {
    const { name, value } = e.target;
    if (name == "destination") {
      setDestination(value);
    }
    if (name == "duration") {
      setDuration(value);
    }
    if (name == "budget") {
      setBudget(value);
    }
  }

  return (
    <div className="search_main">
      <h2>Find you ideal trip!</h2>
      <div className="serachDiv">
        <Form.Control
          className="inputt-search"
          type="text"
          placeholder="Destination"
          value={destination}
          name="destination"
          onChange={handleInput}
        />
        <Form.Control
          className="inputt-search"
          as="select"
          aria-label="Default select example"
          value={duration}
          name="duration"
          onChange={handleInput}
        >
          <option>Duration</option>
          <option value="3">Less than 3 days</option>
          <option value="7">Less than a week</option>
          <option value="14">Less than 2 week</option>
        </Form.Control>
        <Form.Control
          className="inputt-search"
          as="select"
          value={budget}
          name="budget"
          onChange={handleInput}
        >
          <option>Budget</option>
          <option value="10000">10000</option>
          <option value="20000">20000</option>
          <option value="30000">30000</option>
          <option value="40000">40000</option>
        </Form.Control>
        <Link to={`/search/${destination}/${duration}/${budget}`}>
          <button>Go</button>
        </Link>
      </div>
    </div>
  );
}

export default Search;
