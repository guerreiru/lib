function monthsOfSemester(currentMonth) {
  const monthNames = Array.from({ length: 12 }, (_, month) => {
    const formatter = new Intl.DateTimeFormat("en", { month: "long" });
    return formatter.format(new Date(0, month)).toLowerCase();
  });

  const currentMonthIndex = currentMonth ?? new Date().getMonth();

  const semester = {};

  for (let i = 0; i < 6; i++) {
    const nextIndex = (currentMonthIndex + i) % 12;
    semester[monthNames[nextIndex]] = 12;
  }

  return { ...semester };
}

module.exports = { monthsOfSemester };
