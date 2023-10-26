import React, { useCallback, useEffect, useState } from "react";

function SortingVisualizer() {
  const [array, setArray] = useState([]);

  const generateNewArray = useCallback((length) => {
    const newArray = [];

    for (let i = 0; i < length; i++) {
      newArray.push(generateRandomNumber(1, 100));
    }

    setArray(newArray);
  }, []);

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    generateNewArray(10);
  }, [generateNewArray]);

  return (
    <div className="arrayContainer">
      {array.map((element, idx) => {
        return (
          <div key={idx} className="arrayBar">
            {element}
          </div>
        );
      })}
    </div>
  );
}

export default SortingVisualizer;
