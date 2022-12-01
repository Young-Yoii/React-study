//mock function : 테스트 하기 위해 흉내만 내는 함수

/* --------------------------------
// mockFn.mock.calls => calls를 통해 함수가 몇번 호출 되었는지, 호출 될 때 전달된 인수는 무엇인지를 알 수 있다.
const mockFn = jest.fn();

mockFn();
mockFn(1);


test("함수는 2번 호출 됩니다.", () => {
    expect(mockFn.mock.calls.length).toBe(2);
})
test("두번째로 호출된 함수에 전달된 첫번째 인수는 1입니다.", () => {
    expect(mockFn.mock.calls[1][0]).toBe(1);
});
-------------------------------- */

/* --------------------------------목함수를 콜백함수로 사용
const mockFn = jest.fn();

function forEachadd1(arr){
    arr.forEach(num => {
        mockFn(num+1)
    })
}

forEachadd1([10, 20, 30])

test("함수는 3번 호출 됩니다.", () => {
    expect(mockFn.mock.calls.length).toBe(3);
})
test("전달된 값은 11,21,31 입니다.", () => {
    expect(mockFn.mock.calls[0][0]).toBe(11);
    expect(mockFn.mock.calls[1][0]).toBe(21);
    expect(mockFn.mock.calls[2][0]).toBe(31);
});
-------------------------------- */

/* --------------------------------
//mockFn.mock.results => 리턴 값을 확인
const mockFn = jest.fn(num => num+1);

mockFn(10);
mockFn(20);

test("10에서 1증가한 값이 반환된다", () => {
    expect(mockFn.mock.results[0].value).toBe(11);
});
test("20에서 1증가한 값이 반환된다", () => {
    expect(mockFn.mock.results[1].value).toBe(21);
});
-------------------------------- */

/* --------------------------------
//실행할 때 마다 각각 다른 값 리턴
const mockFn = jest.fn();

mockFn
    .mockFnReturnValueOnce(10)
    .mockFnReturnValueOnce(20)
    .mockFnReturnValue(30); //마지막은 Once 를 빼줌

mockFn();
mockFn();
mockFn();

text("", () => {
    consloe.log(mockFn.mock.results);
    expect("").toBe("");
})
-------------------------------- */

/* --------------------------------
//목함수를 비동기 함수처럼 사용
const mockFn = jest.fn();

mockFn
    .mockFnResolvedValue({name : "Mike"});

test("받아온 이름은 Mike", () =. {
    mockFn.then(res => {})
    expect(res.name).toBe("Mike")
})
-------------------------------- */

/* --------------------------------
//외부코드를 활용한 테스트

jest.mock('./fn') //fn함수를 모킹모듈로 만들어 실제로 호출되지 않게 테스트
fn.createUser.mockRetuenValue({name: "Mike"});

test("유저를 만든다", () => {
    const user = fn.createUser("Mike");
    expect(user.name).toBe("Mike");
})

//함수를 모킹모듈로 만들면 실제 db에는 저장되지 않고 테스트가 가능함.
-------------------------------- */

