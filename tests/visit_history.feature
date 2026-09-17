Feature: Reception can record pet visits
  Reception staff record a dated description for a pet visit so the pet's
  clinical history remains visible with the pet.

  Background:
    Given the backend test application is up
    And "reception" is an authenticated user

  Scenario: Record a visit
    When "reception" does a `create_owner` with `first_name="Katherine"`, `last_name="Johnson"`, `address="5 Orbit Way"`, `city="Hampton"`, and `telephone="321"` on `Clinic` of "petclinic"
    And the resulting `owner_id` is saved as "owner_id"
    And "reception" does an `add_pet` with `name="Apollo"`, `pet_type="dog"`, and `birthday="2017-01-01"` on `Owner` of "<owner_id>"
    And the resulting `pet_id` is saved as "pet_id"
    And "reception" does a `record_visit` with `visit_date="2026-09-17"` and `description="Annual wellness examination"` on `Pet` of "<pet_id>"
    Then the saved pet shows its annual wellness visit
