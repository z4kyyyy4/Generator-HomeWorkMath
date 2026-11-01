import { randomInt } from './random';
import { formatNumber, formatPolynomial } from './format';

// Квадратное уравнение ax² + bx + c = 0 с двумя разными целыми корнями
export function quadraticEquation(): { question: string; answer: string } {
  // 1. сначала корни, и они должны быть разными
  const x1 = randomInt(-9, 9);
  let x2 = x1;
  while (x2 === x1) {
    x2 = randomInt(-9, 9);
  }

  // 2. раскрываем скобки k(x − x1)(x − x2)
  const k = randomInt(1, 3);
  const a = k;
  const b = -k * (x1 + x2);
  const c = k * x1 * x2;

  const left = formatPolynomial([
    { coef: a, variable: 'x²' },
    { coef: b, variable: 'x' },
    { coef: c, variable: '' },
  ]);

  // в ответе корни по возрастанию
  const small = Math.min(x1, x2);
  const big = Math.max(x1, x2);

  return {
    question: `${left} = 0`,
    answer: `x₁ = ${formatNumber(small)}, x₂ = ${formatNumber(big)}`,
  };
}