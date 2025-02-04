import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesToVideoComponent } from './images-to-video.component';

describe('ImagesToVideoComponent', () => {
  let component: ImagesToVideoComponent;
  let fixture: ComponentFixture<ImagesToVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesToVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesToVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
