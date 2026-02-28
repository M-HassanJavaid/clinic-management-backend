function getLast30DaysDate() {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date;
}

export default getLast30DaysDate