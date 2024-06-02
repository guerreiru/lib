export const compareObjects = (...objs) => {
  const uniqueStrings = new Set(objs.map((obj) => JSON.stringify(obj)));
  const uniqueCount = uniqueStrings.size;
  if (uniqueCount === 1) {
    return "Todos os objetos são iguais.";
  } else {
    console.log(`Existem ${uniqueCount} objetos únicos.`);
    uniqueStrings.forEach((str) => {
      const count = objs.filter((obj) => JSON.stringify(obj) === str).length;
      console.log(`${count} objetos são iguais a:`, JSON.parse(str));
    });
  }
};
