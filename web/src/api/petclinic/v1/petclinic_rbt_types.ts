import { z } from "zod/v4";
import * as reboot_api from "@reboot-dev/reboot-api";

export const OwnerCardSchema = z.object({
    ownerId: z.string().default("").meta({ tag: 1 }),
    firstName: z.string().default("").meta({ tag: 2 }),
    lastName: z.string().default("").meta({ tag: 3 }),
    phone: z.string().default("").meta({ tag: 4 }),
  });

export type OwnerCard = z.infer<typeof OwnerCardSchema>;

export const PetCardSchema = z.object({
    petId: z.string().default("").meta({ tag: 1 }),
    name: z.string().default("").meta({ tag: 2 }),
    petType: z.string().default("").meta({ tag: 3 }),
    birthday: z.string().default("").meta({ tag: 4 }),
  });

export type PetCard = z.infer<typeof PetCardSchema>;

export const VisitRecordSchema = z.object({
    visitDate: z.string().default("").meta({ tag: 1 }),
    description: z.string().default("").meta({ tag: 2 }),
  });

export type VisitRecord = z.infer<typeof VisitRecordSchema>;

export const VeterinarianCardSchema = z.object({
    veterinarianId: z.string().default("").meta({ tag: 1 }),
    firstName: z.string().default("").meta({ tag: 2 }),
    lastName: z.string().default("").meta({ tag: 3 }),
    specialties: z.array(z.string()).default(reboot_api.EMPTY_ARRAY).meta({ tag: 4 }),
  });

export type VeterinarianCard = z.infer<typeof VeterinarianCardSchema>;

export const ClinicStateSchema = z.object({
    ownerIndexId: z.string().default("").meta({ tag: 1 }),
    veterinarianIndexId: z.string().default("").meta({ tag: 2 }),
  });

export type ClinicState = z.infer<typeof ClinicStateSchema>;

export const CreateOwnerRequestSchema = z.object({
    firstName: z.string().default("").meta({ tag: 1 }),
    lastName: z.string().default("").meta({ tag: 2 }),
    address: z.string().default("").meta({ tag: 3 }),
    city: z.string().default("").meta({ tag: 4 }),
    telephone: z.string().default("").meta({ tag: 5 }),
  });

export type CreateOwnerRequest = z.infer<typeof CreateOwnerRequestSchema>;

export const CreateOwnerResponseSchema = z.object({
    ownerId: z.string().default("").meta({ tag: 1 }),
  });

export type CreateOwnerResponse = z.infer<typeof CreateOwnerResponseSchema>;

export const SearchOwnersRequestSchema = z.object({
    query: z.string().default("").meta({ tag: 1 }),
    limit: z.number().default(0).meta({ tag: 2 }),
  });

export type SearchOwnersRequest = z.infer<typeof SearchOwnersRequestSchema>;

export const SearchOwnersResponseSchema = z.object({
    owners: z.array(z.object({
    ownerId: z.string().default("").meta({ tag: 1 }),
    firstName: z.string().default("").meta({ tag: 2 }),
    lastName: z.string().default("").meta({ tag: 3 }),
    phone: z.string().default("").meta({ tag: 4 }),
  })).default(reboot_api.EMPTY_ARRAY).meta({ tag: 1 }),
  });

export type SearchOwnersResponse = z.infer<typeof SearchOwnersResponseSchema>;

export const AddVeterinarianRequestSchema = z.object({
    firstName: z.string().default("").meta({ tag: 1 }),
    lastName: z.string().default("").meta({ tag: 2 }),
    specialties: z.array(z.string()).default(reboot_api.EMPTY_ARRAY).meta({ tag: 3 }),
  });

export type AddVeterinarianRequest = z.infer<typeof AddVeterinarianRequestSchema>;

export const AddVeterinarianResponseSchema = z.object({
    veterinarianId: z.string().default("").meta({ tag: 1 }),
  });

export type AddVeterinarianResponse = z.infer<typeof AddVeterinarianResponseSchema>;

export const ListVeterinariansResponseSchema = z.object({
    veterinarians: z.array(z.object({
    veterinarianId: z.string().default("").meta({ tag: 1 }),
    firstName: z.string().default("").meta({ tag: 2 }),
    lastName: z.string().default("").meta({ tag: 3 }),
    specialties: z.array(z.string()).default(reboot_api.EMPTY_ARRAY).meta({ tag: 4 }),
  })).default(reboot_api.EMPTY_ARRAY).meta({ tag: 1 }),
  });

export type ListVeterinariansResponse = z.infer<typeof ListVeterinariansResponseSchema>;

export const OwnerStateSchema = z.object({
    firstName: z.string().default("").meta({ tag: 1 }),
    lastName: z.string().default("").meta({ tag: 2 }),
    address: z.string().default("").meta({ tag: 3 }),
    city: z.string().default("").meta({ tag: 4 }),
    telephone: z.string().default("").meta({ tag: 5 }),
    petIndexId: z.string().default("").meta({ tag: 6 }),
  });

export type OwnerState = z.infer<typeof OwnerStateSchema>;

export const UpdateOwnerRequestSchema = z.object({
    firstName: z.string().default("").meta({ tag: 1 }),
    lastName: z.string().default("").meta({ tag: 2 }),
    address: z.string().default("").meta({ tag: 3 }),
    city: z.string().default("").meta({ tag: 4 }),
    telephone: z.string().default("").meta({ tag: 5 }),
  });

export type UpdateOwnerRequest = z.infer<typeof UpdateOwnerRequestSchema>;

export const AddPetRequestSchema = z.object({
    name: z.string().default("").meta({ tag: 1 }),
    petType: z.string().default("").meta({ tag: 2 }),
    birthday: z.string().default("").meta({ tag: 3 }),
  });

export type AddPetRequest = z.infer<typeof AddPetRequestSchema>;

export const AddPetResponseSchema = z.object({
    petId: z.string().default("").meta({ tag: 1 }),
  });

export type AddPetResponse = z.infer<typeof AddPetResponseSchema>;

export const RegisterPetRequestSchema = z.object({
    ownerId: z.string().default("").meta({ tag: 1 }),
    name: z.string().default("").meta({ tag: 2 }),
    petType: z.string().default("").meta({ tag: 3 }),
    birthday: z.string().default("").meta({ tag: 4 }),
  });

export type RegisterPetRequest = z.infer<typeof RegisterPetRequestSchema>;

export const OwnerDetailsResponseSchema = z.object({
    owner: z.object({
    ownerId: z.string().default("").meta({ tag: 1 }),
    firstName: z.string().default("").meta({ tag: 2 }),
    lastName: z.string().default("").meta({ tag: 3 }),
    phone: z.string().default("").meta({ tag: 4 }),
  }).optional().meta({ tag: 1 }),
    address: z.string().default("").meta({ tag: 2 }),
    city: z.string().default("").meta({ tag: 3 }),
    pets: z.array(z.object({
    petId: z.string().default("").meta({ tag: 1 }),
    name: z.string().default("").meta({ tag: 2 }),
    petType: z.string().default("").meta({ tag: 3 }),
    birthday: z.string().default("").meta({ tag: 4 }),
  })).default(reboot_api.EMPTY_ARRAY).meta({ tag: 4 }),
  });

export type OwnerDetailsResponse = z.infer<typeof OwnerDetailsResponseSchema>;

export const PetStateSchema = z.object({
    ownerId: z.string().default("").meta({ tag: 1 }),
    name: z.string().default("").meta({ tag: 2 }),
    petType: z.string().default("").meta({ tag: 3 }),
    birthday: z.string().default("").meta({ tag: 4 }),
    visits: z.array(z.object({
    visitDate: z.string().default("").meta({ tag: 1 }),
    description: z.string().default("").meta({ tag: 2 }),
  })).default(reboot_api.EMPTY_ARRAY).meta({ tag: 5 }),
  });

export type PetState = z.infer<typeof PetStateSchema>;

export const UpdatePetRequestSchema = z.object({
    name: z.string().default("").meta({ tag: 1 }),
    petType: z.string().default("").meta({ tag: 2 }),
    birthday: z.string().default("").meta({ tag: 3 }),
  });

export type UpdatePetRequest = z.infer<typeof UpdatePetRequestSchema>;

export const RecordVisitRequestSchema = z.object({
    visitDate: z.string().default("").meta({ tag: 1 }),
    description: z.string().default("").meta({ tag: 2 }),
  });

export type RecordVisitRequest = z.infer<typeof RecordVisitRequestSchema>;

export const PetDetailsResponseSchema = z.object({
    pet: z.object({
    petId: z.string().default("").meta({ tag: 1 }),
    name: z.string().default("").meta({ tag: 2 }),
    petType: z.string().default("").meta({ tag: 3 }),
    birthday: z.string().default("").meta({ tag: 4 }),
  }).optional().meta({ tag: 1 }),
    ownerId: z.string().default("").meta({ tag: 2 }),
    visits: z.array(z.object({
    visitDate: z.string().default("").meta({ tag: 1 }),
    description: z.string().default("").meta({ tag: 2 }),
  })).default(reboot_api.EMPTY_ARRAY).meta({ tag: 3 }),
  });

export type PetDetailsResponse = z.infer<typeof PetDetailsResponseSchema>;

export const VeterinarianStateSchema = z.object({
    firstName: z.string().default("").meta({ tag: 1 }),
    lastName: z.string().default("").meta({ tag: 2 }),
    specialties: z.array(z.string()).default(reboot_api.EMPTY_ARRAY).meta({ tag: 3 }),
  });

export type VeterinarianState = z.infer<typeof VeterinarianStateSchema>;

export const UpdateVeterinarianRequestSchema = z.object({
    firstName: z.string().default("").meta({ tag: 1 }),
    lastName: z.string().default("").meta({ tag: 2 }),
    specialties: z.array(z.string()).default(reboot_api.EMPTY_ARRAY).meta({ tag: 3 }),
  });

export type UpdateVeterinarianRequest = z.infer<typeof UpdateVeterinarianRequestSchema>;

export const VeterinarianDetailsResponseSchema = z.object({
    veterinarian: z.object({
    veterinarianId: z.string().default("").meta({ tag: 1 }),
    firstName: z.string().default("").meta({ tag: 2 }),
    lastName: z.string().default("").meta({ tag: 3 }),
    specialties: z.array(z.string()).default(reboot_api.EMPTY_ARRAY).meta({ tag: 4 }),
  }).optional().meta({ tag: 1 }),
  });

export type VeterinarianDetailsResponse = z.infer<typeof VeterinarianDetailsResponseSchema>;

export const ClinicCreateRequestSchema = z.object({});

export type ClinicCreateRequest = z.infer<typeof ClinicCreateRequestSchema>;

export const ClinicListVeterinariansRequestSchema = z.object({});

export type ClinicListVeterinariansRequest = z.infer<typeof ClinicListVeterinariansRequestSchema>;

export const OwnerDetailsRequestSchema = z.object({});

export type OwnerDetailsRequest = z.infer<typeof OwnerDetailsRequestSchema>;

export const PetDetailsRequestSchema = z.object({});

export type PetDetailsRequest = z.infer<typeof PetDetailsRequestSchema>;

export const VeterinarianDetailsRequestSchema = z.object({});

export type VeterinarianDetailsRequest = z.infer<typeof VeterinarianDetailsRequestSchema>;

export const api = {
  Clinic: {
    state: ClinicStateSchema,
    methods: {
      create: reboot_api.transaction({
        factory: {},
        mode: reboot_api.exclusive(),
        request: ClinicCreateRequestSchema,
        response: z.void(),
      }),
      createOwner: reboot_api.transaction({
        mode: reboot_api.exclusive(),
        request: CreateOwnerRequestSchema,
        response: CreateOwnerResponseSchema,
      }),
      searchOwners: reboot_api.reader({
        request: SearchOwnersRequestSchema,
        response: SearchOwnersResponseSchema,
      }),
      addVeterinarian: reboot_api.transaction({
        mode: reboot_api.exclusive(),
        request: AddVeterinarianRequestSchema,
        response: AddVeterinarianResponseSchema,
      }),
      listVeterinarians: reboot_api.reader({
        request: ClinicListVeterinariansRequestSchema,
        response: ListVeterinariansResponseSchema,
      }),
    },
  },
  Owner: {
    state: OwnerStateSchema,
    methods: {
      register: reboot_api.transaction({
        factory: {},
        mode: reboot_api.exclusive(),
        request: CreateOwnerRequestSchema,
        response: z.void(),
      }),
      update: reboot_api.writer({
        request: UpdateOwnerRequestSchema,
        response: z.void(),
      }),
      addPet: reboot_api.transaction({
        mode: reboot_api.exclusive(),
        request: AddPetRequestSchema,
        response: AddPetResponseSchema,
      }),
      details: reboot_api.reader({
        request: OwnerDetailsRequestSchema,
        response: OwnerDetailsResponseSchema,
      }),
    },
  },
  Pet: {
    state: PetStateSchema,
    methods: {
      register: reboot_api.writer({
        factory: {},
        request: RegisterPetRequestSchema,
        response: z.void(),
      }),
      update: reboot_api.writer({
        request: UpdatePetRequestSchema,
        response: z.void(),
      }),
      recordVisit: reboot_api.writer({
        request: RecordVisitRequestSchema,
        response: z.void(),
      }),
      details: reboot_api.reader({
        request: PetDetailsRequestSchema,
        response: PetDetailsResponseSchema,
      }),
    },
  },
  Veterinarian: {
    state: VeterinarianStateSchema,
    methods: {
      register: reboot_api.writer({
        factory: {},
        request: AddVeterinarianRequestSchema,
        response: z.void(),
      }),
      update: reboot_api.writer({
        request: UpdateVeterinarianRequestSchema,
        response: z.void(),
      }),
      details: reboot_api.reader({
        request: VeterinarianDetailsRequestSchema,
        response: VeterinarianDetailsResponseSchema,
      }),
    },
  },
};
