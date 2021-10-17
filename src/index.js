const addition = "12+34";

const isDigit = (char) => {
  return /[0-9]/.test(char);
};

function tokenizer(code) {
  let tokens = [];
  let current = 0;
  let char = "";
  let tokenText = "";

  while (current <= code.length) {
    char = code[current];
    if (isDigit(char)) {
      tokenText += char;
    } else {
      tokens.push({
        type: "number",
        value: tokenText,
      });
      tokenText = "";
    }

    if (char === "+") {
      tokens.push({
        type: "symbol",
        value: char,
      });
    }

    current++;
  }
  return tokens;
}

function evaluate(tokens) {
  let result;
  if (tokens[1].type === "symbol" && tokens[1].value === "+") {
    let value1 = Number(tokens[0].value);
    let value2 = Number(tokens[2].value);
    result = value1 + value2;
  }

  return result;
}

const tokens = tokenizer(addition);
console.log(tokens);
const result = evaluate(tokens);
console.log(result);
