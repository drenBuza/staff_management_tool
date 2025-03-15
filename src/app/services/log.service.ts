import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivityLog } from '../models/activityLog';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logs: ActivityLog[] = [];
  private logSubject = new BehaviorSubject<ActivityLog[]>(this.logs);
  logs$ = this.logSubject.asObservable();

  constructor() {
    this.loadLogs();
  }

  private loadLogs() {
    const storedLogs = localStorage.getItem('activityLogs');
    this.logs = storedLogs ? JSON.parse(storedLogs) : [];
    this.logSubject.next(this.logs);
  }

  addLog(log: ActivityLog) {
    this.logs.unshift(log);
    localStorage.setItem('activityLogs', JSON.stringify(this.logs));
    this.logSubject.next(this.logs);
  }

  getLogs(): Observable<ActivityLog[]> {
    return this.logs$;
  }
}