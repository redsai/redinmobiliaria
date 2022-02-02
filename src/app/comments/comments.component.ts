import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm  } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UploadFilesService } from '../services/upload-files.service';
import { Property } from '../models/property.model';
import { Comment } from '../models/comments.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [UploadFilesService]
})
export class CommentsComponent implements OnInit {
  @Input() property: Property;

  constructor(
    private uploadFilesService: UploadFilesService,
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(form: NgForm) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/signin');
    }
    const comment = new Comment(
      form.value.descripcion,
      this.property
    );
    this.uploadFilesService
      .addComment(comment)
      .subscribe(
        res => {
          window.location.reload(),
          // tslint:disable-next-line: no-unused-expression
          this.authService.handleError;
        }
      );
    //form.reset();
  }
  ngOnInit(): void {

  }

}
