import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SortingVisualizer from "./components/SortingVisualizer/SortingVisualizer";
import AlgoVisualizingSettings from "./components/AlgoVisualizingSettings/AlgoVisualizingSettings";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { generateNewArray } from "./helper";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSortAnimations,
} from "./sortingAlgorithms/sortingAlgorithms";

function App() {
  const ALGORITHMS = [
    "Bubble Sort",
    "Insertion Sort",
    "Selection Sort",
    "Quick Sort",
  ];

  const [array, setArray] = useState([]);
  const [sortingAlgorithm, setSortingAlgorithm] = useState("Bubble Sort");
  const [animationFinished, setAnimationFinished] = useState(true);
  const [speed, setSpeed] = useState(10);
  const [arrayLength, setArrayLength] = useState(3);
  const [animations, setAnimations] = useState([]);

  const { height } = useWindowDimensions();

  useEffect(() => {
    const newArray = generateNewArray(arrayLength, height);
    setArray(newArray);
  }, [height, arrayLength]);

  useEffect(() => {
    setArray(generateNewArray(arrayLength, height));
  }, []);

  useEffect(() => {
    if (animationFinished) setAnimations([]);
  }, [animationFinished]);

  function getAnimations() {
    if (sortingAlgorithm === "Selection Sort")
      setAnimations(selectionSort(array));
    if (sortingAlgorithm === "Bubble Sort") setAnimations(bubbleSort(array));
    if (sortingAlgorithm === "Insertion Sort")
      setAnimations(insertionSort(array));
    if (sortingAlgorithm === "Quick Sort")
      setAnimations(quickSortAnimations(array));
  }

  return (
    <div className="App">
      <Navbar></Navbar>
      <AlgoVisualizingSettings
        speed={speed}
        setSpeed={setSpeed}
        ALGORITHMS={ALGORITHMS}
        sortingAlgorithm={sortingAlgorithm}
        setSortingAlgorithm={setSortingAlgorithm}
        arrayLength={arrayLength}
        setArrayLength={setArrayLength}
        animationFinished={animationFinished}
        getAnimations={getAnimations}
      ></AlgoVisualizingSettings>
      <SortingVisualizer
        array={array}
        setArray={setArray}
        speed={speed}
        animationFinished={animationFinished}
        setAnimationFinished={setAnimationFinished}
        animations={animations}
      ></SortingVisualizer>
    </div>
  );
}

export default App;
