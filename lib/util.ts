export function test() {
  return "test";
}

export function capitalize(str: string): string {
  return str[0].toUpperCase() + str.substr(1);
}