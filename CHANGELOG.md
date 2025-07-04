# formgator

## 0.2.3

* Expose the `Failures` type. (#37)

## 0.2.2

* New `.enrich(attrs)` form input method to add custom attributes. (#32)

## 0.2.1

* Use the `v` flag for RegExps.

## 0.2.0

### Breaking Changes

* **SvelteKit:** non-serializable values (files, blobs) are no longer sent back through `form.accepted`. (#26)

* Refinement issues no longer expose the refused value through `issue.received`. (#26)

## 0.1.4

* Add support for custom error messages. (#22)

  ```js
  // Composable, user-friendly username schema
  const username = fg.text(
    { minlength: 3, pattern: /^\w+$/ },
    {
      // Can be a function or a string
      minlength: ({ minlength }) => `Username must be at least ${minlength} characters long`,
      pattern: "Username can only contain letters, numbers, and underscores",
    }
  );
  ```

## 0.1.3

* Bring back provenance.

## 0.1.2

* New validator: `fg.multi()` for inputs under the same name. (#19)

## 0.1.1

### Patch Changes

* aeb4c8c: Added `.pipe()` method to compose other Standard Schema compliant validators

## 0.1.0

### Minor Changes

* 12c8a90: Formgator is now standard-schema compliant! Read more on https://standardschema.dev/

## 0.0.22

### Patch Changes

* 2560f5d: Improved type-safety of date validators

## 0.0.21

### Patch Changes

* 3469bb4: Expose update options in `reportValidity`

## 0.0.20

### Patch Changes

* 73d27ef: Fixed sveltekit types

## 0.0.19

### Patch Changes

* 2c3239c: complete API documentation in readme

## 0.0.18

### Patch Changes

* 9530ec8: Added `reportValidity()` function for sveltekit

## 0.0.17

### Patch Changes

* ec21627: Auto-publish to JSR

## 0.0.16

### Patch Changes

* 4e7b7d1: Release formgator to JSR: https://jsr.io/@gauben/formgator

## 0.0.15

### Patch Changes

* 593d556: Expose `custom`

## 0.0.14

### Patch Changes

* 3849970: Added `custom` validator, for custom validation (you bet)
* 740af0e: Added `loadgate` for SvelteKit users

## 0.0.13

### Patch Changes

* 1eb61c3: Hide `.safeParse` on validators
* ab30d37: Provide a default value to `.optional()`

## 0.0.12

### Patch Changes

* 3cbea07: More reliable missing/empty file check

## 0.0.11

### Patch Changes

* a2d9658: Empty `textarea()` properly returns `null`

## 0.0.10

### Patch Changes

* caae85d: Set up changelog and auto-publication workflow
