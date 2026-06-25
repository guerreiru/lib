/**
 * Gera uma sequência de números inteiros dentro de um intervalo especificado.
 * @param {number} index O valor inicial da sequência.
 * @param {number} end O valor final da sequência.
 * @param {number} [step=1] O tamanho do passo entre os números na sequência (opcional, padrão é 1).
 * @returns {number[]} Uma matriz contendo a sequência de números dentro do intervalo especificado.
 */
export const range = (index: number, end?: number, step = 1): number[] => {
  const n1 = end ? index : 1;
  const n2 = end ? end : index;

  console.log({ index });
  console.log({ end });
  console.log("==========");
  const nums = [];
  const _step = n1 < n2 ? Math.abs(step) : -Math.abs(step);

  for (let i = n1; n1 <= n2 ? i <= n2 : i >= n2; i += _step) {
    nums.push(i);
  }

  return nums;
};
