export function swap(array, idx1, idx2) {
  const tmp = array[idx1];
  array[idx1] = array[idx2];
  array[idx2] = tmp;
}

export function selectionSort(array) {
  const animations = []; //array of array [i, j, swap or not]
  const newArray = [...array];
  let minIdx = 0;
  for (let i = 0; i < newArray.length; i++) {
    //search for minimum in subarray
    minIdx = i;
    for (let j = i + 1; j < newArray.length; j++) {
      if (newArray[minIdx] > newArray[j]) {
        minIdx = j;
      }
      animations.push([i, j, false]);
    }
    animations.push([i, minIdx, true]);
    swap(newArray, i, minIdx);
  }

  return animations;
}

export function bubbleSort(array) {
  const animations = [];
  const newArray = [...array];
  let swapped;

  for (let i = 0; i < newArray.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < newArray.length - i - 1; j++) {
      animations.push([j, j + 1, false]);
      if (newArray[j] > newArray[j + 1]) {
        swap(newArray, j, j + 1);
        swapped = true;
        animations.push([j, j + 1, true]);
      }
    }

    if (!swapped) break;
  }

  return animations;
}

export function insertionSort(array) {
  const animations = [];
  const newArray = [...array];

  for (let i = 0; i < newArray.length - 1; ++i) {
    let j = i;
    while (j >= 0 && newArray[j] > newArray[j + 1]) {
      swap(newArray, j, j + 1);
      animations.push([j, j + 1, true]);
      j--;
    }
  }

  return animations;
}
