const fn = require('./async');

/*done: 비동기함수를 테스트할 때에 테스트는 fn.getName()을 바로 실행하므로 
done 함수를 넘겨주어 콜백함수에 전달하면 done 함수가 끝날때 까지 기다리므로 비동기 함수 테스트가 가능
done 함수를 넘겨주지 않으면 무조건 성공이라고 판단.*/
//성공
test('3초 후에 받아온 이름은 Mike', done => {
    function cb(name) {
        expect(name).toBe('Mike');
        done();
    }
    fn.getName(cb);
})

//실패 - done함수를 받아왔지만 실행x
test('3초 후에 받아온 이름은 Mike', done => {
    function cb(name) {
        expect(name).toBe('Mike');
    }
    fn.getName(cb);
})

//API 에러 감지 -  try catch 사용
test('3초 후에 받아온 이름은 Mike', done => {
    function cb(name) {
        try{
            expect(name).toBe('Mike');
            done();
        }catch(err) {
            done();
        }
    }
    fn.getName(cb);
})

/*promise를 리턴해주면 jest는 resolve 될 때 까지 기다려주므로 done을 넘겨주지 않아도 됨.*/
//실패
test('3초 후에 받아온 나이는 30', () => {
    fn.getAge(cb).then(age => {
        expect(age).toBe(30);
    });
});

//성공 - promise 사용시 return을 해주어야 성공적으로 실행됨
test('3초 후에 받아온 나이는 30', () => {
    return fn.getAge(cb).then(age => {
        expect(age).toBe(30);
    });
});

/*resolves, rejects matchers 사용 -> 보다 간단하게 작성가능*/
test('3초 후에 받아온 나이는 30', () => {
    return expect(fn.getAge().resolves.toBe(30));
});

test('3초 후에 에러가 납니다.', () => {
    return expect(fn.getAge().rejects.toMatch('error'));
});

/*async await 사용*/
test('3초 후에 받아온 나이는 30', async() => {
    const age = await fn.getAge();
    expect(age).toBe(30);
});

//resolves 사용시
test('3초 후에 받아온 나이는 30', async() => {
    await expect(fn.getAge()).resolves.toBe(30);
});