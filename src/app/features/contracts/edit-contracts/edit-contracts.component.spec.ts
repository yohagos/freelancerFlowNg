import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContractsComponent } from './edit-contracts.component';

describe('EditContractsComponent', () => {
  let component: EditContractsComponent;
  let fixture: ComponentFixture<EditContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditContractsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
