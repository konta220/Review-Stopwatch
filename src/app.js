function fillZero2(num) {
    return ('0' + parseInt(num)).slice(-2);
}

var app = new Vue({
    el: '#app',
    data: {
        canStartTime: false,
        timerDate: new Date(),
    },
    computed: {
        time: function () {
            const date = this.timerDate;
            const f = fillZero2;
            return f(date.getHours()) + ":" + f(date.getMinutes())
                + ":" + f(date.getSeconds());
        },
    },
    methods: {
        move: function (event) {

            if (this.canStartTime) {
                clearInterval(updateTimerInterval);
            } else {
                setIntervalUpdateTimerDate();
            }

            this.canStartTime = !this.canStartTime;
        },
    }
});

let startDate = new Date();
let updateTimerInterval = undefined;

function setIntervalUpdateTimerDate() {
    startDate = new Date();
    updateTimerDate();
    // １秒後の表示を更新
    updateTimerInterval = setInterval(updateTimerDate, 1000);
}

function updateTimerDate() {
    // setMillSecond
    app.timerDate = new Date(0, 0, 0, 0, 0, 0, new Date() - startDate);
}