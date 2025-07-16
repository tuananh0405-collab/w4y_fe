// Converts all values of an objects into their value.toString value, removing all undefined fields
export default function convertToStrObject(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, value.toString()]),
  );
}
