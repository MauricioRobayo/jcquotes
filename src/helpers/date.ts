export function getDateFromSource(source: string) {
  const date = Date.parse(source.replace(/.*\//, ""));
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(date);
}
