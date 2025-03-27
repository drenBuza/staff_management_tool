import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRolesSummaryComponent } from './staff-roles-summary.component';

describe('StaffRolesSummaryComponent', () => {
  let component: StaffRolesSummaryComponent;
  let fixture: ComponentFixture<StaffRolesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffRolesSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffRolesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
