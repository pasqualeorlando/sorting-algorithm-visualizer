import React from "react";
import "../../styles/AlgoVisualizingSettings.css";

const AlgoVisualizingSettings = (props) => {
  const {
    ALGORITHMS,
    speed,
    setSpeed,
    sortingAlgorithm,
    setSortingAlgorithm,
    arrayLength,
    setArrayLength,
    animationFinished,
    getAnimations,
    generateNewArray,
  } = props;

  return (
    <div className="container">
      <div>
        <label htmlFor="sortingAlgorithmSelect" style={{ display: "block" }}>
          Select sorting algorithm
        </label>
        <select
          onChange={(event) => setSortingAlgorithm(event.target.value)}
          value={sortingAlgorithm}
          name="sortingAlgorithmSelect"
          id="sortingAlgorithmSelect"
          disabled={!animationFinished}
        >
          {ALGORITHMS.map((element) => (
            <option value={element} key={element}>
              {element}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="speedSlider" style={{ display: "block" }}>
          Speed
        </label>
        <input
          type="range"
          name="speedSlider"
          id="speedSlider"
          disabled={!animationFinished}
          onChange={(event) => setSpeed(event.target.value)}
          min={10}
          max={100}
          step={1}
          value={speed}
        ></input>
      </div>

      <div>
        <label htmlFor="arrayLengthSlider" style={{ display: "block" }}>
          Length
        </label>
        <input
          type="range"
          name="arrayLengthSlider"
          id="arrayLengthSlider"
          disabled={!animationFinished}
          onChange={(event) => setArrayLength(event.target.value)}
          min={3}
          max={50}
          step={1}
          value={arrayLength}
        ></input>
      </div>

      <div>
        <button
          className="button"
          disabled={!animationFinished}
          onClick={() => getAnimations()}
        >
          Start
        </button>
      </div>

      <div>
        <button
          className="button"
          disabled={!animationFinished}
          onClick={() => generateNewArray()}
        >
          Generate new array
        </button>
      </div>
    </div>
  );
};

export default AlgoVisualizingSettings;
