import React, { useCallback, useEffect, useState } from "react";
import "./SortingVisualizer.css";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {
  swap,
  selectionSort,
  bubbleSort,
  insertionSort,
} from "../../sortingAlgorithms/sortingAlgorithms";
import { pause } from "../../helper";

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const { height } = useWindowDimensions();
  const [sortAlgorithm, setSortAlgorithm] = useState("insertionSort");
  const [animationFinished, setAnimationFinished] = useState(true);

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

  function getAnimations() {
    if (sortAlgorithm === "selectionSort") return selectionSort(array);
    if (sortAlgorithm === "bubbleSort") return bubbleSort(array);
    if (sortAlgorithm === "insertionSort") return insertionSort(array);
  }

  async function sortHelper() {
    const animations = getAnimations();

    setAnimationFinished(false);

    animations.forEach((animation, index) => {
      const [a, b, isSwap] = animation;

      setTimeout(async () => {
        const arrayBars = document.getElementsByClassName("arrayBar");
        if (!isSwap) {
          arrayBars[a].style.backgroundColor = "red";
          arrayBars[b].style.backgroundColor = "red";
        }

        setArray((prevArray) => {
          const newArray = [...prevArray];
          if (isSwap) {
            swap(newArray, a, b);
          }
          return newArray;
        });

        await pause(100);

        arrayBars[a].style.backgroundColor = "blue";
        arrayBars[b].style.backgroundColor = "blue";
      }, index * 100);
    });

    setAnimationFinished(true);
  }

  useEffect(() => {
    generateNewArray(5);
  }, [generateNewArray]);

  return (
    <>
      <button onClick={() => generateNewArray(5)} disabled={!animationFinished}>
        Generate new array
      </button>
      <button onClick={() => sortHelper()} disabled={!animationFinished}>
        Sort
      </button>
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
