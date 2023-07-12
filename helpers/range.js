const range = (index, end, step = 1) => {
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

module.exports = { range };
