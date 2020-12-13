const questionArea = document.createElement("textarea");
questionArea.rows = 5;
questionArea.cols = 50;
questionArea.className = "question-area";

const iqm = document.getElementById("iqm");
iqm.appendChild(questionArea);

class Clock {
    /**
     * - startingTime and timeInterval are in milliseconds
     * - precision represents the number of decimals of the seconds display
     */
    constructor(startingTime, timeInterval, precision) {
        this.startingTime = startingTime;
        this.timeInterval = timeInterval;
        this.precision = precision;
        
        this.display = document.createElement("button");
        this.display.id = "clock-display";
        this.display.onclick = this.playPause;
        this.refresh();

        this.stop = document.createElement("button");
        this.stop.id = "clock-stop";
        this.stop.textContent = "STOP";
        this.stop.onclick = this.stopHandler;

        this.container = document.createElement("div");
        this.container.className = "button-container";
        this.container.appendChild(this.display);
        this.container.appendChild(this.stop);
    }
    
    refresh() {
        this.counting = false;
        this.time = this.startingTime;
        this.updateView();
    }

    updateView() {
        this.display.className = this.counting ? "clock-fresh" : "clock-over";
        if (this.time === this.startingTime) {
            this.display.className = "clock-fresh";
        }
        this.display.textContent = (this.time / 1000).toFixed(this.precision);
    }

    pause() {
        this.counting = false;
    }

    /**
     * display onclick event hander
     */
    playPause = (e) => {
        if (this.time === 0) {
            this.refresh();
        }

        else {
            this[this.counting ? "pause" : "play"]();
        }
    }

    /**
     * stop onclick event handler
     */
    stopHandler = (e) => {
        this.counting = false;
        this.refresh();
    }

    play() {
        this.counting = true;
        this.decreaseTime();
    }

    decreaseTime = () => {
        if (!this.counting) {
            return;
        }
        
        this.time -= this.timeInterval;
        this.updateView();
        if (this.time <= 0) {
            this.display.className = "clock-over";
        } else {
            setTimeout(this.decreaseTime, this.timeInterval);
        }
    }

}

var clock = new Clock(30 * 1000, 100, 1, iqm);
iqm.appendChild(clock.container);