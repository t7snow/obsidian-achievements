import * as localforage from "localforage";
export class TimeTracker {
  private timers: { [fileName: string]: { startTime: number, totalTime: number } } = {};

  constructor() {
    this.loadTimers();
  }
  public startTimer(fileName: string): void {
    if (!this.timers[fileName]) {
      this.timers[fileName] = { startTime: Date.now(), totalTime: 0 };
    } else {
      this.timers[fileName].startTime = Date.now();
    }
  }

  public async stopTimer(fileName: string): Promise<void> {
    if (this.timers[fileName]) {
      const endTime = Date.now();
      this.timers[fileName].totalTime += endTime - this.timers[fileName].startTime;
    }
    await this.saveTimers();
  }

  public getTimeSpent(fileName: string): number {
    if (this.timers[fileName]) {
      return this.timers[fileName].totalTime;
    }
    return 0;
  }

  public getDailyTotalTime(): number {
    return Object.values(this.timers).reduce((total, timer) => total + timer.totalTime, 0);
  }


 public async deleteFileTimer(fileName: string) {
    if(this.timers[fileName]) {
      delete this.timers[fileName];
      await this.saveTimers();
    }
  }

  private async saveTimers(): Promise<void> {
    const savedTimers = await localforage.setItem('timers', this.timers);
  }

  private async loadTimers(): Promise<void> {
    const savedTimers = await localforage.getItem<{ [fileName: string]: {startTime: number, totalTime: number}}>('timers');
    if(savedTimers){
      this.timers = savedTimers;
    }
  }


 
}