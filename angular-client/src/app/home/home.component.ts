import {Component, OnDestroy, OnInit} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_HOTTEST_POST, GET_POSTS } from '../graphql/queries';
import { Subscription } from 'rxjs';
import {ADD_POST, VOTE_DOWN, VOTE_UP} from '../graphql/mutations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private getPostsSubscription: Subscription;
  private getHottestPostSubscription: Subscription;

  public posts: any;
  public hottestPost: any;
  public hottestPostLoading: boolean;

  constructor(private readonly apollo: Apollo) { }

  ngOnInit() {
    this.hottestPostLoading = true;

    this.getPostsSubscription = this.apollo
      .watchQuery({
        query: GET_POSTS,
      })
      .valueChanges
      .subscribe(({ data }: any) => {
        this.posts = data.getPosts;
      });

    this.getHottestPostSubscription = this.apollo
      .watchQuery({
        query: GET_HOTTEST_POST,
      })
      .valueChanges
      .subscribe(({ data }: any) => {
        this.hottestPostLoading = data.loading;
        this.hottestPost = data.getHottestPost;
      });
  }

  ngOnDestroy() {
    this.getPostsSubscription.unsubscribe();
  }


  onVoteDown(postId: number) {
    this.apollo.mutate({
      mutation: VOTE_DOWN,
      variables: {
        postId
      },
    }).subscribe();
  }

  onVoteUp(postId: number, thumbsUp: number) {
    this.apollo.mutate({
      mutation: VOTE_UP,
      variables: {
        postId
      },
      optimisticResponse: {
        voteUp: {
          __typename: 'Post',
          id: postId,
          thumbsUp: thumbsUp + 1,
        },
      },
    }).subscribe();
  }

  addNewPost(newPost) {
    this.apollo.mutate({
      mutation: ADD_POST,
      variables: newPost,
      update: (store, { data }) => {
        const getPostCache: any = store.readQuery({ query: GET_POSTS });
        getPostCache.getPosts.push(data.addPost);
        store.writeQuery({
          query: GET_POSTS,
          data: getPostCache,
        });
      }
    }).subscribe();
  }
}
