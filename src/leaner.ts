import { randomInt } from './random';

// Линейное уравнение ax + b = c с целым корнем
export function linearEquation(): { question: string; answer: string } {
  const x = randomInt(-10, 10);   // 1. сначала ответ

  let a = 0;
  while (a === 0) {               // 2. a не должно быть нулём
    a = randomInt(-9, 9);
  }
  const b = randomInt(-20, 20);

  const c = a * x + b;            // 3. правую часть вычисляем

  return {
    question: `${a}x + ${b} = ${c}`,
    answer: `x = ${x}`,
  };
}