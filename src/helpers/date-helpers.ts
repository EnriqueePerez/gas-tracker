export const getCurrentDate = (minutes: string) => {
  const today = new Date();
  const dd = today.getDate();
  const m = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  return new Date(`${yyyy}-0${m}-${dd}T${minutes}:00`).toISOString();
};
