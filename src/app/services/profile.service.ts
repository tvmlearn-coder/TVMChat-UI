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
    // First, get the user by email
    return this.getUserByEmail(profileData.email).pipe(
      switchMap(user => {
        if (!user) throw new Error('User not found');

        // Use HTTP PUT to update the same user by ID
        return this.http.put(`${this.apiUrl}/${user.id}`, { ...user, ...profileData });
      })
    );
  }
}
  