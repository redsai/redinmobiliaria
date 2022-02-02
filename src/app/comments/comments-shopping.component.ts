import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm  } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UploadFilesService } from '../services/upload-files.service';
import { Shopping } from '../models/shopping.model';
import { CommentShopping } from '../models/commentsShopping.model';

@Component({
  selector: 'app-comments-shopping',
  templateUrl: './comments-shopping.component.html',
  styleUrls: ['./comments-shopping.component.scss'],
  providers: [UploadFilesService]
})
export class CommentsShoppingComponent implements OnInit {
  @Input() shopping: Shopping;

  constructor(
    private uploadFilesService: UploadFilesService,
    private authService: AuthService,
    private router: Router
  ) { }
  onSubmit(form: NgForm) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/signin');
    }
    const comment = new CommentShopping(
      form.value.descripcion,
      this.shopping
    );
    this.uploadFilesService
      .addCommentShopping(comment)
      .subscribe(
        res => {
          window.location.reload(),
          // tslint:disable-next-line: no-unused-expression
          this.authService.handleError;
        }
      );
    form.reset();
  }
  ngOnInit(): void {
  }

}
