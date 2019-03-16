import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  @Output()
  private readonly submitForm = new EventEmitter();

  public form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group(
      {
        title: [ '' ],
        content: [ '' ],
      },
    );
  }

  ngOnInit() {
  }

  addPost() {
    this.submitForm.next(this.form.value);
  }
}
