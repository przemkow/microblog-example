import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Apollo} from 'apollo-angular';
import {CURRENT_USER} from '../../graphql/queries';
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  private currentUserSubscription: Subscription;
  public currentUserLoading: boolean;
  public me: any;

  constructor(private readonly apollo: Apollo) { }

  ngOnInit() {
    this.currentUserLoading = true;

    this.currentUserSubscription = this.apollo
      .watchQuery({
        query: CURRENT_USER,
      })
      .valueChanges
      .subscribe(({ data, loading }: any) => {
        this.currentUserLoading = loading;
        this.me = data.me;
      });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
