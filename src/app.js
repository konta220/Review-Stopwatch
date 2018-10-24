function fillZero2(num) {
    return ('0' + parseInt(num)).slice(-2);
}

var app = new Vue({
    el: '#app',
    data: {
        /** 動作中=true */
        isRunning: false,
        /** 開始時間 */
        startDate: undefined,
        /** 表示時間 */
        timerDate: new Date(0, 0, 0, 0, 0, 0, 0),
        /** 0秒にリセット=true */
        canResetTime: true,
        /** 毎秒更新の関数オブジェクト */
        updateTimerInterval: undefined,
    },
    computed: {
        time: function () {
            const date = this.timerDate;
            const f = fillZero2;
            return f(date.getHours()) + ":" + f(date.getMinutes())
                + ":" + f(date.getSeconds());
        },

        runnningBtn: function () {
            return (this.isRunning ? "Stop" : "Start");
        },

    },
    methods: {
        clearBtnClick: function () {
            this.canResetTime = true;
            this.timerDate = new Date(0, 0, 0, 0, 0, 0, 0);
        },
        runBtnClick: function (event) {

            if (this.canResetTime) {
                this.startDate = new Date();
                this.canResetTime = false;
            }

            if (this.isRunning) {
                clearInterval(this.updateTimerInterval);
            } else {
                setIntervalUpdateTimerDate();
            }

            this.isRunning = !this.isRunning;
        },
    }
});

function setIntervalUpdateTimerDate() {

    updateTimerDate();
    // １秒後の表示を更新
    app.updateTimerInterval = setInterval(updateTimerDate, 1000);
}

function updateTimerDate() {
    // setMillSecond
    app.timerDate = new Date(0, 0, 0, 0, 0, 0, new Date() - app.startDate);
}