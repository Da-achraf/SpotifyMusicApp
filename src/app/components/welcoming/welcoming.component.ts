import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StateManager } from 'src/app/services/state-manager.service';

@Component({
  selector: 'app-welcoming',
  templateUrl: './welcoming.component.html',
  styleUrls: ['./welcoming.component.css']
})
export class WelcomingComponent implements OnInit{

  constructor(
    private stateManager: StateManager,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.emitCurrentRoutePath();
  }

  emitCurrentRoutePath(){
    let currentPath = this.activatedRoute.snapshot.url[0].path;
    this.stateManager.emitCurrentRoutePath(currentPath);

    // console.log('route path emitted from welcoming: ', currentPath);
  }
}
