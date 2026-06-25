export function monthsOfSemester(
  currentMonth: number | null = null,
  lang = "pt-BR",
) {
  const monthNames = Array.from({ length: 12 }, (_, month) => {
    const formatter = new Intl.DateTimeFormat(lang, { month: "long" });
    return formatter.format(new Date(0, month));
  });

  const currentMonthIndex = currentMonth ?? new Date().getMonth();

  const semester: { [key: string]: number } = {};

  for (let i = 0; i < 6; i++) {
    const nextIndex = (currentMonthIndex + i) % 12;
    semester[monthNames[nextIndex]] = 12;
  }

  return { ...semester };
}
