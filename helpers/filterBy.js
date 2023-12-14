const filterBy = (data, filter) => {
  return data.filter((item) => item[filter]);
};

module.exports = { filterBy };
