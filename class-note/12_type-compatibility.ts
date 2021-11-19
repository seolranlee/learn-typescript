// 인터페이스
interface Developer {
  name: string;
  skill: string;
}

// interface Person {
//   name: string;
// }

class Person {
  name: string;
}

var developer: Developer;
var person: Person;
// 타입 호환: 오른쪽에 있는 타입이 왼쪽에 있는 타입보다 더 많은 속성을 갖거나 더 큰 구조체(interface뿐만이 아니라 Class, 함수 등등)일 때 가능.
// developer = person  // Property 'skil' is missing in type 'Person' but required in type 'Developer'.ts(2741)
// developer = new Person()  // Property 'skill' is missing in type 'Person' but required in type 'Developer'.ts(2741)

person = developer

// 함수 // sum이라고 하는 함수의 구조가 add라고 하는 함수의 구조보다 더 크다(sum이 add를 포함한다)
var add = function(a: number) {
  // ...
}
var sum = function(a: number, b: number) {
  // ...
}

// add = sum  // 호환 불가능
sum = add // 호환 가능


// 제네릭
interface Empty<T> {
  // ..
}
var empty1: Empty<string>
var empty2: Empty<number>

// interface안의 구조가 비어있어서 서로 호환이 된다.
empty1 = empty2
empty2 = empty1

interface NotEmpty<T> {
  data: T;
}

var notempty1: NotEmpty<string>
var notempty2: NotEmpty<number>

// 서로 호환이 되지 않는다.
notempty1 = notempty2
notempty2 = notempty1