// 타입 단언(type assertion) => as 키워드: 타입스크립트보다 코드를 작성하는 개발자가 타입을 더 잘 알고 있다. 그러니 타입스크립트 너는 신경쓰지 말고 내가 정의한 타입으로 간주해라.
// DOM API 조작시 가장 많이 사용.
var a
a = 20
a = 'a'
// var b = a // var b: any
var b = a as string // var b: string

// DOM API 조작
// document에서 접근 가능한 api들
var div = document.querySelector('div') // var div: HTMLDivElement

// 시점 문제로 인해 실무에선 이렇게 주로 사용
if (div) {
  div.innerText
}