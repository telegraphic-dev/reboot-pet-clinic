import asyncio
import os

from clinic_servicer import ClinicServicer
from owner_servicer import OwnerServicer
from petclinic.v1.petclinic_rbt import Clinic
from reboot.aio.auth.oauth import OAuth
from reboot.aio.auth.oauth_providers import Development, Google, OAuthProviderByEnvironment
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
        # `Development` supplies stable fake identities for `rbt dev`; production
        # always delegates sign-in to Google and Reboot signs the resulting
        # session tokens used by every RPC call.
        oauth=OAuth(
            provider=OAuthProviderByEnvironment(
                dev=Development(claims=["email", "email_verified", "name"]),
                prod=Google(
                    client_id=os.environ.get("GOOGLE_OAUTH_CLIENT_ID"),
                    client_secret=os.environ.get("GOOGLE_OAUTH_CLIENT_SECRET"),
                    claims=["email", "email_verified", "name"],
                ),
            ),
            allowed_origins=[],
        ),
        title="PetClinic",
    ).run()


if __name__ == "__main__":
    asyncio.run(main())
