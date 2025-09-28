import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShoppingListDashboard } from "./shopping-list-dashboard";

describe("ShoppingListDashboard", () => {
  let component: ShoppingListDashboard;
  let fixture: ComponentFixture<ShoppingListDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingListDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingListDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
