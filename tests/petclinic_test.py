import pytest

from clinic_servicer import ClinicServicer
from main import initialize
from owner_servicer import OwnerServicer
from pet_servicer import PetServicer
from petclinic.v1.petclinic_rbt import Clinic, Owner, Pet
from reboot.aio.applications import Application
from reboot.aio.tests import Reboot
from reboot.bdd import given, scenarios, then
from reboot.bdd.fixtures import World
from reboot.bdd.registry import client_types_by_name
from reboot.std.collections.ordered_map.v1.ordered_map import ordered_map_library
from veterinarian_servicer import VeterinarianServicer


@pytest.fixture
def application() -> Application:
    return Application(
        servicers=[ClinicServicer, OwnerServicer, PetServicer, VeterinarianServicer],
        libraries=[ordered_map_library()],
        initialize=initialize,
    )


@given("the backend test application is up")
async def backend_test_application_is_up(
    rbt: Reboot,
    world: World,
    application: Application,
    request: pytest.FixtureRequest,
) -> None:
    await rbt.up(application, servers=1, local_envoy=False)
    world.client_types = client_types_by_name(application)
    world.rbt = rbt
    world.name = request.node.name


scenarios("owners_and_pets.feature", "visit_history.feature", "veterinarians.feature")


@then("the clinic finds Ada Lovelace by name")
async def clinic_finds_ada_lovelace(world: World) -> None:
    response = await Clinic.ref("petclinic").search_owners(
        world.context("reception"), query="LOVE"
    )
    assert any(
        owner.first_name == "Ada" and owner.last_name == "Lovelace" and owner.phone == "123"
        for owner in response.owners
    )


@then("the saved owner has Murray the cat born on 2018-12-09")
async def saved_owner_has_murray(world: World) -> None:
    owner_id = world.saved["owner_id"]
    assert isinstance(owner_id, str)
    response = await Owner.ref(owner_id).details(world.context("reception"))
    assert any(
        pet.name == "Murray" and pet.pet_type == "cat" and pet.birthday == "2018-12-09"
        for pet in response.pets
    )


@then("the saved owner and pet retain their relationship after editing")
async def saved_owner_and_pet_retain_relationship(world: World) -> None:
    owner_id, pet_id = world.saved["owner_id"], world.saved["pet_id"]
    assert isinstance(owner_id, str) and isinstance(pet_id, str)
    owner = await Owner.ref(owner_id).details(world.context("reception"))
    pet = await Pet.ref(pet_id).details(world.context("reception"))
    assert owner.owner is not None
    assert owner.owner.last_name == "Mathison Turing" and owner.owner.phone == "790"
    assert any(card.pet_id == pet_id and card.name == "Bombe II" for card in owner.pets)
    assert pet.owner_id == owner_id and pet.pet is not None and pet.pet.birthday == "2020-06-23"


@then("the saved pet shows its annual wellness visit")
async def saved_pet_shows_annual_wellness_visit(world: World) -> None:
    owner_id, pet_id = world.saved["owner_id"], world.saved["pet_id"]
    assert isinstance(owner_id, str) and isinstance(pet_id, str)
    response = await Pet.ref(pet_id).details(world.context("reception"))
    assert response.owner_id == owner_id
    assert any(
        visit.visit_date == "2026-09-17" and visit.description == "Annual wellness examination"
        for visit in response.visits
    )


@then("the directory includes Maya Angelou with surgery and dentistry")
async def directory_includes_maya_angelou(world: World) -> None:
    response = await Clinic.ref("petclinic").list_veterinarians(world.context("reception"))
    assert any(
        veterinarian.first_name == "Maya"
        and veterinarian.last_name == "Angelou"
        and veterinarian.specialties == ["surgery", "dentistry"]
        for veterinarian in response.veterinarians
    )
