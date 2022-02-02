import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router'
import { UploadFilesService } from '../../services/upload-files.service';
import { Property } from '../../models/property.model';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  propertys: Property;
  loading = true;

  id: string ;
  constructor(
    private authService: AuthService,
    private router: Router,
    private uploadFilesService: UploadFilesService,
    private _router: ActivatedRoute
  ) { 
    this.id = this._router.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    if(!this.authService.isLoggedIn()){
      this.router.navigateByUrl('login');
    }
    this.uploadFilesService.getProperty(this.id)
    .then((propertys: Property) => {
      this.propertys = propertys;
      this.loading = false;
    });
  }

}
