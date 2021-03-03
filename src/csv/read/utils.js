const seperateDebitsAndCredits = (oneFilesData) => {
  const positiveArr = [];
  const negativeArr = [];

  oneFilesData.forEach((item) => {
    if (item.Amount < 0) {
      negativeArr.push({ ...item, Amount: item.Amount * -1 });
    } else {
      positiveArr.push(item);
    }
  });

  return { debits: [...negativeArr], credits: [...positiveArr] };
};

const months = {
  JANUARY: 0,
  FEBRUARY: 1,
  MARCH: 2,
  APRIL: 3,
  MAY: 4,
  JUNE: 5,
  JULY: 6,
  AUGUST: 7,
  SEPTEMBER: 8,
  OCTOBER: 9,
  NOVEMBER: 10,
  DECEMBER: 11
};

const getDateFromArgs = () => {
  const date = new Date();
  const monthString = process.argv[2] && process.argv[2].toUpperCase();
  if (monthString && months[monthString]) {
    date.setMonth(months[monthString]);
  }
  return date;
};

module.exports = {
  seperateDebitsAndCredits,
  getDateFromArgs
};
