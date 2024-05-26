// Change the value to the selected value of the range #pw-length

const length = document.querySelector('#pw-length');
const lengthValue = document.querySelector('#length-output');

function updateOutputs() {
    // Length
    lengthValue.innerText = length.value;
}

// Initial load
updateOutputs();

length.oninput = () => {
    updateOutputs();
    generatePassword();
}

// Generate a random password
const password = document.querySelector('#password');
const capLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowLetters = "abcdefghijklmnopqrstuvwxyz";
const specChars = "!@#$^&*_?";
const nums = "1234567890"
const checkboxes = document.querySelectorAll('input[type="checkbox"]')

function getValidChars() {
    let validChars = ""
    checkboxes.forEach(box => {
        if (box.checked) {
            switch(box.name) {
                case "tg-special":
                    validChars += specChars;
                    break;
                case "tg-number":
                    validChars += nums;
                    break;
                case "tg-upper":
                    validChars += capLetters;
                    break;
                case "tg-lower":
                    validChars += lowLetters;
                    break;
            }
        }
    });
    return validChars;
}


function generatePassword() {
    let pass = "";
    for (let i=0; i < length.value; i++) {
        // const validChars = capLetters + lowLetters + specChars;
        const selectedChars = getValidChars();
        const randChar = Math.floor(Math.random() * selectedChars.length);
        pass += selectedChars[randChar];
    }
    password.innerText = pass;
}

checkboxes.forEach(box => {
    box.onclick = () => {
        generatePassword();
    }
});

generatePassword();
// Re-generate button
const genButton = document.querySelector('#regenerate');
genButton.onclick = () => {
    let count = 0;
    const maxCount = 10; // Number of times to change the password

    const interval = setInterval(function() {
        generatePassword();
        // document.getElementById('passwordOutput').innerText = `Generated Password: ${password}`;
        count++;

        if (count >= maxCount) {
            clearInterval(interval); // Stop the interval after maxCount times
        }
    }, 50); // Change password every 100 milliseconds
}
