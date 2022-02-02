import { TestBed } from '@angular/core/testing';

import { CitiesDepartmensService } from './cities-departmens.service';

describe('CitiesDepartmensService', () => {
  let service: CitiesDepartmensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitiesDepartmensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
