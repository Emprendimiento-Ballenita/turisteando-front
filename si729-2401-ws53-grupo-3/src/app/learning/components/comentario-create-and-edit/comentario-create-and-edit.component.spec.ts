import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioCreateAndEditComponent } from './comentario-create-and-edit.component';

describe('ComentarioCreateAndEditComponent', () => {
  let component: ComentarioCreateAndEditComponent;
  let fixture: ComponentFixture<ComentarioCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentarioCreateAndEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComentarioCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
