from petclinic.v1.petclinic import VeterinarianCard
from petclinic.v1.petclinic_rbt import Veterinarian
from reboot.aio.contexts import ReaderContext, WriterContext
from reboot.aio.auth.authorizers import allow


class VeterinarianServicer(Veterinarian.Servicer):
    def authorizer(self):
        return allow()

    async def register(self, context: WriterContext, request: Veterinarian.RegisterRequest) -> None:
        if context.constructor:
            self.state.first_name = request.first_name
            self.state.last_name = request.last_name
            self.state.specialties = request.specialties

    async def update(self, context: WriterContext, request: Veterinarian.UpdateRequest) -> None:
        self.state.first_name = request.first_name
        self.state.last_name = request.last_name
        self.state.specialties = request.specialties

    async def details(self, context: ReaderContext) -> Veterinarian.DetailsResponse:
        return Veterinarian.DetailsResponse(veterinarian=VeterinarianCard(veterinarian_id=self.ref().state_id, first_name=self.state.first_name, last_name=self.state.last_name, specialties=self.state.specialties))
