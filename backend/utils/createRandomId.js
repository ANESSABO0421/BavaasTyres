export default function createRandomId(prefix) {
  const part1 = Math.random().toString(36).substring(2, 10).toUpperCase();
  const part2 = Math.random().toString(36).substring(2, 10).toUpperCase();
  const part3 = Math.random().toString(36).substring(2, 10).toUpperCase();

  return `${prefix}-${part1}-${part2}-${part3}`;
}

