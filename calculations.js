function add(n1, n2) {
  if (typeof n1 === "number" && typeof n2 === "number") {
    return n1 + n2;
  } else {
    throw new Error("Both arguments need to be numbers");
  }
}

function sub(n1, n2) {
  if (typeof n1 === "number" && typeof n2 === "number") {
    return n1 - n2;
  } else {
    throw new Error("Both arguments need to be numbers");
  }
}

function mul(n1, n2) {
  if (typeof n1 === "number" && typeof n2 === "number") {
    return n1 * n2;
  } else {
    throw new Error("Both arguments need to be numbers");
  }
}

function div(n1, n2) {
  if (typeof n1 === "number" && typeof n2 === "number") {
    if (n2 === 0) {
      throw new Error("Divison by 0 is not allowed!");
    }
    return n1 / n2;
  } else {
    throw new Error("Both arguments need to be numbers");
  }
}

function operate(args) {
  if (args.operator === operations.add) {
    return add(args.numberOne, args.numberTwo);
  } else if (args.operator === operations.sub) {
    return sub(args.numberOne, args.numberTwo);
  } else if (args.operator === operations.mul) {
    return mul(args.numberOne, args.numberTwo);
  } else if (args.operator === operations.div) {
    return div(args.numberOne, args.numberTwo);
  }
}

function populateDisplay(displayArgs) {
  const display = document.querySelector("#display");
  display.textContent = displayArgs;
}

function parseDisplayArgs() {
  if (displayArgs === "" || displayArgs.split(/([+\-*/])/).length < 2) {
    return null;
  }
  // the backslash escapes the minus sign
  let args = displayArgs.split(/([+\-*/])/);

  let calc = args.slice(0, 3);
  calculatorArgs.numberOne = Number(calc[0]);
  calculatorArgs.operator = calc[1];
  calculatorArgs.numberTwo = Number(calc[2]);

  let result = operate(calculatorArgs).toFixed(3);
  args.splice(0, 3);

  args.unshift(String(result));

  displayArgs = args.join(" ");

  // displayArgs = String(result);
  populateDisplay(displayArgs);
}

function clearDisplay() {
  displayArgs = "";
  populateDisplay(displayArgs);
}

let operations = {
  add: "+",
  sub: "-",
  mul: "*",
  div: "/",
};

let calculatorArgs = {
  numberOne: undefined,
  operator: undefined,
  numberTwo: undefined,
};

let displayArgs = "";

// events

const numberBlock = document.querySelector("#numberblock");
const children = numberBlock.children;

for (let i = 0; i < children.length; i++) {
  if (
    children[i].classList.contains("number-button") ||
    children[i].classList.contains("operation-button")
  ) {
    children[i].addEventListener("click", () => {
      displayArgs += String(children[i].id);
      populateDisplay(displayArgs);
    });
  } else if (children[i].id == "equal-button") {
    children[i].addEventListener("click", () => {
      parseDisplayArgs(displayArgs);
    });
  } else if (children[i].id == "clear-button") {
    children[i].addEventListener("click", () => {
      clearDisplay();
    });
  }
}
