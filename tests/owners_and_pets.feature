Feature: Reception can manage owners and their pets
  Reception staff keep each owner's contact details, find owners by name,
  and maintain the pets that belong to them so a family is visible together.

  Background:
    Given the backend test application is up
    And "reception" is an authenticated user

  Scenario: Create and find an owner
    When "reception" does a `create_owner` with `first_name="Ada"`, `last_name="Lovelace"`, `address="1 Byte Lane"`, `city="London"`, and `telephone="123"` on `Clinic` of "petclinic"
    And the resulting `owner_id` is saved as "owner_id"
    Then the clinic finds Ada Lovelace by name

  Scenario: Add a pet with its type and birthday
    When "reception" does a `create_owner` with `first_name="Grace"`, `last_name="Hopper"`, `address="2 Compiler Court"`, `city="Arlington"`, and `telephone="456"` on `Clinic` of "petclinic"
    And the resulting `owner_id` is saved as "owner_id"
    And "reception" does an `add_pet` with `name="Murray"`, `pet_type="cat"`, and `birthday="2018-12-09"` on `Owner` of "<owner_id>"
    And the resulting `pet_id` is saved as "pet_id"
    Then the saved owner has Murray the cat born on 2018-12-09

  Scenario: Edit owner and pet details
    When "reception" does a `create_owner` with `first_name="Alan"`, `last_name="Turing"`, `address="3 Logic Road"`, `city="Manchester"`, and `telephone="789"` on `Clinic` of "petclinic"
    And the resulting `owner_id` is saved as "owner_id"
    And "reception" does an `add_pet` with `name="Bombe"`, `pet_type="dog"`, and `birthday="2019-06-23"` on `Owner` of "<owner_id>"
    And the resulting `pet_id` is saved as "pet_id"
    And "reception" does an `update` with `first_name="Alan"`, `last_name="Mathison Turing"`, `address="4 Enigma Street"`, `city="Manchester"`, and `telephone="790"` on `Owner` of "<owner_id>"
    And "reception" does an `update` with `name="Bombe II"`, `pet_type="dog"`, and `birthday="2020-06-23"` on `Pet` of "<pet_id>"
    Then the saved owner and pet retain their relationship after editing
