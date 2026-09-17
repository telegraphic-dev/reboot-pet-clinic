Feature: Reception can maintain veterinarians
  Reception staff keep a directory of veterinarians and their specialties
  so the practice's clinical team is visible in one place.

  Background:
    Given the backend test application is up
    And "reception" is an authenticated user

  Scenario: Add a veterinarian with specialties
    When "reception" does an `add_veterinarian` with `first_name="Maya"`, `last_name="Angelou"`, and `specialties=["surgery","dentistry"]` on `Clinic` of "petclinic"
    And the resulting `veterinarian_id` is saved as "veterinarian_id"
    Then the directory includes Maya Angelou with surgery and dentistry
