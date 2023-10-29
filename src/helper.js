export async function pause(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export function generateNewArray(length, height) {
  const newArray = [];

  for (let i = 0; i < length; i++) {
    newArray.push(generateRandomNumber(5, (height * 40) / 100));
  }

  return newArray;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
