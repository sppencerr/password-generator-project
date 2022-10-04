
var resultEl = document.getElementById("result");
var lengthEl = document.getElementById("length");
var uppercaseEl = document.getElementById("uppercase");
var lowercaseEl = document.getElementById("lowercase");
var numbersEl = document.getElementById("numbers");
var symbolsEl = document.getElementById("symbols");
var generateEl = document.getElementById("generate");

var randomFunc = {
  lower: generateRandomLower,
  upper: generateRandomUpper,
  number: generateRandomNumber,
  symbol: generateRandomSymbol,
};

generateEl.addEventListener("click", () => {
  var length = +lengthEl.value;
  if (length < 8) {
    alert("Password length must be at least 8 characters");
    return null;
  }
  if (length > 128) {
    alert("Password length must be less than 129 characters");
    return null;
  }
  var hasLower = lowercaseEl.checked;
  var hasUpper = uppercaseEl.checked;
  var hasNumber = numbersEl.checked;
  var hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});
//generate password func
function generatePassword(lower, upper, number, symbol, length) {
//make password variable
let generatedPassword = "";

var typesCount = lower + upper + number + symbol;

// console.log("typesCount: ", typesCount);

var typesArray = [{lower}, {upper}, {number}, {symbol}].filter
(
  item => Object.values(item)[0]
);

// console.log("typesArray", typesArray);

if(typesCount === 0){
  return "";
}
for(let i = 0; i < length; i += typesCount) {
  typesArray.forEach(type => {
    var funcName = Object.keys(type)[0];
    // console.log("funcName: ", funcName);

    generatedPassword += randomFunc[funcName]();

  });

}
var finalPassword = generatedPassword.slice(0, length);

return finalPassword;
}

//create the string of characters 97-122 are lowercase
function generateRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
//create the string of characters 65-90 are uppercase
function generateRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
//create the string of numbers characters 48-58 are numbers
function generateRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function generateRandomSymbol() {
  var symbols = "!@#$%^&*";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
