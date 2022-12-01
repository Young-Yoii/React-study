const fn = require('./fn');

/* -------------------------------- 테스트 전 후 실행
let num = 0;

test('0더하기 1은 1이야', () => {
    num = fn.add(num, 1);
    expect(num).toBe(1)
});

//실패 : num 에 계속 새로운 값이 할당되고 있으므로 실패 (num:1)
test('0더하기 2은 2이야', () => {
    num = fn.add(num, 1);
    expect(num).toBe(1)
});
--------------------------------*/

/* --------------------------------"beforeEach, afterEach" 
//이러한 테스트를 다 통과시키려면 각 테스트를 실행하기 직전에 
//num을 다시 초기화 해주는 과정이 필요-> 각 테스트 전후에 실행되는 beforeEach, afterEach 사용

//beforeEach : 테스트 실행 전
beforeEach(() => {
    num = 0;
})

test('0더하기 1은 1이야', () => {
    num = fn.add(num, 1);
    expect(num).toBe(1)
});

//통과
test('0더하기 2은 2이야', () => {
    num = fn.add(num, 1);
    expect(num).toBe(1)
});

//afterEach 함수 사용 : 첫 테스트 이후에 실행
let num2 = 10;

afterEach(() => {
    num = 0;
})

//실패 num2 = 10
test('0더하기 1은 1이야', () => {
    num2 = fn.add(num2, 1);
    expect(num).toBe(1)
});

//통과 num2 = 0 으로 초기화
test('0더하기 2은 2이야', () => {
    num2 = fn.add(num2, 1);
    expect(num).toBe(1)
});
--------------------------------*/

/*--------------------------------db와 연결할 때

//작업전에 db 연결
beforeEach(async() => {
    user = await fn.connectUserDb();
})
//작업 후에 db 연결 끊음
afterEach(() => {
    return fn.disconnectUserDb();
})

test("이름은 Mike", () => {
    expect(user.name).toBe('Mike')
});

test("나이는 30", () => {
    expect(user.age).toBe('30')
});

test("성별은 남성", () => {
    expect(user.gender).toBe('male')
});
--------------------------------*/

/*--------------------------------"beforeAll, afterAll"
// 위의 경우 하나의 테스트가 실행되고 종료되면 beforeEach, afterEach 가 한번 씩 실행되므로 각 1초 정도 소요됨.
// 그러나 db같은 경우에는 한 번만 받아오면 되므로 이때에는 beforeAll, afterAll를 사용하면 됨
// 즉, 각 테스트 케이스마다 실행되는것이 아니고 전체 테스트시 실행됨.

//작업전에 db 연결
beforeAll(async() => {
    user = await fn.connectUserDb();
})
//작업 후에 db 연결 끊음
afterAll(() => {
    return fn.disconnectUserDb();
})

test("이름은 Mike", () => {
    expect(user.name).toBe('Mike')
});

test("나이는 30", () => {
    expect(user.age).toBe('30')
});

test("성별은 남성", () => {
    expect(user.gender).toBe('male')
});

//위의 경우 전체 테스트가 약 1초간 소요
--------------------------------*/

/*--------------------------------"describe"
//db가 여러개일 때 사용

describe("Car관련 작업", () => {
    beforeAll(async() => {
        user = await fn.connectCarDb();
    })
    afterAll(() => {
        return fn.disconnectCarDb();
    })

    test("브랜드는 bmw", () => {
        expect(car.brand).toBe('Bmw')
    });

    test("이름는 z4", () => {
        expect(user.name).toBe('z4')
    });

    test("색은 빨강", () => {
        expect(car.color).toBe('red')
    });
});
--------------------------------*/

/*--------------------------------각 실행순서
beforeAll(() => console.log("밖 beforeAll")); //첫번째 실행
beforeEach(() => console.log("밖 beforeEach")); //두번째, 여섯번째 (전역으로 실행되므로 안의 beforeEach가 실행되기 전에 한번 더 실행)
afterEach(() => console.log("밖 afterAll")); //네번째, 열번째 (전역으로 실행되므로 안의 afterEach가 실행된 후에 한번 더 실행)
afterAll(() => console.log("밖 afterEach")); //마지막

test('0 + 1 = 1', () => {
    console.log("밖 test")
    expect(fn.add(0, 1)).toBe(1);
}) //세번째

describe("Car 관련" , () => {
    beforeAll(() => console.log("안 beforeAll")); //다섯번째
    beforeEach(() => console.log("안 beforeEach")); // 일곱번째
    afterEach(() => console.log("안 afterAll")); //아홉번째
    afterAll(() => console.log("안 afterEach")); 마지막 -1번째

    test('0 + 1 = 1', () => {
    console.log("안 test")
    expect(fn.add(0, 1)).toBe(1);
    }) //여덟번째
})
--------------------------------*/

/*--------------------------------
test.skip : 해당 테스트만 제외 후 실행 
test.only : 해당 테스트만 단독 실행
--------------------------------*/