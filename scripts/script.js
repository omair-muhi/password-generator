// Assignment Code
var generateBtn = document.querySelector("#generate");
// A 2D array containing all possible characters to choose from
var passwordChars = [
  // lowerCaseChars
  ['a','b','c','d','e','f','g','h','i','j','k','l','m',
  'n','o','p','q','r','s','t','u','v','w','x','y','z'],
  // upperCaseChars
  ['A','B','C','D','E','F','G','H','I','J','K','L','M',
  'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
  // numberChars
  ['0','1','2','3','4','5','6','7','8','9'],
  // specialChars (33 chars based on OWASP) 
  [" ","!","\"","#","$","%","&","'","(",")","*",
  "+",",","-",".","/",":",";","<","=",">","?",
  "@","[","\\","]","^","_","`","{","|","}","~"]
]

function generatePassword(passwordCriteria) {
  var password = ""; // empty string - will be built in steps
  // declare a for-loop to fill characters matching requested length
  for (var char=0; char<passwordCriteria.length; char++) {
    // Step 1: Choose 1/4 pools by generating a random # between 0-3
    var globaPoolIndex = Math.floor(Math.random()*passwordChars.length);
    // Step 2: Choose a random character from the chosen pool
    var charPoolIndex = Math.floor(Math.random()*passwordChars[globalPoolIndex].length);
    // Step 3: Concatenate chosen character to password string
    password += passwordChars[globalPoolIndex][charPoolIndex];
  }
  return password;
}
// Write password to the #password input
function writePassword() {
  // 0. Declare a custom passwordCriteria object
  var passwordCriteria = {};
  // 1. Prompt for length of password
  do {
    var passwordLength = prompt("Choose a password length (8-128 chracters)");
  } while(passwordLength < 8 || passwordLength > 128)
  passwordCriteria.length = passwordLength;
  // 2. Prompt for character types
  passwordCriteria.lower = confirm("Include lower-case characters?"); // lower-case
  passwordCriteria.upper = confirm("Include upper-case characters?"); // upper-case
  passwordCriteria.numeric = confirm("Include numeric characters?"); // numbers
  passwordCriteria.special = confirm("Include special characters?"); // special characters
  console.log(passwordCriteria);
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
