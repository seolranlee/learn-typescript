interface PhoneNumberDictionary {
  [phone: string]: {
    num: number;
  };
}

interface Contact {
  name: string;
  address: string;
  phones: PhoneNumberDictionary;
}

enum PhoneType {
  Home = 'home',
  Office = 'office',
  Studioo = 'studio',
}

// api
// TODO: 아래 함수의 반환 타입을 지정해보세요.
// api의 응답규격을 정의할 때 제네릭을 가장 많이 쓰게 된다.
function fetchContacts(): Promise<Contact[]> {
  // TODO: 아래 변수의 타입을 지정해보세요.
  const contacts: Contact[] = [
    {
      name: 'Tony',
      address: 'Malibu',
      phones: {
        home: {
          num: 11122223333,
        },
        office: {
          num: 44455556666,
        },
      },
    },
    {
      name: 'Banner',
      address: 'New York',
      phones: {
        home: {
          num: 77788889999,
        },
      },
    },
    {
      name: '마동석',
      address: '서울시 강남구',
      phones: {
        home: {
          num: 213423452,
        },
        studio: {
          num: 314882045,
        },
      },
    },
  ];
  // api를 모사
  return new Promise(resolve => {
    setTimeout(() => resolve(contacts), 2000);
  });
}

// main
class AddressBook {
  // TODO: 아래 변수의 타입을 지정해보세요.
  contacts: Contact[] = [];

  // 초기화 코드들을 constructor에 많이 넣어둠
  // Class의 constructor는 기본적인 타입 정의가 되지 않게 되어 있다.
  constructor() {
    this.fetchData();
    // enum속성 적용
    // this.findContactByPhone(1, PhoneType.Home);
  }

  fetchData(): void {
    fetchContacts().then(response => {
      this.contacts = response;
    });
  }

  /* TODO: 아래 함수들의 파라미터 타입과 반환 타입을 지정해보세요 */
  // Array.filter는 배열을 반환한다. (조건에 맞는 게 한 개만 있어도 length가 1인 배열을 반환)
  findContactByName(name: string): Contact[] {
    return this.contacts.filter(contact => contact.name === name);
  }

  findContactByAddress(address: string): Contact[] {
    return this.contacts.filter(contact => contact.address === address);
  }

  // phoneType: home, office, studio
  findContactByPhone(phoneNumber: number, phoneType: PhoneType): Contact[] {
    return this.contacts.filter(
      contact => contact.phones[phoneType].num === phoneNumber
    );
  }

  // phoneType을 string타입으로만 지정해두면 오탈자에 취약
  // findContactByPhone(1, 'homee')
  // findContactByPhone(1, 'officce')

  addContact(contact: Contact): void {
    this.contacts.push(contact);
  }

  displayListByName(): string[] {
    return this.contacts.map(contact => contact.name);
  }

  displayListByAddress(): string[] {
    return this.contacts.map(contact => contact.address);
  }
  /* ------------------------------------------------ */
}
// let div = document.querySelector('div');

// div.innerText; // Object is possibly 'null'.ts // let div: HTMLDivElement | null

let div = document.querySelector('div') as HTMLDivElement; // 타입 단언 // div element가 존재
div.innerText;

new AddressBook();
