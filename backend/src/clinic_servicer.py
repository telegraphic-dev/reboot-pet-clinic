from uuid import uuid4

from petclinic.v1.petclinic import OwnerCard, VeterinarianCard
from petclinic.v1.petclinic_rbt import Clinic, Owner, Veterinarian
from reboot.aio.contexts import ReaderContext, TransactionContext
from reboot.aio.auth.authorizers import allow
from reboot.std.collections.ordered_map.v1.ordered_map import OrderedMap


class ClinicServicer(Clinic.Servicer):
    def authorizer(self):
        return allow()

    async def create(self, context: TransactionContext) -> None:
        if context.constructor:
            self.state.owner_index_id = str(uuid4())
            self.state.veterinarian_index_id = str(uuid4())
            await OrderedMap.ref(self.state.owner_index_id).create(context)
            await OrderedMap.ref(self.state.veterinarian_index_id).create(context)

    async def create_owner(self, context: TransactionContext, request: Clinic.CreateOwnerRequest) -> Clinic.CreateOwnerResponse:
        owner_id = str(uuid4())
        owner, _ = await Owner.register(context, owner_id, first_name=request.first_name, last_name=request.last_name, address=request.address, city=request.city, telephone=request.telephone)
        await OrderedMap.ref(self.state.owner_index_id).insert(context, key=owner.state_id, bytes=owner.state_id.encode())
        return Clinic.CreateOwnerResponse(owner_id=owner.state_id)

    async def search_owners(self, context: ReaderContext, request: Clinic.SearchOwnersRequest) -> Clinic.SearchOwnersResponse:
        page = await OrderedMap.ref(self.state.owner_index_id).range(context, limit=request.limit or 200)
        query = request.query.casefold()
        owners: list[OwnerCard] = []
        for entry in page.entries:
            owner_id = entry.bytes.decode()
            details = await Owner.ref(owner_id).details(context)
            if details.owner is not None and (not query or query in details.owner.first_name.casefold() or query in details.owner.last_name.casefold()):
                owners.append(details.owner)
        return Clinic.SearchOwnersResponse(owners=owners)

    async def add_veterinarian(self, context: TransactionContext, request: Clinic.AddVeterinarianRequest) -> Clinic.AddVeterinarianResponse:
        veterinarian_id = str(uuid4())
        veterinarian, _ = await Veterinarian.register(context, veterinarian_id, first_name=request.first_name, last_name=request.last_name, specialties=request.specialties)
        await OrderedMap.ref(self.state.veterinarian_index_id).insert(context, key=veterinarian.state_id, bytes=veterinarian.state_id.encode())
        return Clinic.AddVeterinarianResponse(veterinarian_id=veterinarian.state_id)

    async def list_veterinarians(self, context: ReaderContext) -> Clinic.ListVeterinariansResponse:
        page = await OrderedMap.ref(self.state.veterinarian_index_id).range(context, limit=200)
        veterinarians: list[VeterinarianCard] = []
        for entry in page.entries:
            details = await Veterinarian.ref(entry.bytes.decode()).details(context)
            if details.veterinarian is not None:
                veterinarians.append(details.veterinarian)
        return Clinic.ListVeterinariansResponse(veterinarians=veterinarians)
