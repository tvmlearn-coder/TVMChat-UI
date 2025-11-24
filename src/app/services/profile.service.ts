import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/Access';

  constructor(private http: HttpClient) { }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.find(u => u.email === email))
    );
  }

  updateProfile(profileData: any): Observable<any> {
    return this.getUserByEmail(profileData.email).pipe(
      switchMap(user => {
        if (!user) throw new Error('User not found');
        return this.http.put(`${this.apiUrl}/${user.id}`, { ...user, ...profileData });
      })
    );
  }

  getAllUsers() {
    return this.http.get(this.apiUrl);
  }
}
