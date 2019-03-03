const CloudTravel = require("./CloudTravel");

const cT = new CloudTravel();

console.log(
  "First: ",
  cT.shortestCourierTrip([0, 0, 70], [90, 0, 45], ["2", "0 2", "0 1"], 0, 1)
);

console.log(
  "Second: ",
  cT.shortestCourierTrip([0, 0, 70], [90, 0, 45], ["1 2", "0 2", "0 1"], 0, 1)
);

console.log(
  "Third: ",
  cT.shortestCourierTrip(
    [0, 30, 60],
    [25, -130, 78],
    ["1 2", "0 2", "1 2"],
    0,
    0
  )
);

console.log(
  "Fourth: ",
  cT.shortestCourierTrip([0, 20, 55], [-20, 85, 42], ["1", "0", "0"], 0, 2)
);
