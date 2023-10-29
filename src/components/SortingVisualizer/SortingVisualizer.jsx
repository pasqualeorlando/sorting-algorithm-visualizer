import React, { useCallback, useEffect } from "react";
import "../../styles/SortingVisualizer.css";
import { swap } from "../../sortingAlgorithms/sortingAlgorithms";
import { pause } from "../../helper";

function SortingVisualizer(props) {
  const {
    array,
    setArray,
    speed,
    animationFinished,
    setAnimationFinished,
    animations,
  } = props;

  const sortingFinishedAnimation = useCallback(async () => {
    const arrayBars = document.getElementsByClassName("arrayBar");

    for (let index = 0; index < arrayBars.length; index++) {
      setTimeout(() => {
        arrayBars[index].style.backgroundColor = "green";
      }, index * speed);
    }
  }, []);

  const sortHelper = useCallback(async () => {
    await pause(1000);

    setAnimationFinished((animationFinished) => !animationFinished);

    animations.forEach((animation, index) => {
      const [a, b, isSwap] = animation;
      const arrayBars = document.getElementsByClassName("arrayBar");

      setTimeout(async () => {
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

        await pause(speed);

        if (index < animations?.length - 1 && animations[index + 1][0] !== a)
          arrayBars[a].style.backgroundColor = "#7a5af5";
        arrayBars[b].style.backgroundColor = "#7a5af5";
      }, index * speed);

      setTimeout(async () => {
        await sortingFinishedAnimation();
        setAnimationFinished((animationFinished) => !animationFinished);
      }, animations.length * speed + 100);
    });
  }, [animations, setArray, sortingFinishedAnimation]);

  useEffect(() => {
    if (animations?.length !== 0) {
      sortHelper();
    }
  }, [animations, sortHelper]);

  useEffect(() => {
    const arrayBars = document.getElementsByClassName("arrayBar");
    for (let index = 0; index < arrayBars.length; index++) {
      arrayBars[index].style.backgroundColor = "#7a5af5";
    }
  }, [array.length, speed]);

  return (
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
  );
}

export default SortingVisualizer;
