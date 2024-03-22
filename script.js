const passwordDisplay = document.querySelector('[data-passwordDisplay]');
const copyMsg = document.querySelector('[data-copyMsg]');
const copyBtn = document.querySelector('[data-copy]');
const lengthDisplay = document.querySelector('[data-lengthNumber]');
const inputSlider = document.querySelector('[data-lengthSlider]');
const indicator = document.querySelector('[data-indicator]');
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector('#lowercase');
const numbersCheck = document.querySelector('#numbers');
const symbolsCheck = document.querySelector('#symbols');
const generateBtn = document.querySelector('.generateBtn');
const allCheckboxes = document.querySelectorAll("input[type=checkbox]");
const symbols = `!@$#%^&*-[]{}<>?().|=+`;

let password = '';
let passwordLength = 10;
let checkCount = 0




;
function setIndicator(color){
    indicator.style.backgroundColor = color;
}

inputSlider.addEventListener('input', function() {
    passwordLength = inputSlider.value;
    lengthDisplay.innerText = passwordLength;
});

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}
// Math.random - generate random number from 0 to 1 where 0 is inclusive and 1 is exclusive
// Math.floor - rounds down the number

function generateRndNumber(){
    return getRndInteger(0,9);
}

function generateLowercase(){
    // String.fromCharCode - converts Unicode values to characters
    // Unicode - assigns a unique numeric value to each chatacter , represented in both hexadecimal and decimal . For example - 'A' - 'U+0041' where U+ stands for Unicode which is equivalent to 97.
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUppercase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasSymbol = false;
    let hasNumber = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked)  hasLower = true;
    if(numbersCheck.checked)  hasNumber = true;
    if(symbolsCheck.checked)  hasSymbol = true;

    if(hasLower && hasUpper && hasNumber && hasSymbol && passwordLength >=8){
        setIndicator('green');
    }
    else if((hasLower || hasUpper) && (hasNumber || hasSymbol) && passwordLength >=5){
        setIndicator('yellow');
    }
    else if((hasLower || hasNumber) && (hasUpper || hasSymbol) && passwordLength >=5){
        setIndicator('yellow');
    }
    else{
        setIndicator('red');
    }
}

function handleCheckboxChange() {
    checkCount = 0;
    allCheckboxes.array.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwordLength < checkCount){
        passwordLength = checkCount;
    }
}

allCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckboxChange);
})

generateBtn.addEventListener('click',() => {

    password = "";
    
    const funcArr = [];

    if(uppercaseCheck.checked){
        funcArr.push(generateUppercase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowercase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRndNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    // Compulsory add
    for(let i = 0 ; i < funcArr.length ; i++){
        password += funcArr[i]();
    }

    // Remaining add
    for(let i = 0 ; i < passwordLength-funcArr.length ; i++){
        let randIdx = getRndInteger(0,funcArr.length);
        password += funcArr[randIdx]();
    }

    password = shufflePassword(password);
    passwordDisplay.value = password;

    calcStrength();
})

function shufflePassword(password) {
    const passwordArray = password.split('');
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }
    return passwordArray.join('');
}
