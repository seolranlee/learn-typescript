interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}

function introduce(): Developer | Person {
  return { name: 'Tony', age: 33, skill: 'Iron Making' }
}
var tony = introduce()

// 유니온 타입: 타입들의 공통된 속성(tony.name)에만 접근 가능.
// console.log(tony.skill) // Property 'skill' does not exist on type 'Developer | Person'. Property 'skill' does not exist on type 'Person'.ts(2339)

if ((tony as Developer).skill) {  // tony의 타입은 Developer라고 타입 단언 => skill 속성에 접근 가능 => skill속성이 있는지 체크.
  var skill = (tony as Developer).skill
  console.log(skill)
} else if ((tony as Person).age) {
  var age = (tony as Person).age
  console.log(age)
}

// 타입 가드 키워드: is
// 타입 가드 함수
// function is해당타입

// 타입 가드 정의
function isDeveloper(target: Developer | Person): target is Developer { // target is 타입: target이 실제로 해당 타입인지?
  return (target as Developer).skill !== undefined  // true / false
}

if (isDeveloper(tony)) {
  console.log(tony.skill) // skill를 제공
} else {
  console.log(tony.age)  // age를 제공
}