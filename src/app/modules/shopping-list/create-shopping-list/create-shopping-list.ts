import { Component, inject, OnInit } from "@angular/core";
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatInput, MatLabel } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";

interface ShoppingListItem {
  name: FormControl<string>;
  quantity: FormControl<number>;
  unit: FormControl<string>;
  brand?: FormControl<string>;
}

interface ShoppingList {
  name: FormControl<string>;
  description: FormControl<string>;
  plannedDate: FormControl<Date | null>;
  items: FormArray<FormGroup<ShoppingListItem>>;
}
@Component({
  selector: "app-create-shopping-list",
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatLabel,
    MatInput,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: "./create-shopping-list.html",
  styleUrl: "./create-shopping-list.scss",
})
export class CreateShoppingList implements OnInit {
  fb = inject(NonNullableFormBuilder);
  minDate = new Date();
  shoppingListForm = this.fb.group<ShoppingList>({
    name: this.fb.control("", { validators: [Validators.required] }),
    description: this.fb.control(""),
    plannedDate: this.fb.control(null),
    items: this.fb.array<FormGroup<ShoppingListItem>>([]),
  });

  ngOnInit() {
    this.addItem();
  }

  addItem() {
    this.items.push(
      this.fb.group<ShoppingListItem>({
        name: this.fb.control("", { validators: [Validators.required] }),
        quantity: this.fb.control(1, { validators: [Validators.required] }),
        unit: this.fb.control("", { validators: [Validators.required] }), // Unidades: g, kg, l, ml, unidades, etc.
        brand: this.fb.control(""),
      }),
    );
  }
  get items() {
    return this.shoppingListForm.get("items") as FormArray;
  }
}
