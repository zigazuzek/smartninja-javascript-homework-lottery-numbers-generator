var rangeAmountValue = parseInt(document.getElementById("rangeAmount").value); // We store the default range amount value on initial page load. We also convert it into a number

function generateNumbers() {
    // Each time this function runs, it stores the range minimum and range maximum settings values while also converting them into numbers
    let rangeMin = parseInt(document.getElementById("rangeMin").value);
    let rangeMax = parseInt(document.getElementById("rangeMax").value);

    // This conditional statement will first check for errors in the settings and return alerts for the user
    if ((rangeMax - rangeMin + 1) < rangeAmountValue) {
        window.alert("Error! The number range cannot be smaller than the amount of numbers to be generated!");
    } else if (rangeMin < 1 || rangeMax > 100) {
        window.alert("Error! The selected range must be between 1 and 100!");
    // If everything is set correctly we will start generating our random numbers 
    } else {
        let generatedNumlist = []; // This creates and empty list in which we will store our generated numbers so we can check for duplicates

        // This loop will go on until the requested range of random numbers to be generated is not fulfilled
        for (let i = 0; generatedNumlist.length < rangeAmountValue; i++) {
            let randomNumber = Math.floor(Math.random() * (rangeMax - rangeMin + 1) + rangeMin); // This generates a random number according to our min and max range settings
            // Here we will check if our list already includes a number, if not, we store it into the list, so we can check again in the next loop
            if (!generatedNumlist.includes(randomNumber)) {
                generatedNumlist.push(randomNumber);
                outputNumbers(randomNumber); // We call the function which writes out the unique numbers to the user
            }
        }
    }
}

var lotteryOutput = document.getElementById("lotteryOutput");

// This function gets the randomNumber as an argument and then creates a new label for each result
function outputNumbers(number) {
    let node = document.createElement("LABEL");
    let textnode = document.createTextNode(number);
    node.appendChild(textnode);
    lotteryOutput.appendChild(node);
    lotteryOutput.classList.remove("d-none");
}

// This function simply removes all the previous outputs, so the user always gets a new and clean result without reloading the app
function resetOutput() {
    while (lotteryOutput.firstChild) {
        lotteryOutput.removeChild(lotteryOutput.firstChild);
    }
    lotteryOutput.classList.add("d-none");
}

// This keeps the range amount slider values up to date on every change. It also outputs the current value to the user
document.getElementById("rangeAmount").addEventListener("input", function () {
    document.getElementById("rangeValue").innerHTML = this.value;
    rangeAmountValue = parseInt(this.value);
});

// We handle the generate button here, where we call two functions - reset and generate
document.getElementById("generateButton").addEventListener("click", function (event) {
    event.preventDefault();
    resetOutput();
    generateNumbers();
});

