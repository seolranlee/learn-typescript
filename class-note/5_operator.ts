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

function askSomeone(someone: Developer | Person) {
  someone.name  // Developer와 Person의 공통 속성인 omeone.name만 접근 가능. => Developer도 되어야 하고 Person도 되어야 하기 때문. 공통속성이 아닌 속성은 타입 검증도 하지 않고 바로 쓸 수 없어.(보장되지 않는 타입이기 때문에)
  // 추후 타입가드를 통해 skill, age속성에도 접근 가능.
  someone.skill
  someone.age
}