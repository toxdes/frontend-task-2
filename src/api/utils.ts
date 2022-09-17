export const randInt = (n: number): number => {
  return (Math.random() * 100000) % n;
};

const ARTIFICIAL_DELAY_MS = 500;

export const delay = async (delay_ms = ARTIFICIAL_DELAY_MS) => {
  await new Promise((res) => {
    setTimeout(res, delay_ms);
  });
};
