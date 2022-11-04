export const sum = (data) => {
  // let ans =data.filter((item)=> item.name !== "Drawing").reduce((accum,item) => accum + Number(item.Overall), 0)

  let totalSum = 0;
  for (let i = 0; i < data.length; i++) {
    totalSum +=
      data[i].first_anual_marks +
      data[i].first_oral_marks +
      data[i].second_anual_marks +
      data[i].second_oral_marks;
  }
  
  return totalSum;
};

export const percentage = (data) => {
  let totalNumber = data.length * 100;
  return ((sum(data) * 100) / totalNumber).toFixed(2);
};
