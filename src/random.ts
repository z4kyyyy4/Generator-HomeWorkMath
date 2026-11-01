/**
 * Возвращает случайное целое число от min до max включительно.
 * @param min наименьшее возможное число
 * @param max наибольшее возможное число
 */

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}