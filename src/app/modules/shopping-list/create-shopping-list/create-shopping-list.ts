import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChildren,
} from "@angular/core";
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { UnitsService } from "@services/units";
import { Unit } from "@customTypes/unit";
import { debounceTime, distinctUntilChanged, forkJoin } from "rxjs";
import { MatSelectModule } from "@angular/material/select";
import { ProductService } from "@services/product";

interface ShoppingListItem {
  name: FormControl<string>;
  quantity: FormControl<number>;
  unit: FormControl<string>;
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
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  templateUrl: "./create-shopping-list.html",
  styleUrl: "./create-shopping-list.scss",
})
export class CreateShoppingList implements OnInit, AfterViewInit {
  @ViewChildren("listItem") listItems!: QueryList<ElementRef>;
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly unitsService = inject(UnitsService);
  private readonly productsService = inject(ProductService);

  units: Unit[] = [];
  readonly minDate = new Date();

  shoppingListForm = this.fb.group<ShoppingList>({
    name: this.fb.control("", { validators: [Validators.required] }),
    description: this.fb.control(""),
    plannedDate: this.fb.control(null),
    items: this.fb.array<FormGroup<ShoppingListItem>>([]),
  });

  ngOnInit() {
    this.addItem();

    forkJoin([this.unitsService.getAll()]).subscribe({
      next: ([units]) => {
        this.units = units.data;
      },
    });
  }

  ngAfterViewInit() {
    this.listItems.changes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((listItems) => {
        if (this.listItems && this.listItems.last) {
          const lastElement = this.listItems.last.nativeElement;
          lastElement.scrollIntoView({ behavior: "smooth" });
        }
      });
  }

  addItem() {
    const newControl = this.fb.group<ShoppingListItem>({
      name: this.fb.control("", { validators: [Validators.required] }),
      quantity: this.fb.control(1, {
        validators: [Validators.required, Validators.min(1)],
      }),
      unit: this.fb.control("", { validators: [Validators.required] }), // Unidades: g, kg, l, ml, unidades, etc.
    });
    const index = this.items.length;

    newControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        if (!value.name) return;
        this.searchProducts(value.name);
      });
    this.items.push(newControl);

    this.items.updateValueAndValidity();
  }

  searchProducts(searchTerm: string) {
    this.productsService.getAll({ searchTerm: searchTerm }).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: console.log,
    });
  }

  createShoppingList() {
    console.log(this.shoppingListForm.value);
  }
  get items() {
    return this.shoppingListForm.get("items") as FormArray;
  }
}
