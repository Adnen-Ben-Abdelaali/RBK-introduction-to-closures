/* RBK intoduction to closures */

function makeAccount(initial) {
  var balance = initial;
  
  function amount(money) {
    if ((balance - money) >= 0) {
      balance -= money;
      return `here's your money : ${money}`;
    }else {
      return `insuffficient funds :Your  actual balnlance is ${balance}`;
    } 
  }
return amount;
}
/*******************************************************************************/
/*
1. 1. Let's make a counter using closures. For our purposes, a counter
is simply a function that, when invoked, returns a number that is one higher 
than it used to be. For example, this is the behavior that we want:

 counter(); // => 1 
counter(); // => 2 
counter(); // => 3 
We could implement this using the global scope like this: var count = 0;
 function counter() {
      count = count + 1;
      return count;
 }
 But now that we know about closures, we can do something way cooler. 
 Finish the implementation of makeCounter below so that we can make 
 multiple counters, each with their own internal count using closures.
function makeCounter() {
      // YOUR CODE HERE
}
 var counter1 = makeCounter();
 var counter2 = makeCounter();
 counter1(); // => 1 
 counter1(); // => 2 
 counter2(); // => 1 
 counter1(); // => 3 
 counter2(); // => 2 
*/
function makeCounter() {
  let counter = 0;
  function count() {
    
    return counter++;
  }
  return count;
}
/********************************************/
/*
2. Update makeCounter so that, instead of always starting
 from zero, you can start from any number, e.g.:

 var counter = makeCounter(100);
      counter(); // => 101;
*/
function makeCounterUpdated(counter) {
  let counterStartingValue = counter;

  return function() {
    
    return counterStartingValue++;
  }
}
/*************************************************/
/*
3. One way we can use closures is as functions that construct other
functions. Consider the numerous examples of exponentiation functions 
that we've created, e.g. square and cube. 
The following function pow is incomplete:

 function pow(exponent) {
     return function(???) {
          return ???
          }
     } 
Fill in the ??? so that it works like this: 
var square = pow(2);
 var cube = pow(3); 
var power4 = pow(4); 
square(5); // => 25 
cube(3);   // => 27 
power4(4); // => 256
*/
function pow(exponent) {

  return function(number) {
    let result = 1;

    for(let i = 0; i < exponent; i++) {
      result *= number;
    }
    return result;
  }
}
/********************************************/
/*
1.zipWith takes a function and two arrays and zips the arrays together,
applying the function to every pair of values.
The function value is one new array.If the arrays are of unequal length, 
the output will only be as long as the shorter one.
(Values of the longer array are simply not used.)
Inputs should not be modified.

 zipWith( Math.pow,[10,10,10,10], [0,1,2,3] ) => [1,10,100,1000] 
zipWith( Math.max,[1,4,7,1,4,7], [4,7,1,4,7,1] ) =>  [4,7,7,4,7,7] 
 zipWith( function(a,b) {
      return a+b;
 }, [0,1,2,3], [0,1,2,3] ) => [0,2,4,6]  Both forms are valid.
 zipWith((a,b) => a+b,[0,1,2,3],[0,1,2,3] ) =>[0,2,4,6] Both are functions.
*/
function zipWith(func, firstArray, secondArray) {

  return function() {
    let outputArray = new Array();
    let lengthOfTheOutputArray = 0;
    if(firstArray.length >= secondArray.length) {
      lengthOfTheOutputArray = secondArray.length;
    }else if(firstArray.length < secondArray.length) {
      lengthOfTheOutputArray = firstArray.length; 
    }

    for(let i = 0; i < lengthOfTheOutputArray; i++) {
      outputArray.push(func(firstArray[i], secondArray[i]));
    }
    return outputArray;
  }
}
/***************************************************************/

