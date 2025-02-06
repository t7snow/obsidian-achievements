// should have the fuctions for the actual addition of xp
// so
import * as localforage from "localforage";
import { moment } from "obsidian";

interface XPState {
  daily: Record<string, number>;
  total: number;
  lastDaily: string;
  fileXP: Record<string, number>;
}

export class XPManager {

  private xpState: XPState = {
    daily: {},
    total: 0,
    lastDaily: '',
    fileXP: {}
  };

  private readonly XP_REWARDS = {
    NEW_FILE: 50,
    WORD_WRITTEN: 1,
    TAG_ADDED: 5,
    EMBED_ADDED: 10,
    DAILY_GOAL_MET: 100,
    WORD_MILESTONE: 200,
    DAILY_NOTE: 25,
    SHARE_CONTENT: 15
  };

  constructor() {
    this.loadXP();
    this.checkDayReset();
  }
  
  private async saveXP() : Promise<void> {
    const xp = await localforage.setItem('xp-state', this.xpState);
  }

  private async loadXP() : Promise<void> {
    const savedState = await localforage.getItem<XPState>('xp-state');
    if(savedState) {
      this.xpState = savedState;
    }
  }

  private async checkDayReset(): Promise<void> {
    const today = moment().format('YYYY-MM-DD');
    if (this.xpState.lastDaily !== today) {
      this.xpState.daily = {};
      this.xpState.lastDaily = today;
      await this.saveXP();
    }
  }
  
  private async addXP(amount: number, fileName?: string): Promise<void> {
    this.xpState.total += amount;
    const today = moment().format('YYYY-MM-DD');
    this.xpState.daily[today] = (this.xpState.daily[today] || 0) + amount;
    if (fileName) {
      this.xpState.fileXP[fileName] = (this.xpState.fileXP[fileName] || 0) + amount;
    }
    await this.saveXP();
  }

  public async handleFileCreation(fileName: string): Promise<void> {
    await this.addXP(this.XP_REWARDS.NEW_FILE, fileName);
  }

  public async handleWord(fileName: string, wordCount: number = 1): Promise<void> {
    await this.addXP(this.XP_REWARDS.WORD_WRITTEN * wordCount, fileName);
  } 

  public async handleTag(fileName: string): Promise<void> {
    await this.addXP(this.XP_REWARDS.TAG_ADDED, fileName);
  }

  public async handleEmbedded(fileName: string): Promise<void> {
    await this.addXP(this.XP_REWARDS.EMBED_ADDED, fileName);
  }


  public async handleDailyGoal(): Promise<void> {
    const today = moment().format('YYYY-MM-DD');
    const achievementKey = `daily_goal_${today}`;
    await this.addXP(this.XP_REWARDS.DAILY_GOAL_MET);
  }

  public async getDailyXP(): Promise<number> {
    const today = moment().format('YYYY-MM-DD');
    return this.xpState.daily[today];
  }

  public async getTotalXP(): Promise<number> {
    return this.xpState.total;
  }
  public async getFileXp(fileName: string): Promise<number> {
    return this.xpState.fileXP[fileName];
  }


}