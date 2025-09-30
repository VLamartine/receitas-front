import {
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
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import { Product } from "@customTypes/product";
import { CreateShoppingListBody } from "@customTypes/shopping-list";
import { ShoppingListService } from "@services/shopping-list";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

interface ShoppingListItem {
  id: FormControl<string | null>;
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
    MatAutocompleteModule,
  ],
  templateUrl: "./create-shopping-list.html",
  styleUrl: "./create-shopping-list.scss",
})
export class CreateShoppingList implements OnInit {
  @ViewChildren("listItem") listItems!: QueryList<ElementRef>;
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly unitsService = inject(UnitsService);
  private readonly productsService = inject(ProductService);
  private readonly shoppingListService = inject(ShoppingListService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  units: Unit[] = [];
  products: Product[] = [];

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

  addItem() {
    const newControl = this.fb.group<ShoppingListItem>({
      id: this.fb.control(null),
      name: this.fb.control("", { validators: [Validators.required] }),
      quantity: this.fb.control(1, {
        validators: [Validators.required, Validators.min(1)],
      }),
      unit: this.fb.control("", { validators: [Validators.required] }), // Unidades: g, kg, l, ml, unidades, etc.
    });

    newControl.controls.name.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        if (!value) return;
        this.searchProducts(value);
      });
    this.items.push(newControl);

    this.items.updateValueAndValidity();
  }

  searchProducts(searchTerm: string) {
    this.productsService.getAll({ searchTerm: searchTerm }).subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: console.log,
    });
  }

  onProductSelected($event: MatAutocompleteSelectedEvent, index: number) {
    const selectedProduct = this.products.find(
      (product) => product.id === $event.option.value,
    );
    if (selectedProduct) {
      this.items.at(index).patchValue({
        id: $event.option.value,
        name: selectedProduct.name,
      });
    }
  }
  createShoppingList() {
    if (this.shoppingListForm.invalid) {
      console.log("Form is invalid");
      console.log(this.shoppingListForm.errors);
      return;
    }
    const body = this.mapFormToRequestBody();
    this.shoppingListService.create(body).subscribe({
      next: (_response) => {
        this.snackBar.open("Lista de compras criada com sucesso", "", {
          duration: 3000,
        });
        this.router.navigate(["/shopping-list"]).then();
      },
      error: console.log,
    });
  }

  mapFormToRequestBody(): CreateShoppingListBody {
    const formValue = this.shoppingListForm.value;
    const body: CreateShoppingListBody = {} as CreateShoppingListBody;
    if (!formValue.name) {
      throw new Error("Missing name");
    }

    body.name = formValue.name;
    body.description = formValue.description ?? null;
    body.purchaseDate = formValue.plannedDate ?? null;

    body.shoppingListItems = this.items.value
      .filter((item: ShoppingListItem) => item.id)
      .map((item: ShoppingListItem) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
      }));
    return body;
  }
  get items() {
    return this.shoppingListForm.get("items") as FormArray;
  }
}
