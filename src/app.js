function fillZero2(num) {
    return ('0' + parseInt(num)).slice(-2);
}

function fillZero3(num) {
    return ('00' + parseInt(num)).slice(-3);
}

const intervalMilliSeconds = 10;

Date.prototype.formatTime = function () {
    const f = fillZero2;
    return f(this.getHours()) + ":" + f(this.getMinutes()) + ":" + f(this.getSeconds());
}

Date.prototype.formatDate = function () {
    const f = fillZero2;
    return this.getFullYear() + "/" + f(this.getMonth())
        + "/" + f(this.getDate()) + " " + this.formatTime();
}

Date.prototype.getAllHours = function () {
    return this.getHours() + (this.getMinutes() + this.getSeconds() / 60) / 60
}

function floor(num, digit) {
    const calcDigit = Math.pow(10, -digit);
    const number = num * calcDigit;
    return Math.floor(number) / calcDigit;
}

var app = new Vue({
    el: '#app',
    data: {
        isRunning: false,
        timerDate: new Date(0, 0, 0, 0, 0, 0, 0),
        updateTimerInterval: undefined,
        person: 2,
        wage: 1000,
        personalWage: 0,
        timeRecords: [
        ],
    },
    computed: {
        time: function () {
            return this.timerDate.formatTime();
        },

        milliseconds: function () {
            return fillZero2(this.timerDate.getMilliseconds() / 10);
        },

        runnningBtn: function () {
            return (this.isRunning ? "Stop" : "Start");
        },
    },
    methods: {

        clearBtnClick: function (event) {
            this.timerDate = new Date(0, 0, 0, 0, 0, 0, 0);
        },
        recordsClearBtnClick: function (event) {
            this.timeRecords = [];
        },
        runBtnClick: function (event) {

            let runType = null;

            if (this.isRunning) {
                runType = "停止";
                clearInterval(this.updateTimerInterval);
            } else {
                if (clearTimer()) {
                    runType = "開始"
                } else {
                    runType = "再開"
                }

                setIntervalUpdateTimerDate();
            }
            this.timeRecords.unshift({ time: new Date(), runType: runType });

            this.isRunning = !this.isRunning;
        },

        personTime: function () {
            const time = this.timerDate;
            const person = this.person;

            const personDate = new Date();
            personDate.setHours(time.getHours() * person);
            personDate.setMinutes(time.getMinutes() * person);
            personDate.setSeconds(time.getSeconds() * person);
            return personDate.formatTime();
        },

        wageMoney: function () {
            const hours = this.timerDate.getAllHours();
            const wageNum = this.wage;

            return floor(hours * wageNum, -2);
        },

        allWage: function () {
            return floor(this.wageMoney() * this.person, -2);
        }
    }
});

function clearTimer() {
    const d = app.timerDate;
    return (d.getHours() == 0 && d.getMinutes() == 0 &&
        d.getSeconds() == 0 && d.getMilliseconds() == 0);
}

function setIntervalUpdateTimerDate() {
    updateTimerDate();
    app.updateTimerInterval = setInterval(updateTimerDate, intervalMilliSeconds);
}

function updateTimerDate() {
    app.timerDate = new Date(app.timerDate);
    app.timerDate.setMilliseconds(app.timerDate.getMilliseconds() + intervalMilliSeconds);
}
