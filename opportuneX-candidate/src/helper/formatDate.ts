export function formatDateToMonthYear(dateStr) {
  // input "05-09-25" → [day, month, year]
  const [day, month, year] = dateStr.split("-").map(Number);

  // convert year → 2025 instead of 25
  const fullYear = year < 100 ? 2000 + year : year;

  // build Date object
  const date = new Date(fullYear, month - 1, day);

  // format: Friday, September 2025
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    year: "numeric",
  });
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
