const addition = "12+34+56";

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
  let token = tokens.shift();
  let child1 = new AstNode(token.type, token.value);
  let node = child1;
  while (true) {
    token = tokens.shift();
    if (token && token.type === "symbol" && token.value === "+") {
      node = new AstNode("add", token.value);
      token = tokens.shift();
      let child2 = new AstNode(token.type, token.value);
      node.addChild(child1);
      node.addChild(child2);
      child1 = node;
    } else {
      break;
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
    case "number":
      result = Number(astNode.text);
      break;
  }

  return result;
}

const tokens = tokenizer(addition);
console.log(tokens);
const ast = parse(tokens)
console.log(ast)
const result = evaluate(ast);
console.log(result);
