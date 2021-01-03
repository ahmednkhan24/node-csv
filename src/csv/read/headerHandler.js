const multipliers = require('./multipliers');

const formatNumber = (numString) => Number(numString.replace(/[^0-9.-]+/g, ''));
const formatWhiteSpace = (string) => string.replace(/\s+/g, ' ').trim();

const generateCallback = ({ date, amount, desc, debit, multiplier }) => {
  const callback = (rowOfData, fileName) => {
    const data = {};

    Object.keys(rowOfData).forEach((index) => {
      switch (Number(index)) {
        case date:
          data['PostDate'] = formatWhiteSpace(rowOfData[index]);
          break;
        case desc:
          data['Description'] = formatWhiteSpace(rowOfData[index]);
          break;
        case amount:
          data['Amount'] = formatNumber(rowOfData[index]) * multiplier;
          break;
        case debit:
          if (formatNumber(rowOfData[index]) !== 0 && data['Amount'] === 0)
            data['Amount'] = formatNumber(rowOfData[index]) * -1;
          break;
        default:
          return null;
      }
    });

    return { ...data, FileName: fileName };
  };

  return callback;
};

module.exports = (fileName) => {
  fileName = fileName.toUpperCase();

  if (fileName.includes('BESTBUY')) {
    return {
      headers: false,
      handler: generateCallback({
        date: 0,
        amount: 1,
        desc: 2,
        multiplier: multipliers.BESTBUY
      })
    };
  } else if (fileName.includes('COSTCO')) {
    return {
      headers: true,
      handler: generateCallback({
        date: 1,
        amount: 3,
        desc: 2,
        multiplier: multipliers.COSTCO
      })
    };
  } else if (fileName.includes('DISCOVER')) {
    return {
      headers: true,
      handler: generateCallback({
        date: 1,
        amount: 3,
        desc: 2,
        multiplier: multipliers.DISCOVER
      })
    };
  } else if (fileName.includes('WELLSFARGO')) {
    return {
      headers: false,
      handler: generateCallback({
        date: 0,
        amount: 1,
        desc: 4,
        multiplier: multipliers.WELLSFARGO
      })
    };
  } else if (fileName.includes('PNC') && fileName.includes('DEBIT')) {
    return {
      headers: true,
      handler: generateCallback({
        date: 0,
        amount: 2,
        desc: 1,
        debit: 3,
        multiplier: multipliers.PNC
      })
    };
  } else if (fileName.includes('PNC')) {
    return {
      headers: true,
      handler: generateCallback({
        date: 0,
        amount: 2,
        desc: 1,
        multiplier: multipliers.PNC
      })
    };
  } else if (fileName.includes('CHASE') && fileName.includes('DEBIT')) {
    return {
      headers: true,
      handler: generateCallback({
        date: 1,
        amount: 3,
        desc: 2,
        multiplier: multipliers.CHASE
      })
    };
  } else if (fileName.includes('CHASE')) {
    return {
      headers: true,
      handler: generateCallback({
        date: 1,
        amount: 5,
        desc: 2,
        multiplier: multipliers.CHASE
      })
    };
  } else {
    return null;
  }
};
