// interface는 extends키워드로 확장이 가능하다.
// interface Person {
//   name: string;
//   age: number;
// }

// type은 확장이 되지 않는다.
type Person = {
  name: string;
  age: number;
}

var seho: Person = {
  name: '세호',
  age: 30
}

type MyString = string;
var str: MyString = 'hello'

type Todo = { id: string; title: string; done: boolean; }
function getTodo(todo: Todo) {

}