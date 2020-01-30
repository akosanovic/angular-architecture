import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

export interface Record {

}
@Injectable()
export class RecordsService {

  private records$: Observable<Record[]>;

  constructor( private recordApi: RecordApi) {
    this.records$ = this.recordApi.getRecords()
        .pipe(shareReplay(1)); // Cashing Data
  }

  // return cashed data
  getRecords(): Observable<Record[]> {
    return this.records$;
  }

  // Filter Data
  getRecordsFromPeriod(period?): Observable<Record[]> {
    return this.records$.pipe( map( records => {
      return records.filter(record => record.inPeriod(period));
    }));
  }

  searchRecords(search: string): Observable<Record[]> {
    return this.recordApi.searchRecords(search);
  }
}
