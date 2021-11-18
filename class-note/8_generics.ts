// function logText(text) {
//   console.log(text)
//   return text
// }
// logText(10) // 숫자 10
// logText('hi') // 문자열 hi
// logText(true) // 진위값 true

// function logText<T>(text: T):T {
//   console.log(text)
//   return text
// }

// logText<string>('hi')

// function logText(text: string) {
//   console.log(text)
//   return text
// }

// function logNumber(num: number) {
//   console.log(num)
//   return num
// }

// function logText(text: string | number) {
//   console.log(text)
//   // text.toLocaleString  // string과 number 가 모두 공통으로 갖고 있는 api만 자동완성 지원
//   return text
// }

// const a = logText('a')
// a.split('') // a는 아직도 string|number이다. => string이다 라는 보장 없이는 문자열 관련 api사용이 안된다.  // 유니온 타입은 input에 대한 해결이 되지만 output에 대한 해결이 안된다.
// logText(10)
// // logText(true)

function logText<T>(text: T): T {
  console.log(text)
  return text
}

// 제네릭 // 타입을 호출하는 시점에 정의 
const str = logText<string>('abc')  // 문자열 타입
str.split('')

const login = logText<boolean>(true)  // 진위 타입

// 인터페이스에 제니릭을 선언하는 방법
// interface Dropdown {
//   value: string;
//   selected: boolean;
// }

// const obj: Dropdown = {
//   value: 10,
//   selected: false
// }

interface Dropdown<T> {
  value: T;
  selected: boolean;
}

const obj: Dropdown<string> = {
  value: 'abc',
  selected: false
}

const obj2: Dropdown<number> = {
  value: 123,
  selected: false
}

// 제네릭의 타입 제한
// function logTextLength<T>(text: T[]): T[] {
//   console.log(text.length)  // 이 시점에서 T에 어떤 타입이 올지 알 수 없다.  // T의 타입에 좀 더 제한을 둬야 한다.
//   text.forEach(function(text){
//     console.log(text)
//   })
//   return text
// }

// logTextLength<string>(['a', 'b', 'c'])
// 'abc'.length

// 제네릭 타입 제한 2 - 정의된 타입 이용하기
interface LengthType {
  length: number
}

function logTextLength<T extends LengthType>(text: T): T {
  console.log(text.length)  // LengthType의 하위 타입이기 때문에 length가 있다는 것이 보장됨.
  return text
}

logTextLength('a')  // 문자열에는 legnth가 제공되고 있다.
logTextLength(10) // 숫자에는 length가 제공되고 있지 않다.
logTextLength({ length: 10})

// 제네릭 타입 제한 3 - keyof
interface ShoppingItem {
  name: string;
  price: number;
  stock: number;
}

// getShoppingItemOption함수의 파라미터는 ShoppingItem의 키값들("name", "price", "stock") 중 한가지만 들어갈 수 있다.
function getShoppingItemOption<T extends keyof ShoppingItem>(itemOption: T): T {
  return itemOption
}

// getShoppingItemOption(10)
// getShoppingItemOption<string>('a')

getShoppingItemOption("name") // ctrl+space: 자동완성
getShoppingItemOption("price") // ctrl+space: 자동완성
getShoppingItemOption("stock") // ctrl+space: 자동완성