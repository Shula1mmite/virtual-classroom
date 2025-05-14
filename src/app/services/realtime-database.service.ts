import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RealtimeDatabaseService {
  constructor(private db: AngularFireDatabase) {}

  getData(path: string): Observable<any[]> {
    return this.db.list(path).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          ...(c.payload.val() as object),
          firebaseKey: c.payload.key,
        }))
      )
    );
  }

  addData(path: string, data: any): Promise<any> {
    return this.db.list(path).push(data)
      .then(ref => {
        console.log('Data added with key:', ref.key);
        return ref;
      })
      .catch(error => {
        console.error('Error adding data:', error);
        throw error;
      });
  }

  updateData(path: string, key: string, data: any): Promise<void> {
    return from(this.db.object(`${path}/${key}`).update(data)).toPromise();
  }

  deleteData(path: string, firebaseKey: string): Promise<void> {
    return from(this.db.object(`${path}/${firebaseKey}`).remove()).toPromise();
  }
}
