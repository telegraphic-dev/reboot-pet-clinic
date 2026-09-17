/* eslint-disable */
// @ts-nocheck

import {
  Empty, 
	Struct, 
	Value, 
	ListValue
} from "@bufbuild/protobuf";
import * as reboot_api from "@reboot-dev/reboot-api";
import * as reboot_web from "@reboot-dev/reboot-web";
import { v4 as uuidv4 } from "uuid";
// NOTE NOTE NOTE
//
// If you are reading this comment because you are trying to debug
// the error:
//
// Module not found: Error: Can't resolve './petclinic_pb.js'
//
// You can resolve this by passing --web-extensions to `rbt
// generate` (or better put it in your `.rbtrc` file).
//
// This is a known issue if you're using `webpack` which uses
// `ts-loader` (https://github.com/TypeStrong/ts-loader/issues/465).
import {
  Clinic as ClinicProto,
  Owner as OwnerProto,
  Pet as PetProto,
  Veterinarian as VeterinarianProto,
} from "./petclinic_pb";
import * as petclinic_pb from "./petclinic_pb";

import * as protobuf_es from "@bufbuild/protobuf";

reboot_api.check_bufbuild_protobuf_library(protobuf_es.Message);


import { z } from "zod/v4";
import { api } from "./petclinic_rbt_types";

const ERROR_TYPES = [
  // gRPC errors.
  reboot_api.errors_pb.Cancelled,
  reboot_api.errors_pb.Unknown,
  reboot_api.errors_pb.InvalidArgument,
  reboot_api.errors_pb.DeadlineExceeded,
  reboot_api.errors_pb.NotFound,
  reboot_api.errors_pb.AlreadyExists,
  reboot_api.errors_pb.PermissionDenied,
  reboot_api.errors_pb.ResourceExhausted,
  reboot_api.errors_pb.FailedPrecondition,
  reboot_api.errors_pb.Aborted,
  reboot_api.errors_pb.OutOfRange,
  reboot_api.errors_pb.Unimplemented,
  reboot_api.errors_pb.Internal,
  reboot_api.errors_pb.Unavailable,
  reboot_api.errors_pb.DataLoss,
  reboot_api.errors_pb.Unauthenticated,
  // Reboot errors.
  //
  // NOTE: also add any new errors into `rbt/v1alpha1/index.ts`.
  reboot_api.errors_pb.StateAlreadyConstructed,
  reboot_api.errors_pb.StateNotConstructed,
  reboot_api.errors_pb.TransactionParticipantFailedToPrepare,
  reboot_api.errors_pb.TransactionParticipantFailedToCommit,
  reboot_api.errors_pb.UnknownService,
  reboot_api.errors_pb.UnknownTask,
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!


// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a protobuf shape.
const ClinicCreateRequestFromProtobufShape = (
  partialRequest: protobuf_es.PartialMessage<Empty>
): Clinic.CreateRequest => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const request = partialRequest instanceof Empty
    ? partialRequest
    : Empty.fromJson(partialRequest);

  return reboot_api.validate(
    "Clinic.methods.create.request",
    api.Clinic.methods.create.request,
    reboot_api.protoToZod(
      api.Clinic.methods.create.request,
      request
    )
  );
};

// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a JSON string.
const ClinicCreateRequestFromJsonString = (
  jsonRequest: string
): Clinic.CreateRequest => {
  return ClinicCreateRequestFromProtobufShape(
    Empty.fromJsonString(jsonRequest)
  );
};

// Helper for getting a protobuf instance for a request from the
// expected shape, i.e., either a Zod shape or a protobuf shape.
const ClinicCreateRequestToProtobuf = (
  partialRequest?: Clinic.PartialCreateRequest
): Empty => {
  return partialRequest instanceof Empty
    ? partialRequest
    : new Empty().fromJson(
      reboot_api.zodToProtoJson(
        api.Clinic.methods.create.request,
        reboot_api.validate(
          "Clinic.methods.create.request",
          api.Clinic.methods.create.request,
          partialRequest || {}
        )
      )
    );
};

const ClinicCreateResponseFromProtobufShape = (
  partialResponse: protobuf_es.PartialMessage<Empty>
) => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const response = partialResponse instanceof Empty
    ? partialResponse
    : Empty.fromJson(partialResponse);

  return reboot_api.validate(
    "Clinic.methods.create.response",
    api.Clinic.methods.create.response,
    reboot_api.protoToZod(
      api.Clinic.methods.create.response,
      response
    )
  );
};

const ClinicCreateResponseToProtobuf = (
  partialResponse?: Clinic.PartialCreateResponse
): Empty => {
  return partialResponse instanceof Empty
    ? partialResponse
    : new Empty().fromJson(
      reboot_api.zodToProtoJson(
        api.Clinic.methods.create.response,
        reboot_api.validate(
          "Clinic.methods.create.response",
          api.Clinic.methods.create.response,
          partialResponse
        )
      )
    );
};


// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a protobuf shape.
const ClinicCreateOwnerRequestFromProtobufShape = (
  partialRequest: protobuf_es.PartialMessage<petclinic_pb.ClinicCreateOwnerRequest>
): Clinic.CreateOwnerRequest => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const request = partialRequest instanceof petclinic_pb.ClinicCreateOwnerRequest
    ? partialRequest
    : petclinic_pb.ClinicCreateOwnerRequest.fromJson(partialRequest);

  return reboot_api.validate(
    "Clinic.methods.createOwner.request",
    api.Clinic.methods.createOwner.request,
    reboot_api.protoToZod(
      api.Clinic.methods.createOwner.request,
      request
    )
  );
};

// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a JSON string.
const ClinicCreateOwnerRequestFromJsonString = (
  jsonRequest: string
): Clinic.CreateOwnerRequest => {
  return ClinicCreateOwnerRequestFromProtobufShape(
    petclinic_pb.ClinicCreateOwnerRequest.fromJsonString(jsonRequest)
  );
};

// Helper for getting a protobuf instance for a request from the
// expected shape, i.e., either a Zod shape or a protobuf shape.
const ClinicCreateOwnerRequestToProtobuf = (
  partialRequest?: Clinic.PartialCreateOwnerRequest
): petclinic_pb.ClinicCreateOwnerRequest => {
  return partialRequest instanceof petclinic_pb.ClinicCreateOwnerRequest
    ? partialRequest
    : new petclinic_pb.ClinicCreateOwnerRequest().fromJson(
      reboot_api.zodToProtoJson(
        api.Clinic.methods.createOwner.request,
        reboot_api.validate(
          "Clinic.methods.createOwner.request",
          api.Clinic.methods.createOwner.request,
          partialRequest || {}
        )
      )
    );
};

const ClinicCreateOwnerResponseFromProtobufShape = (
  partialResponse: protobuf_es.PartialMessage<petclinic_pb.ClinicCreateOwnerResponse>
) => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const response = partialResponse instanceof petclinic_pb.ClinicCreateOwnerResponse
    ? partialResponse
    : petclinic_pb.ClinicCreateOwnerResponse.fromJson(partialResponse);

  return reboot_api.validate(
    "Clinic.methods.createOwner.response",
    api.Clinic.methods.createOwner.response,
    reboot_api.protoToZod(
      api.Clinic.methods.createOwner.response,
      response
    )
  );
};

const ClinicCreateOwnerResponseToProtobuf = (
  partialResponse?: Clinic.PartialCreateOwnerResponse
): petclinic_pb.ClinicCreateOwnerResponse => {
  return partialResponse instanceof petclinic_pb.ClinicCreateOwnerResponse
    ? partialResponse
    : new petclinic_pb.ClinicCreateOwnerResponse().fromJson(
      reboot_api.zodToProtoJson(
        api.Clinic.methods.createOwner.response,
        reboot_api.validate(
          "Clinic.methods.createOwner.response",
          api.Clinic.methods.createOwner.response,
          partialResponse
        )
      )
    );
};


// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a protobuf shape.
const ClinicSearchOwnersRequestFromProtobufShape = (
  partialRequest: protobuf_es.PartialMessage<petclinic_pb.ClinicSearchOwnersRequest>
): Clinic.SearchOwnersRequest => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const request = partialRequest instanceof petclinic_pb.ClinicSearchOwnersRequest
    ? partialRequest
    : petclinic_pb.ClinicSearchOwnersRequest.fromJson(partialRequest);

  return reboot_api.validate(
    "Clinic.methods.searchOwners.request",
    api.Clinic.methods.searchOwners.request,
    reboot_api.protoToZod(
      api.Clinic.methods.searchOwners.request,
      request
    )
  );
};

// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a JSON string.
const ClinicSearchOwnersRequestFromJsonString = (
  jsonRequest: string
): Clinic.SearchOwnersRequest => {
  return ClinicSearchOwnersRequestFromProtobufShape(
    petclinic_pb.ClinicSearchOwnersRequest.fromJsonString(jsonRequest)
  );
};

// Helper for getting a protobuf instance for a request from the
// expected shape, i.e., either a Zod shape or a protobuf shape.
const ClinicSearchOwnersRequestToProtobuf = (
  partialRequest?: Clinic.PartialSearchOwnersRequest
): petclinic_pb.ClinicSearchOwnersRequest => {
  return partialRequest instanceof petclinic_pb.ClinicSearchOwnersRequest
    ? partialRequest
    : new petclinic_pb.ClinicSearchOwnersRequest().fromJson(
      reboot_api.zodToProtoJson(
        api.Clinic.methods.searchOwners.request,
        reboot_api.validate(
          "Clinic.methods.searchOwners.request",
          api.Clinic.methods.searchOwners.request,
          partialRequest || {}
        )
      )
    );
};

const ClinicSearchOwnersResponseFromProtobufShape = (
  partialResponse: protobuf_es.PartialMessage<petclinic_pb.ClinicSearchOwnersResponse>
) => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const response = partialResponse instanceof petclinic_pb.ClinicSearchOwnersResponse
    ? partialResponse
    : petclinic_pb.ClinicSearchOwnersResponse.fromJson(partialResponse);

  return reboot_api.validate(
    "Clinic.methods.searchOwners.response",
    api.Clinic.methods.searchOwners.response,
    reboot_api.protoToZod(
      api.Clinic.methods.searchOwners.response,
      response
    )
  );
};

const ClinicSearchOwnersResponseToProtobuf = (
  partialResponse?: Clinic.PartialSearchOwnersResponse
): petclinic_pb.ClinicSearchOwnersResponse => {
  return partialResponse instanceof petclinic_pb.ClinicSearchOwnersResponse
    ? partialResponse
    : new petclinic_pb.ClinicSearchOwnersResponse().fromJson(
      reboot_api.zodToProtoJson(
        api.Clinic.methods.searchOwners.response,
        reboot_api.validate(
          "Clinic.methods.searchOwners.response",
          api.Clinic.methods.searchOwners.response,
          partialResponse
        )
      )
    );
};


// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a protobuf shape.
const ClinicAddVeterinarianRequestFromProtobufShape = (
  partialRequest: protobuf_es.PartialMessage<petclinic_pb.ClinicAddVeterinarianRequest>
): Clinic.AddVeterinarianRequest => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const request = partialRequest instanceof petclinic_pb.ClinicAddVeterinarianRequest
    ? partialRequest
    : petclinic_pb.ClinicAddVeterinarianRequest.fromJson(partialRequest);

  return reboot_api.validate(
    "Clinic.methods.addVeterinarian.request",
    api.Clinic.methods.addVeterinarian.request,
    reboot_api.protoToZod(
      api.Clinic.methods.addVeterinarian.request,
      request
    )
  );
};

// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a JSON string.
const ClinicAddVeterinarianRequestFromJsonString = (
  jsonRequest: string
): Clinic.AddVeterinarianRequest => {
  return ClinicAddVeterinarianRequestFromProtobufShape(
    petclinic_pb.ClinicAddVeterinarianRequest.fromJsonString(jsonRequest)
  );
};

// Helper for getting a protobuf instance for a request from the
// expected shape, i.e., either a Zod shape or a protobuf shape.
const ClinicAddVeterinarianRequestToProtobuf = (
  partialRequest?: Clinic.PartialAddVeterinarianRequest
): petclinic_pb.ClinicAddVeterinarianRequest => {
  return partialRequest instanceof petclinic_pb.ClinicAddVeterinarianRequest
    ? partialRequest
    : new petclinic_pb.ClinicAddVeterinarianRequest().fromJson(
      reboot_api.zodToProtoJson(
        api.Clinic.methods.addVeterinarian.request,
        reboot_api.validate(
          "Clinic.methods.addVeterinarian.request",
          api.Clinic.methods.addVeterinarian.request,
          partialRequest || {}
        )
      )
    );
};

const ClinicAddVeterinarianResponseFromProtobufShape = (
  partialResponse: protobuf_es.PartialMessage<petclinic_pb.ClinicAddVeterinarianResponse>
) => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const response = partialResponse instanceof petclinic_pb.ClinicAddVeterinarianResponse
    ? partialResponse
    : petclinic_pb.ClinicAddVeterinarianResponse.fromJson(partialResponse);

  return reboot_api.validate(
    "Clinic.methods.addVeterinarian.response",
    api.Clinic.methods.addVeterinarian.response,
    reboot_api.protoToZod(
      api.Clinic.methods.addVeterinarian.response,
      response
    )
  );
};

const ClinicAddVeterinarianResponseToProtobuf = (
  partialResponse?: Clinic.PartialAddVeterinarianResponse
): petclinic_pb.ClinicAddVeterinarianResponse => {
  return partialResponse instanceof petclinic_pb.ClinicAddVeterinarianResponse
    ? partialResponse
    : new petclinic_pb.ClinicAddVeterinarianResponse().fromJson(
      reboot_api.zodToProtoJson(
        api.Clinic.methods.addVeterinarian.response,
        reboot_api.validate(
          "Clinic.methods.addVeterinarian.response",
          api.Clinic.methods.addVeterinarian.response,
          partialResponse
        )
      )
    );
};


// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a protobuf shape.
const ClinicListVeterinariansRequestFromProtobufShape = (
  partialRequest: protobuf_es.PartialMessage<Empty>
): Clinic.ListVeterinariansRequest => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const request = partialRequest instanceof Empty
    ? partialRequest
    : Empty.fromJson(partialRequest);

  return reboot_api.validate(
    "Clinic.methods.listVeterinarians.request",
    api.Clinic.methods.listVeterinarians.request,
    reboot_api.protoToZod(
      api.Clinic.methods.listVeterinarians.request,
      request
    )
  );
};

// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a JSON string.
const ClinicListVeterinariansRequestFromJsonString = (
  jsonRequest: string
): Clinic.ListVeterinariansRequest => {
  return ClinicListVeterinariansRequestFromProtobufShape(
    Empty.fromJsonString(jsonRequest)
  );
};

// Helper for getting a protobuf instance for a request from the
// expected shape, i.e., either a Zod shape or a protobuf shape.
const ClinicListVeterinariansRequestToProtobuf = (
  partialRequest?: Clinic.PartialListVeterinariansRequest
): Empty => {
  return partialRequest instanceof Empty
    ? partialRequest
    : new Empty().fromJson(
      reboot_api.zodToProtoJson(
        api.Clinic.methods.listVeterinarians.request,
        reboot_api.validate(
          "Clinic.methods.listVeterinarians.request",
          api.Clinic.methods.listVeterinarians.request,
          partialRequest || {}
        )
      )
    );
};

const ClinicListVeterinariansResponseFromProtobufShape = (
  partialResponse: protobuf_es.PartialMessage<petclinic_pb.ClinicListVeterinariansResponse>
) => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const response = partialResponse instanceof petclinic_pb.ClinicListVeterinariansResponse
    ? partialResponse
    : petclinic_pb.ClinicListVeterinariansResponse.fromJson(partialResponse);

  return reboot_api.validate(
    "Clinic.methods.listVeterinarians.response",
    api.Clinic.methods.listVeterinarians.response,
    reboot_api.protoToZod(
      api.Clinic.methods.listVeterinarians.response,
      response
    )
  );
};

const ClinicListVeterinariansResponseToProtobuf = (
  partialResponse?: Clinic.PartialListVeterinariansResponse
): petclinic_pb.ClinicListVeterinariansResponse => {
  return partialResponse instanceof petclinic_pb.ClinicListVeterinariansResponse
    ? partialResponse
    : new petclinic_pb.ClinicListVeterinariansResponse().fromJson(
      reboot_api.zodToProtoJson(
        api.Clinic.methods.listVeterinarians.response,
        reboot_api.validate(
          "Clinic.methods.listVeterinarians.response",
          api.Clinic.methods.listVeterinarians.response,
          partialResponse
        )
      )
    );
};


// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a protobuf shape.
const OwnerRegisterRequestFromProtobufShape = (
  partialRequest: protobuf_es.PartialMessage<petclinic_pb.OwnerRegisterRequest>
): Owner.RegisterRequest => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const request = partialRequest instanceof petclinic_pb.OwnerRegisterRequest
    ? partialRequest
    : petclinic_pb.OwnerRegisterRequest.fromJson(partialRequest);

  return reboot_api.validate(
    "Owner.methods.register.request",
    api.Owner.methods.register.request,
    reboot_api.protoToZod(
      api.Owner.methods.register.request,
      request
    )
  );
};

// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a JSON string.
const OwnerRegisterRequestFromJsonString = (
  jsonRequest: string
): Owner.RegisterRequest => {
  return OwnerRegisterRequestFromProtobufShape(
    petclinic_pb.OwnerRegisterRequest.fromJsonString(jsonRequest)
  );
};

// Helper for getting a protobuf instance for a request from the
// expected shape, i.e., either a Zod shape or a protobuf shape.
const OwnerRegisterRequestToProtobuf = (
  partialRequest?: Owner.PartialRegisterRequest
): petclinic_pb.OwnerRegisterRequest => {
  return partialRequest instanceof petclinic_pb.OwnerRegisterRequest
    ? partialRequest
    : new petclinic_pb.OwnerRegisterRequest().fromJson(
      reboot_api.zodToProtoJson(
        api.Owner.methods.register.request,
        reboot_api.validate(
          "Owner.methods.register.request",
          api.Owner.methods.register.request,
          partialRequest || {}
        )
      )
    );
};

const OwnerRegisterResponseFromProtobufShape = (
  partialResponse: protobuf_es.PartialMessage<Empty>
) => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const response = partialResponse instanceof Empty
    ? partialResponse
    : Empty.fromJson(partialResponse);

  return reboot_api.validate(
    "Owner.methods.register.response",
    api.Owner.methods.register.response,
    reboot_api.protoToZod(
      api.Owner.methods.register.response,
      response
    )
  );
};

const OwnerRegisterResponseToProtobuf = (
  partialResponse?: Owner.PartialRegisterResponse
): Empty => {
  return partialResponse instanceof Empty
    ? partialResponse
    : new Empty().fromJson(
      reboot_api.zodToProtoJson(
        api.Owner.methods.register.response,
        reboot_api.validate(
          "Owner.methods.register.response",
          api.Owner.methods.register.response,
          partialResponse
        )
      )
    );
};


// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a protobuf shape.
const OwnerUpdateRequestFromProtobufShape = (
  partialRequest: protobuf_es.PartialMessage<petclinic_pb.OwnerUpdateRequest>
): Owner.UpdateRequest => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const request = partialRequest instanceof petclinic_pb.OwnerUpdateRequest
    ? partialRequest
    : petclinic_pb.OwnerUpdateRequest.fromJson(partialRequest);

  return reboot_api.validate(
    "Owner.methods.update.request",
    api.Owner.methods.update.request,
    reboot_api.protoToZod(
      api.Owner.methods.update.request,
      request
    )
  );
};

// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a JSON string.
const OwnerUpdateRequestFromJsonString = (
  jsonRequest: string
): Owner.UpdateRequest => {
  return OwnerUpdateRequestFromProtobufShape(
    petclinic_pb.OwnerUpdateRequest.fromJsonString(jsonRequest)
  );
};

// Helper for getting a protobuf instance for a request from the
// expected shape, i.e., either a Zod shape or a protobuf shape.
const OwnerUpdateRequestToProtobuf = (
  partialRequest?: Owner.PartialUpdateRequest
): petclinic_pb.OwnerUpdateRequest => {
  return partialRequest instanceof petclinic_pb.OwnerUpdateRequest
    ? partialRequest
    : new petclinic_pb.OwnerUpdateRequest().fromJson(
      reboot_api.zodToProtoJson(
        api.Owner.methods.update.request,
        reboot_api.validate(
          "Owner.methods.update.request",
          api.Owner.methods.update.request,
          partialRequest || {}
        )
      )
    );
};

const OwnerUpdateResponseFromProtobufShape = (
  partialResponse: protobuf_es.PartialMessage<Empty>
) => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const response = partialResponse instanceof Empty
    ? partialResponse
    : Empty.fromJson(partialResponse);

  return reboot_api.validate(
    "Owner.methods.update.response",
    api.Owner.methods.update.response,
    reboot_api.protoToZod(
      api.Owner.methods.update.response,
      response
    )
  );
};

const OwnerUpdateResponseToProtobuf = (
  partialResponse?: Owner.PartialUpdateResponse
): Empty => {
  return partialResponse instanceof Empty
    ? partialResponse
    : new Empty().fromJson(
      reboot_api.zodToProtoJson(
        api.Owner.methods.update.response,
        reboot_api.validate(
          "Owner.methods.update.response",
          api.Owner.methods.update.response,
          partialResponse
        )
      )
    );
};


// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a protobuf shape.
const OwnerAddPetRequestFromProtobufShape = (
  partialRequest: protobuf_es.PartialMessage<petclinic_pb.OwnerAddPetRequest>
): Owner.AddPetRequest => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const request = partialRequest instanceof petclinic_pb.OwnerAddPetRequest
    ? partialRequest
    : petclinic_pb.OwnerAddPetRequest.fromJson(partialRequest);

  return reboot_api.validate(
    "Owner.methods.addPet.request",
    api.Owner.methods.addPet.request,
    reboot_api.protoToZod(
      api.Owner.methods.addPet.request,
      request
    )
  );
};

// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a JSON string.
const OwnerAddPetRequestFromJsonString = (
  jsonRequest: string
): Owner.AddPetRequest => {
  return OwnerAddPetRequestFromProtobufShape(
    petclinic_pb.OwnerAddPetRequest.fromJsonString(jsonRequest)
  );
};

// Helper for getting a protobuf instance for a request from the
// expected shape, i.e., either a Zod shape or a protobuf shape.
const OwnerAddPetRequestToProtobuf = (
  partialRequest?: Owner.PartialAddPetRequest
): petclinic_pb.OwnerAddPetRequest => {
  return partialRequest instanceof petclinic_pb.OwnerAddPetRequest
    ? partialRequest
    : new petclinic_pb.OwnerAddPetRequest().fromJson(
      reboot_api.zodToProtoJson(
        api.Owner.methods.addPet.request,
        reboot_api.validate(
          "Owner.methods.addPet.request",
          api.Owner.methods.addPet.request,
          partialRequest || {}
        )
      )
    );
};

const OwnerAddPetResponseFromProtobufShape = (
  partialResponse: protobuf_es.PartialMessage<petclinic_pb.OwnerAddPetResponse>
) => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const response = partialResponse instanceof petclinic_pb.OwnerAddPetResponse
    ? partialResponse
    : petclinic_pb.OwnerAddPetResponse.fromJson(partialResponse);

  return reboot_api.validate(
    "Owner.methods.addPet.response",
    api.Owner.methods.addPet.response,
    reboot_api.protoToZod(
      api.Owner.methods.addPet.response,
      response
    )
  );
};

const OwnerAddPetResponseToProtobuf = (
  partialResponse?: Owner.PartialAddPetResponse
): petclinic_pb.OwnerAddPetResponse => {
  return partialResponse instanceof petclinic_pb.OwnerAddPetResponse
    ? partialResponse
    : new petclinic_pb.OwnerAddPetResponse().fromJson(
      reboot_api.zodToProtoJson(
        api.Owner.methods.addPet.response,
        reboot_api.validate(
          "Owner.methods.addPet.response",
          api.Owner.methods.addPet.response,
          partialResponse
        )
      )
    );
};


// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a protobuf shape.
const OwnerDetailsRequestFromProtobufShape = (
  partialRequest: protobuf_es.PartialMessage<Empty>
): Owner.DetailsRequest => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const request = partialRequest instanceof Empty
    ? partialRequest
    : Empty.fromJson(partialRequest);

  return reboot_api.validate(
    "Owner.methods.details.request",
    api.Owner.methods.details.request,
    reboot_api.protoToZod(
      api.Owner.methods.details.request,
      request
    )
  );
};

// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a JSON string.
const OwnerDetailsRequestFromJsonString = (
  jsonRequest: string
): Owner.DetailsRequest => {
  return OwnerDetailsRequestFromProtobufShape(
    Empty.fromJsonString(jsonRequest)
  );
};

// Helper for getting a protobuf instance for a request from the
// expected shape, i.e., either a Zod shape or a protobuf shape.
const OwnerDetailsRequestToProtobuf = (
  partialRequest?: Owner.PartialDetailsRequest
): Empty => {
  return partialRequest instanceof Empty
    ? partialRequest
    : new Empty().fromJson(
      reboot_api.zodToProtoJson(
        api.Owner.methods.details.request,
        reboot_api.validate(
          "Owner.methods.details.request",
          api.Owner.methods.details.request,
          partialRequest || {}
        )
      )
    );
};

const OwnerDetailsResponseFromProtobufShape = (
  partialResponse: protobuf_es.PartialMessage<petclinic_pb.OwnerDetailsResponse>
) => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const response = partialResponse instanceof petclinic_pb.OwnerDetailsResponse
    ? partialResponse
    : petclinic_pb.OwnerDetailsResponse.fromJson(partialResponse);

  return reboot_api.validate(
    "Owner.methods.details.response",
    api.Owner.methods.details.response,
    reboot_api.protoToZod(
      api.Owner.methods.details.response,
      response
    )
  );
};

const OwnerDetailsResponseToProtobuf = (
  partialResponse?: Owner.PartialDetailsResponse
): petclinic_pb.OwnerDetailsResponse => {
  return partialResponse instanceof petclinic_pb.OwnerDetailsResponse
    ? partialResponse
    : new petclinic_pb.OwnerDetailsResponse().fromJson(
      reboot_api.zodToProtoJson(
        api.Owner.methods.details.response,
        reboot_api.validate(
          "Owner.methods.details.response",
          api.Owner.methods.details.response,
          partialResponse
        )
      )
    );
};


// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a protobuf shape.
const PetRegisterRequestFromProtobufShape = (
  partialRequest: protobuf_es.PartialMessage<petclinic_pb.PetRegisterRequest>
): Pet.RegisterRequest => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const request = partialRequest instanceof petclinic_pb.PetRegisterRequest
    ? partialRequest
    : petclinic_pb.PetRegisterRequest.fromJson(partialRequest);

  return reboot_api.validate(
    "Pet.methods.register.request",
    api.Pet.methods.register.request,
    reboot_api.protoToZod(
      api.Pet.methods.register.request,
      request
    )
  );
};

// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a JSON string.
const PetRegisterRequestFromJsonString = (
  jsonRequest: string
): Pet.RegisterRequest => {
  return PetRegisterRequestFromProtobufShape(
    petclinic_pb.PetRegisterRequest.fromJsonString(jsonRequest)
  );
};

// Helper for getting a protobuf instance for a request from the
// expected shape, i.e., either a Zod shape or a protobuf shape.
const PetRegisterRequestToProtobuf = (
  partialRequest?: Pet.PartialRegisterRequest
): petclinic_pb.PetRegisterRequest => {
  return partialRequest instanceof petclinic_pb.PetRegisterRequest
    ? partialRequest
    : new petclinic_pb.PetRegisterRequest().fromJson(
      reboot_api.zodToProtoJson(
        api.Pet.methods.register.request,
        reboot_api.validate(
          "Pet.methods.register.request",
          api.Pet.methods.register.request,
          partialRequest || {}
        )
      )
    );
};

const PetRegisterResponseFromProtobufShape = (
  partialResponse: protobuf_es.PartialMessage<Empty>
) => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const response = partialResponse instanceof Empty
    ? partialResponse
    : Empty.fromJson(partialResponse);

  return reboot_api.validate(
    "Pet.methods.register.response",
    api.Pet.methods.register.response,
    reboot_api.protoToZod(
      api.Pet.methods.register.response,
      response
    )
  );
};

const PetRegisterResponseToProtobuf = (
  partialResponse?: Pet.PartialRegisterResponse
): Empty => {
  return partialResponse instanceof Empty
    ? partialResponse
    : new Empty().fromJson(
      reboot_api.zodToProtoJson(
        api.Pet.methods.register.response,
        reboot_api.validate(
          "Pet.methods.register.response",
          api.Pet.methods.register.response,
          partialResponse
        )
      )
    );
};


// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a protobuf shape.
const PetUpdateRequestFromProtobufShape = (
  partialRequest: protobuf_es.PartialMessage<petclinic_pb.PetUpdateRequest>
): Pet.UpdateRequest => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const request = partialRequest instanceof petclinic_pb.PetUpdateRequest
    ? partialRequest
    : petclinic_pb.PetUpdateRequest.fromJson(partialRequest);

  return reboot_api.validate(
    "Pet.methods.update.request",
    api.Pet.methods.update.request,
    reboot_api.protoToZod(
      api.Pet.methods.update.request,
      request
    )
  );
};

// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a JSON string.
const PetUpdateRequestFromJsonString = (
  jsonRequest: string
): Pet.UpdateRequest => {
  return PetUpdateRequestFromProtobufShape(
    petclinic_pb.PetUpdateRequest.fromJsonString(jsonRequest)
  );
};

// Helper for getting a protobuf instance for a request from the
// expected shape, i.e., either a Zod shape or a protobuf shape.
const PetUpdateRequestToProtobuf = (
  partialRequest?: Pet.PartialUpdateRequest
): petclinic_pb.PetUpdateRequest => {
  return partialRequest instanceof petclinic_pb.PetUpdateRequest
    ? partialRequest
    : new petclinic_pb.PetUpdateRequest().fromJson(
      reboot_api.zodToProtoJson(
        api.Pet.methods.update.request,
        reboot_api.validate(
          "Pet.methods.update.request",
          api.Pet.methods.update.request,
          partialRequest || {}
        )
      )
    );
};

const PetUpdateResponseFromProtobufShape = (
  partialResponse: protobuf_es.PartialMessage<Empty>
) => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const response = partialResponse instanceof Empty
    ? partialResponse
    : Empty.fromJson(partialResponse);

  return reboot_api.validate(
    "Pet.methods.update.response",
    api.Pet.methods.update.response,
    reboot_api.protoToZod(
      api.Pet.methods.update.response,
      response
    )
  );
};

const PetUpdateResponseToProtobuf = (
  partialResponse?: Pet.PartialUpdateResponse
): Empty => {
  return partialResponse instanceof Empty
    ? partialResponse
    : new Empty().fromJson(
      reboot_api.zodToProtoJson(
        api.Pet.methods.update.response,
        reboot_api.validate(
          "Pet.methods.update.response",
          api.Pet.methods.update.response,
          partialResponse
        )
      )
    );
};


// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a protobuf shape.
const PetRecordVisitRequestFromProtobufShape = (
  partialRequest: protobuf_es.PartialMessage<petclinic_pb.PetRecordVisitRequest>
): Pet.RecordVisitRequest => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const request = partialRequest instanceof petclinic_pb.PetRecordVisitRequest
    ? partialRequest
    : petclinic_pb.PetRecordVisitRequest.fromJson(partialRequest);

  return reboot_api.validate(
    "Pet.methods.recordVisit.request",
    api.Pet.methods.recordVisit.request,
    reboot_api.protoToZod(
      api.Pet.methods.recordVisit.request,
      request
    )
  );
};

// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a JSON string.
const PetRecordVisitRequestFromJsonString = (
  jsonRequest: string
): Pet.RecordVisitRequest => {
  return PetRecordVisitRequestFromProtobufShape(
    petclinic_pb.PetRecordVisitRequest.fromJsonString(jsonRequest)
  );
};

// Helper for getting a protobuf instance for a request from the
// expected shape, i.e., either a Zod shape or a protobuf shape.
const PetRecordVisitRequestToProtobuf = (
  partialRequest?: Pet.PartialRecordVisitRequest
): petclinic_pb.PetRecordVisitRequest => {
  return partialRequest instanceof petclinic_pb.PetRecordVisitRequest
    ? partialRequest
    : new petclinic_pb.PetRecordVisitRequest().fromJson(
      reboot_api.zodToProtoJson(
        api.Pet.methods.recordVisit.request,
        reboot_api.validate(
          "Pet.methods.recordVisit.request",
          api.Pet.methods.recordVisit.request,
          partialRequest || {}
        )
      )
    );
};

const PetRecordVisitResponseFromProtobufShape = (
  partialResponse: protobuf_es.PartialMessage<Empty>
) => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const response = partialResponse instanceof Empty
    ? partialResponse
    : Empty.fromJson(partialResponse);

  return reboot_api.validate(
    "Pet.methods.recordVisit.response",
    api.Pet.methods.recordVisit.response,
    reboot_api.protoToZod(
      api.Pet.methods.recordVisit.response,
      response
    )
  );
};

const PetRecordVisitResponseToProtobuf = (
  partialResponse?: Pet.PartialRecordVisitResponse
): Empty => {
  return partialResponse instanceof Empty
    ? partialResponse
    : new Empty().fromJson(
      reboot_api.zodToProtoJson(
        api.Pet.methods.recordVisit.response,
        reboot_api.validate(
          "Pet.methods.recordVisit.response",
          api.Pet.methods.recordVisit.response,
          partialResponse
        )
      )
    );
};


// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a protobuf shape.
const PetDetailsRequestFromProtobufShape = (
  partialRequest: protobuf_es.PartialMessage<Empty>
): Pet.DetailsRequest => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const request = partialRequest instanceof Empty
    ? partialRequest
    : Empty.fromJson(partialRequest);

  return reboot_api.validate(
    "Pet.methods.details.request",
    api.Pet.methods.details.request,
    reboot_api.protoToZod(
      api.Pet.methods.details.request,
      request
    )
  );
};

// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a JSON string.
const PetDetailsRequestFromJsonString = (
  jsonRequest: string
): Pet.DetailsRequest => {
  return PetDetailsRequestFromProtobufShape(
    Empty.fromJsonString(jsonRequest)
  );
};

// Helper for getting a protobuf instance for a request from the
// expected shape, i.e., either a Zod shape or a protobuf shape.
const PetDetailsRequestToProtobuf = (
  partialRequest?: Pet.PartialDetailsRequest
): Empty => {
  return partialRequest instanceof Empty
    ? partialRequest
    : new Empty().fromJson(
      reboot_api.zodToProtoJson(
        api.Pet.methods.details.request,
        reboot_api.validate(
          "Pet.methods.details.request",
          api.Pet.methods.details.request,
          partialRequest || {}
        )
      )
    );
};

const PetDetailsResponseFromProtobufShape = (
  partialResponse: protobuf_es.PartialMessage<petclinic_pb.PetDetailsResponse>
) => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const response = partialResponse instanceof petclinic_pb.PetDetailsResponse
    ? partialResponse
    : petclinic_pb.PetDetailsResponse.fromJson(partialResponse);

  return reboot_api.validate(
    "Pet.methods.details.response",
    api.Pet.methods.details.response,
    reboot_api.protoToZod(
      api.Pet.methods.details.response,
      response
    )
  );
};

const PetDetailsResponseToProtobuf = (
  partialResponse?: Pet.PartialDetailsResponse
): petclinic_pb.PetDetailsResponse => {
  return partialResponse instanceof petclinic_pb.PetDetailsResponse
    ? partialResponse
    : new petclinic_pb.PetDetailsResponse().fromJson(
      reboot_api.zodToProtoJson(
        api.Pet.methods.details.response,
        reboot_api.validate(
          "Pet.methods.details.response",
          api.Pet.methods.details.response,
          partialResponse
        )
      )
    );
};


// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a protobuf shape.
const VeterinarianRegisterRequestFromProtobufShape = (
  partialRequest: protobuf_es.PartialMessage<petclinic_pb.VeterinarianRegisterRequest>
): Veterinarian.RegisterRequest => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const request = partialRequest instanceof petclinic_pb.VeterinarianRegisterRequest
    ? partialRequest
    : petclinic_pb.VeterinarianRegisterRequest.fromJson(partialRequest);

  return reboot_api.validate(
    "Veterinarian.methods.register.request",
    api.Veterinarian.methods.register.request,
    reboot_api.protoToZod(
      api.Veterinarian.methods.register.request,
      request
    )
  );
};

// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a JSON string.
const VeterinarianRegisterRequestFromJsonString = (
  jsonRequest: string
): Veterinarian.RegisterRequest => {
  return VeterinarianRegisterRequestFromProtobufShape(
    petclinic_pb.VeterinarianRegisterRequest.fromJsonString(jsonRequest)
  );
};

// Helper for getting a protobuf instance for a request from the
// expected shape, i.e., either a Zod shape or a protobuf shape.
const VeterinarianRegisterRequestToProtobuf = (
  partialRequest?: Veterinarian.PartialRegisterRequest
): petclinic_pb.VeterinarianRegisterRequest => {
  return partialRequest instanceof petclinic_pb.VeterinarianRegisterRequest
    ? partialRequest
    : new petclinic_pb.VeterinarianRegisterRequest().fromJson(
      reboot_api.zodToProtoJson(
        api.Veterinarian.methods.register.request,
        reboot_api.validate(
          "Veterinarian.methods.register.request",
          api.Veterinarian.methods.register.request,
          partialRequest || {}
        )
      )
    );
};

const VeterinarianRegisterResponseFromProtobufShape = (
  partialResponse: protobuf_es.PartialMessage<Empty>
) => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const response = partialResponse instanceof Empty
    ? partialResponse
    : Empty.fromJson(partialResponse);

  return reboot_api.validate(
    "Veterinarian.methods.register.response",
    api.Veterinarian.methods.register.response,
    reboot_api.protoToZod(
      api.Veterinarian.methods.register.response,
      response
    )
  );
};

const VeterinarianRegisterResponseToProtobuf = (
  partialResponse?: Veterinarian.PartialRegisterResponse
): Empty => {
  return partialResponse instanceof Empty
    ? partialResponse
    : new Empty().fromJson(
      reboot_api.zodToProtoJson(
        api.Veterinarian.methods.register.response,
        reboot_api.validate(
          "Veterinarian.methods.register.response",
          api.Veterinarian.methods.register.response,
          partialResponse
        )
      )
    );
};


// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a protobuf shape.
const VeterinarianUpdateRequestFromProtobufShape = (
  partialRequest: protobuf_es.PartialMessage<petclinic_pb.VeterinarianUpdateRequest>
): Veterinarian.UpdateRequest => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const request = partialRequest instanceof petclinic_pb.VeterinarianUpdateRequest
    ? partialRequest
    : petclinic_pb.VeterinarianUpdateRequest.fromJson(partialRequest);

  return reboot_api.validate(
    "Veterinarian.methods.update.request",
    api.Veterinarian.methods.update.request,
    reboot_api.protoToZod(
      api.Veterinarian.methods.update.request,
      request
    )
  );
};

// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a JSON string.
const VeterinarianUpdateRequestFromJsonString = (
  jsonRequest: string
): Veterinarian.UpdateRequest => {
  return VeterinarianUpdateRequestFromProtobufShape(
    petclinic_pb.VeterinarianUpdateRequest.fromJsonString(jsonRequest)
  );
};

// Helper for getting a protobuf instance for a request from the
// expected shape, i.e., either a Zod shape or a protobuf shape.
const VeterinarianUpdateRequestToProtobuf = (
  partialRequest?: Veterinarian.PartialUpdateRequest
): petclinic_pb.VeterinarianUpdateRequest => {
  return partialRequest instanceof petclinic_pb.VeterinarianUpdateRequest
    ? partialRequest
    : new petclinic_pb.VeterinarianUpdateRequest().fromJson(
      reboot_api.zodToProtoJson(
        api.Veterinarian.methods.update.request,
        reboot_api.validate(
          "Veterinarian.methods.update.request",
          api.Veterinarian.methods.update.request,
          partialRequest || {}
        )
      )
    );
};

const VeterinarianUpdateResponseFromProtobufShape = (
  partialResponse: protobuf_es.PartialMessage<Empty>
) => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const response = partialResponse instanceof Empty
    ? partialResponse
    : Empty.fromJson(partialResponse);

  return reboot_api.validate(
    "Veterinarian.methods.update.response",
    api.Veterinarian.methods.update.response,
    reboot_api.protoToZod(
      api.Veterinarian.methods.update.response,
      response
    )
  );
};

const VeterinarianUpdateResponseToProtobuf = (
  partialResponse?: Veterinarian.PartialUpdateResponse
): Empty => {
  return partialResponse instanceof Empty
    ? partialResponse
    : new Empty().fromJson(
      reboot_api.zodToProtoJson(
        api.Veterinarian.methods.update.response,
        reboot_api.validate(
          "Veterinarian.methods.update.response",
          api.Veterinarian.methods.update.response,
          partialResponse
        )
      )
    );
};


// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a protobuf shape.
const VeterinarianDetailsRequestFromProtobufShape = (
  partialRequest: protobuf_es.PartialMessage<Empty>
): Veterinarian.DetailsRequest => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const request = partialRequest instanceof Empty
    ? partialRequest
    : Empty.fromJson(partialRequest);

  return reboot_api.validate(
    "Veterinarian.methods.details.request",
    api.Veterinarian.methods.details.request,
    reboot_api.protoToZod(
      api.Veterinarian.methods.details.request,
      request
    )
  );
};

// Helper for getting the expected shape of a request, i.e., either a
// Zod shape or a protobuf instance, from a JSON string.
const VeterinarianDetailsRequestFromJsonString = (
  jsonRequest: string
): Veterinarian.DetailsRequest => {
  return VeterinarianDetailsRequestFromProtobufShape(
    Empty.fromJsonString(jsonRequest)
  );
};

// Helper for getting a protobuf instance for a request from the
// expected shape, i.e., either a Zod shape or a protobuf shape.
const VeterinarianDetailsRequestToProtobuf = (
  partialRequest?: Veterinarian.PartialDetailsRequest
): Empty => {
  return partialRequest instanceof Empty
    ? partialRequest
    : new Empty().fromJson(
      reboot_api.zodToProtoJson(
        api.Veterinarian.methods.details.request,
        reboot_api.validate(
          "Veterinarian.methods.details.request",
          api.Veterinarian.methods.details.request,
          partialRequest || {}
        )
      )
    );
};

const VeterinarianDetailsResponseFromProtobufShape = (
  partialResponse: protobuf_es.PartialMessage<petclinic_pb.VeterinarianDetailsResponse>
) => {
  // TOOD: update `protoToZod()` to actually work from
  // any objects that match the shape, not just protobuf instances,
  // and then we won't need to first call `fromJson()` here.
  const response = partialResponse instanceof petclinic_pb.VeterinarianDetailsResponse
    ? partialResponse
    : petclinic_pb.VeterinarianDetailsResponse.fromJson(partialResponse);

  return reboot_api.validate(
    "Veterinarian.methods.details.response",
    api.Veterinarian.methods.details.response,
    reboot_api.protoToZod(
      api.Veterinarian.methods.details.response,
      response
    )
  );
};

const VeterinarianDetailsResponseToProtobuf = (
  partialResponse?: Veterinarian.PartialDetailsResponse
): petclinic_pb.VeterinarianDetailsResponse => {
  return partialResponse instanceof petclinic_pb.VeterinarianDetailsResponse
    ? partialResponse
    : new petclinic_pb.VeterinarianDetailsResponse().fromJson(
      reboot_api.zodToProtoJson(
        api.Veterinarian.methods.details.response,
        reboot_api.validate(
          "Veterinarian.methods.details.response",
          api.Veterinarian.methods.details.response,
          partialResponse
        )
      )
    );
};



export namespace Clinic {
  export type CreateRequest =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.create.request
      >
    >;

  export type PartialCreateRequest =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.create.request
      >
    >;

  export type CreateResponse =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.create.response
      >
    >;

  export type PartialCreateResponse =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.create.response
      >
    >;
}
export namespace Clinic {
  export type CreateOwnerRequest =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.createOwner.request
      >
    >;

  export type PartialCreateOwnerRequest =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.createOwner.request
      >
    >;

  export type CreateOwnerResponse =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.createOwner.response
      >
    >;

  export type PartialCreateOwnerResponse =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.createOwner.response
      >
    >;
}
export namespace Clinic {
  export type SearchOwnersRequest =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.searchOwners.request
      >
    >;

  export type PartialSearchOwnersRequest =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.searchOwners.request
      >
    >;

  export type SearchOwnersResponse =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.searchOwners.response
      >
    >;

  export type PartialSearchOwnersResponse =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.searchOwners.response
      >
    >;
}
export namespace Clinic {
  export type AddVeterinarianRequest =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.addVeterinarian.request
      >
    >;

  export type PartialAddVeterinarianRequest =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.addVeterinarian.request
      >
    >;

  export type AddVeterinarianResponse =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.addVeterinarian.response
      >
    >;

  export type PartialAddVeterinarianResponse =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.addVeterinarian.response
      >
    >;
}
export namespace Clinic {
  export type ListVeterinariansRequest =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.listVeterinarians.request
      >
    >;

  export type PartialListVeterinariansRequest =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.listVeterinarians.request
      >
    >;

  export type ListVeterinariansResponse =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.listVeterinarians.response
      >
    >;

  export type PartialListVeterinariansResponse =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Clinic.methods.listVeterinarians.response
      >
    >;
}



const CLINIC_CREATE_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type ClinicCreateAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof CLINIC_CREATE_ERROR_TYPES
  >[number];

export class ClinicCreateAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      CLINIC_CREATE_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new ClinicCreateAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new ClinicCreateAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.#error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.#error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: ClinicCreateAbortedError | z.input<typeof reboot_api.ZOD_ERRORS>,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    if (error instanceof protobuf_es.Message) {
      this.#error = error;
    } else if (!("type" in error)) {
      throw new Error("Expecting discriminator 'type' in error");
    } else if (reboot_api.ZOD_ERROR_NAMES.includes(error.type)) {
      this.#error = reboot_api.errorFromZodError(error);
    } else {
      throw new Error(`Unknown 'type' discriminator '${error.type}' in error`);
    }

    let code = reboot_api.grpcStatusCodeFromError(this.#error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.#error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  get error(): z.infer<typeof reboot_api.ZOD_ERRORS> {
    reboot_api.assert(this.#error instanceof protobuf_es.Message);
    // Non-declared errors (e.g., gRPC errors).
    return reboot_api.zodErrorFromError(this.#error);
  }

  readonly #error: ClinicCreateAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}



const CLINIC_CREATE_OWNER_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type ClinicCreateOwnerAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof CLINIC_CREATE_OWNER_ERROR_TYPES
  >[number];

export class ClinicCreateOwnerAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      CLINIC_CREATE_OWNER_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new ClinicCreateOwnerAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new ClinicCreateOwnerAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.#error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.#error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: ClinicCreateOwnerAbortedError | z.input<typeof reboot_api.ZOD_ERRORS>,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    if (error instanceof protobuf_es.Message) {
      this.#error = error;
    } else if (!("type" in error)) {
      throw new Error("Expecting discriminator 'type' in error");
    } else if (reboot_api.ZOD_ERROR_NAMES.includes(error.type)) {
      this.#error = reboot_api.errorFromZodError(error);
    } else {
      throw new Error(`Unknown 'type' discriminator '${error.type}' in error`);
    }

    let code = reboot_api.grpcStatusCodeFromError(this.#error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.#error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  get error(): z.infer<typeof reboot_api.ZOD_ERRORS> {
    reboot_api.assert(this.#error instanceof protobuf_es.Message);
    // Non-declared errors (e.g., gRPC errors).
    return reboot_api.zodErrorFromError(this.#error);
  }

  readonly #error: ClinicCreateOwnerAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}



const CLINIC_SEARCH_OWNERS_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type ClinicSearchOwnersAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof CLINIC_SEARCH_OWNERS_ERROR_TYPES
  >[number];

export class ClinicSearchOwnersAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      CLINIC_SEARCH_OWNERS_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new ClinicSearchOwnersAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new ClinicSearchOwnersAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.#error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.#error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: ClinicSearchOwnersAbortedError | z.input<typeof reboot_api.ZOD_ERRORS>,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    if (error instanceof protobuf_es.Message) {
      this.#error = error;
    } else if (!("type" in error)) {
      throw new Error("Expecting discriminator 'type' in error");
    } else if (reboot_api.ZOD_ERROR_NAMES.includes(error.type)) {
      this.#error = reboot_api.errorFromZodError(error);
    } else {
      throw new Error(`Unknown 'type' discriminator '${error.type}' in error`);
    }

    let code = reboot_api.grpcStatusCodeFromError(this.#error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.#error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  get error(): z.infer<typeof reboot_api.ZOD_ERRORS> {
    reboot_api.assert(this.#error instanceof protobuf_es.Message);
    // Non-declared errors (e.g., gRPC errors).
    return reboot_api.zodErrorFromError(this.#error);
  }

  readonly #error: ClinicSearchOwnersAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}



const CLINIC_ADD_VETERINARIAN_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type ClinicAddVeterinarianAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof CLINIC_ADD_VETERINARIAN_ERROR_TYPES
  >[number];

export class ClinicAddVeterinarianAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      CLINIC_ADD_VETERINARIAN_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new ClinicAddVeterinarianAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new ClinicAddVeterinarianAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.#error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.#error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: ClinicAddVeterinarianAbortedError | z.input<typeof reboot_api.ZOD_ERRORS>,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    if (error instanceof protobuf_es.Message) {
      this.#error = error;
    } else if (!("type" in error)) {
      throw new Error("Expecting discriminator 'type' in error");
    } else if (reboot_api.ZOD_ERROR_NAMES.includes(error.type)) {
      this.#error = reboot_api.errorFromZodError(error);
    } else {
      throw new Error(`Unknown 'type' discriminator '${error.type}' in error`);
    }

    let code = reboot_api.grpcStatusCodeFromError(this.#error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.#error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  get error(): z.infer<typeof reboot_api.ZOD_ERRORS> {
    reboot_api.assert(this.#error instanceof protobuf_es.Message);
    // Non-declared errors (e.g., gRPC errors).
    return reboot_api.zodErrorFromError(this.#error);
  }

  readonly #error: ClinicAddVeterinarianAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}



const CLINIC_LIST_VETERINARIANS_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type ClinicListVeterinariansAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof CLINIC_LIST_VETERINARIANS_ERROR_TYPES
  >[number];

export class ClinicListVeterinariansAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      CLINIC_LIST_VETERINARIANS_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new ClinicListVeterinariansAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new ClinicListVeterinariansAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.#error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.#error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: ClinicListVeterinariansAbortedError | z.input<typeof reboot_api.ZOD_ERRORS>,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    if (error instanceof protobuf_es.Message) {
      this.#error = error;
    } else if (!("type" in error)) {
      throw new Error("Expecting discriminator 'type' in error");
    } else if (reboot_api.ZOD_ERROR_NAMES.includes(error.type)) {
      this.#error = reboot_api.errorFromZodError(error);
    } else {
      throw new Error(`Unknown 'type' discriminator '${error.type}' in error`);
    }

    let code = reboot_api.grpcStatusCodeFromError(this.#error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.#error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  get error(): z.infer<typeof reboot_api.ZOD_ERRORS> {
    reboot_api.assert(this.#error instanceof protobuf_es.Message);
    // Non-declared errors (e.g., gRPC errors).
    return reboot_api.zodErrorFromError(this.#error);
  }

  readonly #error: ClinicListVeterinariansAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}


class _Reactively {
  #id: string;
  #state: string;

  constructor(id: string, options?: reboot_api.CallOptions) {
    this.#id = id;
    this.#state = "petclinic.v1.Clinic";
  }

  async searchOwners(
    context: reboot_web.WebContext,
    partialRequest?: Clinic.PartialSearchOwnersRequest,
    options?: { signal?: AbortSignal },
  ): Promise<[
      AsyncGenerator<Clinic.SearchOwnersResponse, void, unknown>,
      (newRequest: Clinic.PartialSearchOwnersRequest) => void
    ]> {
    const request = ClinicSearchOwnersRequestToProtobuf(partialRequest);

    const [generator, setRequest] = reboot_web.reactively(
      {
        url: context.url,
        state: this.#state,
        method: "SearchOwners",
        id: this.#id,
        requestType: petclinic_pb.ClinicSearchOwnersRequest,
        responseType: petclinic_pb.ClinicSearchOwnersResponse,
        request: request,
        signal: options?.signal,
        bearerToken: context.bearerToken,
        websockets: context.websockets,
      }
    );

    const setTypedRequest = (newRequest: Clinic.PartialSearchOwnersRequest): void => {
      const typedRequest = ClinicSearchOwnersRequestToProtobuf(newRequest);
      setRequest(typedRequest);
    };

    async function* typedGenerator(): AsyncGenerator<Clinic.SearchOwnersResponse, void, unknown> {
     for await (const response of generator) {
      const typedResponse = ClinicSearchOwnersResponseFromProtobufShape(response);
      yield typedResponse;
      }
    };

    return [typedGenerator(), setTypedRequest];
  }

  async listVeterinarians(
    context: reboot_web.WebContext,
    partialRequest?: Clinic.PartialListVeterinariansRequest,
    options?: { signal?: AbortSignal },
  ): Promise<[
      AsyncGenerator<Clinic.ListVeterinariansResponse, void, unknown>,
      (newRequest: Clinic.PartialListVeterinariansRequest) => void
    ]> {
    const request = ClinicListVeterinariansRequestToProtobuf(partialRequest);

    const [generator, setRequest] = reboot_web.reactively(
      {
        url: context.url,
        state: this.#state,
        method: "ListVeterinarians",
        id: this.#id,
        requestType: Empty,
        responseType: petclinic_pb.ClinicListVeterinariansResponse,
        request: request,
        signal: options?.signal,
        bearerToken: context.bearerToken,
        websockets: context.websockets,
      }
    );

    const setTypedRequest = (newRequest: Clinic.PartialListVeterinariansRequest): void => {
      const typedRequest = ClinicListVeterinariansRequestToProtobuf(newRequest);
      setRequest(typedRequest);
    };

    async function* typedGenerator(): AsyncGenerator<Clinic.ListVeterinariansResponse, void, unknown> {
     for await (const response of generator) {
      const typedResponse = ClinicListVeterinariansResponseFromProtobufShape(response);
      yield typedResponse;
      }
    };

    return [typedGenerator(), setTypedRequest];
  }

}

class _Idempotently {
  #stateRef: string;
  #idempotencyKey: string;

  constructor(id: string, idempotencyKey: string, options?: reboot_api.CallOptions) {
    this.#stateRef = reboot_api.stateIdToRef("petclinic.v1.Clinic", id);
    this.#idempotencyKey = idempotencyKey;
  }

  async create(
    context: reboot_web.WebContext,
    partialRequest?: Clinic.PartialCreateRequest,
    options?: { signal?: AbortSignal },
  ): Promise<Clinic.CreateResponse> {
    const request = ClinicCreateRequestToProtobuf(partialRequest);

    const responseProtobuf = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.ClinicMethods/Create",
        stateRef: this.#stateRef,
        requestType: Empty,
        responseType: Empty,
        abortedType: ClinicCreateAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: this.#idempotencyKey,
      });

    return ClinicCreateResponseFromProtobufShape(responseProtobuf);
  }

  async createOwner(
    context: reboot_web.WebContext,
    partialRequest?: Clinic.PartialCreateOwnerRequest,
    options?: { signal?: AbortSignal },
  ): Promise<Clinic.CreateOwnerResponse> {
    const request = ClinicCreateOwnerRequestToProtobuf(partialRequest);

    const responseProtobuf = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.ClinicMethods/CreateOwner",
        stateRef: this.#stateRef,
        requestType: petclinic_pb.ClinicCreateOwnerRequest,
        responseType: petclinic_pb.ClinicCreateOwnerResponse,
        abortedType: ClinicCreateOwnerAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: this.#idempotencyKey,
      });

    return ClinicCreateOwnerResponseFromProtobufShape(responseProtobuf);
  }

  async addVeterinarian(
    context: reboot_web.WebContext,
    partialRequest?: Clinic.PartialAddVeterinarianRequest,
    options?: { signal?: AbortSignal },
  ): Promise<Clinic.AddVeterinarianResponse> {
    const request = ClinicAddVeterinarianRequestToProtobuf(partialRequest);

    const responseProtobuf = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.ClinicMethods/AddVeterinarian",
        stateRef: this.#stateRef,
        requestType: petclinic_pb.ClinicAddVeterinarianRequest,
        responseType: petclinic_pb.ClinicAddVeterinarianResponse,
        abortedType: ClinicAddVeterinarianAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: this.#idempotencyKey,
      });

    return ClinicAddVeterinarianResponseFromProtobufShape(responseProtobuf);
  }

}

export class ClinicWeakReference {
  #id: string;
  #options?: reboot_api.CallOptions;

  constructor(id: string) {
    this.#id = id;
  }

  get stateId(): string {
    return this.#id;
  }

  public reactively() {
    return new _Reactively(
      this.#id,
    );
  }

  public idempotently({ key }: { key: string }) {
    return new _Idempotently(
      this.#id,
      key,
    );
  }


  async _create(
    context: reboot_web.WebContext,
    partialRequest?: Clinic.PartialCreateRequest,
    options?: { signal?: AbortSignal, from_constructor?: boolean },
  ): Promise<Clinic.CreateResponse> {
    if (!options || !options.from_constructor) {
      throw new Error(
        `Method 'Create' is a constructor, so it can not be called on a weak reference.`
      );
    }

    const request = ClinicCreateRequestToProtobuf(partialRequest);

    const stateRef = reboot_api.stateIdToRef(
      "petclinic.v1.Clinic",
      this.#id,
    );
    const idempotencyKey = reboot_web.makeExpiringIdempotencyKey();

    const protobufResponse = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.ClinicMethods/Create",
        stateRef: stateRef,
        requestType: Empty,
        responseType: Empty,
        abortedType: ClinicCreateAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: idempotencyKey,
      });

    return ClinicCreateResponseFromProtobufShape(protobufResponse);
  }


  async createOwner(
    context: reboot_web.WebContext,
    partialRequest?: Clinic.PartialCreateOwnerRequest,
    options?: { signal?: AbortSignal, from_constructor?: boolean },
  ): Promise<Clinic.CreateOwnerResponse> {

    const request = ClinicCreateOwnerRequestToProtobuf(partialRequest);

    const stateRef = reboot_api.stateIdToRef(
      "petclinic.v1.Clinic",
      this.#id,
    );
    const idempotencyKey = reboot_web.makeExpiringIdempotencyKey();

    const protobufResponse = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.ClinicMethods/CreateOwner",
        stateRef: stateRef,
        requestType: petclinic_pb.ClinicCreateOwnerRequest,
        responseType: petclinic_pb.ClinicCreateOwnerResponse,
        abortedType: ClinicCreateOwnerAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: idempotencyKey,
      });

    return ClinicCreateOwnerResponseFromProtobufShape(protobufResponse);
  }


  async searchOwners(
    context: reboot_web.WebContext,
    partialRequest?: Clinic.PartialSearchOwnersRequest,
    options?: { signal?: AbortSignal, from_constructor?: boolean },
  ): Promise<Clinic.SearchOwnersResponse> {

    const request = ClinicSearchOwnersRequestToProtobuf(partialRequest);

    const stateRef = reboot_api.stateIdToRef(
      "petclinic.v1.Clinic",
      this.#id,
    );
    const idempotencyKey = reboot_web.makeExpiringIdempotencyKey();

    const protobufResponse = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.ClinicMethods/SearchOwners",
        stateRef: stateRef,
        requestType: petclinic_pb.ClinicSearchOwnersRequest,
        responseType: petclinic_pb.ClinicSearchOwnersResponse,
        abortedType: ClinicSearchOwnersAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: idempotencyKey,
      });

    return ClinicSearchOwnersResponseFromProtobufShape(protobufResponse);
  }


  async addVeterinarian(
    context: reboot_web.WebContext,
    partialRequest?: Clinic.PartialAddVeterinarianRequest,
    options?: { signal?: AbortSignal, from_constructor?: boolean },
  ): Promise<Clinic.AddVeterinarianResponse> {

    const request = ClinicAddVeterinarianRequestToProtobuf(partialRequest);

    const stateRef = reboot_api.stateIdToRef(
      "petclinic.v1.Clinic",
      this.#id,
    );
    const idempotencyKey = reboot_web.makeExpiringIdempotencyKey();

    const protobufResponse = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.ClinicMethods/AddVeterinarian",
        stateRef: stateRef,
        requestType: petclinic_pb.ClinicAddVeterinarianRequest,
        responseType: petclinic_pb.ClinicAddVeterinarianResponse,
        abortedType: ClinicAddVeterinarianAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: idempotencyKey,
      });

    return ClinicAddVeterinarianResponseFromProtobufShape(protobufResponse);
  }


  async listVeterinarians(
    context: reboot_web.WebContext,
    partialRequest?: Clinic.PartialListVeterinariansRequest,
    options?: { signal?: AbortSignal, from_constructor?: boolean },
  ): Promise<Clinic.ListVeterinariansResponse> {

    const request = ClinicListVeterinariansRequestToProtobuf(partialRequest);

    const stateRef = reboot_api.stateIdToRef(
      "petclinic.v1.Clinic",
      this.#id,
    );
    const idempotencyKey = reboot_web.makeExpiringIdempotencyKey();

    const protobufResponse = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.ClinicMethods/ListVeterinarians",
        stateRef: stateRef,
        requestType: Empty,
        responseType: petclinic_pb.ClinicListVeterinariansResponse,
        abortedType: ClinicListVeterinariansAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: idempotencyKey,
      });

    return ClinicListVeterinariansResponseFromProtobufShape(protobufResponse);
  }

}

export class Clinic {

  static WeakReference = ClinicWeakReference;

  public static ref(
    id: string,
    options?: { bearerToken?: string }
  ) {
    return new Clinic.WeakReference(id, options?.bearerToken);
  }

  public static async create(
    context: reboot_web.WebContext,
    idOrPartialRequest?: string | Clinic.PartialCreateRequest,
    inputPartialRequest?: Clinic.PartialCreateRequest,
    options?: { signal?: AbortSignal }
  ): Promise<[
    Clinic.WeakReference,
    Clinic.CreateResponse
  ]> {
    let id: string | undefined = undefined;
    let partialRequest: Clinic.PartialCreateRequest | undefined = undefined;

    if (typeof idOrPartialRequest === "string" || idOrPartialRequest instanceof String) {
      id = idOrPartialRequest;
      partialRequest = inputPartialRequest;
    } else {
      partialRequest = idOrPartialRequest;
    }

    if (id === undefined) {
      id = uuidv4();
    }

    const weakReference = Clinic.ref(id);

    options = {
      "from_constructor": true,
      ...options,
    }

    const response = await weakReference._create(
      context,
      partialRequest,
      options,
    );

    return [weakReference, response];
  }


}

export namespace Clinic {
  export type WeakReference = typeof Clinic.WeakReference.prototype;
}


export namespace Owner {
  export type RegisterRequest =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Owner.methods.register.request
      >
    >;

  export type PartialRegisterRequest =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Owner.methods.register.request
      >
    >;

  export type RegisterResponse =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Owner.methods.register.response
      >
    >;

  export type PartialRegisterResponse =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Owner.methods.register.response
      >
    >;
}
export namespace Owner {
  export type UpdateRequest =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Owner.methods.update.request
      >
    >;

  export type PartialUpdateRequest =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Owner.methods.update.request
      >
    >;

  export type UpdateResponse =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Owner.methods.update.response
      >
    >;

  export type PartialUpdateResponse =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Owner.methods.update.response
      >
    >;
}
export namespace Owner {
  export type AddPetRequest =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Owner.methods.addPet.request
      >
    >;

  export type PartialAddPetRequest =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Owner.methods.addPet.request
      >
    >;

  export type AddPetResponse =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Owner.methods.addPet.response
      >
    >;

  export type PartialAddPetResponse =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Owner.methods.addPet.response
      >
    >;
}
export namespace Owner {
  export type DetailsRequest =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Owner.methods.details.request
      >
    >;

  export type PartialDetailsRequest =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Owner.methods.details.request
      >
    >;

  export type DetailsResponse =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Owner.methods.details.response
      >
    >;

  export type PartialDetailsResponse =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Owner.methods.details.response
      >
    >;
}



const OWNER_REGISTER_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type OwnerRegisterAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof OWNER_REGISTER_ERROR_TYPES
  >[number];

export class OwnerRegisterAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      OWNER_REGISTER_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new OwnerRegisterAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new OwnerRegisterAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.#error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.#error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: OwnerRegisterAbortedError | z.input<typeof reboot_api.ZOD_ERRORS>,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    if (error instanceof protobuf_es.Message) {
      this.#error = error;
    } else if (!("type" in error)) {
      throw new Error("Expecting discriminator 'type' in error");
    } else if (reboot_api.ZOD_ERROR_NAMES.includes(error.type)) {
      this.#error = reboot_api.errorFromZodError(error);
    } else {
      throw new Error(`Unknown 'type' discriminator '${error.type}' in error`);
    }

    let code = reboot_api.grpcStatusCodeFromError(this.#error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.#error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  get error(): z.infer<typeof reboot_api.ZOD_ERRORS> {
    reboot_api.assert(this.#error instanceof protobuf_es.Message);
    // Non-declared errors (e.g., gRPC errors).
    return reboot_api.zodErrorFromError(this.#error);
  }

  readonly #error: OwnerRegisterAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}



const OWNER_UPDATE_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type OwnerUpdateAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof OWNER_UPDATE_ERROR_TYPES
  >[number];

export class OwnerUpdateAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      OWNER_UPDATE_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new OwnerUpdateAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new OwnerUpdateAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.#error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.#error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: OwnerUpdateAbortedError | z.input<typeof reboot_api.ZOD_ERRORS>,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    if (error instanceof protobuf_es.Message) {
      this.#error = error;
    } else if (!("type" in error)) {
      throw new Error("Expecting discriminator 'type' in error");
    } else if (reboot_api.ZOD_ERROR_NAMES.includes(error.type)) {
      this.#error = reboot_api.errorFromZodError(error);
    } else {
      throw new Error(`Unknown 'type' discriminator '${error.type}' in error`);
    }

    let code = reboot_api.grpcStatusCodeFromError(this.#error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.#error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  get error(): z.infer<typeof reboot_api.ZOD_ERRORS> {
    reboot_api.assert(this.#error instanceof protobuf_es.Message);
    // Non-declared errors (e.g., gRPC errors).
    return reboot_api.zodErrorFromError(this.#error);
  }

  readonly #error: OwnerUpdateAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}



const OWNER_ADD_PET_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type OwnerAddPetAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof OWNER_ADD_PET_ERROR_TYPES
  >[number];

export class OwnerAddPetAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      OWNER_ADD_PET_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new OwnerAddPetAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new OwnerAddPetAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.#error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.#error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: OwnerAddPetAbortedError | z.input<typeof reboot_api.ZOD_ERRORS>,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    if (error instanceof protobuf_es.Message) {
      this.#error = error;
    } else if (!("type" in error)) {
      throw new Error("Expecting discriminator 'type' in error");
    } else if (reboot_api.ZOD_ERROR_NAMES.includes(error.type)) {
      this.#error = reboot_api.errorFromZodError(error);
    } else {
      throw new Error(`Unknown 'type' discriminator '${error.type}' in error`);
    }

    let code = reboot_api.grpcStatusCodeFromError(this.#error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.#error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  get error(): z.infer<typeof reboot_api.ZOD_ERRORS> {
    reboot_api.assert(this.#error instanceof protobuf_es.Message);
    // Non-declared errors (e.g., gRPC errors).
    return reboot_api.zodErrorFromError(this.#error);
  }

  readonly #error: OwnerAddPetAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}



const OWNER_DETAILS_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type OwnerDetailsAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof OWNER_DETAILS_ERROR_TYPES
  >[number];

export class OwnerDetailsAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      OWNER_DETAILS_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new OwnerDetailsAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new OwnerDetailsAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.#error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.#error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: OwnerDetailsAbortedError | z.input<typeof reboot_api.ZOD_ERRORS>,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    if (error instanceof protobuf_es.Message) {
      this.#error = error;
    } else if (!("type" in error)) {
      throw new Error("Expecting discriminator 'type' in error");
    } else if (reboot_api.ZOD_ERROR_NAMES.includes(error.type)) {
      this.#error = reboot_api.errorFromZodError(error);
    } else {
      throw new Error(`Unknown 'type' discriminator '${error.type}' in error`);
    }

    let code = reboot_api.grpcStatusCodeFromError(this.#error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.#error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  get error(): z.infer<typeof reboot_api.ZOD_ERRORS> {
    reboot_api.assert(this.#error instanceof protobuf_es.Message);
    // Non-declared errors (e.g., gRPC errors).
    return reboot_api.zodErrorFromError(this.#error);
  }

  readonly #error: OwnerDetailsAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}


class _Reactively {
  #id: string;
  #state: string;

  constructor(id: string, options?: reboot_api.CallOptions) {
    this.#id = id;
    this.#state = "petclinic.v1.Owner";
  }

  async details(
    context: reboot_web.WebContext,
    partialRequest?: Owner.PartialDetailsRequest,
    options?: { signal?: AbortSignal },
  ): Promise<[
      AsyncGenerator<Owner.DetailsResponse, void, unknown>,
      (newRequest: Owner.PartialDetailsRequest) => void
    ]> {
    const request = OwnerDetailsRequestToProtobuf(partialRequest);

    const [generator, setRequest] = reboot_web.reactively(
      {
        url: context.url,
        state: this.#state,
        method: "Details",
        id: this.#id,
        requestType: Empty,
        responseType: petclinic_pb.OwnerDetailsResponse,
        request: request,
        signal: options?.signal,
        bearerToken: context.bearerToken,
        websockets: context.websockets,
      }
    );

    const setTypedRequest = (newRequest: Owner.PartialDetailsRequest): void => {
      const typedRequest = OwnerDetailsRequestToProtobuf(newRequest);
      setRequest(typedRequest);
    };

    async function* typedGenerator(): AsyncGenerator<Owner.DetailsResponse, void, unknown> {
     for await (const response of generator) {
      const typedResponse = OwnerDetailsResponseFromProtobufShape(response);
      yield typedResponse;
      }
    };

    return [typedGenerator(), setTypedRequest];
  }

}

class _Idempotently {
  #stateRef: string;
  #idempotencyKey: string;

  constructor(id: string, idempotencyKey: string, options?: reboot_api.CallOptions) {
    this.#stateRef = reboot_api.stateIdToRef("petclinic.v1.Owner", id);
    this.#idempotencyKey = idempotencyKey;
  }

  async register(
    context: reboot_web.WebContext,
    partialRequest?: Owner.PartialRegisterRequest,
    options?: { signal?: AbortSignal },
  ): Promise<Owner.RegisterResponse> {
    const request = OwnerRegisterRequestToProtobuf(partialRequest);

    const responseProtobuf = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.OwnerMethods/Register",
        stateRef: this.#stateRef,
        requestType: petclinic_pb.OwnerRegisterRequest,
        responseType: Empty,
        abortedType: OwnerRegisterAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: this.#idempotencyKey,
      });

    return OwnerRegisterResponseFromProtobufShape(responseProtobuf);
  }

  async update(
    context: reboot_web.WebContext,
    partialRequest?: Owner.PartialUpdateRequest,
    options?: { signal?: AbortSignal },
  ): Promise<Owner.UpdateResponse> {
    const request = OwnerUpdateRequestToProtobuf(partialRequest);

    const responseProtobuf = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.OwnerMethods/Update",
        stateRef: this.#stateRef,
        requestType: petclinic_pb.OwnerUpdateRequest,
        responseType: Empty,
        abortedType: OwnerUpdateAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: this.#idempotencyKey,
      });

    return OwnerUpdateResponseFromProtobufShape(responseProtobuf);
  }

  async addPet(
    context: reboot_web.WebContext,
    partialRequest?: Owner.PartialAddPetRequest,
    options?: { signal?: AbortSignal },
  ): Promise<Owner.AddPetResponse> {
    const request = OwnerAddPetRequestToProtobuf(partialRequest);

    const responseProtobuf = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.OwnerMethods/AddPet",
        stateRef: this.#stateRef,
        requestType: petclinic_pb.OwnerAddPetRequest,
        responseType: petclinic_pb.OwnerAddPetResponse,
        abortedType: OwnerAddPetAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: this.#idempotencyKey,
      });

    return OwnerAddPetResponseFromProtobufShape(responseProtobuf);
  }

}

export class OwnerWeakReference {
  #id: string;
  #options?: reboot_api.CallOptions;

  constructor(id: string) {
    this.#id = id;
  }

  get stateId(): string {
    return this.#id;
  }

  public reactively() {
    return new _Reactively(
      this.#id,
    );
  }

  public idempotently({ key }: { key: string }) {
    return new _Idempotently(
      this.#id,
      key,
    );
  }


  async _register(
    context: reboot_web.WebContext,
    partialRequest?: Owner.PartialRegisterRequest,
    options?: { signal?: AbortSignal, from_constructor?: boolean },
  ): Promise<Owner.RegisterResponse> {
    if (!options || !options.from_constructor) {
      throw new Error(
        `Method 'Register' is a constructor, so it can not be called on a weak reference.`
      );
    }

    const request = OwnerRegisterRequestToProtobuf(partialRequest);

    const stateRef = reboot_api.stateIdToRef(
      "petclinic.v1.Owner",
      this.#id,
    );
    const idempotencyKey = reboot_web.makeExpiringIdempotencyKey();

    const protobufResponse = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.OwnerMethods/Register",
        stateRef: stateRef,
        requestType: petclinic_pb.OwnerRegisterRequest,
        responseType: Empty,
        abortedType: OwnerRegisterAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: idempotencyKey,
      });

    return OwnerRegisterResponseFromProtobufShape(protobufResponse);
  }


  async update(
    context: reboot_web.WebContext,
    partialRequest?: Owner.PartialUpdateRequest,
    options?: { signal?: AbortSignal, from_constructor?: boolean },
  ): Promise<Owner.UpdateResponse> {

    const request = OwnerUpdateRequestToProtobuf(partialRequest);

    const stateRef = reboot_api.stateIdToRef(
      "petclinic.v1.Owner",
      this.#id,
    );
    const idempotencyKey = reboot_web.makeExpiringIdempotencyKey();

    const protobufResponse = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.OwnerMethods/Update",
        stateRef: stateRef,
        requestType: petclinic_pb.OwnerUpdateRequest,
        responseType: Empty,
        abortedType: OwnerUpdateAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: idempotencyKey,
      });

    return OwnerUpdateResponseFromProtobufShape(protobufResponse);
  }


  async addPet(
    context: reboot_web.WebContext,
    partialRequest?: Owner.PartialAddPetRequest,
    options?: { signal?: AbortSignal, from_constructor?: boolean },
  ): Promise<Owner.AddPetResponse> {

    const request = OwnerAddPetRequestToProtobuf(partialRequest);

    const stateRef = reboot_api.stateIdToRef(
      "petclinic.v1.Owner",
      this.#id,
    );
    const idempotencyKey = reboot_web.makeExpiringIdempotencyKey();

    const protobufResponse = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.OwnerMethods/AddPet",
        stateRef: stateRef,
        requestType: petclinic_pb.OwnerAddPetRequest,
        responseType: petclinic_pb.OwnerAddPetResponse,
        abortedType: OwnerAddPetAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: idempotencyKey,
      });

    return OwnerAddPetResponseFromProtobufShape(protobufResponse);
  }


  async details(
    context: reboot_web.WebContext,
    partialRequest?: Owner.PartialDetailsRequest,
    options?: { signal?: AbortSignal, from_constructor?: boolean },
  ): Promise<Owner.DetailsResponse> {

    const request = OwnerDetailsRequestToProtobuf(partialRequest);

    const stateRef = reboot_api.stateIdToRef(
      "petclinic.v1.Owner",
      this.#id,
    );
    const idempotencyKey = reboot_web.makeExpiringIdempotencyKey();

    const protobufResponse = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.OwnerMethods/Details",
        stateRef: stateRef,
        requestType: Empty,
        responseType: petclinic_pb.OwnerDetailsResponse,
        abortedType: OwnerDetailsAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: idempotencyKey,
      });

    return OwnerDetailsResponseFromProtobufShape(protobufResponse);
  }

}

export class Owner {

  static WeakReference = OwnerWeakReference;

  public static ref(
    id: string,
    options?: { bearerToken?: string }
  ) {
    return new Owner.WeakReference(id, options?.bearerToken);
  }

  public static async register(
    context: reboot_web.WebContext,
    idOrPartialRequest?: string | Owner.PartialRegisterRequest,
    inputPartialRequest?: Owner.PartialRegisterRequest,
    options?: { signal?: AbortSignal }
  ): Promise<[
    Owner.WeakReference,
    Owner.RegisterResponse
  ]> {
    let id: string | undefined = undefined;
    let partialRequest: Owner.PartialRegisterRequest | undefined = undefined;

    if (typeof idOrPartialRequest === "string" || idOrPartialRequest instanceof String) {
      id = idOrPartialRequest;
      partialRequest = inputPartialRequest;
    } else {
      partialRequest = idOrPartialRequest;
    }

    if (id === undefined) {
      id = uuidv4();
    }

    const weakReference = Owner.ref(id);

    options = {
      "from_constructor": true,
      ...options,
    }

    const response = await weakReference._register(
      context,
      partialRequest,
      options,
    );

    return [weakReference, response];
  }


}

export namespace Owner {
  export type WeakReference = typeof Owner.WeakReference.prototype;
}


export namespace Pet {
  export type RegisterRequest =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Pet.methods.register.request
      >
    >;

  export type PartialRegisterRequest =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Pet.methods.register.request
      >
    >;

  export type RegisterResponse =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Pet.methods.register.response
      >
    >;

  export type PartialRegisterResponse =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Pet.methods.register.response
      >
    >;
}
export namespace Pet {
  export type UpdateRequest =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Pet.methods.update.request
      >
    >;

  export type PartialUpdateRequest =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Pet.methods.update.request
      >
    >;

  export type UpdateResponse =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Pet.methods.update.response
      >
    >;

  export type PartialUpdateResponse =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Pet.methods.update.response
      >
    >;
}
export namespace Pet {
  export type RecordVisitRequest =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Pet.methods.recordVisit.request
      >
    >;

  export type PartialRecordVisitRequest =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Pet.methods.recordVisit.request
      >
    >;

  export type RecordVisitResponse =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Pet.methods.recordVisit.response
      >
    >;

  export type PartialRecordVisitResponse =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Pet.methods.recordVisit.response
      >
    >;
}
export namespace Pet {
  export type DetailsRequest =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Pet.methods.details.request
      >
    >;

  export type PartialDetailsRequest =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Pet.methods.details.request
      >
    >;

  export type DetailsResponse =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Pet.methods.details.response
      >
    >;

  export type PartialDetailsResponse =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Pet.methods.details.response
      >
    >;
}



const PET_REGISTER_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type PetRegisterAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof PET_REGISTER_ERROR_TYPES
  >[number];

export class PetRegisterAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      PET_REGISTER_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new PetRegisterAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new PetRegisterAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.#error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.#error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: PetRegisterAbortedError | z.input<typeof reboot_api.ZOD_ERRORS>,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    if (error instanceof protobuf_es.Message) {
      this.#error = error;
    } else if (!("type" in error)) {
      throw new Error("Expecting discriminator 'type' in error");
    } else if (reboot_api.ZOD_ERROR_NAMES.includes(error.type)) {
      this.#error = reboot_api.errorFromZodError(error);
    } else {
      throw new Error(`Unknown 'type' discriminator '${error.type}' in error`);
    }

    let code = reboot_api.grpcStatusCodeFromError(this.#error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.#error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  get error(): z.infer<typeof reboot_api.ZOD_ERRORS> {
    reboot_api.assert(this.#error instanceof protobuf_es.Message);
    // Non-declared errors (e.g., gRPC errors).
    return reboot_api.zodErrorFromError(this.#error);
  }

  readonly #error: PetRegisterAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}



const PET_UPDATE_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type PetUpdateAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof PET_UPDATE_ERROR_TYPES
  >[number];

export class PetUpdateAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      PET_UPDATE_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new PetUpdateAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new PetUpdateAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.#error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.#error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: PetUpdateAbortedError | z.input<typeof reboot_api.ZOD_ERRORS>,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    if (error instanceof protobuf_es.Message) {
      this.#error = error;
    } else if (!("type" in error)) {
      throw new Error("Expecting discriminator 'type' in error");
    } else if (reboot_api.ZOD_ERROR_NAMES.includes(error.type)) {
      this.#error = reboot_api.errorFromZodError(error);
    } else {
      throw new Error(`Unknown 'type' discriminator '${error.type}' in error`);
    }

    let code = reboot_api.grpcStatusCodeFromError(this.#error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.#error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  get error(): z.infer<typeof reboot_api.ZOD_ERRORS> {
    reboot_api.assert(this.#error instanceof protobuf_es.Message);
    // Non-declared errors (e.g., gRPC errors).
    return reboot_api.zodErrorFromError(this.#error);
  }

  readonly #error: PetUpdateAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}



const PET_RECORD_VISIT_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type PetRecordVisitAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof PET_RECORD_VISIT_ERROR_TYPES
  >[number];

export class PetRecordVisitAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      PET_RECORD_VISIT_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new PetRecordVisitAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new PetRecordVisitAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.#error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.#error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: PetRecordVisitAbortedError | z.input<typeof reboot_api.ZOD_ERRORS>,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    if (error instanceof protobuf_es.Message) {
      this.#error = error;
    } else if (!("type" in error)) {
      throw new Error("Expecting discriminator 'type' in error");
    } else if (reboot_api.ZOD_ERROR_NAMES.includes(error.type)) {
      this.#error = reboot_api.errorFromZodError(error);
    } else {
      throw new Error(`Unknown 'type' discriminator '${error.type}' in error`);
    }

    let code = reboot_api.grpcStatusCodeFromError(this.#error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.#error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  get error(): z.infer<typeof reboot_api.ZOD_ERRORS> {
    reboot_api.assert(this.#error instanceof protobuf_es.Message);
    // Non-declared errors (e.g., gRPC errors).
    return reboot_api.zodErrorFromError(this.#error);
  }

  readonly #error: PetRecordVisitAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}



const PET_DETAILS_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type PetDetailsAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof PET_DETAILS_ERROR_TYPES
  >[number];

export class PetDetailsAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      PET_DETAILS_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new PetDetailsAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new PetDetailsAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.#error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.#error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: PetDetailsAbortedError | z.input<typeof reboot_api.ZOD_ERRORS>,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    if (error instanceof protobuf_es.Message) {
      this.#error = error;
    } else if (!("type" in error)) {
      throw new Error("Expecting discriminator 'type' in error");
    } else if (reboot_api.ZOD_ERROR_NAMES.includes(error.type)) {
      this.#error = reboot_api.errorFromZodError(error);
    } else {
      throw new Error(`Unknown 'type' discriminator '${error.type}' in error`);
    }

    let code = reboot_api.grpcStatusCodeFromError(this.#error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.#error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  get error(): z.infer<typeof reboot_api.ZOD_ERRORS> {
    reboot_api.assert(this.#error instanceof protobuf_es.Message);
    // Non-declared errors (e.g., gRPC errors).
    return reboot_api.zodErrorFromError(this.#error);
  }

  readonly #error: PetDetailsAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}


class _Reactively {
  #id: string;
  #state: string;

  constructor(id: string, options?: reboot_api.CallOptions) {
    this.#id = id;
    this.#state = "petclinic.v1.Pet";
  }

  async details(
    context: reboot_web.WebContext,
    partialRequest?: Pet.PartialDetailsRequest,
    options?: { signal?: AbortSignal },
  ): Promise<[
      AsyncGenerator<Pet.DetailsResponse, void, unknown>,
      (newRequest: Pet.PartialDetailsRequest) => void
    ]> {
    const request = PetDetailsRequestToProtobuf(partialRequest);

    const [generator, setRequest] = reboot_web.reactively(
      {
        url: context.url,
        state: this.#state,
        method: "Details",
        id: this.#id,
        requestType: Empty,
        responseType: petclinic_pb.PetDetailsResponse,
        request: request,
        signal: options?.signal,
        bearerToken: context.bearerToken,
        websockets: context.websockets,
      }
    );

    const setTypedRequest = (newRequest: Pet.PartialDetailsRequest): void => {
      const typedRequest = PetDetailsRequestToProtobuf(newRequest);
      setRequest(typedRequest);
    };

    async function* typedGenerator(): AsyncGenerator<Pet.DetailsResponse, void, unknown> {
     for await (const response of generator) {
      const typedResponse = PetDetailsResponseFromProtobufShape(response);
      yield typedResponse;
      }
    };

    return [typedGenerator(), setTypedRequest];
  }

}

class _Idempotently {
  #stateRef: string;
  #idempotencyKey: string;

  constructor(id: string, idempotencyKey: string, options?: reboot_api.CallOptions) {
    this.#stateRef = reboot_api.stateIdToRef("petclinic.v1.Pet", id);
    this.#idempotencyKey = idempotencyKey;
  }

  async register(
    context: reboot_web.WebContext,
    partialRequest?: Pet.PartialRegisterRequest,
    options?: { signal?: AbortSignal },
  ): Promise<Pet.RegisterResponse> {
    const request = PetRegisterRequestToProtobuf(partialRequest);

    const responseProtobuf = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.PetMethods/Register",
        stateRef: this.#stateRef,
        requestType: petclinic_pb.PetRegisterRequest,
        responseType: Empty,
        abortedType: PetRegisterAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: this.#idempotencyKey,
      });

    return PetRegisterResponseFromProtobufShape(responseProtobuf);
  }

  async update(
    context: reboot_web.WebContext,
    partialRequest?: Pet.PartialUpdateRequest,
    options?: { signal?: AbortSignal },
  ): Promise<Pet.UpdateResponse> {
    const request = PetUpdateRequestToProtobuf(partialRequest);

    const responseProtobuf = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.PetMethods/Update",
        stateRef: this.#stateRef,
        requestType: petclinic_pb.PetUpdateRequest,
        responseType: Empty,
        abortedType: PetUpdateAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: this.#idempotencyKey,
      });

    return PetUpdateResponseFromProtobufShape(responseProtobuf);
  }

  async recordVisit(
    context: reboot_web.WebContext,
    partialRequest?: Pet.PartialRecordVisitRequest,
    options?: { signal?: AbortSignal },
  ): Promise<Pet.RecordVisitResponse> {
    const request = PetRecordVisitRequestToProtobuf(partialRequest);

    const responseProtobuf = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.PetMethods/RecordVisit",
        stateRef: this.#stateRef,
        requestType: petclinic_pb.PetRecordVisitRequest,
        responseType: Empty,
        abortedType: PetRecordVisitAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: this.#idempotencyKey,
      });

    return PetRecordVisitResponseFromProtobufShape(responseProtobuf);
  }

}

export class PetWeakReference {
  #id: string;
  #options?: reboot_api.CallOptions;

  constructor(id: string) {
    this.#id = id;
  }

  get stateId(): string {
    return this.#id;
  }

  public reactively() {
    return new _Reactively(
      this.#id,
    );
  }

  public idempotently({ key }: { key: string }) {
    return new _Idempotently(
      this.#id,
      key,
    );
  }


  async _register(
    context: reboot_web.WebContext,
    partialRequest?: Pet.PartialRegisterRequest,
    options?: { signal?: AbortSignal, from_constructor?: boolean },
  ): Promise<Pet.RegisterResponse> {
    if (!options || !options.from_constructor) {
      throw new Error(
        `Method 'Register' is a constructor, so it can not be called on a weak reference.`
      );
    }

    const request = PetRegisterRequestToProtobuf(partialRequest);

    const stateRef = reboot_api.stateIdToRef(
      "petclinic.v1.Pet",
      this.#id,
    );
    const idempotencyKey = reboot_web.makeExpiringIdempotencyKey();

    const protobufResponse = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.PetMethods/Register",
        stateRef: stateRef,
        requestType: petclinic_pb.PetRegisterRequest,
        responseType: Empty,
        abortedType: PetRegisterAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: idempotencyKey,
      });

    return PetRegisterResponseFromProtobufShape(protobufResponse);
  }


  async update(
    context: reboot_web.WebContext,
    partialRequest?: Pet.PartialUpdateRequest,
    options?: { signal?: AbortSignal, from_constructor?: boolean },
  ): Promise<Pet.UpdateResponse> {

    const request = PetUpdateRequestToProtobuf(partialRequest);

    const stateRef = reboot_api.stateIdToRef(
      "petclinic.v1.Pet",
      this.#id,
    );
    const idempotencyKey = reboot_web.makeExpiringIdempotencyKey();

    const protobufResponse = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.PetMethods/Update",
        stateRef: stateRef,
        requestType: petclinic_pb.PetUpdateRequest,
        responseType: Empty,
        abortedType: PetUpdateAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: idempotencyKey,
      });

    return PetUpdateResponseFromProtobufShape(protobufResponse);
  }


  async recordVisit(
    context: reboot_web.WebContext,
    partialRequest?: Pet.PartialRecordVisitRequest,
    options?: { signal?: AbortSignal, from_constructor?: boolean },
  ): Promise<Pet.RecordVisitResponse> {

    const request = PetRecordVisitRequestToProtobuf(partialRequest);

    const stateRef = reboot_api.stateIdToRef(
      "petclinic.v1.Pet",
      this.#id,
    );
    const idempotencyKey = reboot_web.makeExpiringIdempotencyKey();

    const protobufResponse = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.PetMethods/RecordVisit",
        stateRef: stateRef,
        requestType: petclinic_pb.PetRecordVisitRequest,
        responseType: Empty,
        abortedType: PetRecordVisitAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: idempotencyKey,
      });

    return PetRecordVisitResponseFromProtobufShape(protobufResponse);
  }


  async details(
    context: reboot_web.WebContext,
    partialRequest?: Pet.PartialDetailsRequest,
    options?: { signal?: AbortSignal, from_constructor?: boolean },
  ): Promise<Pet.DetailsResponse> {

    const request = PetDetailsRequestToProtobuf(partialRequest);

    const stateRef = reboot_api.stateIdToRef(
      "petclinic.v1.Pet",
      this.#id,
    );
    const idempotencyKey = reboot_web.makeExpiringIdempotencyKey();

    const protobufResponse = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.PetMethods/Details",
        stateRef: stateRef,
        requestType: Empty,
        responseType: petclinic_pb.PetDetailsResponse,
        abortedType: PetDetailsAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: idempotencyKey,
      });

    return PetDetailsResponseFromProtobufShape(protobufResponse);
  }

}

export class Pet {

  static WeakReference = PetWeakReference;

  public static ref(
    id: string,
    options?: { bearerToken?: string }
  ) {
    return new Pet.WeakReference(id, options?.bearerToken);
  }

  public static async register(
    context: reboot_web.WebContext,
    idOrPartialRequest?: string | Pet.PartialRegisterRequest,
    inputPartialRequest?: Pet.PartialRegisterRequest,
    options?: { signal?: AbortSignal }
  ): Promise<[
    Pet.WeakReference,
    Pet.RegisterResponse
  ]> {
    let id: string | undefined = undefined;
    let partialRequest: Pet.PartialRegisterRequest | undefined = undefined;

    if (typeof idOrPartialRequest === "string" || idOrPartialRequest instanceof String) {
      id = idOrPartialRequest;
      partialRequest = inputPartialRequest;
    } else {
      partialRequest = idOrPartialRequest;
    }

    if (id === undefined) {
      id = uuidv4();
    }

    const weakReference = Pet.ref(id);

    options = {
      "from_constructor": true,
      ...options,
    }

    const response = await weakReference._register(
      context,
      partialRequest,
      options,
    );

    return [weakReference, response];
  }


}

export namespace Pet {
  export type WeakReference = typeof Pet.WeakReference.prototype;
}


export namespace Veterinarian {
  export type RegisterRequest =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Veterinarian.methods.register.request
      >
    >;

  export type PartialRegisterRequest =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Veterinarian.methods.register.request
      >
    >;

  export type RegisterResponse =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Veterinarian.methods.register.response
      >
    >;

  export type PartialRegisterResponse =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Veterinarian.methods.register.response
      >
    >;
}
export namespace Veterinarian {
  export type UpdateRequest =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Veterinarian.methods.update.request
      >
    >;

  export type PartialUpdateRequest =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Veterinarian.methods.update.request
      >
    >;

  export type UpdateResponse =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Veterinarian.methods.update.response
      >
    >;

  export type PartialUpdateResponse =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Veterinarian.methods.update.response
      >
    >;
}
export namespace Veterinarian {
  export type DetailsRequest =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Veterinarian.methods.details.request
      >
    >;

  export type PartialDetailsRequest =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Veterinarian.methods.details.request
      >
    >;

  export type DetailsResponse =
  z.infer<
    reboot_api.EnsureZodObject<
      typeof api.Veterinarian.methods.details.response
      >
    >;

  export type PartialDetailsResponse =
  z.input<
    reboot_api.EnsureZodObject<
      typeof api.Veterinarian.methods.details.response
      >
    >;
}



const VETERINARIAN_REGISTER_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type VeterinarianRegisterAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof VETERINARIAN_REGISTER_ERROR_TYPES
  >[number];

export class VeterinarianRegisterAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      VETERINARIAN_REGISTER_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new VeterinarianRegisterAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new VeterinarianRegisterAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.#error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.#error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: VeterinarianRegisterAbortedError | z.input<typeof reboot_api.ZOD_ERRORS>,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    if (error instanceof protobuf_es.Message) {
      this.#error = error;
    } else if (!("type" in error)) {
      throw new Error("Expecting discriminator 'type' in error");
    } else if (reboot_api.ZOD_ERROR_NAMES.includes(error.type)) {
      this.#error = reboot_api.errorFromZodError(error);
    } else {
      throw new Error(`Unknown 'type' discriminator '${error.type}' in error`);
    }

    let code = reboot_api.grpcStatusCodeFromError(this.#error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.#error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  get error(): z.infer<typeof reboot_api.ZOD_ERRORS> {
    reboot_api.assert(this.#error instanceof protobuf_es.Message);
    // Non-declared errors (e.g., gRPC errors).
    return reboot_api.zodErrorFromError(this.#error);
  }

  readonly #error: VeterinarianRegisterAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}



const VETERINARIAN_UPDATE_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type VeterinarianUpdateAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof VETERINARIAN_UPDATE_ERROR_TYPES
  >[number];

export class VeterinarianUpdateAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      VETERINARIAN_UPDATE_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new VeterinarianUpdateAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new VeterinarianUpdateAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.#error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.#error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: VeterinarianUpdateAbortedError | z.input<typeof reboot_api.ZOD_ERRORS>,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    if (error instanceof protobuf_es.Message) {
      this.#error = error;
    } else if (!("type" in error)) {
      throw new Error("Expecting discriminator 'type' in error");
    } else if (reboot_api.ZOD_ERROR_NAMES.includes(error.type)) {
      this.#error = reboot_api.errorFromZodError(error);
    } else {
      throw new Error(`Unknown 'type' discriminator '${error.type}' in error`);
    }

    let code = reboot_api.grpcStatusCodeFromError(this.#error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.#error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  get error(): z.infer<typeof reboot_api.ZOD_ERRORS> {
    reboot_api.assert(this.#error instanceof protobuf_es.Message);
    // Non-declared errors (e.g., gRPC errors).
    return reboot_api.zodErrorFromError(this.#error);
  }

  readonly #error: VeterinarianUpdateAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}



const VETERINARIAN_DETAILS_ERROR_TYPES = [
  ...ERROR_TYPES,

  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type VeterinarianDetailsAbortedError =
  reboot_api.InstanceTypeForErrorTypes<
    typeof VETERINARIAN_DETAILS_ERROR_TYPES
  >[number];

export class VeterinarianDetailsAborted extends reboot_api.Aborted {
  static fromStatus(status: reboot_api.Status) {
    let error = reboot_api.errorFromGoogleRpcStatusDetails(
      status,
      VETERINARIAN_DETAILS_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new VeterinarianDetailsAborted(
        error, { message: status.message }
      );
    }

    error = reboot_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new VeterinarianDetailsAborted(
      error, { message: status.message }
    );
  }

  public toStatus(): reboot_api.Status {
    const isObject = (value: unknown): value is object => {
      return typeof value === 'object';
    };

    const isArray = (value: unknown): value is any[]  => {
      return Array.isArray(value);
    };

    const error = this.#error.toJson();

    if (!isObject(error) || isArray(error)) {
      throw new Error("Expecting 'error' to be an object (and not an array)");
    }

    const detail = { ...error };
    detail["@type"] = `type.googleapis.com/${this.#error.getType().typeName}`;

    return new reboot_api.Status({
      code: this.code,
      message: this.#message,
      details: [detail]
    });
  }

  constructor(
    error: VeterinarianDetailsAbortedError | z.input<typeof reboot_api.ZOD_ERRORS>,
    { message }: { message?: string } = {}
  ) {
    super();

    // Set the name of this error for even more information!
    this.name = this.constructor.name;

    if (error instanceof protobuf_es.Message) {
      this.#error = error;
    } else if (!("type" in error)) {
      throw new Error("Expecting discriminator 'type' in error");
    } else if (reboot_api.ZOD_ERROR_NAMES.includes(error.type)) {
      this.#error = reboot_api.errorFromZodError(error);
    } else {
      throw new Error(`Unknown 'type' discriminator '${error.type}' in error`);
    }

    let code = reboot_api.grpcStatusCodeFromError(this.#error);

    if (code === undefined) {
      // Must be one of the Reboot specific errors.
      code = reboot_api.StatusCode.ABORTED;
    }

    this.code = code;

    this.#message = message;
  }

  toString(): string {
    return `${this.name}: ${this.message}`;
  }

  get message(): string {
    return `${this.#error.getType().typeName}${this.#message ? ": " + this.#message : ""}`;
  }

  get error(): z.infer<typeof reboot_api.ZOD_ERRORS> {
    reboot_api.assert(this.#error instanceof protobuf_es.Message);
    // Non-declared errors (e.g., gRPC errors).
    return reboot_api.zodErrorFromError(this.#error);
  }

  readonly #error: VeterinarianDetailsAbortedError;
  readonly code: reboot_api.StatusCode;
  readonly #message?: string;
}


class _Reactively {
  #id: string;
  #state: string;

  constructor(id: string, options?: reboot_api.CallOptions) {
    this.#id = id;
    this.#state = "petclinic.v1.Veterinarian";
  }

  async details(
    context: reboot_web.WebContext,
    partialRequest?: Veterinarian.PartialDetailsRequest,
    options?: { signal?: AbortSignal },
  ): Promise<[
      AsyncGenerator<Veterinarian.DetailsResponse, void, unknown>,
      (newRequest: Veterinarian.PartialDetailsRequest) => void
    ]> {
    const request = VeterinarianDetailsRequestToProtobuf(partialRequest);

    const [generator, setRequest] = reboot_web.reactively(
      {
        url: context.url,
        state: this.#state,
        method: "Details",
        id: this.#id,
        requestType: Empty,
        responseType: petclinic_pb.VeterinarianDetailsResponse,
        request: request,
        signal: options?.signal,
        bearerToken: context.bearerToken,
        websockets: context.websockets,
      }
    );

    const setTypedRequest = (newRequest: Veterinarian.PartialDetailsRequest): void => {
      const typedRequest = VeterinarianDetailsRequestToProtobuf(newRequest);
      setRequest(typedRequest);
    };

    async function* typedGenerator(): AsyncGenerator<Veterinarian.DetailsResponse, void, unknown> {
     for await (const response of generator) {
      const typedResponse = VeterinarianDetailsResponseFromProtobufShape(response);
      yield typedResponse;
      }
    };

    return [typedGenerator(), setTypedRequest];
  }

}

class _Idempotently {
  #stateRef: string;
  #idempotencyKey: string;

  constructor(id: string, idempotencyKey: string, options?: reboot_api.CallOptions) {
    this.#stateRef = reboot_api.stateIdToRef("petclinic.v1.Veterinarian", id);
    this.#idempotencyKey = idempotencyKey;
  }

  async register(
    context: reboot_web.WebContext,
    partialRequest?: Veterinarian.PartialRegisterRequest,
    options?: { signal?: AbortSignal },
  ): Promise<Veterinarian.RegisterResponse> {
    const request = VeterinarianRegisterRequestToProtobuf(partialRequest);

    const responseProtobuf = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.VeterinarianMethods/Register",
        stateRef: this.#stateRef,
        requestType: petclinic_pb.VeterinarianRegisterRequest,
        responseType: Empty,
        abortedType: VeterinarianRegisterAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: this.#idempotencyKey,
      });

    return VeterinarianRegisterResponseFromProtobufShape(responseProtobuf);
  }

  async update(
    context: reboot_web.WebContext,
    partialRequest?: Veterinarian.PartialUpdateRequest,
    options?: { signal?: AbortSignal },
  ): Promise<Veterinarian.UpdateResponse> {
    const request = VeterinarianUpdateRequestToProtobuf(partialRequest);

    const responseProtobuf = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.VeterinarianMethods/Update",
        stateRef: this.#stateRef,
        requestType: petclinic_pb.VeterinarianUpdateRequest,
        responseType: Empty,
        abortedType: VeterinarianUpdateAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: this.#idempotencyKey,
      });

    return VeterinarianUpdateResponseFromProtobufShape(responseProtobuf);
  }

}

export class VeterinarianWeakReference {
  #id: string;
  #options?: reboot_api.CallOptions;

  constructor(id: string) {
    this.#id = id;
  }

  get stateId(): string {
    return this.#id;
  }

  public reactively() {
    return new _Reactively(
      this.#id,
    );
  }

  public idempotently({ key }: { key: string }) {
    return new _Idempotently(
      this.#id,
      key,
    );
  }


  async _register(
    context: reboot_web.WebContext,
    partialRequest?: Veterinarian.PartialRegisterRequest,
    options?: { signal?: AbortSignal, from_constructor?: boolean },
  ): Promise<Veterinarian.RegisterResponse> {
    if (!options || !options.from_constructor) {
      throw new Error(
        `Method 'Register' is a constructor, so it can not be called on a weak reference.`
      );
    }

    const request = VeterinarianRegisterRequestToProtobuf(partialRequest);

    const stateRef = reboot_api.stateIdToRef(
      "petclinic.v1.Veterinarian",
      this.#id,
    );
    const idempotencyKey = reboot_web.makeExpiringIdempotencyKey();

    const protobufResponse = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.VeterinarianMethods/Register",
        stateRef: stateRef,
        requestType: petclinic_pb.VeterinarianRegisterRequest,
        responseType: Empty,
        abortedType: VeterinarianRegisterAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: idempotencyKey,
      });

    return VeterinarianRegisterResponseFromProtobufShape(protobufResponse);
  }


  async update(
    context: reboot_web.WebContext,
    partialRequest?: Veterinarian.PartialUpdateRequest,
    options?: { signal?: AbortSignal, from_constructor?: boolean },
  ): Promise<Veterinarian.UpdateResponse> {

    const request = VeterinarianUpdateRequestToProtobuf(partialRequest);

    const stateRef = reboot_api.stateIdToRef(
      "petclinic.v1.Veterinarian",
      this.#id,
    );
    const idempotencyKey = reboot_web.makeExpiringIdempotencyKey();

    const protobufResponse = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.VeterinarianMethods/Update",
        stateRef: stateRef,
        requestType: petclinic_pb.VeterinarianUpdateRequest,
        responseType: Empty,
        abortedType: VeterinarianUpdateAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: idempotencyKey,
      });

    return VeterinarianUpdateResponseFromProtobufShape(protobufResponse);
  }


  async details(
    context: reboot_web.WebContext,
    partialRequest?: Veterinarian.PartialDetailsRequest,
    options?: { signal?: AbortSignal, from_constructor?: boolean },
  ): Promise<Veterinarian.DetailsResponse> {

    const request = VeterinarianDetailsRequestToProtobuf(partialRequest);

    const stateRef = reboot_api.stateIdToRef(
      "petclinic.v1.Veterinarian",
      this.#id,
    );
    const idempotencyKey = reboot_web.makeExpiringIdempotencyKey();

    const protobufResponse = await reboot_web.httpCall(
      {
        url: context.url,
        method: "petclinic.v1.VeterinarianMethods/Details",
        stateRef: stateRef,
        requestType: Empty,
        responseType: petclinic_pb.VeterinarianDetailsResponse,
        abortedType: VeterinarianDetailsAborted,
        request: request,
        options: options,
        bearerToken: context.bearerToken,
        onUnauthenticated: context.onUnauthenticated,
        idempotencyKey: idempotencyKey,
      });

    return VeterinarianDetailsResponseFromProtobufShape(protobufResponse);
  }

}

export class Veterinarian {

  static WeakReference = VeterinarianWeakReference;

  public static ref(
    id: string,
    options?: { bearerToken?: string }
  ) {
    return new Veterinarian.WeakReference(id, options?.bearerToken);
  }

  public static async register(
    context: reboot_web.WebContext,
    idOrPartialRequest?: string | Veterinarian.PartialRegisterRequest,
    inputPartialRequest?: Veterinarian.PartialRegisterRequest,
    options?: { signal?: AbortSignal }
  ): Promise<[
    Veterinarian.WeakReference,
    Veterinarian.RegisterResponse
  ]> {
    let id: string | undefined = undefined;
    let partialRequest: Veterinarian.PartialRegisterRequest | undefined = undefined;

    if (typeof idOrPartialRequest === "string" || idOrPartialRequest instanceof String) {
      id = idOrPartialRequest;
      partialRequest = inputPartialRequest;
    } else {
      partialRequest = idOrPartialRequest;
    }

    if (id === undefined) {
      id = uuidv4();
    }

    const weakReference = Veterinarian.ref(id);

    options = {
      "from_constructor": true,
      ...options,
    }

    const response = await weakReference._register(
      context,
      partialRequest,
      options,
    );

    return [weakReference, response];
  }


}

export namespace Veterinarian {
  export type WeakReference = typeof Veterinarian.WeakReference.prototype;
}

