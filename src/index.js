const addition = "(12+34)*56";

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
    } else if (tokenText) {
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

    if (char === "*") {
      tokens.push({
        type: "symbol",
        value: char,
      });
    }

    if (char === "(") {
      tokens.push({
        type: "symbol",
        value: char,
      });
    }

    if (char === ")") {
      tokens.push({
        type: "symbol",
        value: char,
      });
    }

    current++;
  }

  return tokens;
}

class AstNode {
  nodeType = "";
  children = [];
  text = "";

  constructor(nodeType, text) {
    this.nodeType = nodeType;
    text && (this.text = text);
  }

  addChild(node) {
    this.children.push(node);
  }
}

function parse(tokens) {
  return additive(tokens);
}

function additive(tokens) {
  let child1 = multiplicate(tokens);
  let node = child1;

  while (true) {
    let token = tokens[0];
    if (token && token.type === "symbol" && token.value === "+") {
      tokens.shift();
      node = new AstNode("add", token.value);
      let child2 = multiplicate(tokens);
      node.addChild(child1);
      node.addChild(child2);
      child1 = node;
    } else {
      break;
    }
  }
  return node;
}

function multiplicate(tokens) {
  let child1 = primary(tokens);
  let node = child1;
  let token = tokens[0];

  if (token && token.type === "symbol" && token.value === "*") {
    tokens.shift();
    node = new AstNode("star", token.value);
    let child2 = multiplicate(tokens);
    node.addChild(child1);
    node.addChild(child2);
  }

  return node;
}

function primary(tokens) {
  let token = tokens[0];
  let node = null;
  if (token.type === "number") {
    tokens.shift();
    node = new AstNode(token.type, token.value);
  } else if (token.type === "symbol" && token.value === "(") {
    tokens.shift();
    node = additive(tokens);
    token = tokens[0];
    if (token.type === "symbol" && token.value === ")") {
      tokens.shift();
    }
  }
  return node;
}

function evaluate(astNode) {
  let child1, child2;
  let value1, value2;
  let result;

  switch (astNode.nodeType) {
    case "add":
      child1 = astNode.children[0];
      value1 = evaluate(child1);
      child2 = astNode.children[1];
      value2 = evaluate(child2);

      result = value1 + value2;
      break;
    case "star":
      child1 = astNode.children[0];
      value1 = evaluate(child1);
      child2 = astNode.children[1];
      value2 = evaluate(child2);

      result = value1 * value2;
      break;
    case "number":
      result = Number(astNode.text);
      break;
  }

  return result;
}

const tokens = tokenizer(addition);
// console.log(tokens);
const ast = parse(tokens);
// console.log(ast);
const result = evaluate(ast);
console.log(addition);
console.log(result);
