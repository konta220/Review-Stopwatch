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

Date.prototype.getAllHours = function () {
    return this.getHours + (this.getMinutes() + this.getSeconds() / 60) / 60
}

var app = new Vue({
    el: '#app',
    data: {
        isRunning: false,
        timerDate: new Date(0, 0, 0, 0, 0, 0, 0),
        updateTimerInterval: undefined,
        person: 2,
        wage: 850,
        personalWage: 0,
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
        runBtnClick: function (event) {

            if (this.isRunning) {
                clearInterval(this.updateTimerInterval);

            } else {
                setIntervalUpdateTimerDate();
            }

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
            return Math.floor(hours * 1000) / 1000 * wageNum;
        },

        allWage: function () {
            return 1 * this.person;
        }
    }
});

function setIntervalUpdateTimerDate() {
    updateTimerDate();
    app.updateTimerInterval = setInterval(updateTimerDate, intervalMilliSeconds);
}

function updateTimerDate() {
    app.timerDate = new Date(app.timerDate);
    app.timerDate.setMilliseconds(app.timerDate.getMilliseconds() + intervalMilliSeconds);
}
