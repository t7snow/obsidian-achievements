export class TimeTracker {
  private fileStartTimes: Record<string, number> = {};
  private fileTotalTimes: Record<string, number> = {};
  private fileDailyTimes: Record<string, number> = {};
  private dailyTotalTime: number = 0;

  public startFileTracking(filePath: string) {
    this.fileStartTimes[filePath] = Date.now();
  }

  public stopFileTracking(filePath: string) {
    if (this.fileStartTimes[filePath]) {
      const duration = Date.now() - this.fileStartTimes[filePath];
      this.dailyTotalTime += duration;
      this.fileDailyTimes[filePath] = duration;
      this.fileTotalTimes[filePath] = (this.fileTotalTimes[filePath] || 0) + duration;
      delete this.fileStartTimes[filePath];
      return duration;
    }
    return 0;
  }

  public deleteFileTracking(filePath: string) {
    if(this.fileTotalTimes[filePath]) {
      this.dailyTotalTime -= this.fileTotalTimes[filePath];
      delete this.fileTotalTimes[filePath];
    }
  }

  public getDailyTotalTime(): number {
    return this.dailyTotalTime;
  }

  public getFileDailyTime(filePath: string): number {
    return this.fileDailyTimes[filePath] || 0;
  }

  public resetDailyTime() {
    this.dailyTotalTime = 0;
    this.fileStartTimes = {};
    this.fileTotalTimes = {};
    this.fileDailyTimes = {}; // Also reset daily times
  }
}