const isAValidDate = (date) => !isNaN(new Date(date).getTime());

module.exports = { isAValidDate };
