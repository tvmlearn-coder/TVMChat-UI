import { Component, OnInit, Inject } from '@angular/core';
import { StatusService, StatusUser } from 'src/app/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  myStatus: StatusUser | null = null;
  recent: StatusUser[] = [];
  viewed: StatusUser[] = [];
  activeUser: StatusUser | null = null;
  storyIndex = 0;

  constructor(@Inject(StatusService) private statusService: StatusService) {}

  ngOnInit() {
    this.statusService.loadStatus();

    this.statusService.myStatus$.subscribe(m => this.myStatus = m);
    this.statusService.recent$.subscribe(r => this.recent = r);
    this.statusService.viewed$.subscribe(v => this.viewed = v);

    this.statusService.activeUser$.subscribe(u => this.activeUser = u);
    this.statusService.storyIndex$.subscribe(i => this.storyIndex = i);
  }

  open(u: StatusUser) {
    this.statusService.openUser(u);
  }

  close() {
    this.statusService.closeUser();
  }

  next() {
    this.statusService.nextStory();
  }

  prev() {
    this.statusService.prevStory();
  }
}
