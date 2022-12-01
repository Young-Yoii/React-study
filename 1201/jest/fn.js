const fn = {
    add: (num1, num2) =>  num1 + num2,
    //유저정보를 가져오는 함수
    connectUserDb : () => {
        return new Promise(res => {
            setTimeout(() => {
                res({
                    name: "Mike",
                    age: 30,
                    gender: "male",
                })
            }, 500);
        })
    },
    //db와 연결을 끊는 함수
    disconnectUserDb : () => {
        return new Promise(res => {
            setTimeout(() => {
                res()
            },500);
        });
    },
    connectCarDb : () => {
        return new Promise(res => {
            setTimeout(() => {
                res({
                    brand: "Bmw",
                    name: "z4",
                    color: "red",
                })
            }, 500);
        })
    },
    disconnectCarDb : () => {
        return new Promise(res => {
            setTimeout(() => {
                res()
            },500);
        });
    }
};

module.exports = fn;