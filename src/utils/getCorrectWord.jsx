const words = ['слов', 'слово', 'слова'];

export function getCorrectWord(count) {
  let word;
  const partCount = count % 100;
  if ((partCount >= 11) && (partCount <= 19)) {
    word = words[0];
  }
  const partCountA = count % 10;
  if (partCountA === 1) {
    word = words[1];
  } else if ((partCountA >= 2) && (partCountA <= 4)) {
    word = words[2];
  }
  return word;
}
