export const formatDate = (date: Date) => {
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  return `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}`;
}
