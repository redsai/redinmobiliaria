import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormControlName  } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Property } from '../../models/property.model';
import { UploadFilesService } from '../../services/upload-files.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import { Departmens, Cities, Barrios } from '../../models/cities_departmens.model';
import { CitiesDepartmensService } from '../../services/cities-departmens.service';
declare var jQuery: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers:[CitiesDepartmensService]
})
export class ProfileComponent implements OnInit {
  myForm: FormGroup;
  property: Property;
  propertys: Property[];
  propertysUser: Property[];
  public selectDepartmens: Departmens = { id: 0, name: ''};
  public departmens: Departmens[];
  public cities: Cities[];
  public barrios: Barrios[];
  id: any ;
  users: User;
  loading = true;
  currentUser?: User;
  public data = [];
  public data2 = [];
  Otrosuser = false;
  data1 = this.dataDvc.getDepartmens();
  constructor(
    private authService: AuthService,
    private router: Router,
    private uploadFilesService: UploadFilesService,
    private dataDvc: CitiesDepartmensService,
    private modal: NgbModal,
    private _router: ActivatedRoute
  ) {
    this.id = this._router.snapshot.paramMap.get('id');
  }
  // tslint:disable-next-line: typedef
  selectEvent(event): void{
    this.cities = this.dataDvc.getCities().filter(item => item.DepartmensId = event.id);
  // tslint:disable-next-line: align
    this.data = this.cities;
  }
 selectEventBarrios(event): void{
   this.barrios = this.dataDvc.getBarrios().filter(item => item.CitiesId = event.id);
   // tslint:disable-next-line: align
   this.data2 = this.barrios;
  }
  ngOnInit(): void {
    
    if(!this.authService.isLoggedIn()){
      this.router.navigateByUrl('login');
    }  

    if(this.id === null){
      this.Otrosuser = false;
      this.authService.getUser(this.authService.currentUser.foto)
    .then((users: User) => {
      this.users = users;
      this.loading = false;
    });

    this.uploadFilesService.getPropertyUser(this.authService.currentUser.foto)
    .then((property: Property[]) => {
      this.propertys = property;
      this.loading = false;
    });
    }else{
      this.Otrosuser = true;      
      this.authService.getUser(this.id)
    .then((users: User) => {
      this.users = users;
      this.loading = false;
    });

    this.uploadFilesService.getPropertyUser(this.id)
    .then((property: Property[]) => {
      this.propertys = property;
      this.loading = false;
    });
    }

    this.myForm = new FormGroup({
      _id: new FormControl(null,Validators.required),
      NombreInmueble: new FormControl(null, Validators.required),
      DescripcionInmueble: new FormControl(null, Validators.required),
      Precio: new FormControl(null, Validators.required),
      Departamento: new FormControl(null, Validators.required),
      Ciudad: new FormControl(null, Validators.required),
      Barrio: new FormControl(null),
      Banios: new FormControl(null),
      Habitaciones: new FormControl(null),
      Garaje: new FormControl(null),
      Asensor: new FormControl(null)
    });
  }
  openSm(contenido,property){   
    this.property = property; 
    this.modal.open(contenido);
  }
  deleteProperty(property){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.uploadFilesService.deleteProperty(property._id)
        .then((property: Property) => {
          this.property = property;
          this.loading = false;
          Swal.fire(
            'Eliminado!',
            'Tu propiedad ha sido eliminada.',
            'success'
          ),
          window.location.reload(),
            this.authService.handleError;
        });
       
      }
    })
  }
    /*const modalRef = this.modal.open(contenido);
    console.log(property);
    modalRef.componentInstance.passedData = this.propertys;
    
    
    modalRef.result.then(result => {
      console.log(result);
    }, (reason) => {
     console.log(reason);;
     console.log(property);
     });
    }   */
  

    /*this.modal.open(contenido).result.then((result) => {
      console.log(result);
   }, (reason) => {
    console.log(reason);;
    console.log(property);
    });
  }*/
  /*onPreUpdateBook(property: Property): void {
    this.uploadFilesService.getPropertyUser(this.authService.currentUser._id);
    
  }*/
  onSubmit() {
    if (this.myForm.valid) {
      const { _id, NombreInmueble, DescripcionInmueble, Precio, Departamento,
         Ciudad, Barrio, Banios, Habitaciones, Garaje, Asensor
        } = this.myForm.value;
      const property = new Property(_id, NombreInmueble, DescripcionInmueble, Precio,
         Departamento, Ciudad, Barrio, Banios, Habitaciones, Garaje, Asensor
      );
      this.uploadFilesService.putProperty(_id, NombreInmueble, DescripcionInmueble, Precio,
        Departamento, Ciudad, Barrio, Banios, Habitaciones, Garaje, Asensor)
        .subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Tu propiedad ha sido modificada',
              showConfirmButton: false,
              timer: 1500
            }),
            window.location.reload(),
            this.authService.handleError;
          }
        );
    }
  }
}