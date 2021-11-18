var user = { name: 'capt', age: 100 }
// var admin = { name: 'capt', age: 100, role: 'admin' }
var admin = {}

admin.__proto__ = user  // user속성 상속

console.log(admin.name) // 'capt'
console.log(admin.age)  // 100

admin.role = 'admin'  // 자기 자신의 속성

console.log(admin.role)  // 'admin