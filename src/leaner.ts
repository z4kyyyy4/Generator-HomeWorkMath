import { randomInt } from './random';
import { formatNumber, formatPolynomial } from './format';

/**
 * Создаёт линейное уравнение ax + b = c с целым корнем.
 * Сначала выбирается корень, потом по нему вычисляется c.
 * @returns условие уравнения и ответ
 */
export function linearEquation(): { question: string; answer: string } {
  const x = randomInt(-10, 10);   // 1. сначала ответ

  let a = 0;
  while (a === 0) {               // 2. a не должно быть нулём
    a = randomInt(-9, 9);
  }
  const b = randomInt(-20, 20);

  const c = a * x + b;            // 3. правую часть вычисляем

  const left = formatPolynomial([
    { coef: a, variable: 'x' },
    { coef: b, variable: '' },
  ]);

  return {
    question: `${left} = ${formatNumber(c)}`,
    answer: `x = ${formatNumber(x)}`,
  };
}