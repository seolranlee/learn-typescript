// 생성자 함수
function Person(name, age) {
  this.name = name
  this.age = age
}

var capt = new Person('capt', 100)

// ES2015(ES6)  // syntax sugar

// 클래스: 인스턴스를 만드는 역할
class Person {
  // 클래스 로직
  constructor(name, age) { // 초기화 메서드
    console.log('생성 되었습니다.')
    this.name = name
    this.age = age
  }

}

var seho = new Person('세호', 30)  // 생성 되었습니다.
console.log(seho)