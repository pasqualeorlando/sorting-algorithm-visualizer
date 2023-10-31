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

export function quickSortAnimations(array) {
  const animations = [];
  const newArray = [...array];
  dividerQuickSort(animations, newArray, 0, newArray.length - 1);
  return animations;
}

function dividerQuickSort(animations, array, start, end) {
  if (start < end) {
    let pivot = partition(animations, array, start, end);
    dividerQuickSort(animations, array, start, pivot - 1);
    dividerQuickSort(animations, array, pivot + 1, end);
  }
}

function partition(animations, array, start, end) {
  let prevIndex = start - 1;
  for (let index = start; index < end; ++index) {
    if (index !== end) {
      animations.push([index, end, false]);
    }
    if (array[index] < array[end]) {
      ++prevIndex;
      swap(array, index, prevIndex);
      animations.push([index, prevIndex, true]);
    }
  }
  swap(array, prevIndex + 1, end);
  animations.push([end, prevIndex + 1, true]);
  return prevIndex + 1;
}

export function heapSort(array) {
  const animations = [];
  const newArray = [...array];
  const length = newArray.length;

  for (let index = Math.ceil(length / 2) - 1; index >= 0; --index) {
    heapify(animations, newArray, length, index);
  }
  for (let index = length - 1; index >= 0; --index) {
    animations.push([index, 0, true]);
    swap(newArray, index, 0);
    heapify(animations, newArray, index, 0);
  }
  return animations;
}

function heapify(animations, array, length, index) {
  let largest = index;
  let left = 2 * index + 1,
    right = 2 * index + 2;

  if (left < length && array[left] > array[largest]) {
    largest = left;
  }
  if (right < length && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== index) {
    animations.push([index, largest, true]);
    swap(array, index, largest);
    heapify(animations, array, length, largest);
  }
}
