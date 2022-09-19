export function randomNumber(n, m) {
  return Math.floor(
    Math.random() * (m - n + 1),
  ) + n;
}

function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export function mix(array) {
  for (let i = 0; i < array.length; i += 1) {
    const pos = randomNumber(0, array.length - 1);
    swap(array, i, pos);
  }

  return array;
}

export function generateRandomIndexes(amount, max) {
  const array = Array.from(Array(max).keys());

  return mix(array).slice(0, amount);
}

export function getRandomIndexesExceptCurrent(n, amount, current) {
  const array = Array.from(Array(n).keys());
  swap(array, 0, current);
  array.shift();
  mix(array);

  return array.slice(0, amount);
}
