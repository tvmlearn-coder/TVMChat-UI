import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface StatusStory {
  image: string;
  time: string;
}

export interface StatusUser {
  name: string;
  profile: string;
  stories: StatusStory[];
}

@Injectable({ providedIn: 'root' })
export class StatusService {

  private API_URL = 'http://localhost:3000/status';

  myStatus$ = new BehaviorSubject<StatusUser | null>(null);
  recent$ = new BehaviorSubject<StatusUser[]>([]);
  viewed$ = new BehaviorSubject<StatusUser[]>([]);

  activeUser$ = new BehaviorSubject<StatusUser | null>(null);
  storyIndex$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  loadStatus() {
    this.http.get<any>(this.API_URL).subscribe(data => {
      this.myStatus$.next(data.myStatus);
      this.recent$.next(data.recent);
      this.viewed$.next(data.viewed);
    });
  }

  openUser(u: StatusUser) {
    this.activeUser$.next(u);
    this.storyIndex$.next(0);
  }

  closeUser() {
    this.activeUser$.next(null);
    this.storyIndex$.next(0);
  }

  nextStory() {
    const user = this.activeUser$.value;
    if (!user) return;

    const nextIndex = this.storyIndex$.value + 1;

    if (nextIndex < user.stories.length) {
      this.storyIndex$.next(nextIndex);
    } else {
      this.closeUser();
    }
  }

  prevStory() {
    if (this.storyIndex$.value > 0) {
      this.storyIndex$.next(this.storyIndex$.value - 1);
    }
  }
}
