import { Component } from '@angular/core';
import { SpinnerService } from '../services/spinner.services';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  isLoading$ = this.spinnerSvc.isLoading$;

  constructor(private spinnerSvc: SpinnerService) { }

  ngOnInit(): void {
  }

}
