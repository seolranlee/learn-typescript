// function logMessage(value: any) {
//   console.log(value)
// }

// logMessage('hello')
// logMessage(100)

var seho: string | number | boolean;
function logMessage(value: string | number) {
  // 타입 가드: 특정 타입으로 타입의 범위를 좁혀나가는 (필터링 하는) 과정
  if (typeof value === 'number') {
    value.toLocaleString()  // number관련 api모두 사용가능.
  }
  if (typeof value === 'string') {
    value.toString()  // string 관련 api 모두 사용 가능.
  }
  throw new TypeError('value must be string or number')
}

logMessage('hello')
logMessage(100)

interface Developer { 
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}

// function askSomeone(someone: Developer | Person) {
//   // someone.name  // Developer와 Person의 공통 속성인 someone.name만 접근 가능. => Developer도 되어야 하고 Person도 되어야 하기 때문. 공통속성이 아닌 속성은 타입 검증도 하지 않고 바로 쓸 수 없어.(보장되지 않는 타입이기 때문에)
//   // // 추후 타입가드를 통해 skill, age속성에도 접근 가능.
//   // someone.skill
//   // someone.age
// }

// askSomeone({ name: '디벨로퍼', skill: '웹 개발'})
// askSomeone({ name: '이설란', age: 100})
// askSomeone({ name: '디벨로퍼', skill: '웹 개발', age: 1000})

// var seho: string | number | boolean;
// var capt: string & number & boolean;  // 인터섹션 타입: string타입도 만족하고, number타입도 만족하고, boolean타입도 만족하는 타입===never(불가능한 타입)

function askSomeone(someone: Developer & Person) {  // Developer와 Person의 속성을 모두 가지고 있는 하나의 타입.
  // someone.name
  // someone.skill
  // someone.age
}

// askSomeone({ name: '디벨로퍼', skill: '웹 개발', age: 100}) // Developer와 Person의 속성을 모두 가지고 있는 하나의 타입.
// askSomeone({ name: '이설란', age: 100})