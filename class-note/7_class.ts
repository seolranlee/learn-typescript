class Person {
  // 변수의 접근 범위 제한 = private, public, readonly
  private name: string;
  public age: number;
  readonly log: string;

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}