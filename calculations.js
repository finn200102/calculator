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
  let display = document.querySelector("#display");
  display.value = displayArgs;
}

function parseDisplayArgs() {
  if (displayArgs === "" || displayArgs.split(/([+\-*/])/).length < 2) {
    return null;
  }
  // the backslash escapes the minus sign
  //let args = displayArgs.split(/([+\-*/])/);
  let args = displayArgs.split(" ");

  let calc = args.slice(0, 3);
  calculatorArgs.numberOne = Number(calc[0]);
  calculatorArgs.operator = calc[1];
  calculatorArgs.numberTwo = Number(calc[2]);
  console.log(calculatorArgs);
  if (
    isNaN(calculatorArgs.numberTwo) ||
    !(
      calculatorArgs.operator == "-" ||
      calculatorArgs.operator == "+" ||
      calculatorArgs.operator == "*" ||
      calculatorArgs.operator == "/"
    )
  ) {
    return null;
  }

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

function checkIfIncludesOperations(word) {
  return (
    word.includes(operations.add) ||
    word.includes(operations.sub) ||
    word.includes(operations.mul) ||
    word.includes(operations.div)
  );
}

function checkIfPointAllowed() {
  if (checkIfIncludesOperations(displayArgs)) {
    //const args = displayArgs.split(/([+\-*/])/);
    const args = displayArgs.split(" ");
    if (checkIfIncludesOperations(args.at(-1))) {
      return false;
    } else {
      if (args.at(-1).includes(".")) {
        return false;
      } else {
        return true;
      }
    }
  } else {
    if (displayArgs.includes(".")) {
      return false;
    } else {
      return true;
    }
  }
}

function addSpaceAfterNumber(str) {
  let operators = Object.values(operations)
    .map((op) => "\\" + op)
    .join("");
  let regex = new RegExp(`(\\d)([${operators}])`, "g");

  return str.replace(regex, "$1 $2");
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

const display = document.querySelector("#display");
display.addEventListener("input", function () {
  displayArgs = addSpaceAfterNumber(this.value);
  populateDisplay(displayArgs);
});

display.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    parseDisplayArgs(displayArgs);
  }
});

const numberBlock = document.querySelector("#numberblock");
const children = numberBlock.children;

for (let i = 0; i < children.length; i++) {
  if (
    children[i].classList.contains("number-button") ||
    children[i].classList.contains("operation-button") ||
    children[i].id == "."
  ) {
    children[i].addEventListener("click", () => {
      if (children[i].id == "." && !checkIfPointAllowed()) {
      } else {
        //displayArgs += String(children[i].id);
        // add spaces around operators
        displayArgs += checkIfIncludesOperations(children[i].id)
          ? " " + String(children[i].id) + " "
          : String(children[i].id);
        populateDisplay(displayArgs);
      }
    });
  } else if (children[i].id == "equal-button") {
    children[i].addEventListener("click", () => {
      parseDisplayArgs(displayArgs);
    });
  }
}

const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", () => {
  clearDisplay();
});
