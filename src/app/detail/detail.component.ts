import { Component, OnInit } from '@angular/core';
import {DotaApiService} from "../core/services/dota-api.service";
import {UserService} from '../core/services/user.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private dotaApiService: DotaApiService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser(86228570).pipe(
      switchMap(() => this.dotaApiService.getMatchDetails(5573803279))
    ).subscribe(match => console.log(match))
  }

}
