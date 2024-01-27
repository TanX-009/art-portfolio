export function formatDate(date: Date) {
  const options: any = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleString("en-IN", options);
}
