const async = {
    add: (num1, num2) =>  num1 + num2,
    getName: (cb) => {
        const name = "Mike";
        setTimeout(() => {
            cb(name);
            // throw new Error('서버에러...') - 에러테스트 시 cb 주석 후 , 해당 주석 제거 후 사용
        },3000)
    },
    getAge: () => {
        const age = 30;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(age);
            //    reject('error'); //에러테스트 시 resolve 주석 후 , 해당 주석 제거 후 사용
            }, 3000);
        })
    }
};

module.exports = async;