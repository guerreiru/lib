const daysAgo = (days) => {
  if (!days) {
    return new Date();
  }

  const currDate = new Date();
  const subtractedDate = new Date(currDate.setDate(currDate.getDate() - days));
  return subtractedDate;
};

module.exports = { daysAgo };
