export function extractID(str: string) {
  const arr = str.split("/");
  return arr[arr.length - 2];
}
