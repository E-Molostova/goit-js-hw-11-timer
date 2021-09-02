class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.spanDays = document.querySelector(`${selector} [data-value="days"]`);
    this.spanHours = document.querySelector(`${selector} [data-value="hours"]`);
    this.spanMins = document.querySelector(`${selector} [data-value="mins"]`);
    this.spanSecs = document.querySelector(`${selector} [data-value="secs"]`);
  }
  getUnits(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    return { days, hours, mins, secs };
  }
  doTimer(time) {
    const { days, hours, mins, secs } = this.getUnits(time);
    this.spanDays.textContent = this.onPad(days);
    this.spanHours.textContent = this.onPad(hours);
    this.spanMins.textContent = this.onPad(mins);
    this.spanSecs.textContent = this.onPad(secs);
  }
  onPad(value) {
    return String(value).padStart(2, 0);
  }
  start() {
    let showTime = this.targetDate - Date.now();
    this.doTimer(displayTime);
    let stopInterval = setTimeout(() => {
      this.start();
    }, 1000);
    if (showTime < 0) {
      clearTimeout(stopInterval);
    }
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Dec 31, 2021"),
});

timer.start();
