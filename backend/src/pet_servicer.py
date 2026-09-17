from petclinic.v1.petclinic import PetCard, VisitRecord
from petclinic.v1.petclinic_rbt import Pet
from reboot.aio.contexts import ReaderContext, WriterContext
from reboot.aio.auth.authorizers import allow_if, has_verified_token, is_app_internal


class PetServicer(Pet.Servicer):
    def authorizer(self):
        return allow_if(any=[is_app_internal, has_verified_token])

    async def register(self, context: WriterContext, request: Pet.RegisterRequest) -> None:
        if context.constructor:
            self.state.owner_id = request.owner_id
            self.state.name = request.name
            self.state.pet_type = request.pet_type
            self.state.birthday = request.birthday

    async def update(self, context: WriterContext, request: Pet.UpdateRequest) -> None:
        self.state.name = request.name
        self.state.pet_type = request.pet_type
        self.state.birthday = request.birthday

    async def record_visit(self, context: WriterContext, request: Pet.RecordVisitRequest) -> None:
        self.state.visits.append(VisitRecord(visit_date=request.visit_date, description=request.description))

    async def details(self, context: ReaderContext) -> Pet.DetailsResponse:
        return Pet.DetailsResponse(pet=PetCard(pet_id=self.ref().state_id, name=self.state.name, pet_type=self.state.pet_type, birthday=self.state.birthday), owner_id=self.state.owner_id, visits=self.state.visits)
