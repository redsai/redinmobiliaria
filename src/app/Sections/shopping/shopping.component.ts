import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Departmens, Cities, Barrios } from '../../models/cities_departmens.model';
import { CitiesDepartmensService } from '../../services/cities-departmens.service';
import { Shopping } from '../../models/shopping.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
  providers:[CitiesDepartmensService]
})
export class ShoppingComponent implements OnInit {

  myForm: FormGroup;
  public selectDepartmens: Departmens = { id: 0, name: ''};
  public departmens: Departmens[];
  public cities: Cities[];
  public barrios: Barrios[];
  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  public data = [];
  public data2 = [];
  public files = [];
  fileInfos: Observable<any>;
  images = [];
  public keyword = 'name';

  data1 = this.dataDvc.getDepartmens();

  constructor(private shoppingService: ShoppingService,
              private dataDvc: CitiesDepartmensService,
              private router: Router,
              private authService: AuthService) { }

  selectEvent(event): void{
    this.cities = this.dataDvc.getCities().filter(item => item.DepartmensId = event.id);
    //console.log('id->', this.cities);
    // tslint:disable-next-line: align
    this.data = this.cities;
  }
  selectEventBarrios(event): void{
    this.barrios = this.dataDvc.getBarrios().filter(item => item.CitiesId = event.id);
    //console.log('id->', this.cities);
    // tslint:disable-next-line: align
    this.data2 = this.barrios;
   }
  ngOnInit(): void {
    this.departmens = this.dataDvc.getDepartmens();
    this.cities = this.dataDvc.getCities();

    this.myForm = new FormGroup({
      NombreInmueble: new FormControl(null, Validators.required),
      DescripcionInmueble: new FormControl(null, Validators.required),
      Departamento: new FormControl(null, Validators.required),
      Ciudad: new FormControl(null, Validators.required),
      Barrio: new FormControl(null, Validators.required)
    });
  }
  onSubmit() {
    //const files = this.uploadFiles();
    if (this.myForm.valid) {
      const { NombreInmueble, DescripcionInmueble, Departamento,
         Ciudad, Barrio
        } = this.myForm.value;
      const shopping = new Shopping(NombreInmueble, DescripcionInmueble,
         Departamento.name, Ciudad.name, Barrio.name
      );
      console.log('Barrio-> '+Barrio);
      this.shoppingService.shopping(shopping)
        .subscribe(
          res => {
            window.location.reload(),
            // tslint:disable-next-line: no-unused-expression
            this.authService.handleError;
          }
        );
    }
  }
}
