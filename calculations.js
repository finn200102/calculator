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
    console.log(children[i]);
    children[i].addEventListener("click", () => {
      displayArgs += String(children[i].id);
      populateDisplay(displayArgs);
    });
  } else if (children[i].classList.contains("equal-button")) {
  }
}
