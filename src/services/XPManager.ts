// should have the fuctions for the actual addition of xp
// so
import { moment } from "obsidian";
export class XPManager {
  
  private dailyXP: Record<string, number>;
  private totalXP: number; 
  private initialXP: number;
  private today: string;

  public handleFileCreation(currentXP: number) {
    
  }

  public handleWord(fileName: string) {

  }

  public handleTag(fileName: string) {

  }

  public handleEmbedded(fileName: string) {

  }

  public handleDailyGoal() {

  }

  public handleWordCount() {

  }

  public handleDailyNote(){

  }

  public handleShare() {

  }

  public getDailyXP(): number {
    this.today = moment().format("YYYY-MM-DD");
    return this.dailyXP[this.today];
  }

  public getTotalXP(): number {
    return this.totalXP;
  }



}