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
import {
  CreateShoppingListBody,
  ShoppingListItem,
  UpdateShoppingListBody,
} from "@customTypes/shopping-list";
import { ShoppingListService } from "@services/shopping-list";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiResponse } from "@customTypes/api-response";
import { MatIconModule } from "@angular/material/icon";

interface ShoppingListItemForm {
  id: FormControl<string | null>;
  name: FormControl<string>;
  quantity: FormControl<number>;
  unit: FormControl<string>;
}

interface ShoppingListForm {
  name: FormControl<string>;
  description: FormControl<string>;
  plannedDate: FormControl<Date | null>;
  items: FormArray<FormGroup<ShoppingListItemForm>>;
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
    MatIconModule,
  ],
  templateUrl: "./create-shopping-list.html",
  styleUrl: "./create-shopping-list.scss",
})
export class CreateShoppingList implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly unitsService = inject(UnitsService);
  private readonly productsService = inject(ProductService);
  private readonly shoppingListService = inject(ShoppingListService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);

  private shoppingListId: string | null = null;
  units: Unit[] = [];
  products: Product[] = [];

  readonly minDate = new Date();

  shoppingListForm = this.fb.group<ShoppingListForm>({
    name: this.fb.control("", { validators: [Validators.required] }),
    description: this.fb.control(""),
    plannedDate: this.fb.control(null),
    items: this.fb.array<FormGroup<ShoppingListItemForm>>([]),
  });

  ngOnInit() {
    if (this.activatedRoute.snapshot.params["id"]) {
      this.shoppingListId = this.activatedRoute.snapshot.params["id"];
      this.shoppingListService
        .getShoppingList(this.activatedRoute.snapshot.params["id"])
        .subscribe({
          next: (response) => {
            if (!response || !response.success || !response.data) {
              console.log("Error fetching shopping list");
              return;
            }

            this.shoppingListForm.patchValue({
              name: response.data.name,
              description: response.data.description ?? "",
              plannedDate: response.data.purchaseDate,
            });

            if (response.data.products) {
              console.log(response.data.products);
              response.data.products.forEach((item) => this.addItem(item));
            } else {
              this.addItem();
            }
          },
          error: console.log,
        });
    } else {
      this.addItem();
    }

    forkJoin([this.unitsService.getAll({ purchasable: true })]).subscribe({
      next: ([units]) => {
        this.units = units.data ?? [];
      },
    });
  }

  addItem(item: ShoppingListItem = {} as ShoppingListItem) {
    const newControl = this.fb.group<ShoppingListItemForm>({
      id: this.fb.control(item.id ?? null),
      name: this.fb.control(item.name ?? "", {
        validators: [Validators.required],
      }),
      quantity: this.fb.control(item.quantity || 1, {
        validators: [Validators.required, Validators.min(1)],
      }),
      unit: this.fb.control(item.unitId || "", {
        validators: [Validators.required],
      }),
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

  removeItem(index: number) {
    this.items.removeAt(index);
  }
  searchProducts(searchTerm: string) {
    this.productsService.getAll({ searchTerm: searchTerm }).subscribe({
      next: (response) => {
        this.products = response.data ?? [];
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
    const request = this.shoppingListId
      ? this.shoppingListService.updateShoppingList(
          this.shoppingListId,
          body as UpdateShoppingListBody,
        )
      : this.shoppingListService.create(body as CreateShoppingListBody);

    request.subscribe({
      next: (_response) => {
        const message = this.shoppingListId ? "atualizada" : "criada";
        this.snackBar.open(`Lista de compras ${message} com sucesso`, "", {
          duration: 3000,
        });
        this.router.navigate(["/shopping-list"]).then();
      },
      error: console.log,
    });
  }

  mapFormToRequestBody(): CreateShoppingListBody | UpdateShoppingListBody {
    const formValue = this.shoppingListForm.value;
    if (!formValue.name) {
      throw new Error("Missing name");
    }

    const items = this.items.value
      .filter((item: ShoppingListItemForm) => item.id)
      .map((item: ShoppingListItemForm) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        unitId: item.unit,
      }));

    let body: CreateShoppingListBody | UpdateShoppingListBody;

    if (this.shoppingListId) {
      body = {
        id: this.shoppingListId,
        name: formValue.name,
        items,
        description: formValue.description ?? null,
        purchaseDate: formValue.plannedDate ?? null,
      };
    } else {
      body = {
        name: formValue.name,
        items,
        description: formValue.description ?? null,
        purchaseDate: formValue.plannedDate ?? null,
      };
    }

    return body;
  }
  get items() {
    return this.shoppingListForm.get("items") as FormArray;
  }
}
