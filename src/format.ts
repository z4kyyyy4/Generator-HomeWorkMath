// Настоящий знак минуса (−), он длиннее дефиса (-). Скопируй символ отсюда.
const MINUS = '−';

// Член многочлена: коэффициент и переменная ('x', 'x²' или '' для числа)
export type Term = { coef: number; variable: string };

/**
 * Записывает число со знаком «−» вместо дефиса, например −7.
 * @param n число
 */
export function formatNumber(n: number): string {
  return n < 0 ? MINUS + Math.abs(n) : String(n);
}

/**
 * Записывает один член многочлена: знак, коэффициент и переменную.
 * @param t член многочлена
 * @param first true, если член первый: перед ним не ставится « + »
 */
function formatTerm(t: Term, first: boolean): string {
  let sign: string;
  if (first) {
    sign = t.coef < 0 ? MINUS : '';
  } else {
    sign = t.coef < 0 ? ` ${MINUS} ` : ' + ';
  }
  const abs = Math.abs(t.coef);
  // единицу перед переменной не пишем: x, а не 1x
  const number = abs === 1 && t.variable !== '' ? '' : String(abs);
  return sign + number + t.variable;
}

/**
 * Записывает многочлен как в тетради: без нулевых членов,
 * без коэффициента 1 перед x, со знаками между членами.
 * @param terms члены многочлена по порядку
 * @returns строка, например «−4x − 6»
 */
export function formatPolynomial(terms: Term[]): string {
  let result = '';
  for (const t of terms) {
    if (t.coef === 0) {
      continue; // нулевой член пропускаем
    }
    result += formatTerm(t, result === '');
  }
  return result === '' ? '0' : result;
}