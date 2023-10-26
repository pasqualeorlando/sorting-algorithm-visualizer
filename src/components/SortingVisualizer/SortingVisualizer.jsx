import React, { useCallback, useEffect, useState } from "react";
import "./SortingVisualizer.css";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const { height } = useWindowDimensions();

  const generateNewArray = useCallback(
    (length) => {
      const newArray = [];

      for (let i = 0; i < length; i++) {
        newArray.push(generateRandomNumber(1, (height * 75) / 100));
      }

      setArray(newArray);
    },
    [height]
  );

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function sort() {
    const newArray = [];

    array.forEach((value) => {
      newArray.push(value);
    });
    newArray.sort((a, b) => a - b);

    setArray(newArray);
  }

  useEffect(() => {
    generateNewArray(100);
  }, [generateNewArray]);

  return (
    <>
      <button onClick={() => generateNewArray(100)}>Generate new array</button>
      <button onClick={() => sort()}>Sort</button>
      <div className="arrayContainer">
        {array.map((element, idx) => {
          return (
            <div
              key={idx}
              className="arrayBar"
              style={{
                height: `${element}px`,
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
}

export default SortingVisualizer;
