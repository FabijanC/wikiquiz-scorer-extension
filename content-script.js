const questionArea = document.createElement("textarea");
questionArea.rows = 5;
questionArea.cols = 50;
questionArea.className = "question-area";

const iqm = document.getElementById("iqm");
iqm.appendChild(questionArea);

function getCurrentTimestamp() {
    return new Date().valueOf();
}

class Timer {
    /**
     * - startingTime and timeInterval are in milliseconds
     * - precision represents the number of decimals of the seconds display
     */
    constructor(startingTime, timeInterval, precision) {
        this.startingTime = startingTime;
        this.time = null;
        this.timeInterval = timeInterval;
        this.precision = precision;
        
        this.lastTimestamp = null;

        this.display = document.createElement("button");
        this.display.id = "timer-display";
        this.display.onclick = this.playPause.bind(this);
        this.refresh();

        this.stop = document.createElement("button");
        this.stop.id = "timer-stop";
        this.stop.textContent = "Reset";
        this.stop.onclick = this.stopHandler.bind(this);

        this.decreaseButton = this.createChangeButton("-", this.decreaseStartingTime);
        this.increaseButton = this.createChangeButton("+", this.increaseStartingTime);

        this.plusMinusContainer = document.createElement("div");
        this.plusMinusContainer.id = "plus-minus-container";
        this.plusMinusContainer.appendChild(this.decreaseButton);
        this.plusMinusContainer.appendChild(this.increaseButton);

        this.container = document.createElement("div");
        this.container.className = "button-container";
        this.container.appendChild(this.plusMinusContainer);
        this.container.appendChild(this.display);
        this.container.appendChild(this.stop);
    }

    createChangeButton(textContent, onclickCallback) {
        const changeButton = document.createElement("button");
        changeButton.textContent = textContent;
        changeButton.className = "change-button";
        changeButton.width = "50%";
        changeButton.onclick = onclickCallback.bind(this);
        return changeButton;
    }

    refresh() {
        this.counting = false;
        this.time = this.startingTime;
        this.updateView();
    }

    updateView() {
        this.display.className = this.counting ? "timer-fresh" : "timer-over";
        if (this.time > 0) {
            this.display.className = "timer-fresh";
        }
        this.display.textContent = (this.time / 1000).toFixed(this.precision);
    }

    pause() {
        this.counting = false;
    }

    /**
     * display onclick event hander
     */
    playPause(e) {
        if (this.time <= 0) {
            this.refresh();
        }

        else {
            this[this.counting ? "pause" : "play"]();
        }
    }

    /**
     * stop onclick event handler
     */
    stopHandler(e) {
        this.counting = false;
        this.refresh();
    }

    play() {
        this.lastTimestamp = getCurrentTimestamp();
        this.counting = true;
        setTimeout(this.decreaseTime.bind(this), this.timeInterval);
    }

    decreaseTime() {
        if (!this.counting) {
            return;
        }

        const currentTimestamp = getCurrentTimestamp();
        this.time -= currentTimestamp - this.lastTimestamp;
        this.time = Math.max(this.time, 0);
        this.lastTimestamp = currentTimestamp;
        this.updateView();
        if (this.time <= 0) {
            this.counting = false;
            this.display.className = "timer-over";
        } else {
            setTimeout(this.decreaseTime.bind(this), this.timeInterval);
        }
    }

    changeStartingTime(change) {
        const newTime = this.time + change;
        if (newTime >= 0) {
            if (this.time === this.startingTime) {
                this.startingTime = newTime;
            }
            this.time = newTime;
            this.updateView();
        }
    }

    increaseStartingTime() {
        this.changeStartingTime(+1000);
    }

    decreaseStartingTime() {
        this.changeStartingTime(-1000);
    }
}

var timer = new Timer(30 * 1000, 100, 1);
iqm.appendChild(timer.container);
