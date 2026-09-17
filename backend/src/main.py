import asyncio

from clinic_servicer import ClinicServicer
from owner_servicer import OwnerServicer
from petclinic.v1.petclinic_rbt import Clinic
from reboot.aio.applications import Application
from reboot.aio.external import InitializeContext
from reboot.std.collections.ordered_map.v1.ordered_map import ordered_map_library
from veterinarian_servicer import VeterinarianServicer
from pet_servicer import PetServicer

CLINIC_ID = "petclinic"


async def initialize(context: InitializeContext) -> None:
    clinic, _ = await Clinic.create(context, CLINIC_ID)
    await clinic.idempotently("seed-james").add_veterinarian(
        context, first_name="James", last_name="Carter", specialties=[]
    )
    await clinic.idempotently("seed-helen").add_veterinarian(
        context, first_name="Helen", last_name="Leary", specialties=["radiology"]
    )
    await clinic.idempotently("seed-linda").add_veterinarian(
        context, first_name="Linda", last_name="Douglas", specialties=["dentistry", "surgery"]
    )


async def main() -> None:
    await Application(
        servicers=[ClinicServicer, OwnerServicer, PetServicer, VeterinarianServicer],
        libraries=[ordered_map_library()],
        initialize=initialize,
    ).run()


if __name__ == "__main__":
    asyncio.run(main())
