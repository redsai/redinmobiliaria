import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import { UploadFilesService } from '../../services/upload-files.service';
import { ShoppingService } from '../../services/shopping.service';
import { Property } from '../../models/property.model';
import { Shopping } from '../../models/shopping.model';
import { Departmens, Cities, Barrios } from '../../models/cities_departmens.model';
import { CitiesDepartmensService } from '../../services/cities-departmens.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[CitiesDepartmensService]
})
export class HomeComponent implements OnInit {

  propertys: Property[];
  shoppings: Shopping[];
  loading = true;
  public selectDepartmens: Departmens = { id: 0, name: ''};
  public departmens: Departmens[];
  public cities: Cities[];
  public barrios: Barrios[];
  public data = [];
  public data2 = [];
  images = [];
  public keyword = 'name';
  myForm: FormGroup;
  data1 = this.dataDvc.getDepartmens();
  constructor(
    private authService: AuthService,
    private router: Router,
    private dataDvc: CitiesDepartmensService,
    private uploadFilesService: UploadFilesService,
    private shoppingService: ShoppingService
  ) { }

  // tslint:disable-next-line: typedef
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
    if(!this.authService.isLoggedIn()){
      this.router.navigateByUrl('login');
    }

    this.departmens = this.dataDvc.getDepartmens();
    this.cities = this.dataDvc.getCities();

    //this.fileInfos = this.uploadService.getFiles();
    this.myForm = new FormGroup({           
      Departamento: new FormControl(null, Validators.required),
      Ciudad: new FormControl(null, Validators.required),
      Barrio: new FormControl(null)      
    });

    this.uploadFilesService.getPropertys()
    .then((propertys: Property[]) => {
      this.propertys = propertys;
      this.loading = false;
    });
   
    this.shoppingService.getShoppings()
    .then((shoppings: Shopping[]) => {
      this.shoppings = shoppings;
      this.loading = false;
    });
  }

  onSubmit() {       
    if (this.myForm.valid) {
      const { Barrio } = this.myForm.value;
      console.log('barrio-> '+Barrio);
      console.log(JSON.stringify(Barrio))
      const barrio2 = Barrio.name.replace(/['"]+/g, '');

     this.uploadFilesService.getPropertyBarrios(barrio2)
     .then((propertys: Property[]) => {
      this.propertys = propertys;
      this.loading = false;
      });

      this.shoppingService.getShoppingsBarrios(barrio2)
      .then((shoppings: Shopping[]) => {
      this.shoppings = shoppings;
      this.loading = false;
    });       
    }
  }
}
