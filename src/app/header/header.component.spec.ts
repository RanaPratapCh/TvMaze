import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [RouterTestingModule,FormsModule], 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define searchText', () => {
    expect(component.searchText).toBeDefined();
  });
  it('should navigate to  searchDetails', () => {
    let formData = new FormBuilder().group({
      serachText: ['flash', Validators.required]
    });
    formData.value.searchText = 'flash';
    const routeSpy = spyOn(component,'onSubmit').and.callThrough();
    component.onSubmit(formData);
    
    expect(routeSpy).toHaveBeenCalled();
  });

});
