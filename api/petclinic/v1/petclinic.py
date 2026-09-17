from reboot.api import API, Exclusive, Field, Methods, Model, Reader, Transaction, Type, Writer


class OwnerCard(Model):
    owner_id: str = Field(tag=1, default="", description="The durable identifier of this owner.")
    first_name: str = Field(tag=2, default="", description="The owner's given name.")
    last_name: str = Field(tag=3, default="", description="The owner's family name.")
    phone: str = Field(tag=4, default="", description="The telephone number used to contact the owner.")


class PetCard(Model):
    pet_id: str = Field(tag=1, default="", description="The durable identifier of this pet.")
    name: str = Field(tag=2, default="", description="The pet's name.")
    pet_type: str = Field(tag=3, default="", description="The category of animal, such as dog or cat.")
    birthday: str = Field(tag=4, default="", description="The pet's birthday in ISO YYYY-MM-DD form.")


class VisitRecord(Model):
    visit_date: str = Field(tag=1, default="", description="The visit date in ISO YYYY-MM-DD form.")
    description: str = Field(tag=2, default="", description="The clinician's short description of the visit.")


class VeterinarianCard(Model):
    veterinarian_id: str = Field(tag=1, default="", description="The durable identifier of this veterinarian.")
    first_name: str = Field(tag=2, default="", description="The veterinarian's given name.")
    last_name: str = Field(tag=3, default="", description="The veterinarian's family name.")
    specialties: list[str] = Field(tag=4, default_factory=list, description="The veterinary specialties practiced by this veterinarian.")


class ClinicState(Model):
    owner_index_id: str = Field(tag=1, default="", description="The durable ordered index of all owner identifiers.")
    veterinarian_index_id: str = Field(tag=2, default="", description="The durable ordered index of all veterinarian identifiers.")


class CreateOwnerRequest(Model):
    first_name: str = Field(tag=1, default="", description="The owner's given name.")
    last_name: str = Field(tag=2, default="", description="The owner's family name.")
    address: str = Field(tag=3, default="", description="The owner's street address.")
    city: str = Field(tag=4, default="", description="The city in the owner's contact address.")
    telephone: str = Field(tag=5, default="", description="The telephone number for the owner.")


class CreateOwnerResponse(Model):
    owner_id: str = Field(tag=1, default="", description="The identifier assigned to the newly created owner.")


class SearchOwnersRequest(Model):
    query: str = Field(tag=1, default="", description="A case-insensitive fragment of an owner's first or last name.")
    limit: int = Field(tag=2, default=0, description="The maximum number of owners to return; zero uses the clinic default.")


class SearchOwnersResponse(Model):
    owners: list[OwnerCard] = Field(tag=1, default_factory=list, description="Owners matching the requested name fragment.")


class AddVeterinarianRequest(Model):
    first_name: str = Field(tag=1, default="", description="The veterinarian's given name.")
    last_name: str = Field(tag=2, default="", description="The veterinarian's family name.")
    specialties: list[str] = Field(tag=3, default_factory=list, description="The specialties to record for the veterinarian.")


class AddVeterinarianResponse(Model):
    veterinarian_id: str = Field(tag=1, default="", description="The identifier assigned to the newly added veterinarian.")


class ListVeterinariansResponse(Model):
    veterinarians: list[VeterinarianCard] = Field(tag=1, default_factory=list, description="The clinic's veterinarians in directory order.")


class OwnerState(Model):
    first_name: str = Field(tag=1, default="", description="The owner's given name.")
    last_name: str = Field(tag=2, default="", description="The owner's family name.")
    address: str = Field(tag=3, default="", description="The owner's street address.")
    city: str = Field(tag=4, default="", description="The city in the owner's contact address.")
    telephone: str = Field(tag=5, default="", description="The telephone number for the owner.")
    pet_index_id: str = Field(tag=6, default="", description="The durable ordered index of pets belonging to this owner.")


class UpdateOwnerRequest(Model):
    first_name: str = Field(tag=1, default="", description="The replacement given name.")
    last_name: str = Field(tag=2, default="", description="The replacement family name.")
    address: str = Field(tag=3, default="", description="The replacement street address.")
    city: str = Field(tag=4, default="", description="The replacement city.")
    telephone: str = Field(tag=5, default="", description="The replacement telephone number.")


class AddPetRequest(Model):
    name: str = Field(tag=1, default="", description="The pet's name.")
    pet_type: str = Field(tag=2, default="", description="The pet's category, such as dog or cat.")
    birthday: str = Field(tag=3, default="", description="The pet's birthday in ISO YYYY-MM-DD form.")


class AddPetResponse(Model):
    pet_id: str = Field(tag=1, default="", description="The identifier assigned to the newly added pet.")


class RegisterPetRequest(Model):
    owner_id: str = Field(tag=1, default="", description="The identifier of the owner registering this pet.")
    name: str = Field(tag=2, default="", description="The pet's name.")
    pet_type: str = Field(tag=3, default="", description="The pet's category, such as dog or cat.")
    birthday: str = Field(tag=4, default="", description="The pet's birthday in ISO YYYY-MM-DD form.")


class OwnerDetailsResponse(Model):
    owner: OwnerCard | None = Field(tag=1, default=None, description="The owner's identifying contact details.")
    address: str = Field(tag=2, default="", description="The owner's street address.")
    city: str = Field(tag=3, default="", description="The owner's city.")
    pets: list[PetCard] = Field(tag=4, default_factory=list, description="The pets belonging to this owner.")


class PetState(Model):
    owner_id: str = Field(tag=1, default="", description="The identifier of the owner who registered this pet.")
    name: str = Field(tag=2, default="", description="The pet's name.")
    pet_type: str = Field(tag=3, default="", description="The pet's category, such as dog or cat.")
    birthday: str = Field(tag=4, default="", description="The pet's birthday in ISO YYYY-MM-DD form.")
    visits: list[VisitRecord] = Field(tag=5, default_factory=list, description="The pet's visit history, oldest first.")


class UpdatePetRequest(Model):
    name: str = Field(tag=1, default="", description="The replacement pet name.")
    pet_type: str = Field(tag=2, default="", description="The replacement pet category.")
    birthday: str = Field(tag=3, default="", description="The replacement birthday in ISO YYYY-MM-DD form.")


class RecordVisitRequest(Model):
    visit_date: str = Field(tag=1, default="", description="The visit date in ISO YYYY-MM-DD form.")
    description: str = Field(tag=2, default="", description="The clinical description of the visit.")


class PetDetailsResponse(Model):
    pet: PetCard | None = Field(tag=1, default=None, description="The pet's identifying details.")
    owner_id: str = Field(tag=2, default="", description="The identifier of the pet's owner.")
    visits: list[VisitRecord] = Field(tag=3, default_factory=list, description="The recorded visits for this pet, oldest first.")


class VeterinarianState(Model):
    first_name: str = Field(tag=1, default="", description="The veterinarian's given name.")
    last_name: str = Field(tag=2, default="", description="The veterinarian's family name.")
    specialties: list[str] = Field(tag=3, default_factory=list, description="The specialties practiced by this veterinarian.")


class UpdateVeterinarianRequest(Model):
    first_name: str = Field(tag=1, default="", description="The replacement given name.")
    last_name: str = Field(tag=2, default="", description="The replacement family name.")
    specialties: list[str] = Field(tag=3, default_factory=list, description="The replacement specialties.")


class VeterinarianDetailsResponse(Model):
    veterinarian: VeterinarianCard | None = Field(tag=1, default=None, description="The veterinarian's directory details.")


api = API(
    Clinic=Type(state=ClinicState, methods=Methods(
        create=Transaction(mode=Exclusive(), request=None, response=None, factory=True, description="Create the singleton clinic and its durable directory indexes.", mcp=None),
        create_owner=Transaction(mode=Exclusive(), request=CreateOwnerRequest, response=CreateOwnerResponse, description="Create an owner and add it to the clinic directory.", mcp=None),
        search_owners=Reader(request=SearchOwnersRequest, response=SearchOwnersResponse, description="Find owners by a case-insensitive name fragment.", mcp=None),
        add_veterinarian=Transaction(mode=Exclusive(), request=AddVeterinarianRequest, response=AddVeterinarianResponse, description="Add a veterinarian to the clinic directory.", mcp=None),
        list_veterinarians=Reader(request=None, response=ListVeterinariansResponse, description="List the clinic's veterinarians and specialties.", mcp=None),
    ), description="The singleton practice catalog that owns the owner and veterinarian directories."),
    Owner=Type(state=OwnerState, methods=Methods(
        register=Transaction(mode=Exclusive(), request=CreateOwnerRequest, response=None, factory=True, description="Create one owner with contact details and an empty pet index.", mcp=None),
        update=Writer(request=UpdateOwnerRequest, response=None, description="Replace an owner's contact details.", mcp=None),
        add_pet=Transaction(mode=Exclusive(), request=AddPetRequest, response=AddPetResponse, description="Register a pet for this owner.", mcp=None),
        details=Reader(request=None, response=OwnerDetailsResponse, description="Read owner contact details and the owner's pets.", mcp=None),
    ), description="One pet owner and the durable relationship to that owner's pets."),
    Pet=Type(state=PetState, methods=Methods(
        register=Writer(request=RegisterPetRequest, response=None, factory=True, description="Create one pet with its type and birthday.", mcp=None),
        update=Writer(request=UpdatePetRequest, response=None, description="Replace a pet's identity details.", mcp=None),
        record_visit=Writer(request=RecordVisitRequest, response=None, description="Append a dated clinical visit to this pet's history.", mcp=None),
        details=Reader(request=None, response=PetDetailsResponse, description="Read a pet and its visit history.", mcp=None),
    ), description="One pet, including its owner link and clinical visit history."),
    Veterinarian=Type(state=VeterinarianState, methods=Methods(
        register=Writer(request=AddVeterinarianRequest, response=None, factory=True, description="Create one veterinarian with specialties.", mcp=None),
        update=Writer(request=UpdateVeterinarianRequest, response=None, description="Replace a veterinarian's directory details.", mcp=None),
        details=Reader(request=None, response=VeterinarianDetailsResponse, description="Read a veterinarian's directory details.", mcp=None),
    ), description="One veterinarian and the specialties recorded for that clinician."),
)
