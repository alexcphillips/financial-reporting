exports.clearConsole = function () {
  process.stdout.write("\u001b[3J\u001b[1J");
  console.clear();
};

exports.isDev = process.env.NODE_ENV === "dev";
