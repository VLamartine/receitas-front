import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShoppingList } from './create-shopping-list';

describe('CreateShoppingList', () => {
  let component: CreateShoppingList;
  let fixture: ComponentFixture<CreateShoppingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateShoppingList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateShoppingList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
