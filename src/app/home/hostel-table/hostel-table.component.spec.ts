import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelTableComponent } from './hostel-table.component';

describe('HostelTableComponent', () => {
  let component: HostelTableComponent;
  let fixture: ComponentFixture<HostelTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostelTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
