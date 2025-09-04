export function test() {
  return "test";
}

export function capitalize(str: string): string {
  return str[0].toUpperCase() + str.substr(1);
}

export function capitalizeWords(str: string): string {
  const words = str.split('-');
  let result = "";
  let n = 0;
  for (const word of words) {
    if (n > 0) result += " ";
    result += word[0].toUpperCase() + word.substr(1);
    n++;
  }
  if (n <= 0) result = "-";
  return result;
}

export function cleanString(str: string): string {
  return str.replaceAll("\n", " ").replaceAll("\f", " ");
}
