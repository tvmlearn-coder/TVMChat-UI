import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private location: Location) {}

  login(email: string, password: string) {
    return this.http.get<any[]>('http://localhost:3000/Access').pipe(
      map((users: any[]) => {
        const user = users.find(u => u.email === email && u.password === password);
        return user ? user : null;
      })
    );
  }

  register(email: string, password: string) {
    return this.http.post('http://localhost:3000/Access', { email, password });
  }
  
goBack() {
  this.location.back();
}


}
