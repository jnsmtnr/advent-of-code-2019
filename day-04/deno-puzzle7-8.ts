const startNumber = 108457;
const endNumber = 562041;

function passwordTester(number: number, checkTriple: boolean): boolean {
  let doubleDigit = false;
  const numberInString = number.toString();

  for (let i = 0; i < numberInString.length - 1; i++) {
    if (Number(numberInString[i]) > Number(numberInString[i + 1])) {
      return false;
    }
    if (!checkTriple && numberInString[i] === numberInString[i + 1]) {
      doubleDigit = true;
    }
    if (
      checkTriple &&
      numberInString[i] === numberInString[i + 1] &&
      numberInString[i] !== numberInString[i + 2] &&
      numberInString[i] !== numberInString[i - 1]
    ) {
      doubleDigit = true;
    }
  }

  return doubleDigit;
}

function passwordFinder(start: number, end: number, triple: boolean): number {
  let NumberOfPossiblePasswords = 0;

  for (let i = start; i <= end; i++) {
    if (passwordTester(i, triple)) {
      NumberOfPossiblePasswords++;
    }
  }

  return NumberOfPossiblePasswords;
}

// for test:
// console.log(passwordTester(112233));
// console.log(passwordTester(123444));
// console.log(passwordTester(123789));

console.log(passwordFinder(startNumber, endNumber, false));
console.log(passwordFinder(startNumber, endNumber, true));
