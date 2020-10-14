// Assignment Code
var generateBtn = document.querySelector("#generate");
var lowerCaseChars =
  ['a','b','c','d','e','f','g','h','i','j','k','l','m',
  'n','o','p','q','r','s','t','u','v','w','x','y','z']; // static list of lower-case characters
var upperCaseChars = 
['A','B','C','D','E','F','G','H','I','J','K','L','M',
'N','O','P','Q','R','S','T','U','V','W','X','Y','Z']; // static list of upper-case characters
var numberChars = 
['0','1','2','3','4','5','6','7','8','9']; // static list of numeric characters
var specialChars = 
[" ","!","\"","#","$","%","&","'","(",")","*",
"+",",","-",".","/",":",";","<","=",">","?",
"@","[","\\","]","^","_","`","{","|","}","~"]; // 33 Special characters based on OWASP list

/*
* FUNCTION: generatePassword()
* PARAMETERS: passwordCriteria - an object containing password
                                 preferences chosen by user
* RETURNS: password - a string meeting user criteria for password
*/
function generatePassword(passwordCriteria) {
   // This is an empty string which will 
   // grow as more characters are added to it
  var password = "";
  var passwordChars = []; // a 2D array
  // Following IF-checks will incrementally
  // build a global pool of characters to choose from based
  // on the passwordCriteria selected by the user
  if(passwordCriteria.lower === true) {
    // add lower-case chars if user wants
    // to include it in their password 
    passwordChars.push(lowerCaseChars);
  }
  if(passwordCriteria.upper === true) {
    // add upper-case chars if user wants
    // to include it in their password 
    passwordChars.push(upperCaseChars);
  }
  if(passwordCriteria.numeric === true) {
    // add numeric chars if user wants
    // to include it in their password 
    passwordChars.push(numberChars);
  }
  if(passwordCriteria.special === true) {
    // add special chars if user wants
    // to include it in their password 
    passwordChars.push(specialChars);
  }
  // deal with corner case when no chars
  // were selected
  if (passwordChars.length == 0) {
    alert("No characters selected, aborting!");
    return password;
  }
  // Use a for-loop to fill characters matching requested length
  // position-by-position
  for (var char=0; char<passwordCriteria.length; char++) {
    // For each character position in password string:
    // Step 1: Choose from upto 4 pools by generating a random # between 0-3(max)
    var globalPoolIndex = Math.floor(Math.random()*passwordChars.length);
    // Step 2: Choose a random index from the chosen pool
    var charPoolIndex = Math.floor(Math.random()*passwordChars[globalPoolIndex].length);
    // Step 3: Index into 2D array and extract a password char 
    // Step 3.1: Concatenate chosen character to password string
    // console.log("char="+char+": globalPoolIndex="+globalPoolIndex+" charPoolIndex="+charPoolIndex); // enable for debugging
    password += passwordChars[globalPoolIndex][charPoolIndex];
  }
  return password; // password is ready!
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
  // 3. Generate password
  var password = generatePassword(passwordCriteria);
  // 4. Display password
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
