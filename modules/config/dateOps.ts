const months = (payload = 0) => ({
  1: payload,
  2: payload,
  3: payload,
  4: payload,
  5: payload,
  6: payload,
  7: payload,
  8: payload,
  9: payload,
  10: payload,
  11: payload,
  12: payload
});

const weeks = (count: number, payload = 0) => {
  const resp: { [key: number]: number } = {};
  for (let index = 1; index <= count; index++) {
    resp[index] = payload;
  }
  return resp;
};

const days = (payload = 0) => ({
  1: payload,
  2: payload,
  3: payload,
  4: payload,
  5: payload,
  6: payload,
  7: payload
});

const addMonths = (months: number) => {
  const newDate = new Date();
  const currentMonth = newDate.getMonth();
  newDate.setMonth(currentMonth + months);
  return newDate;
};

export default {
  months,
  weeks,
  days,
  addMonths
};
