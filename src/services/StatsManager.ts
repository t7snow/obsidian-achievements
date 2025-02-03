import { App, TFile, Plugin, moment } from 'obsidian';
import { VaultStatistics, Day, FileStat } from '../types/Stats';
import { debounce, Debouncer, Vault, Workspace } from "obsidian";
export default class StatsManager { 
  private plugin: Plugin;
  private app: App;
  private stats: VaultStatistics = {
    history: {},
    modifiedFiles: {},
  }
  private vault: Vault;
  private workspace: Workspace;
  public debounceChange;

  constructor(plugin: Plugin, app: App, vault: Vault, workspace: Workspace){
    this.plugin = plugin;
    this.app = app;
    this.vault = vault;
    this.workspace = workspace;
    this.debounceChange = debounce(
      (text: string) => this.change(text),
      50,
      false
    );

    this.vault.on('create', () => {
      
    });
  }

  async change(text: string) {
    
  }
  
  
}