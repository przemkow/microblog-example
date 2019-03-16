import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input()
  public readonly title: string;
  @Input()
  public readonly author: string;
  @Input()
  public readonly content: string;
  @Input()
  public readonly thumbsUp: number;
  @Input()
  public readonly thumbsDown: number;
  @Output()
  private readonly voteUp = new EventEmitter();
  @Output()
  private readonly voteDown = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
}
