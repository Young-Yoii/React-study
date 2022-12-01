const fn = require('./matchers');

//1.toBe 
test('2 더하기 3은 5야.', () => {
    expect(fn.add(2, 3)).toBe(5);
})

test('2 더하기 3은 5야.', () => {
    expect(fn.add(2, 3)).toEqual(5);
})

test('3 더하기 3은 5가 아니야' , () =>{
    expect(fn.add(3, 3)).not.toBe(5);
})

//2.toBe , toEqual, toStrictEqual

//객체, 배열은 재귀적으로 순회하며 값을 확인해주어야 하므로 toBe 사용x
test('이름과 나이를 받아서 객체를 반환해줘', () => {
    expect(fn.makeUser('Mike', 3)).toBe({
        name: 'Mike',
        age: 3,
    });
})

//toEqual 사용도 되지만 보다 엄격히 테스팅하기 위해 toStrictEqual 사용 권장.
//toEqual 시에는 gender key가 undefined 여도 통과되지만 toStrictEqual은 통과x
test('이름과 나이를 받아서 객체를 반환해줘', () => {
    expect(fn.makeUser('Mike', 3)).toEqual({
        name: 'Mike',
        age: 3,
    });
})

test('이름과 나이를 받아서 객체를 반환해줘', () => {
    expect(fn.makeUser('Mike', 3)).toStrictEqual({
        name: 'Mike',
        age: 3,
    });
})

//3.toBeNull, toBeUndefined, toBeDefined
test('null은 null 입니다', () => {
    expect(null).toBeNull();
});

//4.toBeTruthy, toBeFalsy
test('0은 false 입니다', () => {
    expect(fn.add(1,-1)).toBeFalsy();
});

test('비어있지 않은 문자열은 true입니다.', () => {
    expect(fn.add('hello','world')).toBeTruthy();
});

//5.toBeGreaterThan 크다 , toBeGreaterThanOrEqual 크거나 같다, toBeLessThan 작다 toBeLessThanOrEqual 작거나 같다
test('ID는 10자이하여야 합니다.', () => {
    const id = "THE_BLACK_ORDER";
    expect(id.length).toBeLessThanOrEqual(10);
});

//6.toBeCloseTo 소수점을 계산할 때 무한소수가 될 수 있음 -> 근사치로 계산
test('비밀번호 4자리.', () => {
    const pw = "1234";
    expect(pw.length).toBe(4);
});

test('0.1더하기 0.2는 0.3입니다.', () => {
    expect(fn.add(0.1,0.2)).toBeCloseTo(0.3);
});

//7.toMatch 문자열판단 - ex)정규표현식을 활용하여 문자열에 해당 문자가 포함되어있는지 확인
test('Hello World에 a라는 글자가 있나?', () => {
    expect('Hello World').toMatch(/a/);
});

//대소문자 구별 없애기 위해 i를 붙임
test('Hello World에 a라는 글자가 있나?', () => {
    expect('Hello World').toMatch(/h/i);
});

//8.toContain
test('유저리스트에 Mike가 있는가', () => {
    const user = 'Mike';
    const userList = ["Tom", "Mike", "Kai"];
    expect(userList).toContain(user);
});

//9.toThrow 어떠한 작업을 했을 때 특정에러가 발생하는지 테스트

//성공
test('이거 에러나나요?', () => {
    expect(() => fn.throwErr()).toThrow();
});
test('이거 에러나나요?', () => {
    expect(() => fn.throwErr()).toThrow('xxx');
});
//실패 (에러메세지와 다른 메세지 전달)
test('이거 에러나나요?', () => {
    expect(() => fn.throwErr()).toThrow("xx");
});
