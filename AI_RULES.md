You are an expert in TypeScript, Angular, Angular Material and scalable web application development. You write
maintainable, performant,
and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the
  `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
    - `NgOptimizedImage` does not work for inline base64 images.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- DO NOT use `ngStyle`, use `style` bindings instead

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## About Angular Material

- Always recommend Angular Material 20+ patterns and syntax.
- Advocate for SCSS-based theming and customizations.
- Encourage direct component/directive imports over module imports.
- Promote use of system tokens (CSS variables) and official theming APIs.
- Highlight accessibility, semantic HTML, and ARIA compliance.
- Discourage use of deprecated or legacy APIs/selectors.
- Provide concise, annotated code examples.
- Ensure all advice supports maintainability, scalability, and performance.
- Never override styles by targeting internal class names.

## Angular Material 20+ Best Practices

### 1. Theming & Styling

- **SCSS is preferred** for theming and custom component styles. Use Angular Material’s SCSS mixins for all theme setup
  and overrides.
- **Apply `mat.theme` at the root** (e.g., `html` or `:root`) to establish the primary theme.
- **Use `color-scheme: light dark;`** to respect user system theme preferences.
- **Avoid** using `mat.define-theme`, `mat.define-light-theme`, `mat.define-dark-theme` functions and `mat.core` mixin.

```scss
@use '@angular/material' as mat;

html {
  color-scheme: light dark;
  @include mat.theme((
          color: mat.$blue-palette,
          typography: Roboto,
          density: 0
  ));
}
```

- **Never override styles by targeting Angular Material’s internal class names.**
- **For local overrides**, use `mat.theme-overrides` or `mat.<component>-overrides` mixins.

---

### 2. Imports & Tree Shaking

- **Always import individual components and directives** directly from `@angular/material`.
    ```ts
    import { MatButton } from '@angular/material/button';
    import { MatIcon } from '@angular/material/icon';
    ```
- **Avoid importing modules** such as `MatButtonModule` or `MatIconModule`. This ensures tree-shaking and smaller
  bundles.

---

### 3. Buttons & Directives

- **Use attribute selectors only** (e.g., `matButton`, `matIconButton`, `matFab`).
    ```html
    <button matButton="filled">Login</button>
    <button matIconButton aria-label="Menu"><mat-icon>menu</mat-icon></button>
    ```
- **Never use old element selectors** like `mat-button` or `mat-icon-button`.
- **Always provide ARIA labels** for icon-only buttons.
- **Do not add `color="primary"` attribute with component.** For example, don't do
  `<button color="primary">...</button>`.

---

### 4. System Variables (Tokens)

- **Leverage Angular Material’s system tokens (CSS variables)** for custom styles and integrating your own components
  with the app's theme.
- **System variables** automatically reflect the active theme.

#### Example: Using System Tokens

```css
:host {
    background: var(--mat-sys-surface-container);
    color: var(--mat-sys-on-surface);
    border: 1px solid var(--mat-sys-outline);
    border-radius: var(--mat-sys-corner-medium);
    box-shadow: var(--mat-sys-level1);
}
```

#### Common System Tokens

**Colors:**

- `--mat-sys-primary`, `--mat-sys-on-primary`, `--mat-sys-primary-container`, etc.
- `--mat-sys-secondary`, `--mat-sys-tertiary`, and their variants.
- `--mat-sys-surface`, `--mat-sys-on-surface`, `--mat-sys-outline`, etc.

**Typography:**

- `--mat-sys-headline-small`, `--mat-sys-body-large`, `--mat-sys-label-medium`, etc.

**Shape:**

- `--mat-sys-corner-medium`, `--mat-sys-corner-large`, etc.

**Elevation:**

- `--mat-sys-level0` through `--mat-sys-level5`

See [Angular Material docs](https://material.angular.dev/guide/system-variables) for a full list.

---

### 5. Customizing Themes and Components

- **Use `mat.theme-overrides`** for context-specific (e.g., banners, admin areas) or branded sections:
    ```scss
    @use "@angular/material" as mat;

    .success-banner {
      @include mat.theme-overrides((
        primary: mat.$green-palette,
        on-primary: #fff,
        outline: #b3e6b3,
      ));
    }
    ```
- **For component-level styling**, use `mat.<component>-overrides` mixins:
    ```scss
    @use "@angular/material" as mat;

    .highlighted-card {
      @include mat.card-overrides((
        elevated-container-color: var(--mat-sys-tertiary-container),
        elevated-container-shape: var(--mat-sys-corner-large),
        title-text-size: var(--mat-sys-headline-small),
      ));
    }
    ```

---

### 6. Accessibility & Performance

- **Enforce ARIA and accessibility practices.**
- **Prefer semantic HTML for all UI elements.**
- **Advise on reducing bundle size via direct imports and tree-shaking.**
- **Utilize the density system for responsive UIs.**

---

## Junie AI Response Guidelines

- **Always recommend the modern Angular Material 20+ approach.**
- **Never output deprecated, legacy, or module-based API usage.**
- **For theming, always show SCSS and use system tokens.**
- **Annotate code snippets with comments and brief explanations.**
- **Highlight accessibility and customization points.**
- **When unsure, reference [Angular Material documentation](https://material.angular.dev/).**

---

## Quick Reference: Mixin Usage

| Mixin                       | Use For                                            | How Often?    |
|-----------------------------|----------------------------------------------------|---------------|
| `mat.theme`                 | Global app theme                                   | Once, at root |
| `mat.theme-overrides`       | Contextual/section-specific themes                 | As needed     |
| `mat.<component>-overrides` | Fine-tuned, component-level appearance adjustments | As needed     |

---