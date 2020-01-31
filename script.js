/* Writing the map() function */
function each(collection, func) {
    if(Array.isArray(collection)) {
      for(let i = 0; i < collection.length; i++) {
          func(collection[i], i);
      }
    }else {
      for(let key in collection) {
        func(collection[key], key);
      }
    }
}

function map(array, funct) {
  let acc = new Array();
  each(array, function(element, index) {
    acc.push(funct(element, index));
  });
  return acc;
}
/***************************************************************/
/*
2.Given the function abs that computes the absolute value,
 finish the invocation of map that should compute the absolute value
  of each number in its array argument.

 function abs(x) {
       if (x >= 0) {
             return x;
       }
       return -x;
 }
       map([1, -2, 37, -100, -8, 5], ???);
       // => [1, 2, 37, 100, 8, 5]
*/

let mapAbs = map([1, -2, 37, -100, -8, 5], function abs(x) {
  if(x < 0) {
    x *= -1;
    return x;
  }
  return x;
});
/*******************************************************/
/*
3.We're going to write a function maximums that, given
an array of arrays of numbers as an argument, returns
a new array containing the maximum number of each inner array.
 That's a bit of a mouthful, so let's break it down:

 // our argument would look like this:
 var sampleInput = [ // it's an array
 [1, 3, 2], // of arrays of numbers
 [4, 23, 100],
 [7, 6, 3, -2]
 ];
 // and we want to be able to use maximums to do this:
 maximums(sampleInput); // => [3, 100, 7]

 Part One: Let's start by writing a function max that,
  when given an array of numbers computes the maximum number
  in that array.

 You will want to use each for this.

 function max(numbers) {

       // YOUR CODE HERE

 }

 max([1, 3, 2]); // => 3

 max([4, 23, 100]); // => 100
*/
function max(array) {
  let maximum = array[0];
  each(array, function(element, index) {
    if(maximum < element) {
      maximum = element;
    }
  });
  return maximum;
}
/*****************************/
function maximums(arrayOfArrays) {
  
  return map(arrayOfArrays, function(elementOfArrays, indexOfArrays) {
    let maximum = -Infinity;
    each(elementOfArrays, function(element, index) {
      if(maximum < element) {
        maximum = element;
      }
    });
    return maximum; 
  });
}
/**************************************************************/
/*
1.Complete the function exponentials that accepts an array
 of numbers as a parameter, and raises each number n to 
 the nth power, e.g:

  function exponentials(numbers) { 
       // YOUR CODE HERE 
 } 
 exponentials([1, 2, 3, 4]);
  // => [1, 2*2, 3*3*3, 4*4*4*4] => [1, 4, 27, 256] 
*/
function exponentials(numbers) {
  
  return map(numbers, function(element, index){
    let exp = 1;
    for(let i = 0; i < index + 1; i++) {
      exp *= element;
    }
    return exp;
  });
}
/**************************************************************/
/*
2.First, write a function reverse that accepts a string
 as a parameter and returns a reversed version of that string 
 (you'll want to use a for loop for this). Then, use reverse to
  write a function called reverseWords that accepts a string as 
  an argument, and returns a string with all of its words reversed. 
  
 reverseWords('hello world'); // => 'olleh dlrow'

Note that reverseWords should reverse each word 
individually, not the entire string.
*/
/* function reverseOneWord(word) reverses a word */
function reverseOneWord(word) {
  let reversedWord = '';
  let i = word.length - 1;
  while(i >= 0) {
    reversedWord += word[i];
    i--;
  }
  return reversedWord;
}
/* function identifyWords(words) identifies the number of words in a
string and returns a table containing those words */
function identifyWords(words) {
  let arrayOfWords = new Array();
  let spaceIndexes = new Array();
  
  for(let i = 0; i < words.length; i++) {
    if(words[i] === " ") {
      spaceIndexes.push(i);
    }
  }

  let stoppingIndex = -1;
  arrayOfWords = map(spaceIndexes, function(element, index) {
    let word = "";
    for(let i = stoppingIndex + 1; i < element; i++) {
      word += words[i];
    }
    stoppingIndex = element;
    if ( (word != " ") && (word != "") ) {
      return word;
    }
  });
  /* Getting the last word of "words" */
  let lastWord = "";
  for(let i = spaceIndexes[spaceIndexes.length - 1]; i < words.length; i++) {
    lastWord += words[i];
  }
  /* checking that the last word is not composed of empty spaces */
if ( (lastWord != " ") && (lastWord != "") ) {
  arrayOfWords.push(lastWord);
}
  return arrayOfWords;
}
/* reversing the words and returning them as a string*/ 
function reverse(words) {
  let reversedString = '';
  let tableOfWords = new Array();

  tableOfWords = identifyWords(words);
  each(tableOfWords, function(element, index) {
    if(element != tableOfWords[tableOfWords.length - 1]) {
      reversedString += reverseOneWord(element) + " ";
    }
  });
  reversedString += reverseOneWord(tableOfWords[tableOfWords.length - 1]);
  return reversedString;
}
/******************************************************************/
/*
3.We often want to transform an array of objects by looking up
 the value found under a specific key in each object; for instance,
  consider the problem of finding the ages of all the people in 
  the people array like we did in the first exercise:

 var people = [ 
  {name: {first: 'Alyssa', middle: 'P.', last: 'Hacker'}, age: 26}, 
  {name: {first: 'Louis', last: 'Reasoner'}, age: 21}, 
  {name: {first: 'Ben', last: 'Bitdiddle'}, age: 34}, 
  {name: {first: 'Eva', middle: 'Lu', last: 'Ator'}, age: 40}, 
  {name: {first: 'Lem', middle: 'E.', last: 'Tweakit'}, age: 45} 
 ]; 
 function ages(people) { 
       return map(people, function(person) { 
             return person.age; 
       }); 
 } 

 ***  Write a function called pluck that takes an array of objects
  and a string representing a key as parameters, 

 and returns an array of all the values found under each object
  using the key, e.g.: 

 pluck(people, 'age'); // => [26, 21, 34, 40, 45] 

 Your implementation should use map. 

 */
function pluck(arrayOfObjects, str) {
  return map(arrayOfObjects, function(element, index) {
    if( (typeof element === "object") && (!Array.isArray(element)) ) {
      let outputValue = 0;
     each(element, function(elem, indx) {
        console.log(typeof(indx.toString()));
        if(indx.toString() == str) {
          outputValue =  elem;
        }
      });
      return outputValue;
    }
});
} 
/************************************/
/*
Let's say that we have a string representing a CSV 
(comma-separated values) file that looks like this: 
'Grace,B.,Hopper,85/nAdele,Goldstine,43/nAda,Lovelace,36/nHedy,E.,Lamarr,85/nRuchi,Sanghvi,34/n' 

 And we want to parse it into an array people objects like the one
  above. 

 Using map and split, write a function parseCSV that accepts
  a CSV string as a parameter and outputs an array of people
   objects with the exact format as shown above.
*/
function parseCSV(csvString, splittingCaracter) {
  let splittedCsvString = csvString.split(splittingCaracter);
  return map(splittedCsvString, function(element, index) {
    let splittedElement = element.split(',');
    console.log("splittedElement = " + splittedElement)
    let object = new Object();
    
    object["name"] = new Object();
    object["name"]["first"] = splittedElement[0];
    object["name"]["middle"] = splittedElement[1];
    object["name"]["last"] = splittedElement[2];
    object["age"] = splittedElement[3];
    return object;
  });
}

