import Benchmark from "benchmark";

function palindrome(str: string): boolean {
  const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const reversedStr = cleanedStr.split("").reverse().join("");

  return cleanedStr === reversedStr;
}

function palindrome2(str: string): boolean {
  const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const len = cleanedStr.length;

  for (let i = 0; i < len / 2; i++) {
    if (cleanedStr[i] !== cleanedStr[len - 1 - i]) {
      return false;
    }
  }

  return true;
}

function isAlphaNumeric(code: number): boolean {
  return (
    (code >= 48 && code <= 57) || // 0-9
    (code >= 65 && code <= 90) || // A-Z
    (code >= 97 && code <= 122) // a-z
  );
}

function normalize(code: number): number {
  if (code >= 65 && code <= 90) {
    return code + 32;
  }

  return code;
}

function palindrome3(str: string): boolean {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    let leftCode = str.charCodeAt(left);
    let rightCode = str.charCodeAt(right);

    while (left < right && !isAlphaNumeric(leftCode)) {
      left++;
      leftCode = str.charCodeAt(left);
    }

    while (left < right && !isAlphaNumeric(rightCode)) {
      right--;
      rightCode = str.charCodeAt(right);
    }

    if (normalize(leftCode) !== normalize(rightCode)) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

const testString = "A man, a plan, a canal: Panama";

new Benchmark.Suite()
  .add("palindrome", () => {
    palindrome(testString);
  })
  .add("palindrome2", () => {
    palindrome2(testString);
  })
  .add("palindrome3", () => {
    palindrome3(testString);
  })
  .on("start", () => {
    console.log("Benchmark iniciado...\n");
  })
  .on("cycle", (event: any) => {
    console.log(String(event.target));
  })
  .on("complete", function (this: any) {
    console.log(`\nMais rápida: ${this.filter("fastest").map("name")}`);
  })
  .run({ async: true });
