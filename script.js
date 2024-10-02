console.log(`Stack Overflow testing console`)

console.log('-----------------------------------');
console.log('%cPart 1: Stack Overflow', 'font-size: 16px');
console.log('-----------------------------------');

// Declare a global counter variable
let counter = 0;

// Create a simple recursive function
function recursiveFunction() {
    counter++; // Increment the counter
    return recursiveFunction(); // Call itself recursively
}

// Surround the initial function call in a try/catch block
try {
    recursiveFunction(); // Start the recursion
} catch (error) {
    // Log the error and the value of the counter variable
    console.error("Error: ", error.message);
    console.log("Maximum call stack size reached after", counter, "calls.");
}

console.log('-----------------------------------');
console.log('%cPart 2: Trampolines', 'font-size: 16px');
console.log('-----------------------------------');

const flattenArray = (arr) => {
    return arr.reduce((acc, val) => {
      return Array.isArray(val) 
        ? acc.concat(flattenArray(val))  // Recursive case: if the value is an array, flatten it
        : acc.concat(val);  // Base case: if the value is not an array, add it to the accumulator
    }, []);
  };
  
  // Test case
  console.log(flattenArray([1, [2, [3, [4, [5]]]]]));

  const flatten = (arr, acc = []) => {
    if (arr.length === 0) return acc;  // Base case: when the array is empty, return the accumulated flattened array
  
    const [first, ...rest] = arr;
    if (Array.isArray(first)) {
      return () => flatten(first.concat(rest), acc);  // Recur for the nested array
    } else {
      return () => flatten(rest, acc.concat(first));  // Add the element to the accumulator
    }
  };

  const trampoline = (func) => {
    let result = func();
    while (typeof result === "function") {
      result = result();  // Keep calling the function until we get the final result
    }
    return result;
  };

  // Test case with deeply nested arrays
const nestedArray = [1, [2, [3, [4, [5, [6, [7, [8]]]]]]]];

console.log(trampoline(() => flatten(nestedArray))); 
  
console.log('-----------------------------------');
console.log('%cPart 3: Deferred Execution', 'font-size: 16px');
console.log('-----------------------------------');

// Create div in html, grab this div
const primeListDiv = document.getElementById('prime-list');

// Function that calculates prime numbers between 1 and n
const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

//  Modify the prime number calculation so that we give the browser time to render each number one at a time, using setTimeout

const addPrimeNumbers = (n) => {
    let currentNum = 1;
  
    const processPrime = () => {
      if (currentNum > n) {
        alert("Calculation complete!");
        return;
      }
  
      if (isPrime(currentNum)) {
        const primeElement = document.createElement('div');
        primeElement.textContent = currentNum;
        primeListDiv.appendChild(primeElement);  // Add the prime number to the HTML element
      }
  
      currentNum++;
      setTimeout(processPrime, 0);  // Defer the next number to give the browser time to render
    };
  
    processPrime();
  };
  
  // Run the function with n = 10,000
  addPrimeNumbers(10000);
  
  console.log(`Result will logout to inner html div`);