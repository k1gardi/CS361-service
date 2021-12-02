export class InputError extends Error {
  readonly code: number;

  constructor(msg: string) {
    super(msg);
    this.code = 400;
  }
}

const shuffle = (array: string[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const randomizeArray = (arr: string[], n: number) => {
  if (arr.length <= n) {
    throw new InputError(
      "Bad Request: num_wanted must be >= filenames array length"
    );
  }
  const shuffledArr = shuffle(arr);
  return shuffledArr.slice(0, n);
};
