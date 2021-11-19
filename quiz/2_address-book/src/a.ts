// function fetchItems(): string[]
// 동기적인 코드들은 return값을 명시하지 않아도 return값에 대한 추론이 가능하다.
// function fetchItems() {
//   let items = ['a', 'b', 'c'];
//   return items;
// }

// let result = fetchItems();
// console.log(result);

// function fetchItems(): Promise<unknown>
// 비동기 코드들은 비동기 처리를 통해서 돌려받을 반환값이 추론이 안돼.
function fetchItems(): Promise<string[]> {
  let items: string[] = ['a', 'b', 'c'];
  return new Promise(resolve => resolve(items));
}

let result = fetchItems();
console.log(result);
