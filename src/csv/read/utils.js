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

module.exports = {
  seperateDebitsAndCredits
};
