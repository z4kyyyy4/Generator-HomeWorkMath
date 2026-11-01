// Настоящий знак минуса (−), он длиннее дефиса (-). Скопируй символ отсюда.
const MINUS = '−';

// Член многочлена: коэффициент и переменная ('x', 'x²' или '' для числа)
export type Term = { coef: number; variable: string };

// Число со знаком минуса: −7 вместо -7
export function formatNumber(n: number): string {
  return n < 0 ? MINUS + Math.abs(n) : String(n);
}

// Один член. first — первый ли он: перед первым не ставим « + »
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

// Весь многочлен: пропускает нули, расставляет знаки
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