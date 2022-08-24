export const getCurrentDate = (minutes: string) => {
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  return new Date(`${yyyy}-${mm}-${dd} ${minutes}:00`).toISOString();
};
