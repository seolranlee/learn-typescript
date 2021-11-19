interface Product {
  id: number;
  name: string;
  prcie: number;
  brand: string;
  stock: number;
  something: object;
}

// 1. 상품 목록을 받아오기 위한 API 함수
function fetchProducts(): Promise<Product[]> {
  // ..
}

// interface ProductDetail {
//   id: number;
//   name: string;
//   price: number;
// }

// 2. 특정 상품의 상세 정보를 나타내기 위한 함수

// Pick<타입, 가져올 타입 키>
type ShoppingItem = Pick<Product, 'id'|'name'|'prcie'>
function displayProductDetail(shoppingItem: ShoppingItem) {

}

// Omit<타입, 뺄 타입 키>
type HeadPhone = Omit<Product, 'something'|'stock'> 

// interface UpdateProduct {
//   id?: number;
//   name?: string;
//   prcie?: number;
//   brand?: string;
//   stock?: number;
//   something?: object;
// }

// Partial<타입>: 해당 타입의 속성들을 모두 옵셔널 처리.
type UpdateProduct = Partial<Product>
// 3. 특정 상품 정보를 업데이트(갱신)하는 함수
function updateProductItem(productItem: UpdateProduct) {

}

// 4. 유틸리티 타입 구현하기 - Partial
interface UserProfile {
  username: string;
  email: string;
  profilePhotoUrl: string;
}

// interface UserProfileUpdate {
//   username?: string;
//   email?: string;
//   profilePhotoUrl?: string;
// }

// #1
// type UserProfileUpdate = {
//   username?: UserProfile['username'];
//   email?: UserProfile['email'];
//   profilePhotoUrl?: UserProfile['profilePhotoUrl'];
// }

// #2: 맵드 타입으로 축약
// type UserProfileUpdate = {
//   // 반복문 실행
//   [p in 'username'|'email'|'profilePhotoUrl']?: UserProfile[p]
// }

// type UserProfileKeys = keyof UserProfile

// #3
type UserProfileUpdate = {
  // 반복문 실행
  [p in keyof UserProfile]?: UserProfile[p]
}

// #4: Partial의 최종 구현체
type Subset<T> = {
  // 반복문 실행
  [p in keyof T]?: T[p]
}