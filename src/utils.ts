export const getRandomElementsExcludingIndex = <T>(
  array: T[],
  excludeIndex: number,
  count: number = 3,
  extra?: { src: T; index: number }[]
): T[] => {
  const filteredArray = array.filter((_, index) => index !== excludeIndex);
  const extraFilteredArray =
    extra?.filter(({ index }) => index !== excludeIndex) || [];
  const shuffledArray = shuffleArray([
    ...filteredArray,
    ...extraFilteredArray.map(({ src }) => src),
  ]);

  return shuffledArray.slice(0, count);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
