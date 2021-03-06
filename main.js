// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]
const testbatch = [invalid2, invalid1]



// Add your functions below:
//create function to check if credit card numbers are valid using Luhn anlgorithm - https://en.wikipedia.org/wiki/Luhn_algorithm
const validateCred = card => {
    let iterator = 1;                   //used to select every other element of the array
    let accumulator = 0;            //

    //the below loop performs Luhn algorithm
    for (i = card.length - 1; i >= 0; i--) {     //interate through array bacwards
        let val = 0;                        //variable to store the current value of the element
        if (iterator % 2 === 0) {           //select every other element and multiply with two
            val = card[i] * 2;
            if (val > 9) {
                val -= 9;          //if the result is > 9 then subtract 9 
            }
        } else {
            val = card[i];  //add to array all the other elements (not the every other)
        }
        iterator++;     //increase iterator
        accumulator += val;         //add the value of the element to the accumulator
    }

    if (accumulator % 10 === 0) {       //if accumulator modulus 10 === 0 then the card number is valid
        return true;
    } else {
        return false;
    }
}

//create function to return the invalid credit card numbers
const findInvalidCards = input => {
    let invalidCards = [];
    for (var i = 0; i < input.length; i++) {
        if (!validateCred(input[i])) {
            invalidCards.push(input[i]);
        }
    }
    return invalidCards
}

//create function to return the all the companies that returns all the companies that have invalid cards
//each first digit of the credit card number indicates what company hsa issued the card
const idInvalidCardCompanies = invalidCards => {
    let companies = [];
    let company = "";
    for (var i = 0; i < invalidCards.length; i++) {
        if (invalidCards[i][0] === 3) {
            company = "Amex";
        } else if (invalidCards[i][0] === 4) {
            company = "Visa";
        } else if (invalidCards[i][0] === 5) {
            company = "Master Card";
        } else if (invalidCards[i][0] === 6) {
            company = "Discover";
        }

        if (!companies.includes(company)) {
            companies.push(company);
        }

    }
    //return the list of companise without duplicates
    if (!companies) {
        return "Company not found.";
    } else {
        return companies;
    }
}

//extra feature: allow the user to input the credit card number (create a function that converts a string into array)
//  and create a function to convert the invalid card numbers into valid card numner

//function that converts the user input into array
const convertUserInput = userInput => {
    let resultArray = [];
    for (var i = 0; i < userInput.length; i++) {
        resultArray.push(parseInt(userInput.charAt(i)));
    }
    return resultArray;
}

//get and validate user input
document.getElementById("myButton").addEventListener("click", function () {
    var input = prompt('Please insert card number');

    while (isNaN(input)) {      //validated that the iput is a number
        input = prompt('Input must be a numeric value');
    }

    while (input.length < 14 || input.length > 16)  //validate that the input has btween the indicated number of characters
        input = prompt('Input must contain between 14 and 16 characters');
        if (isNaN(input)) {
            alert('Input must be a number, please retry');
    }

    //print the result on the screen by calling the two functions on the user input
    if(validateCred(convertUserInput(input))){
        document.getElementById('output').innerHTML = 'Your card number is valid';
    }else{
        document.getElementById('output').innerHTML = 'Your card number is invalid';
    }
});


//print the results in the corresponding elements of the indexCCC.html file
document.getElementById('additional').innerHTML = "the list of companise that have issued invalid cards: " +  idInvalidCardCompanies(findInvalidCards(batch));  //print companies that issue the cards
//print the list of card numbers that are invalid from the batch of card number
document.getElementById('additional2').innerHTML = "the list of invalid cards: " +  findInvalidCards(batch);  //print companies that issue the cards
