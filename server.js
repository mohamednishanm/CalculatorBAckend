const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

function evaluateExpression(expression) {
  const sanitizedExpression = expression.replace(/-\d/*+./g, '');
  return Function(`'use strict'; return (${sanitizedExpression})`)();
}

app.post("/calculate", (req, res) => {
  const { expression } = req.body;
  try {
    const result = evaluateExpression(expression);
    res.json({ result });
    console.log(`Calculation: ${expression} = ${result}`);
  } catch (error) {
    console.error("Calculation error:", error);
    res.status(400).json({ error: "Invalid expression" });
  }
});

app.listen(port, () => {
  console.log(`Calculator backend running on port ${port}`);
});