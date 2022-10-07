export const getCurrentDate = (minutes: string) => {
  const today = new Date();

  const yyyy = today.getFullYear();
  let mm: string | number = today.getMonth() + 1;
  let dd: string | number = today.getDate();

  if (mm < 10) {
    mm = `0${mm}`;
  }

  if (dd < 10) {
    dd = `0${dd}`;
  }
  return new Date(`${yyyy}-${mm}-${dd}T${minutes}:00`).toISOString();
};
