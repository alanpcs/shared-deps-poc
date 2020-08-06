import { MathFunction } from "../typings";

export const fibonacci: MathFunction = (n: number): number => {
  const A = (1 + Math.sqrt(5)) / 2;
  const B = (1 - Math.sqrt(5)) / 2;
  const f = (Math.pow(A, n) - Math.pow(B, n)) / Math.sqrt(5);
  return Math.ceil(f);
};
