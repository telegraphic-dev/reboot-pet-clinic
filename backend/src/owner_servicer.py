from uuid import uuid4

from petclinic.v1.petclinic import OwnerCard, PetCard
from petclinic.v1.petclinic_rbt import Owner, Pet
from reboot.aio.contexts import ReaderContext, TransactionContext, WriterContext
from reboot.aio.auth.authorizers import allow_if, has_verified_token, is_app_internal
from reboot.std.collections.ordered_map.v1.ordered_map import OrderedMap


class OwnerServicer(Owner.Servicer):
    def authorizer(self):
        return allow_if(any=[is_app_internal, has_verified_token])

    async def register(self, context: TransactionContext, request: Owner.RegisterRequest) -> None:
        if context.constructor:
            self.state.first_name = request.first_name
            self.state.last_name = request.last_name
            self.state.address = request.address
            self.state.city = request.city
            self.state.telephone = request.telephone
            self.state.pet_index_id = str(uuid4())
            await OrderedMap.ref(self.state.pet_index_id).create(context)

    async def update(self, context: WriterContext, request: Owner.UpdateRequest) -> None:
        self.state.first_name = request.first_name
        self.state.last_name = request.last_name
        self.state.address = request.address
        self.state.city = request.city
        self.state.telephone = request.telephone

    async def add_pet(self, context: TransactionContext, request: Owner.AddPetRequest) -> Owner.AddPetResponse:
        pet_id = str(uuid4())
        pet, _ = await Pet.register(context, pet_id, owner_id=self.ref().state_id, name=request.name, pet_type=request.pet_type, birthday=request.birthday)
        await OrderedMap.ref(self.state.pet_index_id).insert(context, key=pet.state_id, bytes=pet.state_id.encode())
        return Owner.AddPetResponse(pet_id=pet.state_id)

    async def details(self, context: ReaderContext) -> Owner.DetailsResponse:
        page = await OrderedMap.ref(self.state.pet_index_id).range(context, limit=200)
        pets: list[PetCard] = []
        for entry in page.entries:
            details = await Pet.ref(entry.bytes.decode()).details(context)
            if details.pet is not None:
                pets.append(details.pet)
        return Owner.DetailsResponse(owner=OwnerCard(owner_id=self.ref().state_id, first_name=self.state.first_name, last_name=self.state.last_name, phone=self.state.telephone), address=self.state.address, city=self.state.city, pets=pets)
