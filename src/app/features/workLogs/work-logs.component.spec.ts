import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLogsComponent } from './work-logs.component';

describe('WorkLogsComponent', () => {
  let component: WorkLogsComponent;
  let fixture: ComponentFixture<WorkLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkLogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
