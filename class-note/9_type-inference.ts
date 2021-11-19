// 타입 추론 기본1
// 기본적인 변수의 선언과 할당에 의해 타입 추론이 된다.
var a = 'abc'

// function getB(b?: number): string
function getB(b = 10) {
  var c = 'hi'
  return b + c  // '10hi'
}

// 10 + '10' // string '1010'


// 타입 추론 기본 2
// interface Dropdown<T> {
//   value: T;
//   title: string;
// }

// var shoppingItem: Dropdown<string> = {
//   value: 'abc', // (property) Dropdown<string>.value: string  // 타입 추론
//   title: 'hello'
// }

// 타입 추론 기본 3 // 제네릭 2개 연결
interface Dropdown<T> {
  value: T;
  title: string;
}

interface DetailedDropdown<K> extends Dropdown<K>{
  description: string;
  tag: K;
  // value: K;
  // title: string;
}

var detailedItem: DetailedDropdown<string> = {
  title: 'abc',
  description: 'ab',
  value: 'value', // Dropdown<string>.value: string // 타입추론
  tag: 'tag'  // DetailedDropdown<string>.tag: string // 타입추론
}

var shoppingItem: Dropdown<string> = {
  value: 'abc', // (property) Dropdown<string>.value: string  // 타입 추론
  title: 'hello'
}

// Best Common Type
var arr = [1, 2, true, true, 'a'] // var arr: (string | number | boolean)[] // union타입으로 묶어나간다.
