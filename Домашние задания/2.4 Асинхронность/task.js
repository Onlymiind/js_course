
class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(time, callback) {
    if (time == undefined || callback == undefined)
      throw new Error('Отсутствуют обязательные аргументы');
    if (this.alarmCollection.find((clock) => { return clock.time == time; }))
      console.warn('Уже присутствует звонок на это же время');
    this.alarmCollection.push({
      callback: callback,
      time: time,
      canCall: true
    });
  }

  removeClock(time) {
    this.alarmCollection = this.alarmCollection.filter((clock) => { return clock.time !== time; });
  }

  getCurrentFormattedTime() {
    const time = new Date();
    return time.getHours().toString().padStart(2, '0') + ':'
      + time.getMinutes().toString().padStart(2, '0');
  }

  start() {
    if (this.intervalId !== null)
      return;
    this.intervalId = setInterval(() => this.#tick(), 1000);
  }

  stop() {
    if (this.intervalId === null)
      return;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  resetAllCalls() {
    this.alarmCollection.forEach((clock) => {
      clock.canCall = true;
    });
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }

  #tick() {
    const time = this.getCurrentFormattedTime();
    this.alarmCollection.forEach((clock) => {
      if (clock.time !== time || !clock.canCall)
        return;
      clock.canCall = false;
      clock.callback();
    });
  }
}
