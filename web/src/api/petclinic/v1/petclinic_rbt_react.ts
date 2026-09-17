/* eslint-disable */
// @ts-nocheck

"use client";

import * as protobuf_es from "@bufbuild/protobuf";
import {
  Empty, 
	Struct, 
	Value, 
	ListValue
} from "@bufbuild/protobuf";
import * as reboot_react from "@reboot-dev/reboot-react";
import * as reboot_web from "@reboot-dev/reboot-web";
import * as reboot_api from "@reboot-dev/reboot-api";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { useDefaultStateIds, useRefreshBearerToken } from "@reboot-dev/reboot-react/internal";
// NOTE NOTE NOTE
//
// If you are reading this comment because you are trying to debug
// the error:
//
// Module not found: Error: Can't resolve './petclinic_pb.js'
//
// You can resolve this by passing --react-extensions to `rbt
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

// It is important that the following is a function, so we can lazily
// initialize the cache, so users who do not use offline cache do not
// see any logs about its initialization.
export const offlineCacheStorageType = (): reboot_web.OfflineCacheStorageType =>
  reboot_web.offlineCache().offlineCacheStorageType;

reboot_api.check_bufbuild_protobuf_library(protobuf_es.Message);

export type PendingClinicCreateMutation = reboot_react.Mutation<Clinic.CreateRequest>;
export type PendingClinicCreateOwnerMutation = reboot_react.Mutation<Clinic.CreateOwnerRequest>;
export type PendingClinicAddVeterinarianMutation = reboot_react.Mutation<Clinic.AddVeterinarianRequest>;
export type PendingOwnerRegisterMutation = reboot_react.Mutation<Owner.RegisterRequest>;
export type PendingOwnerUpdateMutation = reboot_react.Mutation<Owner.UpdateRequest>;
export type PendingOwnerAddPetMutation = reboot_react.Mutation<Owner.AddPetRequest>;
export type PendingPetRegisterMutation = reboot_react.Mutation<Pet.RegisterRequest>;
export type PendingPetUpdateMutation = reboot_react.Mutation<Pet.UpdateRequest>;
export type PendingPetRecordVisitMutation = reboot_react.Mutation<Pet.RecordVisitRequest>;
export type PendingVeterinarianRegisterMutation = reboot_react.Mutation<Veterinarian.RegisterRequest>;
export type PendingVeterinarianUpdateMutation = reboot_react.Mutation<Veterinarian.UpdateRequest>;


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
  reboot_api.errors_pb.TransactionShouldRetry,
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

export interface ClinicMutators {
  create: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Clinic.PartialCreateRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Clinic.CreateResponse,
        ClinicCreateAborted
      >>;

    pending: PendingClinicCreateMutation[];
  };
  createOwner: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Clinic.PartialCreateOwnerRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Clinic.CreateOwnerResponse,
        ClinicCreateOwnerAborted
      >>;

    pending: PendingClinicCreateOwnerMutation[];
  };
  addVeterinarian: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Clinic.PartialAddVeterinarianRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Clinic.AddVeterinarianResponse,
        ClinicAddVeterinarianAborted
      >>;

    pending: PendingClinicAddVeterinarianMutation[];
  };
}

export interface ClinicIdempotently {
  create: {
    // Idempotent calls are functions and can be called directly.
    (partialRequest?: Clinic.PartialCreateRequest,
     options?: { metadata?: any }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Clinic.CreateResponse,
        ClinicCreateAborted
      >>;

    pending: PendingClinicCreateMutation[];
  };
  createOwner: {
    // Idempotent calls are functions and can be called directly.
    (partialRequest?: Clinic.PartialCreateOwnerRequest,
     options?: { metadata?: any }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Clinic.CreateOwnerResponse,
        ClinicCreateOwnerAborted
      >>;

    pending: PendingClinicCreateOwnerMutation[];
  };
  addVeterinarian: {
    // Idempotent calls are functions and can be called directly.
    (partialRequest?: Clinic.PartialAddVeterinarianRequest,
     options?: { metadata?: any }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Clinic.AddVeterinarianResponse,
        ClinicAddVeterinarianAborted
      >>;

    pending: PendingClinicAddVeterinarianMutation[];
  };
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


export interface UseClinicApi {
  // The resolved state ID this hook is bound to. For UI states it
  // may have been inferred from the MCP session or a URL param
  // rather than passed explicitly, so reading it here is the way
  // to recover the concrete ID.
  state_id: string;
  mutators: ClinicMutators;
  idempotently: (args: { key: string }) => ClinicIdempotently;
  create: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Clinic.PartialCreateRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Clinic.CreateResponse,
        ClinicCreateAborted
      >>;

    pending: PendingClinicCreateMutation[];
  };
  createOwner: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Clinic.PartialCreateOwnerRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Clinic.CreateOwnerResponse,
        ClinicCreateOwnerAborted
      >>;

    pending: PendingClinicCreateOwnerMutation[];
  };
  useSearchOwners(
    partialRequest?: Clinic.PartialSearchOwnersRequest
  ): {
    response: Clinic.SearchOwnersResponse | undefined;
    isLoading: boolean;
    aborted: ClinicSearchOwnersAborted | undefined;
  };
  useSearchOwners(
    partialRequest?: Clinic.PartialSearchOwnersRequest,
    options?: { suspense: true }
  ): {
    response: Clinic.SearchOwnersResponse;
    isLoading: boolean;
    aborted: undefined;
  } | {
    response: undefined;
    isLoading: boolean;
    aborted: ClinicSearchOwnersAborted;
  };
  useSearchOwners(
    partialRequest?: Clinic.PartialSearchOwnersRequest,
    options?: { suspense: false }
  ): {
    response: Clinic.SearchOwnersResponse | undefined;
    isLoading: boolean;
    aborted: ClinicSearchOwnersAborted | undefined;
  };
  searchOwners: (
    partialRequest?: Clinic.PartialSearchOwnersRequest,
    options?: { signal?: AbortSignal; retry?: boolean }
  ) => Promise<
    reboot_web.ResponseOrAborted<
    Clinic.SearchOwnersResponse,
    ClinicSearchOwnersAborted
    >
  >;
  addVeterinarian: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Clinic.PartialAddVeterinarianRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Clinic.AddVeterinarianResponse,
        ClinicAddVeterinarianAborted
      >>;

    pending: PendingClinicAddVeterinarianMutation[];
  };
  useListVeterinarians(
    partialRequest?: Clinic.PartialListVeterinariansRequest
  ): {
    response: Clinic.ListVeterinariansResponse | undefined;
    isLoading: boolean;
    aborted: ClinicListVeterinariansAborted | undefined;
  };
  useListVeterinarians(
    partialRequest?: Clinic.PartialListVeterinariansRequest,
    options?: { suspense: true }
  ): {
    response: Clinic.ListVeterinariansResponse;
    isLoading: boolean;
    aborted: undefined;
  } | {
    response: undefined;
    isLoading: boolean;
    aborted: ClinicListVeterinariansAborted;
  };
  useListVeterinarians(
    partialRequest?: Clinic.PartialListVeterinariansRequest,
    options?: { suspense: false }
  ): {
    response: Clinic.ListVeterinariansResponse | undefined;
    isLoading: boolean;
    aborted: ClinicListVeterinariansAborted | undefined;
  };
  listVeterinarians: (
    partialRequest?: Clinic.PartialListVeterinariansRequest,
    options?: { signal?: AbortSignal; retry?: boolean }
  ) => Promise<
    reboot_web.ResponseOrAborted<
    Clinic.ListVeterinariansResponse,
    ClinicListVeterinariansAborted
    >
  >;
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

export interface OwnerMutators {
  register: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Owner.PartialRegisterRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Owner.RegisterResponse,
        OwnerRegisterAborted
      >>;

    pending: PendingOwnerRegisterMutation[];
  };
  update: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Owner.PartialUpdateRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Owner.UpdateResponse,
        OwnerUpdateAborted
      >>;

    pending: PendingOwnerUpdateMutation[];
  };
  addPet: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Owner.PartialAddPetRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Owner.AddPetResponse,
        OwnerAddPetAborted
      >>;

    pending: PendingOwnerAddPetMutation[];
  };
}

export interface OwnerIdempotently {
  register: {
    // Idempotent calls are functions and can be called directly.
    (partialRequest?: Owner.PartialRegisterRequest,
     options?: { metadata?: any }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Owner.RegisterResponse,
        OwnerRegisterAborted
      >>;

    pending: PendingOwnerRegisterMutation[];
  };
  update: {
    // Idempotent calls are functions and can be called directly.
    (partialRequest?: Owner.PartialUpdateRequest,
     options?: { metadata?: any }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Owner.UpdateResponse,
        OwnerUpdateAborted
      >>;

    pending: PendingOwnerUpdateMutation[];
  };
  addPet: {
    // Idempotent calls are functions and can be called directly.
    (partialRequest?: Owner.PartialAddPetRequest,
     options?: { metadata?: any }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Owner.AddPetResponse,
        OwnerAddPetAborted
      >>;

    pending: PendingOwnerAddPetMutation[];
  };
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


export interface UseOwnerApi {
  // The resolved state ID this hook is bound to. For UI states it
  // may have been inferred from the MCP session or a URL param
  // rather than passed explicitly, so reading it here is the way
  // to recover the concrete ID.
  state_id: string;
  mutators: OwnerMutators;
  idempotently: (args: { key: string }) => OwnerIdempotently;
  register: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Owner.PartialRegisterRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Owner.RegisterResponse,
        OwnerRegisterAborted
      >>;

    pending: PendingOwnerRegisterMutation[];
  };
  update: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Owner.PartialUpdateRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Owner.UpdateResponse,
        OwnerUpdateAborted
      >>;

    pending: PendingOwnerUpdateMutation[];
  };
  addPet: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Owner.PartialAddPetRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Owner.AddPetResponse,
        OwnerAddPetAborted
      >>;

    pending: PendingOwnerAddPetMutation[];
  };
  useDetails(
    partialRequest?: Owner.PartialDetailsRequest
  ): {
    response: Owner.DetailsResponse | undefined;
    isLoading: boolean;
    aborted: OwnerDetailsAborted | undefined;
  };
  useDetails(
    partialRequest?: Owner.PartialDetailsRequest,
    options?: { suspense: true }
  ): {
    response: Owner.DetailsResponse;
    isLoading: boolean;
    aborted: undefined;
  } | {
    response: undefined;
    isLoading: boolean;
    aborted: OwnerDetailsAborted;
  };
  useDetails(
    partialRequest?: Owner.PartialDetailsRequest,
    options?: { suspense: false }
  ): {
    response: Owner.DetailsResponse | undefined;
    isLoading: boolean;
    aborted: OwnerDetailsAborted | undefined;
  };
  details: (
    partialRequest?: Owner.PartialDetailsRequest,
    options?: { signal?: AbortSignal; retry?: boolean }
  ) => Promise<
    reboot_web.ResponseOrAborted<
    Owner.DetailsResponse,
    OwnerDetailsAborted
    >
  >;
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

export interface PetMutators {
  register: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Pet.PartialRegisterRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Pet.RegisterResponse,
        PetRegisterAborted
      >>;

    pending: PendingPetRegisterMutation[];
  };
  update: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Pet.PartialUpdateRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Pet.UpdateResponse,
        PetUpdateAborted
      >>;

    pending: PendingPetUpdateMutation[];
  };
  recordVisit: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Pet.PartialRecordVisitRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Pet.RecordVisitResponse,
        PetRecordVisitAborted
      >>;

    pending: PendingPetRecordVisitMutation[];
  };
}

export interface PetIdempotently {
  register: {
    // Idempotent calls are functions and can be called directly.
    (partialRequest?: Pet.PartialRegisterRequest,
     options?: { metadata?: any }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Pet.RegisterResponse,
        PetRegisterAborted
      >>;

    pending: PendingPetRegisterMutation[];
  };
  update: {
    // Idempotent calls are functions and can be called directly.
    (partialRequest?: Pet.PartialUpdateRequest,
     options?: { metadata?: any }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Pet.UpdateResponse,
        PetUpdateAborted
      >>;

    pending: PendingPetUpdateMutation[];
  };
  recordVisit: {
    // Idempotent calls are functions and can be called directly.
    (partialRequest?: Pet.PartialRecordVisitRequest,
     options?: { metadata?: any }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Pet.RecordVisitResponse,
        PetRecordVisitAborted
      >>;

    pending: PendingPetRecordVisitMutation[];
  };
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


export interface UsePetApi {
  // The resolved state ID this hook is bound to. For UI states it
  // may have been inferred from the MCP session or a URL param
  // rather than passed explicitly, so reading it here is the way
  // to recover the concrete ID.
  state_id: string;
  mutators: PetMutators;
  idempotently: (args: { key: string }) => PetIdempotently;
  register: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Pet.PartialRegisterRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Pet.RegisterResponse,
        PetRegisterAborted
      >>;

    pending: PendingPetRegisterMutation[];
  };
  update: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Pet.PartialUpdateRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Pet.UpdateResponse,
        PetUpdateAborted
      >>;

    pending: PendingPetUpdateMutation[];
  };
  recordVisit: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Pet.PartialRecordVisitRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Pet.RecordVisitResponse,
        PetRecordVisitAborted
      >>;

    pending: PendingPetRecordVisitMutation[];
  };
  useDetails(
    partialRequest?: Pet.PartialDetailsRequest
  ): {
    response: Pet.DetailsResponse | undefined;
    isLoading: boolean;
    aborted: PetDetailsAborted | undefined;
  };
  useDetails(
    partialRequest?: Pet.PartialDetailsRequest,
    options?: { suspense: true }
  ): {
    response: Pet.DetailsResponse;
    isLoading: boolean;
    aborted: undefined;
  } | {
    response: undefined;
    isLoading: boolean;
    aborted: PetDetailsAborted;
  };
  useDetails(
    partialRequest?: Pet.PartialDetailsRequest,
    options?: { suspense: false }
  ): {
    response: Pet.DetailsResponse | undefined;
    isLoading: boolean;
    aborted: PetDetailsAborted | undefined;
  };
  details: (
    partialRequest?: Pet.PartialDetailsRequest,
    options?: { signal?: AbortSignal; retry?: boolean }
  ) => Promise<
    reboot_web.ResponseOrAborted<
    Pet.DetailsResponse,
    PetDetailsAborted
    >
  >;
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

export interface VeterinarianMutators {
  register: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Veterinarian.PartialRegisterRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Veterinarian.RegisterResponse,
        VeterinarianRegisterAborted
      >>;

    pending: PendingVeterinarianRegisterMutation[];
  };
  update: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Veterinarian.PartialUpdateRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Veterinarian.UpdateResponse,
        VeterinarianUpdateAborted
      >>;

    pending: PendingVeterinarianUpdateMutation[];
  };
}

export interface VeterinarianIdempotently {
  register: {
    // Idempotent calls are functions and can be called directly.
    (partialRequest?: Veterinarian.PartialRegisterRequest,
     options?: { metadata?: any }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Veterinarian.RegisterResponse,
        VeterinarianRegisterAborted
      >>;

    pending: PendingVeterinarianRegisterMutation[];
  };
  update: {
    // Idempotent calls are functions and can be called directly.
    (partialRequest?: Veterinarian.PartialUpdateRequest,
     options?: { metadata?: any }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Veterinarian.UpdateResponse,
        VeterinarianUpdateAborted
      >>;

    pending: PendingVeterinarianUpdateMutation[];
  };
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


export interface UseVeterinarianApi {
  // The resolved state ID this hook is bound to. For UI states it
  // may have been inferred from the MCP session or a URL param
  // rather than passed explicitly, so reading it here is the way
  // to recover the concrete ID.
  state_id: string;
  mutators: VeterinarianMutators;
  idempotently: (args: { key: string }) => VeterinarianIdempotently;
  register: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Veterinarian.PartialRegisterRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Veterinarian.RegisterResponse,
        VeterinarianRegisterAborted
      >>;

    pending: PendingVeterinarianRegisterMutation[];
  };
  update: {
    // Mutators are functions and can be called directly.
    (partialRequest?: Veterinarian.PartialUpdateRequest,
     options?: { metadata?: any, idempotencyKey?: string }
    ): Promise<
      reboot_web.ResponseOrAborted<
        Veterinarian.UpdateResponse,
        VeterinarianUpdateAborted
      >>;

    pending: PendingVeterinarianUpdateMutation[];
  };
  useDetails(
    partialRequest?: Veterinarian.PartialDetailsRequest
  ): {
    response: Veterinarian.DetailsResponse | undefined;
    isLoading: boolean;
    aborted: VeterinarianDetailsAborted | undefined;
  };
  useDetails(
    partialRequest?: Veterinarian.PartialDetailsRequest,
    options?: { suspense: true }
  ): {
    response: Veterinarian.DetailsResponse;
    isLoading: boolean;
    aborted: undefined;
  } | {
    response: undefined;
    isLoading: boolean;
    aborted: VeterinarianDetailsAborted;
  };
  useDetails(
    partialRequest?: Veterinarian.PartialDetailsRequest,
    options?: { suspense: false }
  ): {
    response: Veterinarian.DetailsResponse | undefined;
    isLoading: boolean;
    aborted: VeterinarianDetailsAborted | undefined;
  };
  details: (
    partialRequest?: Veterinarian.PartialDetailsRequest,
    options?: { signal?: AbortSignal; retry?: boolean }
  ) => Promise<
    reboot_web.ResponseOrAborted<
    Veterinarian.DetailsResponse,
    VeterinarianDetailsAborted
    >
  >;
}

export interface SettingsParams {
  id: string;
  storeMutationsLocallyInNamespace?: string;
}

class ClinicInstance {

  constructor(id: string, stateRef: string, url: string) {
    this.id = id;
    this.stateRef = stateRef;
    this.url = url;
    this.refs = 1;

    // An empty `id` marks the inert instance shared by every no-id
    // caller while no default ID has resolved (e.g. signed out): it
    // opens no socket so there's nothing to connect to.
    if (id !== "") {
      reboot_web.websockets.connect(this.url, this.stateRef);
      this.initializeWebSocket();
    }
  }

  private ref() {
    this.refs += 1;
    return this.refs;
  }

  private unref() {
    this.refs -= 1;

    if (this.refs === 0 && this.websocket !== undefined) {
      this.websocket.close();
       reboot_web.websockets.disconnect(this.url, this.stateRef);
    }

    return this.refs;
  }

  readonly id: string;
  readonly stateRef: string;
  private url: string;
  private refs: number;
  private observers: reboot_react.Observers = {};
  private loadingReaders = 0;
  private runningMutates: reboot_react.Mutate[] = [];
  private queuedMutates: reboot_react.Mutate[] = [];
  private flushMutates?: reboot_api.Event = undefined;
  private websocket?: WebSocket = undefined;
  private backoff: reboot_api.Backoff = new reboot_api.Backoff();

  private hasRunningMutations() {
    return this.runningMutates.length > 0;
  }

  private async flushMutations() {
    if (this.flushMutates === undefined) {
      this.flushMutates = new reboot_api.Event();
    }
    await this.flushMutates.wait();
  }

  private readersLoadedOrFailed() {
    this.flushMutates = undefined;

    if (this.queuedMutates.length > 0) {
      this.runningMutates = this.queuedMutates;
      this.queuedMutates = [];

      if (this.websocket?.readyState === WebSocket.OPEN) {
        for (const { request, update } of this.runningMutates) {
          update({ isLoading: true });
          try {
            this.websocket.send(request.toBinary());
          } catch {
            // We'll retry since we've stored in `*Mutates`.
          }
        }
      }
    }
  }

  private initializeWebSocket() {
    if (this.websocket === undefined && this.refs > 0 && this.id !== "") {
      const url = new URL(`${this.url}/__/reboot/rpc/${this.stateRef}`);
      url.protocol = url.protocol === "https:" ? "wss:" : "ws:";

      this.websocket = reboot_web.websockets.create(url);

      this.websocket.binaryType = "arraybuffer";

      this.websocket.onopen = () => {
        if (this.websocket?.readyState === WebSocket.OPEN) {
          for (const { request, update } of this.runningMutates) {
            update({ isLoading: true });
            try {
              this.websocket.send(request.toBinary());
            } catch {
              // We'll retry since we've stored in `*Mutates`.
            }
          }
        }
      };

      this.websocket.onerror = async () => {
        if (this.websocket !== undefined) {
          this.websocket = undefined;

          for (const { update } of this.runningMutates) {
            update({ isLoading: false, error: "WebSocket disconnected" });
          }

          if (this.refs > 0) {
            if (this.runningMutates.length > 0) {
              console.warn(
                `[Reboot] WebSocket disconnected, ${this.runningMutates.length} outstanding mutations will be retried when we reconnect`
              );
            }

            await this.backoff.wait();

            this.initializeWebSocket();
          }
        }
      };

      this.websocket.onclose = async () => {
        if (this.websocket !== undefined) {
          this.websocket = undefined;

          for (const { update } of this.runningMutates) {
            update({ isLoading: false, error: "WebSocket disconnected" });
          }

          if (this.refs > 0) {
            await this.backoff.wait();

            this.initializeWebSocket();
          }
        }
      };

      this.websocket.onmessage = async (event) => {
        const { resolve } = this.runningMutates[0];
        this.runningMutates.shift();

        const response = reboot_api.react_pb.MutateResponse.fromBinary(
          new Uint8Array(event.data)
        );

        resolve(response);

        if (
          this.flushMutates !== undefined &&
          this.runningMutates.length === 0
        ) {
          this.flushMutates.set();
        }
      };
    }
  }

  private async mutate(
    partialRequest: protobuf_es.PartialMessage<reboot_api.react_pb.MutateRequest>,
    update: (props: { isLoading: boolean; error?: any }) => void
  ): Promise<reboot_api.react_pb.MutateResponse> {
    const request = partialRequest instanceof reboot_api.react_pb.MutateRequest
      ? partialRequest
      : new reboot_api.react_pb.MutateRequest(partialRequest);

    return new Promise((resolve, _) => {
      if (this.loadingReaders === 0) {
        this.runningMutates = this.runningMutates.concat({ request, resolve, update });
        if (this.websocket?.readyState === WebSocket.OPEN) {
          update({ isLoading: true });
          try {
            this.websocket.send(request.toBinary());
          } catch {
            // We'll retry since we've stored in `*Mutates`.
          }
        }
      } else {
        this.queuedMutates = this.queuedMutates.concat({ request, resolve, update });
      }
    });
  }

  private async read<
    RequestType extends protobuf_es.Message<RequestType>,
    ResponseType extends protobuf_es.Message<ResponseType>,
    >(
    method: string,
    serializedRequest: Uint8Array,
    bearerToken: string | undefined,
    responseType: protobuf_es.MessageType<ResponseType>,
    reader: reboot_react.Reader<ResponseType>
  ) {
    const queryRequest = new reboot_api.react_pb.QueryRequest({
      method,
      request: serializedRequest,
      ...(bearerToken !== undefined && { bearerToken } || {}),
    });

    // Expected idempotency key we should observe due to a mutation.
    interface Expected {
      // Idempotency key of mutation.
      idempotencyKey: string;

      // Callback when we've observed this idempotency key.
      observed: (callback: () => void) => Promise<void>;

      // Callback when we no longer care about observing.
      aborted: () => void;
    }

    let expecteds: Expected[] = [];

    // When we disconnect we may not be able to observe
    // responses due to mutations yet there may still be
    // some outstanding responses that are expected which
    // we treat as "orphans" in the sense that we won't
    // observe their idempotency keys but once we reconnect
    // we will still have observed their effects and can
    // call `observed()` on them.
    let orphans: Expected[] = [];

    const id = `${uuidv4()}`;

    this.observers[id] = {
      observe: (
        idempotencyKey: string,
        observed: (callback: () => void) => Promise<void>,
        aborted: () => void
      ) => {
        expecteds = expecteds.concat({ idempotencyKey, observed, aborted })
      },
      unobserve: (idempotencyKey: string) => {
        expecteds = expecteds.filter(
          expected => expected.idempotencyKey !== idempotencyKey
        );

        orphans = orphans.filter(
          orphan => orphan.idempotencyKey !== idempotencyKey
        );
      }
    };

    try {
      await reboot_api.retryForever(async () => {
        let loaded = false;
        this.loadingReaders += 1;

        // Any mutations started after we've incremented
        // `this.loadingReaders` will be queued until after
        // all the readers have loaded and thus (1) we know all
        // current `expected` are actually `orphans` that
        // we will haved "observed" once we are (re)connected
        // because we flush mutations before starting to read
        // and (2) all queued mutations can stay in `expected`
        // because we will in fact be able to observe them
        // since they won't get sent over the websocket
        // until after we are (re)connected.
        //
        // NOTE: we need to concatenate with `orphans`
        // because we may try to (re)connect multiple times
        // and between each try more mutations may have been
        // made (or queued ones will be moved to running).
        orphans = [...orphans, ...expecteds];
        expecteds = [];

        try {
          // Wait for potentially completed mutations to flush
          // before starting to read so that we read the latest
          // state including those mutations.
          if (this.hasRunningMutations()) {
            await this.flushMutations();
          }

          reader.setIsLoading(true);

          const queryResponses = reboot_web.reactiveReader({
            endpoint: `${this.url}/__/reboot/rpc/${this.stateRef}`,
            request: queryRequest,
            signal: reader.abortController.signal,
          });

          for await (const queryResponse of queryResponses) {
            if (!loaded) {
              if ((this.loadingReaders -= 1) === 0) {
                this.readersLoadedOrFailed();
              }
              loaded = true;
            }

            reader.setIsLoading(false);

            const response = queryResponse.responseOrStatus.case === "response"
              ? responseType.fromBinary(queryResponse.responseOrStatus.value)
              : undefined;

            // If we were disconnected it must be that we've
            // observed all `orphans` because we waited
            // for any mutations to flush before we re-started to
            // read.
            const haveOrphans = orphans.length;
            if (haveOrphans > 0) {
              // We mark all mutations as observed except the
              // last one which we also invoke all `setResponse`s.
              // In this way we effectively create a barrier
              // for all readers that will synchronize on the last
              // mutation, but note that this still may lead
              // to some partial state/response updates because
              // one reader may have actually received a response
              // while another reader got disconnected. While this
              // is likely very rare, it is possible. Mitigating
              // this issue is non-trivial and for now we have
              // no plans to address it.
              for (let i = 0; i < orphans.length - 1; i++) {
                orphans[i].observed(() => {});
              }
              await orphans[orphans.length - 1].observed(() => {
                if (response !== undefined) {
                  reader.setResponse(response);
                }
              });

              orphans = [];
            }
            // We want to check the orphans list AND the expecteds list because
            // it could be possible that we receive a query response that
            // contains an idempotency key that we are expecting while having an
            // orphans list with a length greater than 0. In this case, we don't
            // want to skip checking the expecteds list just because we have
            // already checked the orphans list.
            if (
              expecteds.length > 0 &&
              queryResponse.idempotencyKeys.includes(
                expecteds[0].idempotencyKey
              )
            ) {
              await expecteds[0].observed(() => {
                if (response !== undefined) {
                  reader.setResponse(response);
                }
                expecteds.shift();
              });
            }
            // If we don't have any orphans to observe and we don't have any expecteds to observe,
	          // or at least, the first expecteds _is not observed_ by this response, then go ahead and
	          // pass on the response because it might contain new data that should get shown to the
	          // user (e.g., in a chat room this could be a new message from a different user).
            else if (response !== undefined && !haveOrphans) {
              reader.setResponse(response);
            }
          }

          throw new Error('Not expecting stream to ever be done');
        } catch (e: unknown) {
          if (!loaded) {
            if ((this.loadingReaders -= 1) === 0) {
              this.readersLoadedOrFailed();
            }
          }

          loaded = false;

          if (reader.abortController.signal.aborted) {
            for (const { aborted } of [...orphans, ...expecteds]) {
              aborted();
            }
            return;
          }

          // Intentionally leave `isLoading: true` here. The outer
          // `retryForever(...)` will run another attempt and call
          // `reader.setIsLoading(true)` again at the top of the
          // try block, but if we cleared it to `false` here first
          // consumers would observe a brief `false → true → false
          // → true ...` flip-flop on every retry while we're
          // actually still trying to (re)connect. Once a response
          // finally arrives the success path sets it to `false`.

          if (e instanceof reboot_api.Status) {
            reader.setStatus(e);
          } else {
            console.warn(
              `[Reboot] Caught unknown exception: ${e instanceof Error ? e.message : JSON.stringify(e)}`
            );
          }

          throw e; // This just retries!
        }
      });
    } finally {
      delete this.observers[id];
    }
  }


  private useCreateMutations: (
    PendingClinicCreateMutation)[] = [];

  private useCreateSetPendings: {
    [id: string]: (mutations: PendingClinicCreateMutation[]) => void
  } = {};

  async create(
    mutation: PendingClinicCreateMutation
  ): Promise<
    reboot_web.ResponseOrAborted<
      Clinic.CreateResponse,
      ClinicCreateAborted
  >> {
    // We always have at least 1 observer which is this function!
    let remainingObservers = 1;

    const event = new reboot_api.Event();

    let callbacks: (() => void)[] = [];

    const observed = (callback: () => void) => {
      callbacks = callbacks.concat(callback);
      remainingObservers -= 1;
      if (remainingObservers === 0) {
        for (const callback of callbacks) {
          callback();
        }
        event.set();
      }
      return event.wait();
    };

    const aborted = () => {
      observed(() => {});
    }

    // Tell observers about this pending mutation.
    for (const id in this.observers) {
      remainingObservers += 1;
      this.observers[id].observe(mutation.idempotencyKey, observed, aborted);
    }

    this.useCreateMutations = this.useCreateMutations.concat(mutation);

    for (const setPending of Object.values(this.useCreateSetPendings)) {
      setPending(this.useCreateMutations);
    }

    return new Promise<
      reboot_web.ResponseOrAborted<
        Clinic.CreateResponse,
        ClinicCreateAborted
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "Create",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
            bearerToken: mutation.bearerToken,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            let rerender = false;
            for (const m of this.useCreateMutations) {
              if (m === mutation) {
                if (m.isLoading !== isLoading) {
                  m.isLoading = isLoading;
                  rerender = true;
                }
                if (error !== undefined && m.error !== error) {
                  m.error = error;
                  rerender = true;
                }
              }
            }

            if (rerender) {
              for (const setPending of Object.values(this.useCreateSetPendings)) {
                setPending(this.useCreateMutations);
              }
            }
          }
        );

        const removeMutationsAndSetPending = () => {
          this.useCreateMutations =
            this.useCreateMutations.filter(m => m !== mutation);

          for (const setPending of Object.values(this.useCreateSetPendings)) {
            setPending(this.useCreateMutations);
          }
        }


        switch (responseOrStatus.case) {
          case "response": {
            await observed(() => {
              removeMutationsAndSetPending();
              resolve({
                response:
                  ClinicCreateResponseFromProtobufShape(
                    Empty.fromBinary(
                    responseOrStatus.value
                  )
                )
              });
            });
            break;
          }
          case "status": {
            // Let the observers know they no longer should expect to
            // observe this idempotency key.
            for (const id in this.observers) {
              this.observers[id].unobserve(mutation.idempotencyKey);
            }

            const status = reboot_api.Status.fromJsonString(responseOrStatus.value);

            const aborted = ClinicCreateAborted.fromStatus(status);

            console.warn(
              `[Reboot] 'Clinic.Create' aborted with ${aborted.message}`
            );

            removeMutationsAndSetPending();
            resolve({ aborted });

            break;
          }
          default: {
            // TODO(benh): while this is a _really_ fatal error,
            // should we still set `aborted` instead of throwing?
            reject(new Error('Expecting either a response or a status'));
          }
        }
      });
  }

  useCreate(
    id: string,
    setPending: (mutations: PendingClinicCreateMutation[]) => void
  ) {
    this.useCreateSetPendings[id] = setPending;
  }

  unuseCreate(id: string) {
    delete this.useCreateSetPendings[id];
  }


  private useCreateOwnerMutations: (
    PendingClinicCreateOwnerMutation)[] = [];

  private useCreateOwnerSetPendings: {
    [id: string]: (mutations: PendingClinicCreateOwnerMutation[]) => void
  } = {};

  async createOwner(
    mutation: PendingClinicCreateOwnerMutation
  ): Promise<
    reboot_web.ResponseOrAborted<
      Clinic.CreateOwnerResponse,
      ClinicCreateOwnerAborted
  >> {
    // We always have at least 1 observer which is this function!
    let remainingObservers = 1;

    const event = new reboot_api.Event();

    let callbacks: (() => void)[] = [];

    const observed = (callback: () => void) => {
      callbacks = callbacks.concat(callback);
      remainingObservers -= 1;
      if (remainingObservers === 0) {
        for (const callback of callbacks) {
          callback();
        }
        event.set();
      }
      return event.wait();
    };

    const aborted = () => {
      observed(() => {});
    }

    // Tell observers about this pending mutation.
    for (const id in this.observers) {
      remainingObservers += 1;
      this.observers[id].observe(mutation.idempotencyKey, observed, aborted);
    }

    this.useCreateOwnerMutations = this.useCreateOwnerMutations.concat(mutation);

    for (const setPending of Object.values(this.useCreateOwnerSetPendings)) {
      setPending(this.useCreateOwnerMutations);
    }

    return new Promise<
      reboot_web.ResponseOrAborted<
        Clinic.CreateOwnerResponse,
        ClinicCreateOwnerAborted
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "CreateOwner",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
            bearerToken: mutation.bearerToken,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            let rerender = false;
            for (const m of this.useCreateOwnerMutations) {
              if (m === mutation) {
                if (m.isLoading !== isLoading) {
                  m.isLoading = isLoading;
                  rerender = true;
                }
                if (error !== undefined && m.error !== error) {
                  m.error = error;
                  rerender = true;
                }
              }
            }

            if (rerender) {
              for (const setPending of Object.values(this.useCreateOwnerSetPendings)) {
                setPending(this.useCreateOwnerMutations);
              }
            }
          }
        );

        const removeMutationsAndSetPending = () => {
          this.useCreateOwnerMutations =
            this.useCreateOwnerMutations.filter(m => m !== mutation);

          for (const setPending of Object.values(this.useCreateOwnerSetPendings)) {
            setPending(this.useCreateOwnerMutations);
          }
        }


        switch (responseOrStatus.case) {
          case "response": {
            await observed(() => {
              removeMutationsAndSetPending();
              resolve({
                response:
                  ClinicCreateOwnerResponseFromProtobufShape(
                    petclinic_pb.ClinicCreateOwnerResponse.fromBinary(
                    responseOrStatus.value
                  )
                )
              });
            });
            break;
          }
          case "status": {
            // Let the observers know they no longer should expect to
            // observe this idempotency key.
            for (const id in this.observers) {
              this.observers[id].unobserve(mutation.idempotencyKey);
            }

            const status = reboot_api.Status.fromJsonString(responseOrStatus.value);

            const aborted = ClinicCreateOwnerAborted.fromStatus(status);

            console.warn(
              `[Reboot] 'Clinic.CreateOwner' aborted with ${aborted.message}`
            );

            removeMutationsAndSetPending();
            resolve({ aborted });

            break;
          }
          default: {
            // TODO(benh): while this is a _really_ fatal error,
            // should we still set `aborted` instead of throwing?
            reject(new Error('Expecting either a response or a status'));
          }
        }
      });
  }

  useCreateOwner(
    id: string,
    setPending: (mutations: PendingClinicCreateOwnerMutation[]) => void
  ) {
    this.useCreateOwnerSetPendings[id] = setPending;
  }

  unuseCreateOwner(id: string) {
    delete this.useCreateOwnerSetPendings[id];
  }


  private useSearchOwnersReaders: {
    [requestBearerTokenHash: string]: reboot_react.Reader<petclinic_pb.ClinicSearchOwnersResponse>
  } = {};

  // `FinalizationRegistry` lets us abort a reader once React has
  // garbage-collected its promise (i.e. abandoned it). It is absent on
  // some runtimes (e.g. React Native's Hermes engine), where we simply
  // skip this cleanup and rely on the `unuse...` timeout path instead.
  private searchOwnersFinalizationRegistry =
    typeof FinalizationRegistry !== "undefined"
      ? new FinalizationRegistry<() => void>((finalize) => finalize())
      : undefined;

  startSearchOwners(
    requestBearerTokenHash: string,
    serializedRequest: Uint8Array,
    bearerToken: string | undefined,
    offlineCacheEnabled: boolean,
    cacheKey: string | null
  ) {
    let reader = this.useSearchOwnersReaders[requestBearerTokenHash];

    if (reader === undefined) {
      const event = new reboot_api.Event();

      const promise = event.wait();

      reader = {
        abortController: new AbortController(),
        event,
        promise,
        used: false,
        scheduledUnusedTimeoutsCount: 0,
        setResponses: {},
        setIsLoadings: {},
        setStatuses: {},

        setResponse(
          response: petclinic_pb.ClinicSearchOwnersResponse,
          { cache }: { cache: boolean } = { cache: true }
        ) {
          // Store the response, delete the status.
          this.response = response;
          delete this.status;

          // Trigger response or aborted has been received event (if
          // it wasn't triggered already).
          this.event.set();

          // Dispatch to all listeners.
          for (const setResponse of Object.values(this.setResponses)) {
            setResponse(response);
          }

          // Cache response if applicable.
          if (cache && offlineCacheEnabled) {
            reboot_api.assert(cacheKey !== null);
            const cachedResponse = response.toJsonString();
            reboot_web.offlineCache().set(cacheKey, cachedResponse)
              .catch((error) => {
                console.warn(
                  `[Reboot] Setting of offline reader cache entry for 'Clinic.SearchOwners' errored with ${error}`
                );
              });
          }
        },

        setIsLoading(isLoading: boolean) {
          for (const setIsLoading of Object.values(this.setIsLoadings)) {
            setIsLoading(isLoading);
          }
        },

        setStatus(status: reboot_api.Status) {
          // Store the status, delete the response.
          this.status = status;
          delete this.response;

          // Trigger response or aborted has been received event (if
          // it wasn't triggered already).
          this.event.set();

          for (const setStatus of Object.values(this.setStatuses)) {
            setStatus(status);
          }
        },
      };

      this.searchOwnersFinalizationRegistry?.register(
        promise,
        () => {
          if (!reader.used) {
            delete this.useSearchOwnersReaders[requestBearerTokenHash];
            reader.abortController.abort();
          }
        }
      );

      // We want to remove the promise so that it can be garbage collected
      // which is our indication that React is no longer using it. But this
      // races with calls to `useSearchOwners(...)`
      // that might be adding their `setResponse`, `setIsLoading`, etc, so
      // we delay deleting the promise for at least a second.
      //
      // Note that deleting the promise is okay because all subsequent calls
      // will simply use the `reader.response` since it will no longer be
      // undefined.
      reader.promise.then(async () => {
        // Allow the call to `useSearchOwners(...)`
        // at least 5 seconds to indicate that the reader is being used,
        // afterwhich, once `reader.promise` gets garbage collected
        // we'll know that it must have been abandoned by React, e.g.,
        // because the component was suspended and never committed.
        await reboot_api.sleep({ ms: 5000 });

        delete reader.promise;
      });

      this.useSearchOwnersReaders[requestBearerTokenHash] = reader;

      // Start fetching from the server.
      this.read(
        "SearchOwners",
        serializedRequest,
        bearerToken,
        petclinic_pb.ClinicSearchOwnersResponse,
        reader
      );

      // Check if there is a cached result if applicable.
      if (offlineCacheEnabled) {
        reboot_api.assert(cacheKey !== null);

        reboot_web.offlineCache().get(cacheKey).then((cachedResponse) => {
          if (cachedResponse !== null) {
            // We only want to set the response if we haven't already
            // gotten a response from the server as it is the authority
            // and should take precedence.
            if (reader.response === undefined) {
              reader.setResponse(
                petclinic_pb.ClinicSearchOwnersResponse.fromJsonString(cachedResponse),
                { cache: false } // Don't re-cache the value!
              );
            }
          }
        }).catch((error) => {
          console.warn(
            `[Reboot] Retrieval of offline reader cache entry for 'Clinic.SearchOwners' errored with ${error}`
          );
        });
      }
    }

    reboot_api.assert(reader !== undefined);

    return reader;
  }

  useSearchOwners(
    id: string,
    requestBearerTokenHash: string,
    serializedRequest: Uint8Array,
    bearerToken: string | undefined,
    offlineCacheEnabled: boolean,
    cacheKey: string | null,
    setResponse: (response: petclinic_pb.ClinicSearchOwnersResponse) => void,
    setIsLoading: (isLoading: boolean) => void,
    setStatus: (status: reboot_api.Status) => void
  ) {
    // We need to call start here because with strict mode the
    // `useEffect` that calls this method will also call "unuse"
    // which will mean the next time the `useEffect` calls here
    // we'll create a new reader in start.
    const reader = this.startSearchOwners(
      requestBearerTokenHash,
      serializedRequest,
      bearerToken,
      offlineCacheEnabled,
      cacheKey
    );

    reboot_api.assert(reader !== undefined);

    // Indicate that the reader has properly been used so that we don't
    // clean it up prematurely.
    reader.used = true;

    reader.setResponses[id] = setResponse;
    reader.setIsLoadings[id] = setIsLoading;
    reader.setStatuses[id] = setStatus;

    // If we already have a `response` or `status` need to set it.
    if (reader.response) {
      setResponse(reader.response);
      setIsLoading(false);
    } else if (reader.status) {
      setStatus(reader.status);
    }
  }

  unuseSearchOwners(
    id: string,
    requestBearerTokenHash: string,
  ) {
    const reader = this.useSearchOwnersReaders[requestBearerTokenHash];

    reboot_api.assert(reader !== undefined);

    delete reader.setResponses[id];
    delete reader.setIsLoadings[id];
    delete reader.setStatuses[id];

    // Schedule a timeout to delete and abort this reader if we're the
    // last user. We need a timeout because, with StrictMode turned on,
    // we can't remove the reader right away otherwise we won't have a
    // stable Event and Promise. We use 3 seconds but may need to make
    // configurable depending on the application.
    if (Object.values(reader.setResponses).length === 0) {
      reader.scheduledUnusedTimeoutsCount += 1;
      setTimeout(() => {
        reader.scheduledUnusedTimeoutsCount -= 1;
        if (
          reader.scheduledUnusedTimeoutsCount === 0 &&
          Object.values(reader.setResponses).length === 0
        ) {
          delete this.useSearchOwnersReaders[requestBearerTokenHash];
          reader.abortController.abort();
        }
      }, 3000);
    }
  }


  private useAddVeterinarianMutations: (
    PendingClinicAddVeterinarianMutation)[] = [];

  private useAddVeterinarianSetPendings: {
    [id: string]: (mutations: PendingClinicAddVeterinarianMutation[]) => void
  } = {};

  async addVeterinarian(
    mutation: PendingClinicAddVeterinarianMutation
  ): Promise<
    reboot_web.ResponseOrAborted<
      Clinic.AddVeterinarianResponse,
      ClinicAddVeterinarianAborted
  >> {
    // We always have at least 1 observer which is this function!
    let remainingObservers = 1;

    const event = new reboot_api.Event();

    let callbacks: (() => void)[] = [];

    const observed = (callback: () => void) => {
      callbacks = callbacks.concat(callback);
      remainingObservers -= 1;
      if (remainingObservers === 0) {
        for (const callback of callbacks) {
          callback();
        }
        event.set();
      }
      return event.wait();
    };

    const aborted = () => {
      observed(() => {});
    }

    // Tell observers about this pending mutation.
    for (const id in this.observers) {
      remainingObservers += 1;
      this.observers[id].observe(mutation.idempotencyKey, observed, aborted);
    }

    this.useAddVeterinarianMutations = this.useAddVeterinarianMutations.concat(mutation);

    for (const setPending of Object.values(this.useAddVeterinarianSetPendings)) {
      setPending(this.useAddVeterinarianMutations);
    }

    return new Promise<
      reboot_web.ResponseOrAborted<
        Clinic.AddVeterinarianResponse,
        ClinicAddVeterinarianAborted
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "AddVeterinarian",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
            bearerToken: mutation.bearerToken,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            let rerender = false;
            for (const m of this.useAddVeterinarianMutations) {
              if (m === mutation) {
                if (m.isLoading !== isLoading) {
                  m.isLoading = isLoading;
                  rerender = true;
                }
                if (error !== undefined && m.error !== error) {
                  m.error = error;
                  rerender = true;
                }
              }
            }

            if (rerender) {
              for (const setPending of Object.values(this.useAddVeterinarianSetPendings)) {
                setPending(this.useAddVeterinarianMutations);
              }
            }
          }
        );

        const removeMutationsAndSetPending = () => {
          this.useAddVeterinarianMutations =
            this.useAddVeterinarianMutations.filter(m => m !== mutation);

          for (const setPending of Object.values(this.useAddVeterinarianSetPendings)) {
            setPending(this.useAddVeterinarianMutations);
          }
        }


        switch (responseOrStatus.case) {
          case "response": {
            await observed(() => {
              removeMutationsAndSetPending();
              resolve({
                response:
                  ClinicAddVeterinarianResponseFromProtobufShape(
                    petclinic_pb.ClinicAddVeterinarianResponse.fromBinary(
                    responseOrStatus.value
                  )
                )
              });
            });
            break;
          }
          case "status": {
            // Let the observers know they no longer should expect to
            // observe this idempotency key.
            for (const id in this.observers) {
              this.observers[id].unobserve(mutation.idempotencyKey);
            }

            const status = reboot_api.Status.fromJsonString(responseOrStatus.value);

            const aborted = ClinicAddVeterinarianAborted.fromStatus(status);

            console.warn(
              `[Reboot] 'Clinic.AddVeterinarian' aborted with ${aborted.message}`
            );

            removeMutationsAndSetPending();
            resolve({ aborted });

            break;
          }
          default: {
            // TODO(benh): while this is a _really_ fatal error,
            // should we still set `aborted` instead of throwing?
            reject(new Error('Expecting either a response or a status'));
          }
        }
      });
  }

  useAddVeterinarian(
    id: string,
    setPending: (mutations: PendingClinicAddVeterinarianMutation[]) => void
  ) {
    this.useAddVeterinarianSetPendings[id] = setPending;
  }

  unuseAddVeterinarian(id: string) {
    delete this.useAddVeterinarianSetPendings[id];
  }


  private useListVeterinariansReaders: {
    [requestBearerTokenHash: string]: reboot_react.Reader<petclinic_pb.ClinicListVeterinariansResponse>
  } = {};

  // `FinalizationRegistry` lets us abort a reader once React has
  // garbage-collected its promise (i.e. abandoned it). It is absent on
  // some runtimes (e.g. React Native's Hermes engine), where we simply
  // skip this cleanup and rely on the `unuse...` timeout path instead.
  private listVeterinariansFinalizationRegistry =
    typeof FinalizationRegistry !== "undefined"
      ? new FinalizationRegistry<() => void>((finalize) => finalize())
      : undefined;

  startListVeterinarians(
    requestBearerTokenHash: string,
    serializedRequest: Uint8Array,
    bearerToken: string | undefined,
    offlineCacheEnabled: boolean,
    cacheKey: string | null
  ) {
    let reader = this.useListVeterinariansReaders[requestBearerTokenHash];

    if (reader === undefined) {
      const event = new reboot_api.Event();

      const promise = event.wait();

      reader = {
        abortController: new AbortController(),
        event,
        promise,
        used: false,
        scheduledUnusedTimeoutsCount: 0,
        setResponses: {},
        setIsLoadings: {},
        setStatuses: {},

        setResponse(
          response: petclinic_pb.ClinicListVeterinariansResponse,
          { cache }: { cache: boolean } = { cache: true }
        ) {
          // Store the response, delete the status.
          this.response = response;
          delete this.status;

          // Trigger response or aborted has been received event (if
          // it wasn't triggered already).
          this.event.set();

          // Dispatch to all listeners.
          for (const setResponse of Object.values(this.setResponses)) {
            setResponse(response);
          }

          // Cache response if applicable.
          if (cache && offlineCacheEnabled) {
            reboot_api.assert(cacheKey !== null);
            const cachedResponse = response.toJsonString();
            reboot_web.offlineCache().set(cacheKey, cachedResponse)
              .catch((error) => {
                console.warn(
                  `[Reboot] Setting of offline reader cache entry for 'Clinic.ListVeterinarians' errored with ${error}`
                );
              });
          }
        },

        setIsLoading(isLoading: boolean) {
          for (const setIsLoading of Object.values(this.setIsLoadings)) {
            setIsLoading(isLoading);
          }
        },

        setStatus(status: reboot_api.Status) {
          // Store the status, delete the response.
          this.status = status;
          delete this.response;

          // Trigger response or aborted has been received event (if
          // it wasn't triggered already).
          this.event.set();

          for (const setStatus of Object.values(this.setStatuses)) {
            setStatus(status);
          }
        },
      };

      this.listVeterinariansFinalizationRegistry?.register(
        promise,
        () => {
          if (!reader.used) {
            delete this.useListVeterinariansReaders[requestBearerTokenHash];
            reader.abortController.abort();
          }
        }
      );

      // We want to remove the promise so that it can be garbage collected
      // which is our indication that React is no longer using it. But this
      // races with calls to `useListVeterinarians(...)`
      // that might be adding their `setResponse`, `setIsLoading`, etc, so
      // we delay deleting the promise for at least a second.
      //
      // Note that deleting the promise is okay because all subsequent calls
      // will simply use the `reader.response` since it will no longer be
      // undefined.
      reader.promise.then(async () => {
        // Allow the call to `useListVeterinarians(...)`
        // at least 5 seconds to indicate that the reader is being used,
        // afterwhich, once `reader.promise` gets garbage collected
        // we'll know that it must have been abandoned by React, e.g.,
        // because the component was suspended and never committed.
        await reboot_api.sleep({ ms: 5000 });

        delete reader.promise;
      });

      this.useListVeterinariansReaders[requestBearerTokenHash] = reader;

      // Start fetching from the server.
      this.read(
        "ListVeterinarians",
        serializedRequest,
        bearerToken,
        petclinic_pb.ClinicListVeterinariansResponse,
        reader
      );

      // Check if there is a cached result if applicable.
      if (offlineCacheEnabled) {
        reboot_api.assert(cacheKey !== null);

        reboot_web.offlineCache().get(cacheKey).then((cachedResponse) => {
          if (cachedResponse !== null) {
            // We only want to set the response if we haven't already
            // gotten a response from the server as it is the authority
            // and should take precedence.
            if (reader.response === undefined) {
              reader.setResponse(
                petclinic_pb.ClinicListVeterinariansResponse.fromJsonString(cachedResponse),
                { cache: false } // Don't re-cache the value!
              );
            }
          }
        }).catch((error) => {
          console.warn(
            `[Reboot] Retrieval of offline reader cache entry for 'Clinic.ListVeterinarians' errored with ${error}`
          );
        });
      }
    }

    reboot_api.assert(reader !== undefined);

    return reader;
  }

  useListVeterinarians(
    id: string,
    requestBearerTokenHash: string,
    serializedRequest: Uint8Array,
    bearerToken: string | undefined,
    offlineCacheEnabled: boolean,
    cacheKey: string | null,
    setResponse: (response: petclinic_pb.ClinicListVeterinariansResponse) => void,
    setIsLoading: (isLoading: boolean) => void,
    setStatus: (status: reboot_api.Status) => void
  ) {
    // We need to call start here because with strict mode the
    // `useEffect` that calls this method will also call "unuse"
    // which will mean the next time the `useEffect` calls here
    // we'll create a new reader in start.
    const reader = this.startListVeterinarians(
      requestBearerTokenHash,
      serializedRequest,
      bearerToken,
      offlineCacheEnabled,
      cacheKey
    );

    reboot_api.assert(reader !== undefined);

    // Indicate that the reader has properly been used so that we don't
    // clean it up prematurely.
    reader.used = true;

    reader.setResponses[id] = setResponse;
    reader.setIsLoadings[id] = setIsLoading;
    reader.setStatuses[id] = setStatus;

    // If we already have a `response` or `status` need to set it.
    if (reader.response) {
      setResponse(reader.response);
      setIsLoading(false);
    } else if (reader.status) {
      setStatus(reader.status);
    }
  }

  unuseListVeterinarians(
    id: string,
    requestBearerTokenHash: string,
  ) {
    const reader = this.useListVeterinariansReaders[requestBearerTokenHash];

    reboot_api.assert(reader !== undefined);

    delete reader.setResponses[id];
    delete reader.setIsLoadings[id];
    delete reader.setStatuses[id];

    // Schedule a timeout to delete and abort this reader if we're the
    // last user. We need a timeout because, with StrictMode turned on,
    // we can't remove the reader right away otherwise we won't have a
    // stable Event and Promise. We use 3 seconds but may need to make
    // configurable depending on the application.
    if (Object.values(reader.setResponses).length === 0) {
      reader.scheduledUnusedTimeoutsCount += 1;
      setTimeout(() => {
        reader.scheduledUnusedTimeoutsCount -= 1;
        if (
          reader.scheduledUnusedTimeoutsCount === 0 &&
          Object.values(reader.setResponses).length === 0
        ) {
          delete this.useListVeterinariansReaders[requestBearerTokenHash];
          reader.abortController.abort();
        }
      }, 3000);
    }
  }


  private static instances: { [id: string]: ClinicInstance } = {};

  static use(id: string, stateRef: string, url: string) {
    if (!(id in this.instances)) {
      this.instances[id] = new ClinicInstance(id, stateRef, url);
    } else {
      this.instances[id].ref();
    }

    return this.instances[id];
  }

  unuse() {
    if (this.unref() === 0) {
      delete ClinicInstance.instances[this.id];
    }
  }
}


// Called with an explicit `id`: bound to that state, returns the
// `UseClinicApi` handle directly.
export function useClinic(
  args: { id: string }
): UseClinicApi;
// Called without an explicit `id`: resolves the default ID for this
// state. `clinic` is the
// handle once a default ID resolves, or `undefined` when there is
// none (e.g. signed out); `isLoading` is true until resolution
// settles.
export function useClinic(
  args?: undefined
): {
  clinic: UseClinicApi | undefined;
  isLoading: boolean;
};
export function useClinic(
  { id: providedId }: { id?: string } = {}
):
  | UseClinicApi
  | {
      clinic: UseClinicApi | undefined;
      isLoading: boolean;
    } {
  // Resolve `id` from the frontend-agnostic state-ID map. A `null` map
  // means that resolution is still in flight; an empty map means it
  // resolved with no default ID for us.
  const defaultIds = useDefaultStateIds();
  const isLoading = defaultIds === null;

  // Resolve ID: explicit > URL param (dev) > default-ID map.
  const devId = useMemo(() => {
    // React Native defines `window` but not `window.location`, so both
    // must be checked.
    if (
      typeof window !== "undefined" &&
      typeof window.location !== "undefined"
    ) {
      return new URLSearchParams(
        window.location.search
      ).get("petclinic.v1.Clinic.id");
    }
    return null;
  }, []);

  const toolInputId =
    typeof defaultIds?.["petclinic.v1.Clinic"] === "string"
      ? defaultIds["petclinic.v1.Clinic"]
      : null;

  const resolvedId = providedId ?? devId ?? toolInputId;
  // Without a resolved ID we still run every hook below (rules of
  // hooks), binding to the inert empty-ID instance that opens no
  // socket.
  const id = resolvedId ?? "";
  // The unresolved no-id case carries an empty `stateRef` rather than
  // computing one. Keyed on the id being unresolved — an explicitly
  // passed empty id still reaches `stateIdToRef`, which rejects it.
  const stateRef =
    resolvedId == null
      ? ""
      : reboot_api.stateIdToRef("petclinic.v1.Clinic", id);

  const rebootClient = reboot_react.useRebootClient();

  const url = rebootClient.url;
  const bearerToken = rebootClient.bearerToken;
  const refreshBearerToken = useRefreshBearerToken();

  const [instance, setInstance] = useState(() => {
    return ClinicInstance.use(
      id, stateRef, url
    );
  });

  if (instance.id !== id) {
    setInstance(
      ClinicInstance.use(
        id, stateRef, url
      )
    );
  }

  useEffect(() => {
    return () => {
      instance.unuse();
    };
  }, [instance]);

  const headers = useMemo(() => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.append("Connection", "keep-alive");

    if (bearerToken !== undefined) {
      headers.append("Authorization", `Bearer ${bearerToken}`);
    }

    return headers;
  }, [bearerToken]);


  function useCreate() {
    const [
      pending,
      setPending
    ] = useState<PendingClinicCreateMutation[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useCreate(id, setPending);
      return () => {
        instance.unuseCreate(id);
      };
    }, [instance]);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const create = useMemo(() => {
      const method = async (
        partialRequest: Clinic.PartialCreateRequest = {},
        options?: { metadata?: any, key?: string }
      ) => {
        const request = ClinicCreateRequestToProtobuf(partialRequest);

        const idempotencyKey = options?.idempotencyKey ?? options?.key ?? reboot_web.makeExpiringIdempotencyKey();

        const mutation = {
          request,
          idempotencyKey,
          bearerToken,
          metadata: options?.metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        const result = await instance.create(mutation);

        // If the server rejected us due to an expired token,
        // refresh via the frontend's bearer-refresh and retry
        // once (mirrors the unary-call path).
        if (
          result.aborted !== undefined &&
          result.aborted.code === reboot_api.StatusCode.UNAUTHENTICATED &&
          refreshBearerToken
        ) {
          const newToken = await refreshBearerToken();
          if (newToken !== undefined) {
            return instance.create(
              { ...mutation, bearerToken: newToken }
            );
          }
        }

        return result;
      };

      method.pending =
        new Array<PendingClinicCreateMutation>();

      return method;
    }, [instance, bearerToken, refreshBearerToken]);

    create.pending = pending;

    return create;
  }

  const create = useCreate();


  function useCreateOwner() {
    const [
      pending,
      setPending
    ] = useState<PendingClinicCreateOwnerMutation[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useCreateOwner(id, setPending);
      return () => {
        instance.unuseCreateOwner(id);
      };
    }, [instance]);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const createOwner = useMemo(() => {
      const method = async (
        partialRequest: Clinic.PartialCreateOwnerRequest = {},
        options?: { metadata?: any, key?: string }
      ) => {
        const request = ClinicCreateOwnerRequestToProtobuf(partialRequest);

        const idempotencyKey = options?.idempotencyKey ?? options?.key ?? reboot_web.makeExpiringIdempotencyKey();

        const mutation = {
          request,
          idempotencyKey,
          bearerToken,
          metadata: options?.metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        const result = await instance.createOwner(mutation);

        // If the server rejected us due to an expired token,
        // refresh via the frontend's bearer-refresh and retry
        // once (mirrors the unary-call path).
        if (
          result.aborted !== undefined &&
          result.aborted.code === reboot_api.StatusCode.UNAUTHENTICATED &&
          refreshBearerToken
        ) {
          const newToken = await refreshBearerToken();
          if (newToken !== undefined) {
            return instance.createOwner(
              { ...mutation, bearerToken: newToken }
            );
          }
        }

        return result;
      };

      method.pending =
        new Array<PendingClinicCreateOwnerMutation>();

      return method;
    }, [instance, bearerToken, refreshBearerToken]);

    createOwner.pending = pending;

    return createOwner;
  }

  const createOwner = useCreateOwner();



  function useSearchOwners(
    partialRequest: Clinic.PartialSearchOwnersRequest = {},
    options: { suspense: boolean } = { suspense: false }
  ) {
    const newRequest = ClinicSearchOwnersRequestToProtobuf(partialRequest);

    const [request, setRequest] = useState(newRequest);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const serializedRequest = useMemo(() => request.toBinary(), [request]);

    // To distinguish this call from others when caching responses on
    // the client we compute a "request hash" using SHA256 from the
    // `request`.
    // We memoize this so we don't do it every time.
    const requestHash: string = useMemo(
      () => {
        const hash = reboot_web.calcSha256();
        hash.add(serializedRequest);
        return hash.digest().hex();
      },
      [serializedRequest]
    );

    // To create a map of unused readers globally on the client, we
    // compute a "request hash" using SHA256 from the `request`
    // including the bearerToken.
    // We memoize this so we don't do it every time.
    const requestBearerTokenHash: string = useMemo(
      () => {
        const hash = reboot_web.calcSha256();
        hash.add(serializedRequest);
        if (bearerToken) {
          hash.add(bearerToken);
        }
        return hash.digest().hex();
      },
      [serializedRequest, bearerToken]
    );

    const offlineCacheEnabled = rebootClient.offlineCacheEnabled;

    const cacheKey: string | null = useMemo(
      () => {
        if (offlineCacheEnabled) {
          return `${stateRef}:SearchOwners:${requestHash}`;
        }
        return null;
      },
      [stateRef, offlineCacheEnabled, requestHash]
    );

    // We start reading here, or if another component already started
    // the reading then we just get back the reader. We need to do this
    // before setting up our `useState`s because when using suspense
    // we need to use the `reader.response` or `reader.status` during
    // render where one of them will be defined, i.e., after we've
    // waited for `reader.promise` via `React.use()`.
    const reader = instance.startSearchOwners(
      requestBearerTokenHash,
      serializedRequest,
      bearerToken,
      offlineCacheEnabled,
      cacheKey
    );

    const [response, setResponse] = useState<
      Clinic.SearchOwnersResponse | undefined
      >(reader.response && ClinicSearchOwnersResponseFromProtobufShape(reader.response));

    const [aborted, setAborted] = useState<
      ClinicSearchOwnersAborted | undefined
      >(reader.status && ClinicSearchOwnersAborted.fromStatus(reader.status));

    // Track which state ID the current `response` and `aborted` belong
    // to so we can reset them when the state ID changes, back into
    // their "loading" state. We track `id` rather than `instance`
    // because `id` updates immediately from props, whereas `instance`
    // only updates later after a separate `setState`.
    const [responseStateId, setResponseStateId] = useState(id);
    if (responseStateId !== id) {
      setResponseStateId(id);
      setResponse(undefined);
      setAborted(undefined);
      setIsLoading(true);
    }

    useEffect(() => {
      const id = uuidv4();

      instance.useSearchOwners(
        id,
        requestBearerTokenHash,
        serializedRequest,
        bearerToken,
        offlineCacheEnabled,
        cacheKey,
        (response: petclinic_pb.ClinicSearchOwnersResponse) => {
          setAborted(undefined);
          setResponse(ClinicSearchOwnersResponseFromProtobufShape(response));
        },
        setIsLoading,
        (status: reboot_api.Status) => {
          // If the server rejected us due to an expired
          // token, refresh via the frontend's bearer-refresh
          // (the MCP host, or the web session). The token
          // change triggers a re-render and reconnect.
          if (
            status.code === reboot_api.StatusCode.UNAUTHENTICATED &&
            refreshBearerToken
          ) {
            refreshBearerToken();
          }

          const aborted = ClinicSearchOwnersAborted.fromStatus(status);

          console.warn(
            `[Reboot] 'Clinic.SearchOwners' aborted with ${aborted.message}`
          );

          setAborted(aborted);
          setResponse(undefined);
        },
      );

      return () => {
        instance.unuseSearchOwners(id, requestBearerTokenHash);
      };
    }, [
      instance,
      serializedRequest,
      requestBearerTokenHash,
      bearerToken,
      refreshBearerToken,
      offlineCacheEnabled,
      cacheKey,
    ]);

    // If the user has requested suspense via `options.suspense` then
    // we need to use `useMemo` to create a stable promise to pass
    // to `React.use()`. This is important for two reasons:
    //
    // 1. `reader.promise` gets deleted after 5 seconds to
    //    allow GC-based detection of abandoned readers (via
    //    `FinalizationRegistry`), so we can't pass it directly
    //    on every render.
    //
    // 2. `React.use()` suspends at least once for each new
    //    promise it sees (to call `.then()`), so we must
    //    return the same promise across re-renders for a given
    //    reader.
    //
    // When suspense is not requested, or the reader's event is
    // already set (i.e., we have a response or aborted status),
    // we return a pre-resolved promise. Note that `React.use()`
    // will suspend at least once even for a pre-resolved promise
    // in order to set internal state on it, but on subsequent
    // renders it will recognize the same promise and return
    // without suspending.
	//
	// We need to store the suspense promise in a `useRef` so
	// that we can continually return it even if the reader is
	// changing due to things like the `bearerToken` changing,
	// however, we don't want to flicker the suspense fallback
	// when `bearerToken` changes after we've already received
	// a stable `response` (or `aborted`).
	const suspensePromiseRef = useRef(undefined);

    const suspensePromise = useMemo(
      () => {
	    if (suspensePromiseRef.current === undefined || (response === undefined && aborted === undefined)) {
          if (!options.suspense || reader.event.isSet()) {
		    suspensePromiseRef.current = Promise.resolve();
          } else {
            reboot_api.assert(reader.promise !== undefined);
			reboot_api.assert(response === undefined);
			reboot_api.assert(aborted === undefined);
            suspensePromiseRef.current = reader.promise.then(() => {});
          }
		}
		return suspensePromiseRef.current;
      },
      [options.suspense, reader, response, aborted]
    );

    if (options.suspense) {
      if (!("use" in React)) {
        // Raise if it doesn't look like we are using React>=19.
        const error = "In order to pass `suspense: true` to a Reboot reactive reader you must be using React>=19 which provides `React.use`";
        console.error(error);
        throw new Error(error);
      }

      React.use(suspensePromise);
    }

    if (!request.equals(newRequest)) {
      setRequest(newRequest);
      setIsLoading(true);

      return { response, isLoading: true, aborted };
    }

    return { response, isLoading, aborted };
  }

  async function searchOwners(
    partialRequest: Clinic.PartialSearchOwnersRequest = {},
    options?: { signal?: AbortSignal; retry?: boolean }
  ) {
    let retry = true;
    if (options !== undefined && options.retry !== undefined) {
      retry = options.retry;
    }

    const request = ClinicSearchOwnersRequestToProtobuf(partialRequest);

    // The age of the transaction this call started, once an error has
    // told us: the root transaction id of its first attempt. A retry
    // carries it so that the retried transaction is as old as its first
    // attempt rather than younger than every transaction started since.
    let transactionRetryAge: string | undefined;

    // Fetch with retry, using a backoff, i.e., if we get disconnected
    // or the server asks us to try again.
    const { response, aborted } = await (async () => {
      const backoff = new reboot_api.Backoff();
      // A `TransactionShouldRetry` may ask us to retry immediately, but
      // we elide the backoff only once: a transaction that keeps being
      // asked to start over should still back off.
      let backoffElided = false;

      while (true) {
        let retryWithoutBackoff = false;
        // Copied per attempt so that a retry age set for this call does
        // not outlive it on the hook's shared headers.
        const attemptHeaders = new Headers(headers);
        if (transactionRetryAge !== undefined) {
          attemptHeaders.set("x-reboot-transaction-retry-age", transactionRetryAge);
        }
        try {
          // Invariant here is that we use the '/package.service.method' path and
          // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
          //
          // See also 'reboot/helpers.py'.
          const response = await reboot_web.guardedFetch(
            `${rebootClient.url}/__/reboot/rpc/${stateRef}/petclinic.v1.ClinicMethods/SearchOwners`,
            {
              ...options,
              method: "POST",
              headers: attemptHeaders,
              body: request.toJsonString()
            }
          );
          // A 'fetch' does not throw on these, so check the status and
          // retry the same way a failed 'fetch' is retried:
          // - 502 (Bad Gateway): the proxy can not reach the backend.
          // - 503 (Unavailable): the server is temporarily unavailable,
          //   or is asking for the transaction to be started over.
          // - 499 (Cancelled): the request was cancelled, often because
          //   the server is shutting down.
          if (
            response.status === 502 ||
            response.status === 503 ||
            response.status === 499
          ) {
            if (response.headers.get("content-type") === "application/json") {
              const status = reboot_api.Status.fromJson(await response.json());
              const shouldRetry = reboot_api.errorFromGoogleRpcStatusDetails(
                status,
                [reboot_api.errors_pb.TransactionShouldRetry] as const
              );
              if (shouldRetry !== undefined) {
                retryWithoutBackoff =
                  reboot_api.TRANSACTION_SHOULD_RETRY_REASONS_WITHOUT_BACKOFF.has(
                    shouldRetry.reason
                  );
                if (transactionRetryAge === undefined && shouldRetry.retryAge !== "") {
                  transactionRetryAge = shouldRetry.retryAge;
                }
                if (
                  shouldRetry.reason ===
                  reboot_api.errors_pb.TransactionShouldRetry_Reason.PRESUMED_DEADLOCK
                ) {
                  console.warn(
                    `[Reboot] Retrying call to \`petclinic.v1.ClinicMethods.SearchOwners\` because its transaction is presumed deadlocked: ${status.message}`
                  );
                }
              }
              // Handled in the 'catch' block below.
              throw ClinicSearchOwnersAborted.fromStatus(status);
            }
            throw new ClinicSearchOwnersAborted(
              new reboot_api.errors_pb.Unknown(), {
                message: `Unknown error with HTTP status ${response.status}`
              }
            );
          }
          return { response };
        } catch (e: unknown) {
          if (options?.signal?.aborted || !retry) {
            if (e instanceof ClinicSearchOwnersAborted) {
              return { aborted: e };
            }
            const aborted = new ClinicSearchOwnersAborted(
              new reboot_api.errors_pb.Aborted(), {
                message: e instanceof Error
                  ? `${e}`
                  : `Unknown error: ${JSON.stringify(e)}`
              }
            );

            return { aborted };
          } else if (e instanceof Error) {
            console.error(e);
          } else {
            console.error(`[Reboot] Unknown error: ${JSON.stringify(e)}`);
          }
        }

        if (retryWithoutBackoff && !backoffElided) {
          backoffElided = true;
          continue;
        }

        await backoff.wait(`[Reboot] Retrying call to \`petclinic.v1.ClinicMethods.SearchOwners\` with backoff...`);
      }
    })();

    if (aborted) {
      return { aborted };
    } else if (response.status === 401 && refreshBearerToken) {
      // Token expired — refresh via the frontend's bearer-refresh
      // and retry once.
      const newToken = await refreshBearerToken();
      if (newToken) {
        const retryHeaders = new Headers();
        retryHeaders.set("Content-Type", "application/json");
        retryHeaders.append("Connection", "keep-alive");
        retryHeaders.append("Authorization", `Bearer ${newToken}`);
        try {
          const retryResponse = await reboot_web.guardedFetch(
            `${rebootClient.url}/__/reboot/rpc/${stateRef}/petclinic.v1.ClinicMethods/SearchOwners`,
            {
              ...options,
              method: "POST",
              headers: retryHeaders,
              body: request.toJsonString()
            }
          );
          if (retryResponse.ok) {
            return {
              response:
                ClinicSearchOwnersResponseFromProtobufShape((petclinic_pb.ClinicSearchOwnersResponse.fromJson(await retryResponse.json())))
            };
          }
          // Fall through to generic error handling on retry failure.
          return {
            aborted: new ClinicSearchOwnersAborted(
              new reboot_api.errors_pb.Unknown(), {
                message: `Unknown error with HTTP status ${retryResponse.status} after token refresh`
              }
            )
          };
        } catch (e: unknown) {
          return {
            aborted: new ClinicSearchOwnersAborted(
              new reboot_api.errors_pb.Aborted(), {
                message: e instanceof Error
                  ? `${e}`
                  : `Unknown error: ${JSON.stringify(e)}`
              }
            )
          };
        }
      }
      // Refresh failed — fall through to generic error.
      return {
        aborted: new ClinicSearchOwnersAborted(
          new reboot_api.errors_pb.Unknown(), {
            message: `Unauthorized (HTTP 401) and token refresh failed`
          }
        )
      };
    } else if (!response.ok) {
      if (response.headers.get("content-type") === "application/json") {
        const status = reboot_api.Status.fromJson(await response.json());


        // If the server rejected us due to an expired
        // token, refresh via the frontend's bearer-refresh and
        // retry once.
        if (
          status.code === reboot_api.StatusCode.UNAUTHENTICATED &&
          refreshBearerToken
        ) {
          const newToken = await refreshBearerToken();
          if (newToken) {
            const retryHeaders = new Headers();
            retryHeaders.set(
              "Content-Type", "application/json",
            );
            retryHeaders.append(
              "Connection", "keep-alive",
            );
            retryHeaders.append(
              "Authorization", `Bearer ${newToken}`,
            );
            try {
              const retryResponse =
                await reboot_web.guardedFetch(
                  `${rebootClient.url}/__/reboot/rpc/${stateRef}/petclinic.v1.ClinicMethods/SearchOwners`,
                  {
                    ...options,
                    method: "POST",
                    headers: retryHeaders,
                    body: request.toJsonString()
                  }
                );
              if (retryResponse.ok) {
                return {
                  response:
                    ClinicSearchOwnersResponseFromProtobufShape((petclinic_pb.ClinicSearchOwnersResponse.fromJson(await retryResponse.json())))
                };
              }
            } catch {
              // Fall through to return the original aborted error.
            }
          }
        }

        const aborted = ClinicSearchOwnersAborted.fromStatus(status);

        console.warn(
          `[Reboot] 'Clinic.SearchOwners' aborted with ${aborted.message}`
        );

        return { aborted };
      } else {
        const aborted = new ClinicSearchOwnersAborted(
          new reboot_api.errors_pb.Unknown(), {
            message: `Unknown error with HTTP status ${response.status}`
          }
        );

        return { aborted };
      }
    } else {
      return {
        response:
          ClinicSearchOwnersResponseFromProtobufShape((petclinic_pb.ClinicSearchOwnersResponse.fromJson(await response.json())))
      };
    }
  }


  function useAddVeterinarian() {
    const [
      pending,
      setPending
    ] = useState<PendingClinicAddVeterinarianMutation[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useAddVeterinarian(id, setPending);
      return () => {
        instance.unuseAddVeterinarian(id);
      };
    }, [instance]);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const addVeterinarian = useMemo(() => {
      const method = async (
        partialRequest: Clinic.PartialAddVeterinarianRequest = {},
        options?: { metadata?: any, key?: string }
      ) => {
        const request = ClinicAddVeterinarianRequestToProtobuf(partialRequest);

        const idempotencyKey = options?.idempotencyKey ?? options?.key ?? reboot_web.makeExpiringIdempotencyKey();

        const mutation = {
          request,
          idempotencyKey,
          bearerToken,
          metadata: options?.metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        const result = await instance.addVeterinarian(mutation);

        // If the server rejected us due to an expired token,
        // refresh via the frontend's bearer-refresh and retry
        // once (mirrors the unary-call path).
        if (
          result.aborted !== undefined &&
          result.aborted.code === reboot_api.StatusCode.UNAUTHENTICATED &&
          refreshBearerToken
        ) {
          const newToken = await refreshBearerToken();
          if (newToken !== undefined) {
            return instance.addVeterinarian(
              { ...mutation, bearerToken: newToken }
            );
          }
        }

        return result;
      };

      method.pending =
        new Array<PendingClinicAddVeterinarianMutation>();

      return method;
    }, [instance, bearerToken, refreshBearerToken]);

    addVeterinarian.pending = pending;

    return addVeterinarian;
  }

  const addVeterinarian = useAddVeterinarian();



  function useListVeterinarians(
    partialRequest: Clinic.PartialListVeterinariansRequest = {},
    options: { suspense: boolean } = { suspense: false }
  ) {
    const newRequest = ClinicListVeterinariansRequestToProtobuf(partialRequest);

    const [request, setRequest] = useState(newRequest);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const serializedRequest = useMemo(() => request.toBinary(), [request]);

    // To distinguish this call from others when caching responses on
    // the client we compute a "request hash" using SHA256 from the
    // `request`.
    // We memoize this so we don't do it every time.
    const requestHash: string = useMemo(
      () => {
        const hash = reboot_web.calcSha256();
        hash.add(serializedRequest);
        return hash.digest().hex();
      },
      [serializedRequest]
    );

    // To create a map of unused readers globally on the client, we
    // compute a "request hash" using SHA256 from the `request`
    // including the bearerToken.
    // We memoize this so we don't do it every time.
    const requestBearerTokenHash: string = useMemo(
      () => {
        const hash = reboot_web.calcSha256();
        hash.add(serializedRequest);
        if (bearerToken) {
          hash.add(bearerToken);
        }
        return hash.digest().hex();
      },
      [serializedRequest, bearerToken]
    );

    const offlineCacheEnabled = rebootClient.offlineCacheEnabled;

    const cacheKey: string | null = useMemo(
      () => {
        if (offlineCacheEnabled) {
          return `${stateRef}:ListVeterinarians:${requestHash}`;
        }
        return null;
      },
      [stateRef, offlineCacheEnabled, requestHash]
    );

    // We start reading here, or if another component already started
    // the reading then we just get back the reader. We need to do this
    // before setting up our `useState`s because when using suspense
    // we need to use the `reader.response` or `reader.status` during
    // render where one of them will be defined, i.e., after we've
    // waited for `reader.promise` via `React.use()`.
    const reader = instance.startListVeterinarians(
      requestBearerTokenHash,
      serializedRequest,
      bearerToken,
      offlineCacheEnabled,
      cacheKey
    );

    const [response, setResponse] = useState<
      Clinic.ListVeterinariansResponse | undefined
      >(reader.response && ClinicListVeterinariansResponseFromProtobufShape(reader.response));

    const [aborted, setAborted] = useState<
      ClinicListVeterinariansAborted | undefined
      >(reader.status && ClinicListVeterinariansAborted.fromStatus(reader.status));

    // Track which state ID the current `response` and `aborted` belong
    // to so we can reset them when the state ID changes, back into
    // their "loading" state. We track `id` rather than `instance`
    // because `id` updates immediately from props, whereas `instance`
    // only updates later after a separate `setState`.
    const [responseStateId, setResponseStateId] = useState(id);
    if (responseStateId !== id) {
      setResponseStateId(id);
      setResponse(undefined);
      setAborted(undefined);
      setIsLoading(true);
    }

    useEffect(() => {
      const id = uuidv4();

      instance.useListVeterinarians(
        id,
        requestBearerTokenHash,
        serializedRequest,
        bearerToken,
        offlineCacheEnabled,
        cacheKey,
        (response: petclinic_pb.ClinicListVeterinariansResponse) => {
          setAborted(undefined);
          setResponse(ClinicListVeterinariansResponseFromProtobufShape(response));
        },
        setIsLoading,
        (status: reboot_api.Status) => {
          // If the server rejected us due to an expired
          // token, refresh via the frontend's bearer-refresh
          // (the MCP host, or the web session). The token
          // change triggers a re-render and reconnect.
          if (
            status.code === reboot_api.StatusCode.UNAUTHENTICATED &&
            refreshBearerToken
          ) {
            refreshBearerToken();
          }

          const aborted = ClinicListVeterinariansAborted.fromStatus(status);

          console.warn(
            `[Reboot] 'Clinic.ListVeterinarians' aborted with ${aborted.message}`
          );

          setAborted(aborted);
          setResponse(undefined);
        },
      );

      return () => {
        instance.unuseListVeterinarians(id, requestBearerTokenHash);
      };
    }, [
      instance,
      serializedRequest,
      requestBearerTokenHash,
      bearerToken,
      refreshBearerToken,
      offlineCacheEnabled,
      cacheKey,
    ]);

    // If the user has requested suspense via `options.suspense` then
    // we need to use `useMemo` to create a stable promise to pass
    // to `React.use()`. This is important for two reasons:
    //
    // 1. `reader.promise` gets deleted after 5 seconds to
    //    allow GC-based detection of abandoned readers (via
    //    `FinalizationRegistry`), so we can't pass it directly
    //    on every render.
    //
    // 2. `React.use()` suspends at least once for each new
    //    promise it sees (to call `.then()`), so we must
    //    return the same promise across re-renders for a given
    //    reader.
    //
    // When suspense is not requested, or the reader's event is
    // already set (i.e., we have a response or aborted status),
    // we return a pre-resolved promise. Note that `React.use()`
    // will suspend at least once even for a pre-resolved promise
    // in order to set internal state on it, but on subsequent
    // renders it will recognize the same promise and return
    // without suspending.
	//
	// We need to store the suspense promise in a `useRef` so
	// that we can continually return it even if the reader is
	// changing due to things like the `bearerToken` changing,
	// however, we don't want to flicker the suspense fallback
	// when `bearerToken` changes after we've already received
	// a stable `response` (or `aborted`).
	const suspensePromiseRef = useRef(undefined);

    const suspensePromise = useMemo(
      () => {
	    if (suspensePromiseRef.current === undefined || (response === undefined && aborted === undefined)) {
          if (!options.suspense || reader.event.isSet()) {
		    suspensePromiseRef.current = Promise.resolve();
          } else {
            reboot_api.assert(reader.promise !== undefined);
			reboot_api.assert(response === undefined);
			reboot_api.assert(aborted === undefined);
            suspensePromiseRef.current = reader.promise.then(() => {});
          }
		}
		return suspensePromiseRef.current;
      },
      [options.suspense, reader, response, aborted]
    );

    if (options.suspense) {
      if (!("use" in React)) {
        // Raise if it doesn't look like we are using React>=19.
        const error = "In order to pass `suspense: true` to a Reboot reactive reader you must be using React>=19 which provides `React.use`";
        console.error(error);
        throw new Error(error);
      }

      React.use(suspensePromise);
    }

    if (!request.equals(newRequest)) {
      setRequest(newRequest);
      setIsLoading(true);

      return { response, isLoading: true, aborted };
    }

    return { response, isLoading, aborted };
  }

  async function listVeterinarians(
    partialRequest: Clinic.PartialListVeterinariansRequest = {},
    options?: { signal?: AbortSignal; retry?: boolean }
  ) {
    let retry = true;
    if (options !== undefined && options.retry !== undefined) {
      retry = options.retry;
    }

    const request = ClinicListVeterinariansRequestToProtobuf(partialRequest);

    // The age of the transaction this call started, once an error has
    // told us: the root transaction id of its first attempt. A retry
    // carries it so that the retried transaction is as old as its first
    // attempt rather than younger than every transaction started since.
    let transactionRetryAge: string | undefined;

    // Fetch with retry, using a backoff, i.e., if we get disconnected
    // or the server asks us to try again.
    const { response, aborted } = await (async () => {
      const backoff = new reboot_api.Backoff();
      // A `TransactionShouldRetry` may ask us to retry immediately, but
      // we elide the backoff only once: a transaction that keeps being
      // asked to start over should still back off.
      let backoffElided = false;

      while (true) {
        let retryWithoutBackoff = false;
        // Copied per attempt so that a retry age set for this call does
        // not outlive it on the hook's shared headers.
        const attemptHeaders = new Headers(headers);
        if (transactionRetryAge !== undefined) {
          attemptHeaders.set("x-reboot-transaction-retry-age", transactionRetryAge);
        }
        try {
          // Invariant here is that we use the '/package.service.method' path and
          // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
          //
          // See also 'reboot/helpers.py'.
          const response = await reboot_web.guardedFetch(
            `${rebootClient.url}/__/reboot/rpc/${stateRef}/petclinic.v1.ClinicMethods/ListVeterinarians`,
            {
              ...options,
              method: "POST",
              headers: attemptHeaders,
              body: request.toJsonString()
            }
          );
          // A 'fetch' does not throw on these, so check the status and
          // retry the same way a failed 'fetch' is retried:
          // - 502 (Bad Gateway): the proxy can not reach the backend.
          // - 503 (Unavailable): the server is temporarily unavailable,
          //   or is asking for the transaction to be started over.
          // - 499 (Cancelled): the request was cancelled, often because
          //   the server is shutting down.
          if (
            response.status === 502 ||
            response.status === 503 ||
            response.status === 499
          ) {
            if (response.headers.get("content-type") === "application/json") {
              const status = reboot_api.Status.fromJson(await response.json());
              const shouldRetry = reboot_api.errorFromGoogleRpcStatusDetails(
                status,
                [reboot_api.errors_pb.TransactionShouldRetry] as const
              );
              if (shouldRetry !== undefined) {
                retryWithoutBackoff =
                  reboot_api.TRANSACTION_SHOULD_RETRY_REASONS_WITHOUT_BACKOFF.has(
                    shouldRetry.reason
                  );
                if (transactionRetryAge === undefined && shouldRetry.retryAge !== "") {
                  transactionRetryAge = shouldRetry.retryAge;
                }
                if (
                  shouldRetry.reason ===
                  reboot_api.errors_pb.TransactionShouldRetry_Reason.PRESUMED_DEADLOCK
                ) {
                  console.warn(
                    `[Reboot] Retrying call to \`petclinic.v1.ClinicMethods.ListVeterinarians\` because its transaction is presumed deadlocked: ${status.message}`
                  );
                }
              }
              // Handled in the 'catch' block below.
              throw ClinicListVeterinariansAborted.fromStatus(status);
            }
            throw new ClinicListVeterinariansAborted(
              new reboot_api.errors_pb.Unknown(), {
                message: `Unknown error with HTTP status ${response.status}`
              }
            );
          }
          return { response };
        } catch (e: unknown) {
          if (options?.signal?.aborted || !retry) {
            if (e instanceof ClinicListVeterinariansAborted) {
              return { aborted: e };
            }
            const aborted = new ClinicListVeterinariansAborted(
              new reboot_api.errors_pb.Aborted(), {
                message: e instanceof Error
                  ? `${e}`
                  : `Unknown error: ${JSON.stringify(e)}`
              }
            );

            return { aborted };
          } else if (e instanceof Error) {
            console.error(e);
          } else {
            console.error(`[Reboot] Unknown error: ${JSON.stringify(e)}`);
          }
        }

        if (retryWithoutBackoff && !backoffElided) {
          backoffElided = true;
          continue;
        }

        await backoff.wait(`[Reboot] Retrying call to \`petclinic.v1.ClinicMethods.ListVeterinarians\` with backoff...`);
      }
    })();

    if (aborted) {
      return { aborted };
    } else if (response.status === 401 && refreshBearerToken) {
      // Token expired — refresh via the frontend's bearer-refresh
      // and retry once.
      const newToken = await refreshBearerToken();
      if (newToken) {
        const retryHeaders = new Headers();
        retryHeaders.set("Content-Type", "application/json");
        retryHeaders.append("Connection", "keep-alive");
        retryHeaders.append("Authorization", `Bearer ${newToken}`);
        try {
          const retryResponse = await reboot_web.guardedFetch(
            `${rebootClient.url}/__/reboot/rpc/${stateRef}/petclinic.v1.ClinicMethods/ListVeterinarians`,
            {
              ...options,
              method: "POST",
              headers: retryHeaders,
              body: request.toJsonString()
            }
          );
          if (retryResponse.ok) {
            return {
              response:
                ClinicListVeterinariansResponseFromProtobufShape((petclinic_pb.ClinicListVeterinariansResponse.fromJson(await retryResponse.json())))
            };
          }
          // Fall through to generic error handling on retry failure.
          return {
            aborted: new ClinicListVeterinariansAborted(
              new reboot_api.errors_pb.Unknown(), {
                message: `Unknown error with HTTP status ${retryResponse.status} after token refresh`
              }
            )
          };
        } catch (e: unknown) {
          return {
            aborted: new ClinicListVeterinariansAborted(
              new reboot_api.errors_pb.Aborted(), {
                message: e instanceof Error
                  ? `${e}`
                  : `Unknown error: ${JSON.stringify(e)}`
              }
            )
          };
        }
      }
      // Refresh failed — fall through to generic error.
      return {
        aborted: new ClinicListVeterinariansAborted(
          new reboot_api.errors_pb.Unknown(), {
            message: `Unauthorized (HTTP 401) and token refresh failed`
          }
        )
      };
    } else if (!response.ok) {
      if (response.headers.get("content-type") === "application/json") {
        const status = reboot_api.Status.fromJson(await response.json());


        // If the server rejected us due to an expired
        // token, refresh via the frontend's bearer-refresh and
        // retry once.
        if (
          status.code === reboot_api.StatusCode.UNAUTHENTICATED &&
          refreshBearerToken
        ) {
          const newToken = await refreshBearerToken();
          if (newToken) {
            const retryHeaders = new Headers();
            retryHeaders.set(
              "Content-Type", "application/json",
            );
            retryHeaders.append(
              "Connection", "keep-alive",
            );
            retryHeaders.append(
              "Authorization", `Bearer ${newToken}`,
            );
            try {
              const retryResponse =
                await reboot_web.guardedFetch(
                  `${rebootClient.url}/__/reboot/rpc/${stateRef}/petclinic.v1.ClinicMethods/ListVeterinarians`,
                  {
                    ...options,
                    method: "POST",
                    headers: retryHeaders,
                    body: request.toJsonString()
                  }
                );
              if (retryResponse.ok) {
                return {
                  response:
                    ClinicListVeterinariansResponseFromProtobufShape((petclinic_pb.ClinicListVeterinariansResponse.fromJson(await retryResponse.json())))
                };
              }
            } catch {
              // Fall through to return the original aborted error.
            }
          }
        }

        const aborted = ClinicListVeterinariansAborted.fromStatus(status);

        console.warn(
          `[Reboot] 'Clinic.ListVeterinarians' aborted with ${aborted.message}`
        );

        return { aborted };
      } else {
        const aborted = new ClinicListVeterinariansAborted(
          new reboot_api.errors_pb.Unknown(), {
            message: `Unknown error with HTTP status ${response.status}`
          }
        );

        return { aborted };
      }
    } else {
      return {
        response:
          ClinicListVeterinariansResponseFromProtobufShape((petclinic_pb.ClinicListVeterinariansResponse.fromJson(await response.json())))
      };
    }
  }


  // Don't re-render if `id` hasn't changed.
    const api: UseClinicApi = useMemo(() => ({
      state_id: id,
      mutators: {
        create,
        createOwner,
        addVeterinarian,
      },
      idempotently: ({ key }: { key: string }) => {
      return {
        create: (
          partialRequest?:Clinic.PartialCreateRequest,
          options?: { metadata?: any }
        ) => create(partialRequest, { ...options, key }),
        createOwner: (
          partialRequest?:Clinic.PartialCreateOwnerRequest,
          options?: { metadata?: any }
        ) => createOwner(partialRequest, { ...options, key }),
        addVeterinarian: (
          partialRequest?:Clinic.PartialAddVeterinarianRequest,
          options?: { metadata?: any }
        ) => addVeterinarian(partialRequest, { ...options, key }),
      };
    },
      create,
      createOwner,
      searchOwners,
      useSearchOwners,
      addVeterinarian,
      listVeterinarians,
      useListVeterinarians,
    }), [id, instance, bearerToken, refreshBearerToken]);

  // An explicit `id` caller gets the handle directly; a no-id caller
  // gets the `{ clinic, isLoading }`
  // shape, where the handle is `undefined` until a default ID
  // resolves.
  if (providedId !== undefined) {
    return api;
  }
  return {
    clinic: resolvedId ? api : undefined,
    isLoading,
  };
};



export class Clinic {
  static State = ClinicProto;
}
export namespace Clinic {
  export type State = ClinicProto;
}

export interface SettingsParams {
  id: string;
  storeMutationsLocallyInNamespace?: string;
}

class OwnerInstance {

  constructor(id: string, stateRef: string, url: string) {
    this.id = id;
    this.stateRef = stateRef;
    this.url = url;
    this.refs = 1;

    // An empty `id` marks the inert instance shared by every no-id
    // caller while no default ID has resolved (e.g. signed out): it
    // opens no socket so there's nothing to connect to.
    if (id !== "") {
      reboot_web.websockets.connect(this.url, this.stateRef);
      this.initializeWebSocket();
    }
  }

  private ref() {
    this.refs += 1;
    return this.refs;
  }

  private unref() {
    this.refs -= 1;

    if (this.refs === 0 && this.websocket !== undefined) {
      this.websocket.close();
       reboot_web.websockets.disconnect(this.url, this.stateRef);
    }

    return this.refs;
  }

  readonly id: string;
  readonly stateRef: string;
  private url: string;
  private refs: number;
  private observers: reboot_react.Observers = {};
  private loadingReaders = 0;
  private runningMutates: reboot_react.Mutate[] = [];
  private queuedMutates: reboot_react.Mutate[] = [];
  private flushMutates?: reboot_api.Event = undefined;
  private websocket?: WebSocket = undefined;
  private backoff: reboot_api.Backoff = new reboot_api.Backoff();

  private hasRunningMutations() {
    return this.runningMutates.length > 0;
  }

  private async flushMutations() {
    if (this.flushMutates === undefined) {
      this.flushMutates = new reboot_api.Event();
    }
    await this.flushMutates.wait();
  }

  private readersLoadedOrFailed() {
    this.flushMutates = undefined;

    if (this.queuedMutates.length > 0) {
      this.runningMutates = this.queuedMutates;
      this.queuedMutates = [];

      if (this.websocket?.readyState === WebSocket.OPEN) {
        for (const { request, update } of this.runningMutates) {
          update({ isLoading: true });
          try {
            this.websocket.send(request.toBinary());
          } catch {
            // We'll retry since we've stored in `*Mutates`.
          }
        }
      }
    }
  }

  private initializeWebSocket() {
    if (this.websocket === undefined && this.refs > 0 && this.id !== "") {
      const url = new URL(`${this.url}/__/reboot/rpc/${this.stateRef}`);
      url.protocol = url.protocol === "https:" ? "wss:" : "ws:";

      this.websocket = reboot_web.websockets.create(url);

      this.websocket.binaryType = "arraybuffer";

      this.websocket.onopen = () => {
        if (this.websocket?.readyState === WebSocket.OPEN) {
          for (const { request, update } of this.runningMutates) {
            update({ isLoading: true });
            try {
              this.websocket.send(request.toBinary());
            } catch {
              // We'll retry since we've stored in `*Mutates`.
            }
          }
        }
      };

      this.websocket.onerror = async () => {
        if (this.websocket !== undefined) {
          this.websocket = undefined;

          for (const { update } of this.runningMutates) {
            update({ isLoading: false, error: "WebSocket disconnected" });
          }

          if (this.refs > 0) {
            if (this.runningMutates.length > 0) {
              console.warn(
                `[Reboot] WebSocket disconnected, ${this.runningMutates.length} outstanding mutations will be retried when we reconnect`
              );
            }

            await this.backoff.wait();

            this.initializeWebSocket();
          }
        }
      };

      this.websocket.onclose = async () => {
        if (this.websocket !== undefined) {
          this.websocket = undefined;

          for (const { update } of this.runningMutates) {
            update({ isLoading: false, error: "WebSocket disconnected" });
          }

          if (this.refs > 0) {
            await this.backoff.wait();

            this.initializeWebSocket();
          }
        }
      };

      this.websocket.onmessage = async (event) => {
        const { resolve } = this.runningMutates[0];
        this.runningMutates.shift();

        const response = reboot_api.react_pb.MutateResponse.fromBinary(
          new Uint8Array(event.data)
        );

        resolve(response);

        if (
          this.flushMutates !== undefined &&
          this.runningMutates.length === 0
        ) {
          this.flushMutates.set();
        }
      };
    }
  }

  private async mutate(
    partialRequest: protobuf_es.PartialMessage<reboot_api.react_pb.MutateRequest>,
    update: (props: { isLoading: boolean; error?: any }) => void
  ): Promise<reboot_api.react_pb.MutateResponse> {
    const request = partialRequest instanceof reboot_api.react_pb.MutateRequest
      ? partialRequest
      : new reboot_api.react_pb.MutateRequest(partialRequest);

    return new Promise((resolve, _) => {
      if (this.loadingReaders === 0) {
        this.runningMutates = this.runningMutates.concat({ request, resolve, update });
        if (this.websocket?.readyState === WebSocket.OPEN) {
          update({ isLoading: true });
          try {
            this.websocket.send(request.toBinary());
          } catch {
            // We'll retry since we've stored in `*Mutates`.
          }
        }
      } else {
        this.queuedMutates = this.queuedMutates.concat({ request, resolve, update });
      }
    });
  }

  private async read<
    RequestType extends protobuf_es.Message<RequestType>,
    ResponseType extends protobuf_es.Message<ResponseType>,
    >(
    method: string,
    serializedRequest: Uint8Array,
    bearerToken: string | undefined,
    responseType: protobuf_es.MessageType<ResponseType>,
    reader: reboot_react.Reader<ResponseType>
  ) {
    const queryRequest = new reboot_api.react_pb.QueryRequest({
      method,
      request: serializedRequest,
      ...(bearerToken !== undefined && { bearerToken } || {}),
    });

    // Expected idempotency key we should observe due to a mutation.
    interface Expected {
      // Idempotency key of mutation.
      idempotencyKey: string;

      // Callback when we've observed this idempotency key.
      observed: (callback: () => void) => Promise<void>;

      // Callback when we no longer care about observing.
      aborted: () => void;
    }

    let expecteds: Expected[] = [];

    // When we disconnect we may not be able to observe
    // responses due to mutations yet there may still be
    // some outstanding responses that are expected which
    // we treat as "orphans" in the sense that we won't
    // observe their idempotency keys but once we reconnect
    // we will still have observed their effects and can
    // call `observed()` on them.
    let orphans: Expected[] = [];

    const id = `${uuidv4()}`;

    this.observers[id] = {
      observe: (
        idempotencyKey: string,
        observed: (callback: () => void) => Promise<void>,
        aborted: () => void
      ) => {
        expecteds = expecteds.concat({ idempotencyKey, observed, aborted })
      },
      unobserve: (idempotencyKey: string) => {
        expecteds = expecteds.filter(
          expected => expected.idempotencyKey !== idempotencyKey
        );

        orphans = orphans.filter(
          orphan => orphan.idempotencyKey !== idempotencyKey
        );
      }
    };

    try {
      await reboot_api.retryForever(async () => {
        let loaded = false;
        this.loadingReaders += 1;

        // Any mutations started after we've incremented
        // `this.loadingReaders` will be queued until after
        // all the readers have loaded and thus (1) we know all
        // current `expected` are actually `orphans` that
        // we will haved "observed" once we are (re)connected
        // because we flush mutations before starting to read
        // and (2) all queued mutations can stay in `expected`
        // because we will in fact be able to observe them
        // since they won't get sent over the websocket
        // until after we are (re)connected.
        //
        // NOTE: we need to concatenate with `orphans`
        // because we may try to (re)connect multiple times
        // and between each try more mutations may have been
        // made (or queued ones will be moved to running).
        orphans = [...orphans, ...expecteds];
        expecteds = [];

        try {
          // Wait for potentially completed mutations to flush
          // before starting to read so that we read the latest
          // state including those mutations.
          if (this.hasRunningMutations()) {
            await this.flushMutations();
          }

          reader.setIsLoading(true);

          const queryResponses = reboot_web.reactiveReader({
            endpoint: `${this.url}/__/reboot/rpc/${this.stateRef}`,
            request: queryRequest,
            signal: reader.abortController.signal,
          });

          for await (const queryResponse of queryResponses) {
            if (!loaded) {
              if ((this.loadingReaders -= 1) === 0) {
                this.readersLoadedOrFailed();
              }
              loaded = true;
            }

            reader.setIsLoading(false);

            const response = queryResponse.responseOrStatus.case === "response"
              ? responseType.fromBinary(queryResponse.responseOrStatus.value)
              : undefined;

            // If we were disconnected it must be that we've
            // observed all `orphans` because we waited
            // for any mutations to flush before we re-started to
            // read.
            const haveOrphans = orphans.length;
            if (haveOrphans > 0) {
              // We mark all mutations as observed except the
              // last one which we also invoke all `setResponse`s.
              // In this way we effectively create a barrier
              // for all readers that will synchronize on the last
              // mutation, but note that this still may lead
              // to some partial state/response updates because
              // one reader may have actually received a response
              // while another reader got disconnected. While this
              // is likely very rare, it is possible. Mitigating
              // this issue is non-trivial and for now we have
              // no plans to address it.
              for (let i = 0; i < orphans.length - 1; i++) {
                orphans[i].observed(() => {});
              }
              await orphans[orphans.length - 1].observed(() => {
                if (response !== undefined) {
                  reader.setResponse(response);
                }
              });

              orphans = [];
            }
            // We want to check the orphans list AND the expecteds list because
            // it could be possible that we receive a query response that
            // contains an idempotency key that we are expecting while having an
            // orphans list with a length greater than 0. In this case, we don't
            // want to skip checking the expecteds list just because we have
            // already checked the orphans list.
            if (
              expecteds.length > 0 &&
              queryResponse.idempotencyKeys.includes(
                expecteds[0].idempotencyKey
              )
            ) {
              await expecteds[0].observed(() => {
                if (response !== undefined) {
                  reader.setResponse(response);
                }
                expecteds.shift();
              });
            }
            // If we don't have any orphans to observe and we don't have any expecteds to observe,
	          // or at least, the first expecteds _is not observed_ by this response, then go ahead and
	          // pass on the response because it might contain new data that should get shown to the
	          // user (e.g., in a chat room this could be a new message from a different user).
            else if (response !== undefined && !haveOrphans) {
              reader.setResponse(response);
            }
          }

          throw new Error('Not expecting stream to ever be done');
        } catch (e: unknown) {
          if (!loaded) {
            if ((this.loadingReaders -= 1) === 0) {
              this.readersLoadedOrFailed();
            }
          }

          loaded = false;

          if (reader.abortController.signal.aborted) {
            for (const { aborted } of [...orphans, ...expecteds]) {
              aborted();
            }
            return;
          }

          // Intentionally leave `isLoading: true` here. The outer
          // `retryForever(...)` will run another attempt and call
          // `reader.setIsLoading(true)` again at the top of the
          // try block, but if we cleared it to `false` here first
          // consumers would observe a brief `false → true → false
          // → true ...` flip-flop on every retry while we're
          // actually still trying to (re)connect. Once a response
          // finally arrives the success path sets it to `false`.

          if (e instanceof reboot_api.Status) {
            reader.setStatus(e);
          } else {
            console.warn(
              `[Reboot] Caught unknown exception: ${e instanceof Error ? e.message : JSON.stringify(e)}`
            );
          }

          throw e; // This just retries!
        }
      });
    } finally {
      delete this.observers[id];
    }
  }


  private useRegisterMutations: (
    PendingOwnerRegisterMutation)[] = [];

  private useRegisterSetPendings: {
    [id: string]: (mutations: PendingOwnerRegisterMutation[]) => void
  } = {};

  async register(
    mutation: PendingOwnerRegisterMutation
  ): Promise<
    reboot_web.ResponseOrAborted<
      Owner.RegisterResponse,
      OwnerRegisterAborted
  >> {
    // We always have at least 1 observer which is this function!
    let remainingObservers = 1;

    const event = new reboot_api.Event();

    let callbacks: (() => void)[] = [];

    const observed = (callback: () => void) => {
      callbacks = callbacks.concat(callback);
      remainingObservers -= 1;
      if (remainingObservers === 0) {
        for (const callback of callbacks) {
          callback();
        }
        event.set();
      }
      return event.wait();
    };

    const aborted = () => {
      observed(() => {});
    }

    // Tell observers about this pending mutation.
    for (const id in this.observers) {
      remainingObservers += 1;
      this.observers[id].observe(mutation.idempotencyKey, observed, aborted);
    }

    this.useRegisterMutations = this.useRegisterMutations.concat(mutation);

    for (const setPending of Object.values(this.useRegisterSetPendings)) {
      setPending(this.useRegisterMutations);
    }

    return new Promise<
      reboot_web.ResponseOrAborted<
        Owner.RegisterResponse,
        OwnerRegisterAborted
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "Register",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
            bearerToken: mutation.bearerToken,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            let rerender = false;
            for (const m of this.useRegisterMutations) {
              if (m === mutation) {
                if (m.isLoading !== isLoading) {
                  m.isLoading = isLoading;
                  rerender = true;
                }
                if (error !== undefined && m.error !== error) {
                  m.error = error;
                  rerender = true;
                }
              }
            }

            if (rerender) {
              for (const setPending of Object.values(this.useRegisterSetPendings)) {
                setPending(this.useRegisterMutations);
              }
            }
          }
        );

        const removeMutationsAndSetPending = () => {
          this.useRegisterMutations =
            this.useRegisterMutations.filter(m => m !== mutation);

          for (const setPending of Object.values(this.useRegisterSetPendings)) {
            setPending(this.useRegisterMutations);
          }
        }


        switch (responseOrStatus.case) {
          case "response": {
            await observed(() => {
              removeMutationsAndSetPending();
              resolve({
                response:
                  OwnerRegisterResponseFromProtobufShape(
                    Empty.fromBinary(
                    responseOrStatus.value
                  )
                )
              });
            });
            break;
          }
          case "status": {
            // Let the observers know they no longer should expect to
            // observe this idempotency key.
            for (const id in this.observers) {
              this.observers[id].unobserve(mutation.idempotencyKey);
            }

            const status = reboot_api.Status.fromJsonString(responseOrStatus.value);

            const aborted = OwnerRegisterAborted.fromStatus(status);

            console.warn(
              `[Reboot] 'Owner.Register' aborted with ${aborted.message}`
            );

            removeMutationsAndSetPending();
            resolve({ aborted });

            break;
          }
          default: {
            // TODO(benh): while this is a _really_ fatal error,
            // should we still set `aborted` instead of throwing?
            reject(new Error('Expecting either a response or a status'));
          }
        }
      });
  }

  useRegister(
    id: string,
    setPending: (mutations: PendingOwnerRegisterMutation[]) => void
  ) {
    this.useRegisterSetPendings[id] = setPending;
  }

  unuseRegister(id: string) {
    delete this.useRegisterSetPendings[id];
  }


  private useUpdateMutations: (
    PendingOwnerUpdateMutation)[] = [];

  private useUpdateSetPendings: {
    [id: string]: (mutations: PendingOwnerUpdateMutation[]) => void
  } = {};

  async update(
    mutation: PendingOwnerUpdateMutation
  ): Promise<
    reboot_web.ResponseOrAborted<
      Owner.UpdateResponse,
      OwnerUpdateAborted
  >> {
    // We always have at least 1 observer which is this function!
    let remainingObservers = 1;

    const event = new reboot_api.Event();

    let callbacks: (() => void)[] = [];

    const observed = (callback: () => void) => {
      callbacks = callbacks.concat(callback);
      remainingObservers -= 1;
      if (remainingObservers === 0) {
        for (const callback of callbacks) {
          callback();
        }
        event.set();
      }
      return event.wait();
    };

    const aborted = () => {
      observed(() => {});
    }

    // Tell observers about this pending mutation.
    for (const id in this.observers) {
      remainingObservers += 1;
      this.observers[id].observe(mutation.idempotencyKey, observed, aborted);
    }

    this.useUpdateMutations = this.useUpdateMutations.concat(mutation);

    for (const setPending of Object.values(this.useUpdateSetPendings)) {
      setPending(this.useUpdateMutations);
    }

    return new Promise<
      reboot_web.ResponseOrAborted<
        Owner.UpdateResponse,
        OwnerUpdateAborted
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "Update",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
            bearerToken: mutation.bearerToken,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            let rerender = false;
            for (const m of this.useUpdateMutations) {
              if (m === mutation) {
                if (m.isLoading !== isLoading) {
                  m.isLoading = isLoading;
                  rerender = true;
                }
                if (error !== undefined && m.error !== error) {
                  m.error = error;
                  rerender = true;
                }
              }
            }

            if (rerender) {
              for (const setPending of Object.values(this.useUpdateSetPendings)) {
                setPending(this.useUpdateMutations);
              }
            }
          }
        );

        const removeMutationsAndSetPending = () => {
          this.useUpdateMutations =
            this.useUpdateMutations.filter(m => m !== mutation);

          for (const setPending of Object.values(this.useUpdateSetPendings)) {
            setPending(this.useUpdateMutations);
          }
        }


        switch (responseOrStatus.case) {
          case "response": {
            await observed(() => {
              removeMutationsAndSetPending();
              resolve({
                response:
                  OwnerUpdateResponseFromProtobufShape(
                    Empty.fromBinary(
                    responseOrStatus.value
                  )
                )
              });
            });
            break;
          }
          case "status": {
            // Let the observers know they no longer should expect to
            // observe this idempotency key.
            for (const id in this.observers) {
              this.observers[id].unobserve(mutation.idempotencyKey);
            }

            const status = reboot_api.Status.fromJsonString(responseOrStatus.value);

            const aborted = OwnerUpdateAborted.fromStatus(status);

            console.warn(
              `[Reboot] 'Owner.Update' aborted with ${aborted.message}`
            );

            removeMutationsAndSetPending();
            resolve({ aborted });

            break;
          }
          default: {
            // TODO(benh): while this is a _really_ fatal error,
            // should we still set `aborted` instead of throwing?
            reject(new Error('Expecting either a response or a status'));
          }
        }
      });
  }

  useUpdate(
    id: string,
    setPending: (mutations: PendingOwnerUpdateMutation[]) => void
  ) {
    this.useUpdateSetPendings[id] = setPending;
  }

  unuseUpdate(id: string) {
    delete this.useUpdateSetPendings[id];
  }


  private useAddPetMutations: (
    PendingOwnerAddPetMutation)[] = [];

  private useAddPetSetPendings: {
    [id: string]: (mutations: PendingOwnerAddPetMutation[]) => void
  } = {};

  async addPet(
    mutation: PendingOwnerAddPetMutation
  ): Promise<
    reboot_web.ResponseOrAborted<
      Owner.AddPetResponse,
      OwnerAddPetAborted
  >> {
    // We always have at least 1 observer which is this function!
    let remainingObservers = 1;

    const event = new reboot_api.Event();

    let callbacks: (() => void)[] = [];

    const observed = (callback: () => void) => {
      callbacks = callbacks.concat(callback);
      remainingObservers -= 1;
      if (remainingObservers === 0) {
        for (const callback of callbacks) {
          callback();
        }
        event.set();
      }
      return event.wait();
    };

    const aborted = () => {
      observed(() => {});
    }

    // Tell observers about this pending mutation.
    for (const id in this.observers) {
      remainingObservers += 1;
      this.observers[id].observe(mutation.idempotencyKey, observed, aborted);
    }

    this.useAddPetMutations = this.useAddPetMutations.concat(mutation);

    for (const setPending of Object.values(this.useAddPetSetPendings)) {
      setPending(this.useAddPetMutations);
    }

    return new Promise<
      reboot_web.ResponseOrAborted<
        Owner.AddPetResponse,
        OwnerAddPetAborted
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "AddPet",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
            bearerToken: mutation.bearerToken,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            let rerender = false;
            for (const m of this.useAddPetMutations) {
              if (m === mutation) {
                if (m.isLoading !== isLoading) {
                  m.isLoading = isLoading;
                  rerender = true;
                }
                if (error !== undefined && m.error !== error) {
                  m.error = error;
                  rerender = true;
                }
              }
            }

            if (rerender) {
              for (const setPending of Object.values(this.useAddPetSetPendings)) {
                setPending(this.useAddPetMutations);
              }
            }
          }
        );

        const removeMutationsAndSetPending = () => {
          this.useAddPetMutations =
            this.useAddPetMutations.filter(m => m !== mutation);

          for (const setPending of Object.values(this.useAddPetSetPendings)) {
            setPending(this.useAddPetMutations);
          }
        }


        switch (responseOrStatus.case) {
          case "response": {
            await observed(() => {
              removeMutationsAndSetPending();
              resolve({
                response:
                  OwnerAddPetResponseFromProtobufShape(
                    petclinic_pb.OwnerAddPetResponse.fromBinary(
                    responseOrStatus.value
                  )
                )
              });
            });
            break;
          }
          case "status": {
            // Let the observers know they no longer should expect to
            // observe this idempotency key.
            for (const id in this.observers) {
              this.observers[id].unobserve(mutation.idempotencyKey);
            }

            const status = reboot_api.Status.fromJsonString(responseOrStatus.value);

            const aborted = OwnerAddPetAborted.fromStatus(status);

            console.warn(
              `[Reboot] 'Owner.AddPet' aborted with ${aborted.message}`
            );

            removeMutationsAndSetPending();
            resolve({ aborted });

            break;
          }
          default: {
            // TODO(benh): while this is a _really_ fatal error,
            // should we still set `aborted` instead of throwing?
            reject(new Error('Expecting either a response or a status'));
          }
        }
      });
  }

  useAddPet(
    id: string,
    setPending: (mutations: PendingOwnerAddPetMutation[]) => void
  ) {
    this.useAddPetSetPendings[id] = setPending;
  }

  unuseAddPet(id: string) {
    delete this.useAddPetSetPendings[id];
  }


  private useDetailsReaders: {
    [requestBearerTokenHash: string]: reboot_react.Reader<petclinic_pb.OwnerDetailsResponse>
  } = {};

  // `FinalizationRegistry` lets us abort a reader once React has
  // garbage-collected its promise (i.e. abandoned it). It is absent on
  // some runtimes (e.g. React Native's Hermes engine), where we simply
  // skip this cleanup and rely on the `unuse...` timeout path instead.
  private detailsFinalizationRegistry =
    typeof FinalizationRegistry !== "undefined"
      ? new FinalizationRegistry<() => void>((finalize) => finalize())
      : undefined;

  startDetails(
    requestBearerTokenHash: string,
    serializedRequest: Uint8Array,
    bearerToken: string | undefined,
    offlineCacheEnabled: boolean,
    cacheKey: string | null
  ) {
    let reader = this.useDetailsReaders[requestBearerTokenHash];

    if (reader === undefined) {
      const event = new reboot_api.Event();

      const promise = event.wait();

      reader = {
        abortController: new AbortController(),
        event,
        promise,
        used: false,
        scheduledUnusedTimeoutsCount: 0,
        setResponses: {},
        setIsLoadings: {},
        setStatuses: {},

        setResponse(
          response: petclinic_pb.OwnerDetailsResponse,
          { cache }: { cache: boolean } = { cache: true }
        ) {
          // Store the response, delete the status.
          this.response = response;
          delete this.status;

          // Trigger response or aborted has been received event (if
          // it wasn't triggered already).
          this.event.set();

          // Dispatch to all listeners.
          for (const setResponse of Object.values(this.setResponses)) {
            setResponse(response);
          }

          // Cache response if applicable.
          if (cache && offlineCacheEnabled) {
            reboot_api.assert(cacheKey !== null);
            const cachedResponse = response.toJsonString();
            reboot_web.offlineCache().set(cacheKey, cachedResponse)
              .catch((error) => {
                console.warn(
                  `[Reboot] Setting of offline reader cache entry for 'Owner.Details' errored with ${error}`
                );
              });
          }
        },

        setIsLoading(isLoading: boolean) {
          for (const setIsLoading of Object.values(this.setIsLoadings)) {
            setIsLoading(isLoading);
          }
        },

        setStatus(status: reboot_api.Status) {
          // Store the status, delete the response.
          this.status = status;
          delete this.response;

          // Trigger response or aborted has been received event (if
          // it wasn't triggered already).
          this.event.set();

          for (const setStatus of Object.values(this.setStatuses)) {
            setStatus(status);
          }
        },
      };

      this.detailsFinalizationRegistry?.register(
        promise,
        () => {
          if (!reader.used) {
            delete this.useDetailsReaders[requestBearerTokenHash];
            reader.abortController.abort();
          }
        }
      );

      // We want to remove the promise so that it can be garbage collected
      // which is our indication that React is no longer using it. But this
      // races with calls to `useDetails(...)`
      // that might be adding their `setResponse`, `setIsLoading`, etc, so
      // we delay deleting the promise for at least a second.
      //
      // Note that deleting the promise is okay because all subsequent calls
      // will simply use the `reader.response` since it will no longer be
      // undefined.
      reader.promise.then(async () => {
        // Allow the call to `useDetails(...)`
        // at least 5 seconds to indicate that the reader is being used,
        // afterwhich, once `reader.promise` gets garbage collected
        // we'll know that it must have been abandoned by React, e.g.,
        // because the component was suspended and never committed.
        await reboot_api.sleep({ ms: 5000 });

        delete reader.promise;
      });

      this.useDetailsReaders[requestBearerTokenHash] = reader;

      // Start fetching from the server.
      this.read(
        "Details",
        serializedRequest,
        bearerToken,
        petclinic_pb.OwnerDetailsResponse,
        reader
      );

      // Check if there is a cached result if applicable.
      if (offlineCacheEnabled) {
        reboot_api.assert(cacheKey !== null);

        reboot_web.offlineCache().get(cacheKey).then((cachedResponse) => {
          if (cachedResponse !== null) {
            // We only want to set the response if we haven't already
            // gotten a response from the server as it is the authority
            // and should take precedence.
            if (reader.response === undefined) {
              reader.setResponse(
                petclinic_pb.OwnerDetailsResponse.fromJsonString(cachedResponse),
                { cache: false } // Don't re-cache the value!
              );
            }
          }
        }).catch((error) => {
          console.warn(
            `[Reboot] Retrieval of offline reader cache entry for 'Owner.Details' errored with ${error}`
          );
        });
      }
    }

    reboot_api.assert(reader !== undefined);

    return reader;
  }

  useDetails(
    id: string,
    requestBearerTokenHash: string,
    serializedRequest: Uint8Array,
    bearerToken: string | undefined,
    offlineCacheEnabled: boolean,
    cacheKey: string | null,
    setResponse: (response: petclinic_pb.OwnerDetailsResponse) => void,
    setIsLoading: (isLoading: boolean) => void,
    setStatus: (status: reboot_api.Status) => void
  ) {
    // We need to call start here because with strict mode the
    // `useEffect` that calls this method will also call "unuse"
    // which will mean the next time the `useEffect` calls here
    // we'll create a new reader in start.
    const reader = this.startDetails(
      requestBearerTokenHash,
      serializedRequest,
      bearerToken,
      offlineCacheEnabled,
      cacheKey
    );

    reboot_api.assert(reader !== undefined);

    // Indicate that the reader has properly been used so that we don't
    // clean it up prematurely.
    reader.used = true;

    reader.setResponses[id] = setResponse;
    reader.setIsLoadings[id] = setIsLoading;
    reader.setStatuses[id] = setStatus;

    // If we already have a `response` or `status` need to set it.
    if (reader.response) {
      setResponse(reader.response);
      setIsLoading(false);
    } else if (reader.status) {
      setStatus(reader.status);
    }
  }

  unuseDetails(
    id: string,
    requestBearerTokenHash: string,
  ) {
    const reader = this.useDetailsReaders[requestBearerTokenHash];

    reboot_api.assert(reader !== undefined);

    delete reader.setResponses[id];
    delete reader.setIsLoadings[id];
    delete reader.setStatuses[id];

    // Schedule a timeout to delete and abort this reader if we're the
    // last user. We need a timeout because, with StrictMode turned on,
    // we can't remove the reader right away otherwise we won't have a
    // stable Event and Promise. We use 3 seconds but may need to make
    // configurable depending on the application.
    if (Object.values(reader.setResponses).length === 0) {
      reader.scheduledUnusedTimeoutsCount += 1;
      setTimeout(() => {
        reader.scheduledUnusedTimeoutsCount -= 1;
        if (
          reader.scheduledUnusedTimeoutsCount === 0 &&
          Object.values(reader.setResponses).length === 0
        ) {
          delete this.useDetailsReaders[requestBearerTokenHash];
          reader.abortController.abort();
        }
      }, 3000);
    }
  }


  private static instances: { [id: string]: OwnerInstance } = {};

  static use(id: string, stateRef: string, url: string) {
    if (!(id in this.instances)) {
      this.instances[id] = new OwnerInstance(id, stateRef, url);
    } else {
      this.instances[id].ref();
    }

    return this.instances[id];
  }

  unuse() {
    if (this.unref() === 0) {
      delete OwnerInstance.instances[this.id];
    }
  }
}


// Called with an explicit `id`: bound to that state, returns the
// `UseOwnerApi` handle directly.
export function useOwner(
  args: { id: string }
): UseOwnerApi;
// Called without an explicit `id`: resolves the default ID for this
// state. `owner` is the
// handle once a default ID resolves, or `undefined` when there is
// none (e.g. signed out); `isLoading` is true until resolution
// settles.
export function useOwner(
  args?: undefined
): {
  owner: UseOwnerApi | undefined;
  isLoading: boolean;
};
export function useOwner(
  { id: providedId }: { id?: string } = {}
):
  | UseOwnerApi
  | {
      owner: UseOwnerApi | undefined;
      isLoading: boolean;
    } {
  // Resolve `id` from the frontend-agnostic state-ID map. A `null` map
  // means that resolution is still in flight; an empty map means it
  // resolved with no default ID for us.
  const defaultIds = useDefaultStateIds();
  const isLoading = defaultIds === null;

  // Resolve ID: explicit > URL param (dev) > default-ID map.
  const devId = useMemo(() => {
    // React Native defines `window` but not `window.location`, so both
    // must be checked.
    if (
      typeof window !== "undefined" &&
      typeof window.location !== "undefined"
    ) {
      return new URLSearchParams(
        window.location.search
      ).get("petclinic.v1.Owner.id");
    }
    return null;
  }, []);

  const toolInputId =
    typeof defaultIds?.["petclinic.v1.Owner"] === "string"
      ? defaultIds["petclinic.v1.Owner"]
      : null;

  const resolvedId = providedId ?? devId ?? toolInputId;
  // Without a resolved ID we still run every hook below (rules of
  // hooks), binding to the inert empty-ID instance that opens no
  // socket.
  const id = resolvedId ?? "";
  // The unresolved no-id case carries an empty `stateRef` rather than
  // computing one. Keyed on the id being unresolved — an explicitly
  // passed empty id still reaches `stateIdToRef`, which rejects it.
  const stateRef =
    resolvedId == null
      ? ""
      : reboot_api.stateIdToRef("petclinic.v1.Owner", id);

  const rebootClient = reboot_react.useRebootClient();

  const url = rebootClient.url;
  const bearerToken = rebootClient.bearerToken;
  const refreshBearerToken = useRefreshBearerToken();

  const [instance, setInstance] = useState(() => {
    return OwnerInstance.use(
      id, stateRef, url
    );
  });

  if (instance.id !== id) {
    setInstance(
      OwnerInstance.use(
        id, stateRef, url
      )
    );
  }

  useEffect(() => {
    return () => {
      instance.unuse();
    };
  }, [instance]);

  const headers = useMemo(() => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.append("Connection", "keep-alive");

    if (bearerToken !== undefined) {
      headers.append("Authorization", `Bearer ${bearerToken}`);
    }

    return headers;
  }, [bearerToken]);


  function useRegister() {
    const [
      pending,
      setPending
    ] = useState<PendingOwnerRegisterMutation[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useRegister(id, setPending);
      return () => {
        instance.unuseRegister(id);
      };
    }, [instance]);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const register = useMemo(() => {
      const method = async (
        partialRequest: Owner.PartialRegisterRequest = {},
        options?: { metadata?: any, key?: string }
      ) => {
        const request = OwnerRegisterRequestToProtobuf(partialRequest);

        const idempotencyKey = options?.idempotencyKey ?? options?.key ?? reboot_web.makeExpiringIdempotencyKey();

        const mutation = {
          request,
          idempotencyKey,
          bearerToken,
          metadata: options?.metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        const result = await instance.register(mutation);

        // If the server rejected us due to an expired token,
        // refresh via the frontend's bearer-refresh and retry
        // once (mirrors the unary-call path).
        if (
          result.aborted !== undefined &&
          result.aborted.code === reboot_api.StatusCode.UNAUTHENTICATED &&
          refreshBearerToken
        ) {
          const newToken = await refreshBearerToken();
          if (newToken !== undefined) {
            return instance.register(
              { ...mutation, bearerToken: newToken }
            );
          }
        }

        return result;
      };

      method.pending =
        new Array<PendingOwnerRegisterMutation>();

      return method;
    }, [instance, bearerToken, refreshBearerToken]);

    register.pending = pending;

    return register;
  }

  const register = useRegister();


  function useUpdate() {
    const [
      pending,
      setPending
    ] = useState<PendingOwnerUpdateMutation[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useUpdate(id, setPending);
      return () => {
        instance.unuseUpdate(id);
      };
    }, [instance]);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const update = useMemo(() => {
      const method = async (
        partialRequest: Owner.PartialUpdateRequest = {},
        options?: { metadata?: any, key?: string }
      ) => {
        const request = OwnerUpdateRequestToProtobuf(partialRequest);

        const idempotencyKey = options?.idempotencyKey ?? options?.key ?? reboot_web.makeExpiringIdempotencyKey();

        const mutation = {
          request,
          idempotencyKey,
          bearerToken,
          metadata: options?.metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        const result = await instance.update(mutation);

        // If the server rejected us due to an expired token,
        // refresh via the frontend's bearer-refresh and retry
        // once (mirrors the unary-call path).
        if (
          result.aborted !== undefined &&
          result.aborted.code === reboot_api.StatusCode.UNAUTHENTICATED &&
          refreshBearerToken
        ) {
          const newToken = await refreshBearerToken();
          if (newToken !== undefined) {
            return instance.update(
              { ...mutation, bearerToken: newToken }
            );
          }
        }

        return result;
      };

      method.pending =
        new Array<PendingOwnerUpdateMutation>();

      return method;
    }, [instance, bearerToken, refreshBearerToken]);

    update.pending = pending;

    return update;
  }

  const update = useUpdate();


  function useAddPet() {
    const [
      pending,
      setPending
    ] = useState<PendingOwnerAddPetMutation[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useAddPet(id, setPending);
      return () => {
        instance.unuseAddPet(id);
      };
    }, [instance]);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const addPet = useMemo(() => {
      const method = async (
        partialRequest: Owner.PartialAddPetRequest = {},
        options?: { metadata?: any, key?: string }
      ) => {
        const request = OwnerAddPetRequestToProtobuf(partialRequest);

        const idempotencyKey = options?.idempotencyKey ?? options?.key ?? reboot_web.makeExpiringIdempotencyKey();

        const mutation = {
          request,
          idempotencyKey,
          bearerToken,
          metadata: options?.metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        const result = await instance.addPet(mutation);

        // If the server rejected us due to an expired token,
        // refresh via the frontend's bearer-refresh and retry
        // once (mirrors the unary-call path).
        if (
          result.aborted !== undefined &&
          result.aborted.code === reboot_api.StatusCode.UNAUTHENTICATED &&
          refreshBearerToken
        ) {
          const newToken = await refreshBearerToken();
          if (newToken !== undefined) {
            return instance.addPet(
              { ...mutation, bearerToken: newToken }
            );
          }
        }

        return result;
      };

      method.pending =
        new Array<PendingOwnerAddPetMutation>();

      return method;
    }, [instance, bearerToken, refreshBearerToken]);

    addPet.pending = pending;

    return addPet;
  }

  const addPet = useAddPet();



  function useDetails(
    partialRequest: Owner.PartialDetailsRequest = {},
    options: { suspense: boolean } = { suspense: false }
  ) {
    const newRequest = OwnerDetailsRequestToProtobuf(partialRequest);

    const [request, setRequest] = useState(newRequest);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const serializedRequest = useMemo(() => request.toBinary(), [request]);

    // To distinguish this call from others when caching responses on
    // the client we compute a "request hash" using SHA256 from the
    // `request`.
    // We memoize this so we don't do it every time.
    const requestHash: string = useMemo(
      () => {
        const hash = reboot_web.calcSha256();
        hash.add(serializedRequest);
        return hash.digest().hex();
      },
      [serializedRequest]
    );

    // To create a map of unused readers globally on the client, we
    // compute a "request hash" using SHA256 from the `request`
    // including the bearerToken.
    // We memoize this so we don't do it every time.
    const requestBearerTokenHash: string = useMemo(
      () => {
        const hash = reboot_web.calcSha256();
        hash.add(serializedRequest);
        if (bearerToken) {
          hash.add(bearerToken);
        }
        return hash.digest().hex();
      },
      [serializedRequest, bearerToken]
    );

    const offlineCacheEnabled = rebootClient.offlineCacheEnabled;

    const cacheKey: string | null = useMemo(
      () => {
        if (offlineCacheEnabled) {
          return `${stateRef}:Details:${requestHash}`;
        }
        return null;
      },
      [stateRef, offlineCacheEnabled, requestHash]
    );

    // We start reading here, or if another component already started
    // the reading then we just get back the reader. We need to do this
    // before setting up our `useState`s because when using suspense
    // we need to use the `reader.response` or `reader.status` during
    // render where one of them will be defined, i.e., after we've
    // waited for `reader.promise` via `React.use()`.
    const reader = instance.startDetails(
      requestBearerTokenHash,
      serializedRequest,
      bearerToken,
      offlineCacheEnabled,
      cacheKey
    );

    const [response, setResponse] = useState<
      Owner.DetailsResponse | undefined
      >(reader.response && OwnerDetailsResponseFromProtobufShape(reader.response));

    const [aborted, setAborted] = useState<
      OwnerDetailsAborted | undefined
      >(reader.status && OwnerDetailsAborted.fromStatus(reader.status));

    // Track which state ID the current `response` and `aborted` belong
    // to so we can reset them when the state ID changes, back into
    // their "loading" state. We track `id` rather than `instance`
    // because `id` updates immediately from props, whereas `instance`
    // only updates later after a separate `setState`.
    const [responseStateId, setResponseStateId] = useState(id);
    if (responseStateId !== id) {
      setResponseStateId(id);
      setResponse(undefined);
      setAborted(undefined);
      setIsLoading(true);
    }

    useEffect(() => {
      const id = uuidv4();

      instance.useDetails(
        id,
        requestBearerTokenHash,
        serializedRequest,
        bearerToken,
        offlineCacheEnabled,
        cacheKey,
        (response: petclinic_pb.OwnerDetailsResponse) => {
          setAborted(undefined);
          setResponse(OwnerDetailsResponseFromProtobufShape(response));
        },
        setIsLoading,
        (status: reboot_api.Status) => {
          // If the server rejected us due to an expired
          // token, refresh via the frontend's bearer-refresh
          // (the MCP host, or the web session). The token
          // change triggers a re-render and reconnect.
          if (
            status.code === reboot_api.StatusCode.UNAUTHENTICATED &&
            refreshBearerToken
          ) {
            refreshBearerToken();
          }

          const aborted = OwnerDetailsAborted.fromStatus(status);

          console.warn(
            `[Reboot] 'Owner.Details' aborted with ${aborted.message}`
          );

          setAborted(aborted);
          setResponse(undefined);
        },
      );

      return () => {
        instance.unuseDetails(id, requestBearerTokenHash);
      };
    }, [
      instance,
      serializedRequest,
      requestBearerTokenHash,
      bearerToken,
      refreshBearerToken,
      offlineCacheEnabled,
      cacheKey,
    ]);

    // If the user has requested suspense via `options.suspense` then
    // we need to use `useMemo` to create a stable promise to pass
    // to `React.use()`. This is important for two reasons:
    //
    // 1. `reader.promise` gets deleted after 5 seconds to
    //    allow GC-based detection of abandoned readers (via
    //    `FinalizationRegistry`), so we can't pass it directly
    //    on every render.
    //
    // 2. `React.use()` suspends at least once for each new
    //    promise it sees (to call `.then()`), so we must
    //    return the same promise across re-renders for a given
    //    reader.
    //
    // When suspense is not requested, or the reader's event is
    // already set (i.e., we have a response or aborted status),
    // we return a pre-resolved promise. Note that `React.use()`
    // will suspend at least once even for a pre-resolved promise
    // in order to set internal state on it, but on subsequent
    // renders it will recognize the same promise and return
    // without suspending.
	//
	// We need to store the suspense promise in a `useRef` so
	// that we can continually return it even if the reader is
	// changing due to things like the `bearerToken` changing,
	// however, we don't want to flicker the suspense fallback
	// when `bearerToken` changes after we've already received
	// a stable `response` (or `aborted`).
	const suspensePromiseRef = useRef(undefined);

    const suspensePromise = useMemo(
      () => {
	    if (suspensePromiseRef.current === undefined || (response === undefined && aborted === undefined)) {
          if (!options.suspense || reader.event.isSet()) {
		    suspensePromiseRef.current = Promise.resolve();
          } else {
            reboot_api.assert(reader.promise !== undefined);
			reboot_api.assert(response === undefined);
			reboot_api.assert(aborted === undefined);
            suspensePromiseRef.current = reader.promise.then(() => {});
          }
		}
		return suspensePromiseRef.current;
      },
      [options.suspense, reader, response, aborted]
    );

    if (options.suspense) {
      if (!("use" in React)) {
        // Raise if it doesn't look like we are using React>=19.
        const error = "In order to pass `suspense: true` to a Reboot reactive reader you must be using React>=19 which provides `React.use`";
        console.error(error);
        throw new Error(error);
      }

      React.use(suspensePromise);
    }

    if (!request.equals(newRequest)) {
      setRequest(newRequest);
      setIsLoading(true);

      return { response, isLoading: true, aborted };
    }

    return { response, isLoading, aborted };
  }

  async function details(
    partialRequest: Owner.PartialDetailsRequest = {},
    options?: { signal?: AbortSignal; retry?: boolean }
  ) {
    let retry = true;
    if (options !== undefined && options.retry !== undefined) {
      retry = options.retry;
    }

    const request = OwnerDetailsRequestToProtobuf(partialRequest);

    // The age of the transaction this call started, once an error has
    // told us: the root transaction id of its first attempt. A retry
    // carries it so that the retried transaction is as old as its first
    // attempt rather than younger than every transaction started since.
    let transactionRetryAge: string | undefined;

    // Fetch with retry, using a backoff, i.e., if we get disconnected
    // or the server asks us to try again.
    const { response, aborted } = await (async () => {
      const backoff = new reboot_api.Backoff();
      // A `TransactionShouldRetry` may ask us to retry immediately, but
      // we elide the backoff only once: a transaction that keeps being
      // asked to start over should still back off.
      let backoffElided = false;

      while (true) {
        let retryWithoutBackoff = false;
        // Copied per attempt so that a retry age set for this call does
        // not outlive it on the hook's shared headers.
        const attemptHeaders = new Headers(headers);
        if (transactionRetryAge !== undefined) {
          attemptHeaders.set("x-reboot-transaction-retry-age", transactionRetryAge);
        }
        try {
          // Invariant here is that we use the '/package.service.method' path and
          // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
          //
          // See also 'reboot/helpers.py'.
          const response = await reboot_web.guardedFetch(
            `${rebootClient.url}/__/reboot/rpc/${stateRef}/petclinic.v1.OwnerMethods/Details`,
            {
              ...options,
              method: "POST",
              headers: attemptHeaders,
              body: request.toJsonString()
            }
          );
          // A 'fetch' does not throw on these, so check the status and
          // retry the same way a failed 'fetch' is retried:
          // - 502 (Bad Gateway): the proxy can not reach the backend.
          // - 503 (Unavailable): the server is temporarily unavailable,
          //   or is asking for the transaction to be started over.
          // - 499 (Cancelled): the request was cancelled, often because
          //   the server is shutting down.
          if (
            response.status === 502 ||
            response.status === 503 ||
            response.status === 499
          ) {
            if (response.headers.get("content-type") === "application/json") {
              const status = reboot_api.Status.fromJson(await response.json());
              const shouldRetry = reboot_api.errorFromGoogleRpcStatusDetails(
                status,
                [reboot_api.errors_pb.TransactionShouldRetry] as const
              );
              if (shouldRetry !== undefined) {
                retryWithoutBackoff =
                  reboot_api.TRANSACTION_SHOULD_RETRY_REASONS_WITHOUT_BACKOFF.has(
                    shouldRetry.reason
                  );
                if (transactionRetryAge === undefined && shouldRetry.retryAge !== "") {
                  transactionRetryAge = shouldRetry.retryAge;
                }
                if (
                  shouldRetry.reason ===
                  reboot_api.errors_pb.TransactionShouldRetry_Reason.PRESUMED_DEADLOCK
                ) {
                  console.warn(
                    `[Reboot] Retrying call to \`petclinic.v1.OwnerMethods.Details\` because its transaction is presumed deadlocked: ${status.message}`
                  );
                }
              }
              // Handled in the 'catch' block below.
              throw OwnerDetailsAborted.fromStatus(status);
            }
            throw new OwnerDetailsAborted(
              new reboot_api.errors_pb.Unknown(), {
                message: `Unknown error with HTTP status ${response.status}`
              }
            );
          }
          return { response };
        } catch (e: unknown) {
          if (options?.signal?.aborted || !retry) {
            if (e instanceof OwnerDetailsAborted) {
              return { aborted: e };
            }
            const aborted = new OwnerDetailsAborted(
              new reboot_api.errors_pb.Aborted(), {
                message: e instanceof Error
                  ? `${e}`
                  : `Unknown error: ${JSON.stringify(e)}`
              }
            );

            return { aborted };
          } else if (e instanceof Error) {
            console.error(e);
          } else {
            console.error(`[Reboot] Unknown error: ${JSON.stringify(e)}`);
          }
        }

        if (retryWithoutBackoff && !backoffElided) {
          backoffElided = true;
          continue;
        }

        await backoff.wait(`[Reboot] Retrying call to \`petclinic.v1.OwnerMethods.Details\` with backoff...`);
      }
    })();

    if (aborted) {
      return { aborted };
    } else if (response.status === 401 && refreshBearerToken) {
      // Token expired — refresh via the frontend's bearer-refresh
      // and retry once.
      const newToken = await refreshBearerToken();
      if (newToken) {
        const retryHeaders = new Headers();
        retryHeaders.set("Content-Type", "application/json");
        retryHeaders.append("Connection", "keep-alive");
        retryHeaders.append("Authorization", `Bearer ${newToken}`);
        try {
          const retryResponse = await reboot_web.guardedFetch(
            `${rebootClient.url}/__/reboot/rpc/${stateRef}/petclinic.v1.OwnerMethods/Details`,
            {
              ...options,
              method: "POST",
              headers: retryHeaders,
              body: request.toJsonString()
            }
          );
          if (retryResponse.ok) {
            return {
              response:
                OwnerDetailsResponseFromProtobufShape((petclinic_pb.OwnerDetailsResponse.fromJson(await retryResponse.json())))
            };
          }
          // Fall through to generic error handling on retry failure.
          return {
            aborted: new OwnerDetailsAborted(
              new reboot_api.errors_pb.Unknown(), {
                message: `Unknown error with HTTP status ${retryResponse.status} after token refresh`
              }
            )
          };
        } catch (e: unknown) {
          return {
            aborted: new OwnerDetailsAborted(
              new reboot_api.errors_pb.Aborted(), {
                message: e instanceof Error
                  ? `${e}`
                  : `Unknown error: ${JSON.stringify(e)}`
              }
            )
          };
        }
      }
      // Refresh failed — fall through to generic error.
      return {
        aborted: new OwnerDetailsAborted(
          new reboot_api.errors_pb.Unknown(), {
            message: `Unauthorized (HTTP 401) and token refresh failed`
          }
        )
      };
    } else if (!response.ok) {
      if (response.headers.get("content-type") === "application/json") {
        const status = reboot_api.Status.fromJson(await response.json());


        // If the server rejected us due to an expired
        // token, refresh via the frontend's bearer-refresh and
        // retry once.
        if (
          status.code === reboot_api.StatusCode.UNAUTHENTICATED &&
          refreshBearerToken
        ) {
          const newToken = await refreshBearerToken();
          if (newToken) {
            const retryHeaders = new Headers();
            retryHeaders.set(
              "Content-Type", "application/json",
            );
            retryHeaders.append(
              "Connection", "keep-alive",
            );
            retryHeaders.append(
              "Authorization", `Bearer ${newToken}`,
            );
            try {
              const retryResponse =
                await reboot_web.guardedFetch(
                  `${rebootClient.url}/__/reboot/rpc/${stateRef}/petclinic.v1.OwnerMethods/Details`,
                  {
                    ...options,
                    method: "POST",
                    headers: retryHeaders,
                    body: request.toJsonString()
                  }
                );
              if (retryResponse.ok) {
                return {
                  response:
                    OwnerDetailsResponseFromProtobufShape((petclinic_pb.OwnerDetailsResponse.fromJson(await retryResponse.json())))
                };
              }
            } catch {
              // Fall through to return the original aborted error.
            }
          }
        }

        const aborted = OwnerDetailsAborted.fromStatus(status);

        console.warn(
          `[Reboot] 'Owner.Details' aborted with ${aborted.message}`
        );

        return { aborted };
      } else {
        const aborted = new OwnerDetailsAborted(
          new reboot_api.errors_pb.Unknown(), {
            message: `Unknown error with HTTP status ${response.status}`
          }
        );

        return { aborted };
      }
    } else {
      return {
        response:
          OwnerDetailsResponseFromProtobufShape((petclinic_pb.OwnerDetailsResponse.fromJson(await response.json())))
      };
    }
  }


  // Don't re-render if `id` hasn't changed.
    const api: UseOwnerApi = useMemo(() => ({
      state_id: id,
      mutators: {
        register,
        update,
        addPet,
      },
      idempotently: ({ key }: { key: string }) => {
      return {
        register: (
          partialRequest?:Owner.PartialRegisterRequest,
          options?: { metadata?: any }
        ) => register(partialRequest, { ...options, key }),
        update: (
          partialRequest?:Owner.PartialUpdateRequest,
          options?: { metadata?: any }
        ) => update(partialRequest, { ...options, key }),
        addPet: (
          partialRequest?:Owner.PartialAddPetRequest,
          options?: { metadata?: any }
        ) => addPet(partialRequest, { ...options, key }),
      };
    },
      register,
      update,
      addPet,
      details,
      useDetails,
    }), [id, instance, bearerToken, refreshBearerToken]);

  // An explicit `id` caller gets the handle directly; a no-id caller
  // gets the `{ owner, isLoading }`
  // shape, where the handle is `undefined` until a default ID
  // resolves.
  if (providedId !== undefined) {
    return api;
  }
  return {
    owner: resolvedId ? api : undefined,
    isLoading,
  };
};



export class Owner {
  static State = OwnerProto;
}
export namespace Owner {
  export type State = OwnerProto;
}

export interface SettingsParams {
  id: string;
  storeMutationsLocallyInNamespace?: string;
}

class PetInstance {

  constructor(id: string, stateRef: string, url: string) {
    this.id = id;
    this.stateRef = stateRef;
    this.url = url;
    this.refs = 1;

    // An empty `id` marks the inert instance shared by every no-id
    // caller while no default ID has resolved (e.g. signed out): it
    // opens no socket so there's nothing to connect to.
    if (id !== "") {
      reboot_web.websockets.connect(this.url, this.stateRef);
      this.initializeWebSocket();
    }
  }

  private ref() {
    this.refs += 1;
    return this.refs;
  }

  private unref() {
    this.refs -= 1;

    if (this.refs === 0 && this.websocket !== undefined) {
      this.websocket.close();
       reboot_web.websockets.disconnect(this.url, this.stateRef);
    }

    return this.refs;
  }

  readonly id: string;
  readonly stateRef: string;
  private url: string;
  private refs: number;
  private observers: reboot_react.Observers = {};
  private loadingReaders = 0;
  private runningMutates: reboot_react.Mutate[] = [];
  private queuedMutates: reboot_react.Mutate[] = [];
  private flushMutates?: reboot_api.Event = undefined;
  private websocket?: WebSocket = undefined;
  private backoff: reboot_api.Backoff = new reboot_api.Backoff();

  private hasRunningMutations() {
    return this.runningMutates.length > 0;
  }

  private async flushMutations() {
    if (this.flushMutates === undefined) {
      this.flushMutates = new reboot_api.Event();
    }
    await this.flushMutates.wait();
  }

  private readersLoadedOrFailed() {
    this.flushMutates = undefined;

    if (this.queuedMutates.length > 0) {
      this.runningMutates = this.queuedMutates;
      this.queuedMutates = [];

      if (this.websocket?.readyState === WebSocket.OPEN) {
        for (const { request, update } of this.runningMutates) {
          update({ isLoading: true });
          try {
            this.websocket.send(request.toBinary());
          } catch {
            // We'll retry since we've stored in `*Mutates`.
          }
        }
      }
    }
  }

  private initializeWebSocket() {
    if (this.websocket === undefined && this.refs > 0 && this.id !== "") {
      const url = new URL(`${this.url}/__/reboot/rpc/${this.stateRef}`);
      url.protocol = url.protocol === "https:" ? "wss:" : "ws:";

      this.websocket = reboot_web.websockets.create(url);

      this.websocket.binaryType = "arraybuffer";

      this.websocket.onopen = () => {
        if (this.websocket?.readyState === WebSocket.OPEN) {
          for (const { request, update } of this.runningMutates) {
            update({ isLoading: true });
            try {
              this.websocket.send(request.toBinary());
            } catch {
              // We'll retry since we've stored in `*Mutates`.
            }
          }
        }
      };

      this.websocket.onerror = async () => {
        if (this.websocket !== undefined) {
          this.websocket = undefined;

          for (const { update } of this.runningMutates) {
            update({ isLoading: false, error: "WebSocket disconnected" });
          }

          if (this.refs > 0) {
            if (this.runningMutates.length > 0) {
              console.warn(
                `[Reboot] WebSocket disconnected, ${this.runningMutates.length} outstanding mutations will be retried when we reconnect`
              );
            }

            await this.backoff.wait();

            this.initializeWebSocket();
          }
        }
      };

      this.websocket.onclose = async () => {
        if (this.websocket !== undefined) {
          this.websocket = undefined;

          for (const { update } of this.runningMutates) {
            update({ isLoading: false, error: "WebSocket disconnected" });
          }

          if (this.refs > 0) {
            await this.backoff.wait();

            this.initializeWebSocket();
          }
        }
      };

      this.websocket.onmessage = async (event) => {
        const { resolve } = this.runningMutates[0];
        this.runningMutates.shift();

        const response = reboot_api.react_pb.MutateResponse.fromBinary(
          new Uint8Array(event.data)
        );

        resolve(response);

        if (
          this.flushMutates !== undefined &&
          this.runningMutates.length === 0
        ) {
          this.flushMutates.set();
        }
      };
    }
  }

  private async mutate(
    partialRequest: protobuf_es.PartialMessage<reboot_api.react_pb.MutateRequest>,
    update: (props: { isLoading: boolean; error?: any }) => void
  ): Promise<reboot_api.react_pb.MutateResponse> {
    const request = partialRequest instanceof reboot_api.react_pb.MutateRequest
      ? partialRequest
      : new reboot_api.react_pb.MutateRequest(partialRequest);

    return new Promise((resolve, _) => {
      if (this.loadingReaders === 0) {
        this.runningMutates = this.runningMutates.concat({ request, resolve, update });
        if (this.websocket?.readyState === WebSocket.OPEN) {
          update({ isLoading: true });
          try {
            this.websocket.send(request.toBinary());
          } catch {
            // We'll retry since we've stored in `*Mutates`.
          }
        }
      } else {
        this.queuedMutates = this.queuedMutates.concat({ request, resolve, update });
      }
    });
  }

  private async read<
    RequestType extends protobuf_es.Message<RequestType>,
    ResponseType extends protobuf_es.Message<ResponseType>,
    >(
    method: string,
    serializedRequest: Uint8Array,
    bearerToken: string | undefined,
    responseType: protobuf_es.MessageType<ResponseType>,
    reader: reboot_react.Reader<ResponseType>
  ) {
    const queryRequest = new reboot_api.react_pb.QueryRequest({
      method,
      request: serializedRequest,
      ...(bearerToken !== undefined && { bearerToken } || {}),
    });

    // Expected idempotency key we should observe due to a mutation.
    interface Expected {
      // Idempotency key of mutation.
      idempotencyKey: string;

      // Callback when we've observed this idempotency key.
      observed: (callback: () => void) => Promise<void>;

      // Callback when we no longer care about observing.
      aborted: () => void;
    }

    let expecteds: Expected[] = [];

    // When we disconnect we may not be able to observe
    // responses due to mutations yet there may still be
    // some outstanding responses that are expected which
    // we treat as "orphans" in the sense that we won't
    // observe their idempotency keys but once we reconnect
    // we will still have observed their effects and can
    // call `observed()` on them.
    let orphans: Expected[] = [];

    const id = `${uuidv4()}`;

    this.observers[id] = {
      observe: (
        idempotencyKey: string,
        observed: (callback: () => void) => Promise<void>,
        aborted: () => void
      ) => {
        expecteds = expecteds.concat({ idempotencyKey, observed, aborted })
      },
      unobserve: (idempotencyKey: string) => {
        expecteds = expecteds.filter(
          expected => expected.idempotencyKey !== idempotencyKey
        );

        orphans = orphans.filter(
          orphan => orphan.idempotencyKey !== idempotencyKey
        );
      }
    };

    try {
      await reboot_api.retryForever(async () => {
        let loaded = false;
        this.loadingReaders += 1;

        // Any mutations started after we've incremented
        // `this.loadingReaders` will be queued until after
        // all the readers have loaded and thus (1) we know all
        // current `expected` are actually `orphans` that
        // we will haved "observed" once we are (re)connected
        // because we flush mutations before starting to read
        // and (2) all queued mutations can stay in `expected`
        // because we will in fact be able to observe them
        // since they won't get sent over the websocket
        // until after we are (re)connected.
        //
        // NOTE: we need to concatenate with `orphans`
        // because we may try to (re)connect multiple times
        // and between each try more mutations may have been
        // made (or queued ones will be moved to running).
        orphans = [...orphans, ...expecteds];
        expecteds = [];

        try {
          // Wait for potentially completed mutations to flush
          // before starting to read so that we read the latest
          // state including those mutations.
          if (this.hasRunningMutations()) {
            await this.flushMutations();
          }

          reader.setIsLoading(true);

          const queryResponses = reboot_web.reactiveReader({
            endpoint: `${this.url}/__/reboot/rpc/${this.stateRef}`,
            request: queryRequest,
            signal: reader.abortController.signal,
          });

          for await (const queryResponse of queryResponses) {
            if (!loaded) {
              if ((this.loadingReaders -= 1) === 0) {
                this.readersLoadedOrFailed();
              }
              loaded = true;
            }

            reader.setIsLoading(false);

            const response = queryResponse.responseOrStatus.case === "response"
              ? responseType.fromBinary(queryResponse.responseOrStatus.value)
              : undefined;

            // If we were disconnected it must be that we've
            // observed all `orphans` because we waited
            // for any mutations to flush before we re-started to
            // read.
            const haveOrphans = orphans.length;
            if (haveOrphans > 0) {
              // We mark all mutations as observed except the
              // last one which we also invoke all `setResponse`s.
              // In this way we effectively create a barrier
              // for all readers that will synchronize on the last
              // mutation, but note that this still may lead
              // to some partial state/response updates because
              // one reader may have actually received a response
              // while another reader got disconnected. While this
              // is likely very rare, it is possible. Mitigating
              // this issue is non-trivial and for now we have
              // no plans to address it.
              for (let i = 0; i < orphans.length - 1; i++) {
                orphans[i].observed(() => {});
              }
              await orphans[orphans.length - 1].observed(() => {
                if (response !== undefined) {
                  reader.setResponse(response);
                }
              });

              orphans = [];
            }
            // We want to check the orphans list AND the expecteds list because
            // it could be possible that we receive a query response that
            // contains an idempotency key that we are expecting while having an
            // orphans list with a length greater than 0. In this case, we don't
            // want to skip checking the expecteds list just because we have
            // already checked the orphans list.
            if (
              expecteds.length > 0 &&
              queryResponse.idempotencyKeys.includes(
                expecteds[0].idempotencyKey
              )
            ) {
              await expecteds[0].observed(() => {
                if (response !== undefined) {
                  reader.setResponse(response);
                }
                expecteds.shift();
              });
            }
            // If we don't have any orphans to observe and we don't have any expecteds to observe,
	          // or at least, the first expecteds _is not observed_ by this response, then go ahead and
	          // pass on the response because it might contain new data that should get shown to the
	          // user (e.g., in a chat room this could be a new message from a different user).
            else if (response !== undefined && !haveOrphans) {
              reader.setResponse(response);
            }
          }

          throw new Error('Not expecting stream to ever be done');
        } catch (e: unknown) {
          if (!loaded) {
            if ((this.loadingReaders -= 1) === 0) {
              this.readersLoadedOrFailed();
            }
          }

          loaded = false;

          if (reader.abortController.signal.aborted) {
            for (const { aborted } of [...orphans, ...expecteds]) {
              aborted();
            }
            return;
          }

          // Intentionally leave `isLoading: true` here. The outer
          // `retryForever(...)` will run another attempt and call
          // `reader.setIsLoading(true)` again at the top of the
          // try block, but if we cleared it to `false` here first
          // consumers would observe a brief `false → true → false
          // → true ...` flip-flop on every retry while we're
          // actually still trying to (re)connect. Once a response
          // finally arrives the success path sets it to `false`.

          if (e instanceof reboot_api.Status) {
            reader.setStatus(e);
          } else {
            console.warn(
              `[Reboot] Caught unknown exception: ${e instanceof Error ? e.message : JSON.stringify(e)}`
            );
          }

          throw e; // This just retries!
        }
      });
    } finally {
      delete this.observers[id];
    }
  }


  private useRegisterMutations: (
    PendingPetRegisterMutation)[] = [];

  private useRegisterSetPendings: {
    [id: string]: (mutations: PendingPetRegisterMutation[]) => void
  } = {};

  async register(
    mutation: PendingPetRegisterMutation
  ): Promise<
    reboot_web.ResponseOrAborted<
      Pet.RegisterResponse,
      PetRegisterAborted
  >> {
    // We always have at least 1 observer which is this function!
    let remainingObservers = 1;

    const event = new reboot_api.Event();

    let callbacks: (() => void)[] = [];

    const observed = (callback: () => void) => {
      callbacks = callbacks.concat(callback);
      remainingObservers -= 1;
      if (remainingObservers === 0) {
        for (const callback of callbacks) {
          callback();
        }
        event.set();
      }
      return event.wait();
    };

    const aborted = () => {
      observed(() => {});
    }

    // Tell observers about this pending mutation.
    for (const id in this.observers) {
      remainingObservers += 1;
      this.observers[id].observe(mutation.idempotencyKey, observed, aborted);
    }

    this.useRegisterMutations = this.useRegisterMutations.concat(mutation);

    for (const setPending of Object.values(this.useRegisterSetPendings)) {
      setPending(this.useRegisterMutations);
    }

    return new Promise<
      reboot_web.ResponseOrAborted<
        Pet.RegisterResponse,
        PetRegisterAborted
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "Register",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
            bearerToken: mutation.bearerToken,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            let rerender = false;
            for (const m of this.useRegisterMutations) {
              if (m === mutation) {
                if (m.isLoading !== isLoading) {
                  m.isLoading = isLoading;
                  rerender = true;
                }
                if (error !== undefined && m.error !== error) {
                  m.error = error;
                  rerender = true;
                }
              }
            }

            if (rerender) {
              for (const setPending of Object.values(this.useRegisterSetPendings)) {
                setPending(this.useRegisterMutations);
              }
            }
          }
        );

        const removeMutationsAndSetPending = () => {
          this.useRegisterMutations =
            this.useRegisterMutations.filter(m => m !== mutation);

          for (const setPending of Object.values(this.useRegisterSetPendings)) {
            setPending(this.useRegisterMutations);
          }
        }


        switch (responseOrStatus.case) {
          case "response": {
            await observed(() => {
              removeMutationsAndSetPending();
              resolve({
                response:
                  PetRegisterResponseFromProtobufShape(
                    Empty.fromBinary(
                    responseOrStatus.value
                  )
                )
              });
            });
            break;
          }
          case "status": {
            // Let the observers know they no longer should expect to
            // observe this idempotency key.
            for (const id in this.observers) {
              this.observers[id].unobserve(mutation.idempotencyKey);
            }

            const status = reboot_api.Status.fromJsonString(responseOrStatus.value);

            const aborted = PetRegisterAborted.fromStatus(status);

            console.warn(
              `[Reboot] 'Pet.Register' aborted with ${aborted.message}`
            );

            removeMutationsAndSetPending();
            resolve({ aborted });

            break;
          }
          default: {
            // TODO(benh): while this is a _really_ fatal error,
            // should we still set `aborted` instead of throwing?
            reject(new Error('Expecting either a response or a status'));
          }
        }
      });
  }

  useRegister(
    id: string,
    setPending: (mutations: PendingPetRegisterMutation[]) => void
  ) {
    this.useRegisterSetPendings[id] = setPending;
  }

  unuseRegister(id: string) {
    delete this.useRegisterSetPendings[id];
  }


  private useUpdateMutations: (
    PendingPetUpdateMutation)[] = [];

  private useUpdateSetPendings: {
    [id: string]: (mutations: PendingPetUpdateMutation[]) => void
  } = {};

  async update(
    mutation: PendingPetUpdateMutation
  ): Promise<
    reboot_web.ResponseOrAborted<
      Pet.UpdateResponse,
      PetUpdateAborted
  >> {
    // We always have at least 1 observer which is this function!
    let remainingObservers = 1;

    const event = new reboot_api.Event();

    let callbacks: (() => void)[] = [];

    const observed = (callback: () => void) => {
      callbacks = callbacks.concat(callback);
      remainingObservers -= 1;
      if (remainingObservers === 0) {
        for (const callback of callbacks) {
          callback();
        }
        event.set();
      }
      return event.wait();
    };

    const aborted = () => {
      observed(() => {});
    }

    // Tell observers about this pending mutation.
    for (const id in this.observers) {
      remainingObservers += 1;
      this.observers[id].observe(mutation.idempotencyKey, observed, aborted);
    }

    this.useUpdateMutations = this.useUpdateMutations.concat(mutation);

    for (const setPending of Object.values(this.useUpdateSetPendings)) {
      setPending(this.useUpdateMutations);
    }

    return new Promise<
      reboot_web.ResponseOrAborted<
        Pet.UpdateResponse,
        PetUpdateAborted
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "Update",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
            bearerToken: mutation.bearerToken,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            let rerender = false;
            for (const m of this.useUpdateMutations) {
              if (m === mutation) {
                if (m.isLoading !== isLoading) {
                  m.isLoading = isLoading;
                  rerender = true;
                }
                if (error !== undefined && m.error !== error) {
                  m.error = error;
                  rerender = true;
                }
              }
            }

            if (rerender) {
              for (const setPending of Object.values(this.useUpdateSetPendings)) {
                setPending(this.useUpdateMutations);
              }
            }
          }
        );

        const removeMutationsAndSetPending = () => {
          this.useUpdateMutations =
            this.useUpdateMutations.filter(m => m !== mutation);

          for (const setPending of Object.values(this.useUpdateSetPendings)) {
            setPending(this.useUpdateMutations);
          }
        }


        switch (responseOrStatus.case) {
          case "response": {
            await observed(() => {
              removeMutationsAndSetPending();
              resolve({
                response:
                  PetUpdateResponseFromProtobufShape(
                    Empty.fromBinary(
                    responseOrStatus.value
                  )
                )
              });
            });
            break;
          }
          case "status": {
            // Let the observers know they no longer should expect to
            // observe this idempotency key.
            for (const id in this.observers) {
              this.observers[id].unobserve(mutation.idempotencyKey);
            }

            const status = reboot_api.Status.fromJsonString(responseOrStatus.value);

            const aborted = PetUpdateAborted.fromStatus(status);

            console.warn(
              `[Reboot] 'Pet.Update' aborted with ${aborted.message}`
            );

            removeMutationsAndSetPending();
            resolve({ aborted });

            break;
          }
          default: {
            // TODO(benh): while this is a _really_ fatal error,
            // should we still set `aborted` instead of throwing?
            reject(new Error('Expecting either a response or a status'));
          }
        }
      });
  }

  useUpdate(
    id: string,
    setPending: (mutations: PendingPetUpdateMutation[]) => void
  ) {
    this.useUpdateSetPendings[id] = setPending;
  }

  unuseUpdate(id: string) {
    delete this.useUpdateSetPendings[id];
  }


  private useRecordVisitMutations: (
    PendingPetRecordVisitMutation)[] = [];

  private useRecordVisitSetPendings: {
    [id: string]: (mutations: PendingPetRecordVisitMutation[]) => void
  } = {};

  async recordVisit(
    mutation: PendingPetRecordVisitMutation
  ): Promise<
    reboot_web.ResponseOrAborted<
      Pet.RecordVisitResponse,
      PetRecordVisitAborted
  >> {
    // We always have at least 1 observer which is this function!
    let remainingObservers = 1;

    const event = new reboot_api.Event();

    let callbacks: (() => void)[] = [];

    const observed = (callback: () => void) => {
      callbacks = callbacks.concat(callback);
      remainingObservers -= 1;
      if (remainingObservers === 0) {
        for (const callback of callbacks) {
          callback();
        }
        event.set();
      }
      return event.wait();
    };

    const aborted = () => {
      observed(() => {});
    }

    // Tell observers about this pending mutation.
    for (const id in this.observers) {
      remainingObservers += 1;
      this.observers[id].observe(mutation.idempotencyKey, observed, aborted);
    }

    this.useRecordVisitMutations = this.useRecordVisitMutations.concat(mutation);

    for (const setPending of Object.values(this.useRecordVisitSetPendings)) {
      setPending(this.useRecordVisitMutations);
    }

    return new Promise<
      reboot_web.ResponseOrAborted<
        Pet.RecordVisitResponse,
        PetRecordVisitAborted
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "RecordVisit",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
            bearerToken: mutation.bearerToken,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            let rerender = false;
            for (const m of this.useRecordVisitMutations) {
              if (m === mutation) {
                if (m.isLoading !== isLoading) {
                  m.isLoading = isLoading;
                  rerender = true;
                }
                if (error !== undefined && m.error !== error) {
                  m.error = error;
                  rerender = true;
                }
              }
            }

            if (rerender) {
              for (const setPending of Object.values(this.useRecordVisitSetPendings)) {
                setPending(this.useRecordVisitMutations);
              }
            }
          }
        );

        const removeMutationsAndSetPending = () => {
          this.useRecordVisitMutations =
            this.useRecordVisitMutations.filter(m => m !== mutation);

          for (const setPending of Object.values(this.useRecordVisitSetPendings)) {
            setPending(this.useRecordVisitMutations);
          }
        }


        switch (responseOrStatus.case) {
          case "response": {
            await observed(() => {
              removeMutationsAndSetPending();
              resolve({
                response:
                  PetRecordVisitResponseFromProtobufShape(
                    Empty.fromBinary(
                    responseOrStatus.value
                  )
                )
              });
            });
            break;
          }
          case "status": {
            // Let the observers know they no longer should expect to
            // observe this idempotency key.
            for (const id in this.observers) {
              this.observers[id].unobserve(mutation.idempotencyKey);
            }

            const status = reboot_api.Status.fromJsonString(responseOrStatus.value);

            const aborted = PetRecordVisitAborted.fromStatus(status);

            console.warn(
              `[Reboot] 'Pet.RecordVisit' aborted with ${aborted.message}`
            );

            removeMutationsAndSetPending();
            resolve({ aborted });

            break;
          }
          default: {
            // TODO(benh): while this is a _really_ fatal error,
            // should we still set `aborted` instead of throwing?
            reject(new Error('Expecting either a response or a status'));
          }
        }
      });
  }

  useRecordVisit(
    id: string,
    setPending: (mutations: PendingPetRecordVisitMutation[]) => void
  ) {
    this.useRecordVisitSetPendings[id] = setPending;
  }

  unuseRecordVisit(id: string) {
    delete this.useRecordVisitSetPendings[id];
  }


  private useDetailsReaders: {
    [requestBearerTokenHash: string]: reboot_react.Reader<petclinic_pb.PetDetailsResponse>
  } = {};

  // `FinalizationRegistry` lets us abort a reader once React has
  // garbage-collected its promise (i.e. abandoned it). It is absent on
  // some runtimes (e.g. React Native's Hermes engine), where we simply
  // skip this cleanup and rely on the `unuse...` timeout path instead.
  private detailsFinalizationRegistry =
    typeof FinalizationRegistry !== "undefined"
      ? new FinalizationRegistry<() => void>((finalize) => finalize())
      : undefined;

  startDetails(
    requestBearerTokenHash: string,
    serializedRequest: Uint8Array,
    bearerToken: string | undefined,
    offlineCacheEnabled: boolean,
    cacheKey: string | null
  ) {
    let reader = this.useDetailsReaders[requestBearerTokenHash];

    if (reader === undefined) {
      const event = new reboot_api.Event();

      const promise = event.wait();

      reader = {
        abortController: new AbortController(),
        event,
        promise,
        used: false,
        scheduledUnusedTimeoutsCount: 0,
        setResponses: {},
        setIsLoadings: {},
        setStatuses: {},

        setResponse(
          response: petclinic_pb.PetDetailsResponse,
          { cache }: { cache: boolean } = { cache: true }
        ) {
          // Store the response, delete the status.
          this.response = response;
          delete this.status;

          // Trigger response or aborted has been received event (if
          // it wasn't triggered already).
          this.event.set();

          // Dispatch to all listeners.
          for (const setResponse of Object.values(this.setResponses)) {
            setResponse(response);
          }

          // Cache response if applicable.
          if (cache && offlineCacheEnabled) {
            reboot_api.assert(cacheKey !== null);
            const cachedResponse = response.toJsonString();
            reboot_web.offlineCache().set(cacheKey, cachedResponse)
              .catch((error) => {
                console.warn(
                  `[Reboot] Setting of offline reader cache entry for 'Pet.Details' errored with ${error}`
                );
              });
          }
        },

        setIsLoading(isLoading: boolean) {
          for (const setIsLoading of Object.values(this.setIsLoadings)) {
            setIsLoading(isLoading);
          }
        },

        setStatus(status: reboot_api.Status) {
          // Store the status, delete the response.
          this.status = status;
          delete this.response;

          // Trigger response or aborted has been received event (if
          // it wasn't triggered already).
          this.event.set();

          for (const setStatus of Object.values(this.setStatuses)) {
            setStatus(status);
          }
        },
      };

      this.detailsFinalizationRegistry?.register(
        promise,
        () => {
          if (!reader.used) {
            delete this.useDetailsReaders[requestBearerTokenHash];
            reader.abortController.abort();
          }
        }
      );

      // We want to remove the promise so that it can be garbage collected
      // which is our indication that React is no longer using it. But this
      // races with calls to `useDetails(...)`
      // that might be adding their `setResponse`, `setIsLoading`, etc, so
      // we delay deleting the promise for at least a second.
      //
      // Note that deleting the promise is okay because all subsequent calls
      // will simply use the `reader.response` since it will no longer be
      // undefined.
      reader.promise.then(async () => {
        // Allow the call to `useDetails(...)`
        // at least 5 seconds to indicate that the reader is being used,
        // afterwhich, once `reader.promise` gets garbage collected
        // we'll know that it must have been abandoned by React, e.g.,
        // because the component was suspended and never committed.
        await reboot_api.sleep({ ms: 5000 });

        delete reader.promise;
      });

      this.useDetailsReaders[requestBearerTokenHash] = reader;

      // Start fetching from the server.
      this.read(
        "Details",
        serializedRequest,
        bearerToken,
        petclinic_pb.PetDetailsResponse,
        reader
      );

      // Check if there is a cached result if applicable.
      if (offlineCacheEnabled) {
        reboot_api.assert(cacheKey !== null);

        reboot_web.offlineCache().get(cacheKey).then((cachedResponse) => {
          if (cachedResponse !== null) {
            // We only want to set the response if we haven't already
            // gotten a response from the server as it is the authority
            // and should take precedence.
            if (reader.response === undefined) {
              reader.setResponse(
                petclinic_pb.PetDetailsResponse.fromJsonString(cachedResponse),
                { cache: false } // Don't re-cache the value!
              );
            }
          }
        }).catch((error) => {
          console.warn(
            `[Reboot] Retrieval of offline reader cache entry for 'Pet.Details' errored with ${error}`
          );
        });
      }
    }

    reboot_api.assert(reader !== undefined);

    return reader;
  }

  useDetails(
    id: string,
    requestBearerTokenHash: string,
    serializedRequest: Uint8Array,
    bearerToken: string | undefined,
    offlineCacheEnabled: boolean,
    cacheKey: string | null,
    setResponse: (response: petclinic_pb.PetDetailsResponse) => void,
    setIsLoading: (isLoading: boolean) => void,
    setStatus: (status: reboot_api.Status) => void
  ) {
    // We need to call start here because with strict mode the
    // `useEffect` that calls this method will also call "unuse"
    // which will mean the next time the `useEffect` calls here
    // we'll create a new reader in start.
    const reader = this.startDetails(
      requestBearerTokenHash,
      serializedRequest,
      bearerToken,
      offlineCacheEnabled,
      cacheKey
    );

    reboot_api.assert(reader !== undefined);

    // Indicate that the reader has properly been used so that we don't
    // clean it up prematurely.
    reader.used = true;

    reader.setResponses[id] = setResponse;
    reader.setIsLoadings[id] = setIsLoading;
    reader.setStatuses[id] = setStatus;

    // If we already have a `response` or `status` need to set it.
    if (reader.response) {
      setResponse(reader.response);
      setIsLoading(false);
    } else if (reader.status) {
      setStatus(reader.status);
    }
  }

  unuseDetails(
    id: string,
    requestBearerTokenHash: string,
  ) {
    const reader = this.useDetailsReaders[requestBearerTokenHash];

    reboot_api.assert(reader !== undefined);

    delete reader.setResponses[id];
    delete reader.setIsLoadings[id];
    delete reader.setStatuses[id];

    // Schedule a timeout to delete and abort this reader if we're the
    // last user. We need a timeout because, with StrictMode turned on,
    // we can't remove the reader right away otherwise we won't have a
    // stable Event and Promise. We use 3 seconds but may need to make
    // configurable depending on the application.
    if (Object.values(reader.setResponses).length === 0) {
      reader.scheduledUnusedTimeoutsCount += 1;
      setTimeout(() => {
        reader.scheduledUnusedTimeoutsCount -= 1;
        if (
          reader.scheduledUnusedTimeoutsCount === 0 &&
          Object.values(reader.setResponses).length === 0
        ) {
          delete this.useDetailsReaders[requestBearerTokenHash];
          reader.abortController.abort();
        }
      }, 3000);
    }
  }


  private static instances: { [id: string]: PetInstance } = {};

  static use(id: string, stateRef: string, url: string) {
    if (!(id in this.instances)) {
      this.instances[id] = new PetInstance(id, stateRef, url);
    } else {
      this.instances[id].ref();
    }

    return this.instances[id];
  }

  unuse() {
    if (this.unref() === 0) {
      delete PetInstance.instances[this.id];
    }
  }
}


// Called with an explicit `id`: bound to that state, returns the
// `UsePetApi` handle directly.
export function usePet(
  args: { id: string }
): UsePetApi;
// Called without an explicit `id`: resolves the default ID for this
// state. `pet` is the
// handle once a default ID resolves, or `undefined` when there is
// none (e.g. signed out); `isLoading` is true until resolution
// settles.
export function usePet(
  args?: undefined
): {
  pet: UsePetApi | undefined;
  isLoading: boolean;
};
export function usePet(
  { id: providedId }: { id?: string } = {}
):
  | UsePetApi
  | {
      pet: UsePetApi | undefined;
      isLoading: boolean;
    } {
  // Resolve `id` from the frontend-agnostic state-ID map. A `null` map
  // means that resolution is still in flight; an empty map means it
  // resolved with no default ID for us.
  const defaultIds = useDefaultStateIds();
  const isLoading = defaultIds === null;

  // Resolve ID: explicit > URL param (dev) > default-ID map.
  const devId = useMemo(() => {
    // React Native defines `window` but not `window.location`, so both
    // must be checked.
    if (
      typeof window !== "undefined" &&
      typeof window.location !== "undefined"
    ) {
      return new URLSearchParams(
        window.location.search
      ).get("petclinic.v1.Pet.id");
    }
    return null;
  }, []);

  const toolInputId =
    typeof defaultIds?.["petclinic.v1.Pet"] === "string"
      ? defaultIds["petclinic.v1.Pet"]
      : null;

  const resolvedId = providedId ?? devId ?? toolInputId;
  // Without a resolved ID we still run every hook below (rules of
  // hooks), binding to the inert empty-ID instance that opens no
  // socket.
  const id = resolvedId ?? "";
  // The unresolved no-id case carries an empty `stateRef` rather than
  // computing one. Keyed on the id being unresolved — an explicitly
  // passed empty id still reaches `stateIdToRef`, which rejects it.
  const stateRef =
    resolvedId == null
      ? ""
      : reboot_api.stateIdToRef("petclinic.v1.Pet", id);

  const rebootClient = reboot_react.useRebootClient();

  const url = rebootClient.url;
  const bearerToken = rebootClient.bearerToken;
  const refreshBearerToken = useRefreshBearerToken();

  const [instance, setInstance] = useState(() => {
    return PetInstance.use(
      id, stateRef, url
    );
  });

  if (instance.id !== id) {
    setInstance(
      PetInstance.use(
        id, stateRef, url
      )
    );
  }

  useEffect(() => {
    return () => {
      instance.unuse();
    };
  }, [instance]);

  const headers = useMemo(() => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.append("Connection", "keep-alive");

    if (bearerToken !== undefined) {
      headers.append("Authorization", `Bearer ${bearerToken}`);
    }

    return headers;
  }, [bearerToken]);


  function useRegister() {
    const [
      pending,
      setPending
    ] = useState<PendingPetRegisterMutation[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useRegister(id, setPending);
      return () => {
        instance.unuseRegister(id);
      };
    }, [instance]);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const register = useMemo(() => {
      const method = async (
        partialRequest: Pet.PartialRegisterRequest = {},
        options?: { metadata?: any, key?: string }
      ) => {
        const request = PetRegisterRequestToProtobuf(partialRequest);

        const idempotencyKey = options?.idempotencyKey ?? options?.key ?? reboot_web.makeExpiringIdempotencyKey();

        const mutation = {
          request,
          idempotencyKey,
          bearerToken,
          metadata: options?.metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        const result = await instance.register(mutation);

        // If the server rejected us due to an expired token,
        // refresh via the frontend's bearer-refresh and retry
        // once (mirrors the unary-call path).
        if (
          result.aborted !== undefined &&
          result.aborted.code === reboot_api.StatusCode.UNAUTHENTICATED &&
          refreshBearerToken
        ) {
          const newToken = await refreshBearerToken();
          if (newToken !== undefined) {
            return instance.register(
              { ...mutation, bearerToken: newToken }
            );
          }
        }

        return result;
      };

      method.pending =
        new Array<PendingPetRegisterMutation>();

      return method;
    }, [instance, bearerToken, refreshBearerToken]);

    register.pending = pending;

    return register;
  }

  const register = useRegister();


  function useUpdate() {
    const [
      pending,
      setPending
    ] = useState<PendingPetUpdateMutation[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useUpdate(id, setPending);
      return () => {
        instance.unuseUpdate(id);
      };
    }, [instance]);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const update = useMemo(() => {
      const method = async (
        partialRequest: Pet.PartialUpdateRequest = {},
        options?: { metadata?: any, key?: string }
      ) => {
        const request = PetUpdateRequestToProtobuf(partialRequest);

        const idempotencyKey = options?.idempotencyKey ?? options?.key ?? reboot_web.makeExpiringIdempotencyKey();

        const mutation = {
          request,
          idempotencyKey,
          bearerToken,
          metadata: options?.metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        const result = await instance.update(mutation);

        // If the server rejected us due to an expired token,
        // refresh via the frontend's bearer-refresh and retry
        // once (mirrors the unary-call path).
        if (
          result.aborted !== undefined &&
          result.aborted.code === reboot_api.StatusCode.UNAUTHENTICATED &&
          refreshBearerToken
        ) {
          const newToken = await refreshBearerToken();
          if (newToken !== undefined) {
            return instance.update(
              { ...mutation, bearerToken: newToken }
            );
          }
        }

        return result;
      };

      method.pending =
        new Array<PendingPetUpdateMutation>();

      return method;
    }, [instance, bearerToken, refreshBearerToken]);

    update.pending = pending;

    return update;
  }

  const update = useUpdate();


  function useRecordVisit() {
    const [
      pending,
      setPending
    ] = useState<PendingPetRecordVisitMutation[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useRecordVisit(id, setPending);
      return () => {
        instance.unuseRecordVisit(id);
      };
    }, [instance]);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const recordVisit = useMemo(() => {
      const method = async (
        partialRequest: Pet.PartialRecordVisitRequest = {},
        options?: { metadata?: any, key?: string }
      ) => {
        const request = PetRecordVisitRequestToProtobuf(partialRequest);

        const idempotencyKey = options?.idempotencyKey ?? options?.key ?? reboot_web.makeExpiringIdempotencyKey();

        const mutation = {
          request,
          idempotencyKey,
          bearerToken,
          metadata: options?.metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        const result = await instance.recordVisit(mutation);

        // If the server rejected us due to an expired token,
        // refresh via the frontend's bearer-refresh and retry
        // once (mirrors the unary-call path).
        if (
          result.aborted !== undefined &&
          result.aborted.code === reboot_api.StatusCode.UNAUTHENTICATED &&
          refreshBearerToken
        ) {
          const newToken = await refreshBearerToken();
          if (newToken !== undefined) {
            return instance.recordVisit(
              { ...mutation, bearerToken: newToken }
            );
          }
        }

        return result;
      };

      method.pending =
        new Array<PendingPetRecordVisitMutation>();

      return method;
    }, [instance, bearerToken, refreshBearerToken]);

    recordVisit.pending = pending;

    return recordVisit;
  }

  const recordVisit = useRecordVisit();



  function useDetails(
    partialRequest: Pet.PartialDetailsRequest = {},
    options: { suspense: boolean } = { suspense: false }
  ) {
    const newRequest = PetDetailsRequestToProtobuf(partialRequest);

    const [request, setRequest] = useState(newRequest);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const serializedRequest = useMemo(() => request.toBinary(), [request]);

    // To distinguish this call from others when caching responses on
    // the client we compute a "request hash" using SHA256 from the
    // `request`.
    // We memoize this so we don't do it every time.
    const requestHash: string = useMemo(
      () => {
        const hash = reboot_web.calcSha256();
        hash.add(serializedRequest);
        return hash.digest().hex();
      },
      [serializedRequest]
    );

    // To create a map of unused readers globally on the client, we
    // compute a "request hash" using SHA256 from the `request`
    // including the bearerToken.
    // We memoize this so we don't do it every time.
    const requestBearerTokenHash: string = useMemo(
      () => {
        const hash = reboot_web.calcSha256();
        hash.add(serializedRequest);
        if (bearerToken) {
          hash.add(bearerToken);
        }
        return hash.digest().hex();
      },
      [serializedRequest, bearerToken]
    );

    const offlineCacheEnabled = rebootClient.offlineCacheEnabled;

    const cacheKey: string | null = useMemo(
      () => {
        if (offlineCacheEnabled) {
          return `${stateRef}:Details:${requestHash}`;
        }
        return null;
      },
      [stateRef, offlineCacheEnabled, requestHash]
    );

    // We start reading here, or if another component already started
    // the reading then we just get back the reader. We need to do this
    // before setting up our `useState`s because when using suspense
    // we need to use the `reader.response` or `reader.status` during
    // render where one of them will be defined, i.e., after we've
    // waited for `reader.promise` via `React.use()`.
    const reader = instance.startDetails(
      requestBearerTokenHash,
      serializedRequest,
      bearerToken,
      offlineCacheEnabled,
      cacheKey
    );

    const [response, setResponse] = useState<
      Pet.DetailsResponse | undefined
      >(reader.response && PetDetailsResponseFromProtobufShape(reader.response));

    const [aborted, setAborted] = useState<
      PetDetailsAborted | undefined
      >(reader.status && PetDetailsAborted.fromStatus(reader.status));

    // Track which state ID the current `response` and `aborted` belong
    // to so we can reset them when the state ID changes, back into
    // their "loading" state. We track `id` rather than `instance`
    // because `id` updates immediately from props, whereas `instance`
    // only updates later after a separate `setState`.
    const [responseStateId, setResponseStateId] = useState(id);
    if (responseStateId !== id) {
      setResponseStateId(id);
      setResponse(undefined);
      setAborted(undefined);
      setIsLoading(true);
    }

    useEffect(() => {
      const id = uuidv4();

      instance.useDetails(
        id,
        requestBearerTokenHash,
        serializedRequest,
        bearerToken,
        offlineCacheEnabled,
        cacheKey,
        (response: petclinic_pb.PetDetailsResponse) => {
          setAborted(undefined);
          setResponse(PetDetailsResponseFromProtobufShape(response));
        },
        setIsLoading,
        (status: reboot_api.Status) => {
          // If the server rejected us due to an expired
          // token, refresh via the frontend's bearer-refresh
          // (the MCP host, or the web session). The token
          // change triggers a re-render and reconnect.
          if (
            status.code === reboot_api.StatusCode.UNAUTHENTICATED &&
            refreshBearerToken
          ) {
            refreshBearerToken();
          }

          const aborted = PetDetailsAborted.fromStatus(status);

          console.warn(
            `[Reboot] 'Pet.Details' aborted with ${aborted.message}`
          );

          setAborted(aborted);
          setResponse(undefined);
        },
      );

      return () => {
        instance.unuseDetails(id, requestBearerTokenHash);
      };
    }, [
      instance,
      serializedRequest,
      requestBearerTokenHash,
      bearerToken,
      refreshBearerToken,
      offlineCacheEnabled,
      cacheKey,
    ]);

    // If the user has requested suspense via `options.suspense` then
    // we need to use `useMemo` to create a stable promise to pass
    // to `React.use()`. This is important for two reasons:
    //
    // 1. `reader.promise` gets deleted after 5 seconds to
    //    allow GC-based detection of abandoned readers (via
    //    `FinalizationRegistry`), so we can't pass it directly
    //    on every render.
    //
    // 2. `React.use()` suspends at least once for each new
    //    promise it sees (to call `.then()`), so we must
    //    return the same promise across re-renders for a given
    //    reader.
    //
    // When suspense is not requested, or the reader's event is
    // already set (i.e., we have a response or aborted status),
    // we return a pre-resolved promise. Note that `React.use()`
    // will suspend at least once even for a pre-resolved promise
    // in order to set internal state on it, but on subsequent
    // renders it will recognize the same promise and return
    // without suspending.
	//
	// We need to store the suspense promise in a `useRef` so
	// that we can continually return it even if the reader is
	// changing due to things like the `bearerToken` changing,
	// however, we don't want to flicker the suspense fallback
	// when `bearerToken` changes after we've already received
	// a stable `response` (or `aborted`).
	const suspensePromiseRef = useRef(undefined);

    const suspensePromise = useMemo(
      () => {
	    if (suspensePromiseRef.current === undefined || (response === undefined && aborted === undefined)) {
          if (!options.suspense || reader.event.isSet()) {
		    suspensePromiseRef.current = Promise.resolve();
          } else {
            reboot_api.assert(reader.promise !== undefined);
			reboot_api.assert(response === undefined);
			reboot_api.assert(aborted === undefined);
            suspensePromiseRef.current = reader.promise.then(() => {});
          }
		}
		return suspensePromiseRef.current;
      },
      [options.suspense, reader, response, aborted]
    );

    if (options.suspense) {
      if (!("use" in React)) {
        // Raise if it doesn't look like we are using React>=19.
        const error = "In order to pass `suspense: true` to a Reboot reactive reader you must be using React>=19 which provides `React.use`";
        console.error(error);
        throw new Error(error);
      }

      React.use(suspensePromise);
    }

    if (!request.equals(newRequest)) {
      setRequest(newRequest);
      setIsLoading(true);

      return { response, isLoading: true, aborted };
    }

    return { response, isLoading, aborted };
  }

  async function details(
    partialRequest: Pet.PartialDetailsRequest = {},
    options?: { signal?: AbortSignal; retry?: boolean }
  ) {
    let retry = true;
    if (options !== undefined && options.retry !== undefined) {
      retry = options.retry;
    }

    const request = PetDetailsRequestToProtobuf(partialRequest);

    // The age of the transaction this call started, once an error has
    // told us: the root transaction id of its first attempt. A retry
    // carries it so that the retried transaction is as old as its first
    // attempt rather than younger than every transaction started since.
    let transactionRetryAge: string | undefined;

    // Fetch with retry, using a backoff, i.e., if we get disconnected
    // or the server asks us to try again.
    const { response, aborted } = await (async () => {
      const backoff = new reboot_api.Backoff();
      // A `TransactionShouldRetry` may ask us to retry immediately, but
      // we elide the backoff only once: a transaction that keeps being
      // asked to start over should still back off.
      let backoffElided = false;

      while (true) {
        let retryWithoutBackoff = false;
        // Copied per attempt so that a retry age set for this call does
        // not outlive it on the hook's shared headers.
        const attemptHeaders = new Headers(headers);
        if (transactionRetryAge !== undefined) {
          attemptHeaders.set("x-reboot-transaction-retry-age", transactionRetryAge);
        }
        try {
          // Invariant here is that we use the '/package.service.method' path and
          // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
          //
          // See also 'reboot/helpers.py'.
          const response = await reboot_web.guardedFetch(
            `${rebootClient.url}/__/reboot/rpc/${stateRef}/petclinic.v1.PetMethods/Details`,
            {
              ...options,
              method: "POST",
              headers: attemptHeaders,
              body: request.toJsonString()
            }
          );
          // A 'fetch' does not throw on these, so check the status and
          // retry the same way a failed 'fetch' is retried:
          // - 502 (Bad Gateway): the proxy can not reach the backend.
          // - 503 (Unavailable): the server is temporarily unavailable,
          //   or is asking for the transaction to be started over.
          // - 499 (Cancelled): the request was cancelled, often because
          //   the server is shutting down.
          if (
            response.status === 502 ||
            response.status === 503 ||
            response.status === 499
          ) {
            if (response.headers.get("content-type") === "application/json") {
              const status = reboot_api.Status.fromJson(await response.json());
              const shouldRetry = reboot_api.errorFromGoogleRpcStatusDetails(
                status,
                [reboot_api.errors_pb.TransactionShouldRetry] as const
              );
              if (shouldRetry !== undefined) {
                retryWithoutBackoff =
                  reboot_api.TRANSACTION_SHOULD_RETRY_REASONS_WITHOUT_BACKOFF.has(
                    shouldRetry.reason
                  );
                if (transactionRetryAge === undefined && shouldRetry.retryAge !== "") {
                  transactionRetryAge = shouldRetry.retryAge;
                }
                if (
                  shouldRetry.reason ===
                  reboot_api.errors_pb.TransactionShouldRetry_Reason.PRESUMED_DEADLOCK
                ) {
                  console.warn(
                    `[Reboot] Retrying call to \`petclinic.v1.PetMethods.Details\` because its transaction is presumed deadlocked: ${status.message}`
                  );
                }
              }
              // Handled in the 'catch' block below.
              throw PetDetailsAborted.fromStatus(status);
            }
            throw new PetDetailsAborted(
              new reboot_api.errors_pb.Unknown(), {
                message: `Unknown error with HTTP status ${response.status}`
              }
            );
          }
          return { response };
        } catch (e: unknown) {
          if (options?.signal?.aborted || !retry) {
            if (e instanceof PetDetailsAborted) {
              return { aborted: e };
            }
            const aborted = new PetDetailsAborted(
              new reboot_api.errors_pb.Aborted(), {
                message: e instanceof Error
                  ? `${e}`
                  : `Unknown error: ${JSON.stringify(e)}`
              }
            );

            return { aborted };
          } else if (e instanceof Error) {
            console.error(e);
          } else {
            console.error(`[Reboot] Unknown error: ${JSON.stringify(e)}`);
          }
        }

        if (retryWithoutBackoff && !backoffElided) {
          backoffElided = true;
          continue;
        }

        await backoff.wait(`[Reboot] Retrying call to \`petclinic.v1.PetMethods.Details\` with backoff...`);
      }
    })();

    if (aborted) {
      return { aborted };
    } else if (response.status === 401 && refreshBearerToken) {
      // Token expired — refresh via the frontend's bearer-refresh
      // and retry once.
      const newToken = await refreshBearerToken();
      if (newToken) {
        const retryHeaders = new Headers();
        retryHeaders.set("Content-Type", "application/json");
        retryHeaders.append("Connection", "keep-alive");
        retryHeaders.append("Authorization", `Bearer ${newToken}`);
        try {
          const retryResponse = await reboot_web.guardedFetch(
            `${rebootClient.url}/__/reboot/rpc/${stateRef}/petclinic.v1.PetMethods/Details`,
            {
              ...options,
              method: "POST",
              headers: retryHeaders,
              body: request.toJsonString()
            }
          );
          if (retryResponse.ok) {
            return {
              response:
                PetDetailsResponseFromProtobufShape((petclinic_pb.PetDetailsResponse.fromJson(await retryResponse.json())))
            };
          }
          // Fall through to generic error handling on retry failure.
          return {
            aborted: new PetDetailsAborted(
              new reboot_api.errors_pb.Unknown(), {
                message: `Unknown error with HTTP status ${retryResponse.status} after token refresh`
              }
            )
          };
        } catch (e: unknown) {
          return {
            aborted: new PetDetailsAborted(
              new reboot_api.errors_pb.Aborted(), {
                message: e instanceof Error
                  ? `${e}`
                  : `Unknown error: ${JSON.stringify(e)}`
              }
            )
          };
        }
      }
      // Refresh failed — fall through to generic error.
      return {
        aborted: new PetDetailsAborted(
          new reboot_api.errors_pb.Unknown(), {
            message: `Unauthorized (HTTP 401) and token refresh failed`
          }
        )
      };
    } else if (!response.ok) {
      if (response.headers.get("content-type") === "application/json") {
        const status = reboot_api.Status.fromJson(await response.json());


        // If the server rejected us due to an expired
        // token, refresh via the frontend's bearer-refresh and
        // retry once.
        if (
          status.code === reboot_api.StatusCode.UNAUTHENTICATED &&
          refreshBearerToken
        ) {
          const newToken = await refreshBearerToken();
          if (newToken) {
            const retryHeaders = new Headers();
            retryHeaders.set(
              "Content-Type", "application/json",
            );
            retryHeaders.append(
              "Connection", "keep-alive",
            );
            retryHeaders.append(
              "Authorization", `Bearer ${newToken}`,
            );
            try {
              const retryResponse =
                await reboot_web.guardedFetch(
                  `${rebootClient.url}/__/reboot/rpc/${stateRef}/petclinic.v1.PetMethods/Details`,
                  {
                    ...options,
                    method: "POST",
                    headers: retryHeaders,
                    body: request.toJsonString()
                  }
                );
              if (retryResponse.ok) {
                return {
                  response:
                    PetDetailsResponseFromProtobufShape((petclinic_pb.PetDetailsResponse.fromJson(await retryResponse.json())))
                };
              }
            } catch {
              // Fall through to return the original aborted error.
            }
          }
        }

        const aborted = PetDetailsAborted.fromStatus(status);

        console.warn(
          `[Reboot] 'Pet.Details' aborted with ${aborted.message}`
        );

        return { aborted };
      } else {
        const aborted = new PetDetailsAborted(
          new reboot_api.errors_pb.Unknown(), {
            message: `Unknown error with HTTP status ${response.status}`
          }
        );

        return { aborted };
      }
    } else {
      return {
        response:
          PetDetailsResponseFromProtobufShape((petclinic_pb.PetDetailsResponse.fromJson(await response.json())))
      };
    }
  }


  // Don't re-render if `id` hasn't changed.
    const api: UsePetApi = useMemo(() => ({
      state_id: id,
      mutators: {
        register,
        update,
        recordVisit,
      },
      idempotently: ({ key }: { key: string }) => {
      return {
        register: (
          partialRequest?:Pet.PartialRegisterRequest,
          options?: { metadata?: any }
        ) => register(partialRequest, { ...options, key }),
        update: (
          partialRequest?:Pet.PartialUpdateRequest,
          options?: { metadata?: any }
        ) => update(partialRequest, { ...options, key }),
        recordVisit: (
          partialRequest?:Pet.PartialRecordVisitRequest,
          options?: { metadata?: any }
        ) => recordVisit(partialRequest, { ...options, key }),
      };
    },
      register,
      update,
      recordVisit,
      details,
      useDetails,
    }), [id, instance, bearerToken, refreshBearerToken]);

  // An explicit `id` caller gets the handle directly; a no-id caller
  // gets the `{ pet, isLoading }`
  // shape, where the handle is `undefined` until a default ID
  // resolves.
  if (providedId !== undefined) {
    return api;
  }
  return {
    pet: resolvedId ? api : undefined,
    isLoading,
  };
};



export class Pet {
  static State = PetProto;
}
export namespace Pet {
  export type State = PetProto;
}

export interface SettingsParams {
  id: string;
  storeMutationsLocallyInNamespace?: string;
}

class VeterinarianInstance {

  constructor(id: string, stateRef: string, url: string) {
    this.id = id;
    this.stateRef = stateRef;
    this.url = url;
    this.refs = 1;

    // An empty `id` marks the inert instance shared by every no-id
    // caller while no default ID has resolved (e.g. signed out): it
    // opens no socket so there's nothing to connect to.
    if (id !== "") {
      reboot_web.websockets.connect(this.url, this.stateRef);
      this.initializeWebSocket();
    }
  }

  private ref() {
    this.refs += 1;
    return this.refs;
  }

  private unref() {
    this.refs -= 1;

    if (this.refs === 0 && this.websocket !== undefined) {
      this.websocket.close();
       reboot_web.websockets.disconnect(this.url, this.stateRef);
    }

    return this.refs;
  }

  readonly id: string;
  readonly stateRef: string;
  private url: string;
  private refs: number;
  private observers: reboot_react.Observers = {};
  private loadingReaders = 0;
  private runningMutates: reboot_react.Mutate[] = [];
  private queuedMutates: reboot_react.Mutate[] = [];
  private flushMutates?: reboot_api.Event = undefined;
  private websocket?: WebSocket = undefined;
  private backoff: reboot_api.Backoff = new reboot_api.Backoff();

  private hasRunningMutations() {
    return this.runningMutates.length > 0;
  }

  private async flushMutations() {
    if (this.flushMutates === undefined) {
      this.flushMutates = new reboot_api.Event();
    }
    await this.flushMutates.wait();
  }

  private readersLoadedOrFailed() {
    this.flushMutates = undefined;

    if (this.queuedMutates.length > 0) {
      this.runningMutates = this.queuedMutates;
      this.queuedMutates = [];

      if (this.websocket?.readyState === WebSocket.OPEN) {
        for (const { request, update } of this.runningMutates) {
          update({ isLoading: true });
          try {
            this.websocket.send(request.toBinary());
          } catch {
            // We'll retry since we've stored in `*Mutates`.
          }
        }
      }
    }
  }

  private initializeWebSocket() {
    if (this.websocket === undefined && this.refs > 0 && this.id !== "") {
      const url = new URL(`${this.url}/__/reboot/rpc/${this.stateRef}`);
      url.protocol = url.protocol === "https:" ? "wss:" : "ws:";

      this.websocket = reboot_web.websockets.create(url);

      this.websocket.binaryType = "arraybuffer";

      this.websocket.onopen = () => {
        if (this.websocket?.readyState === WebSocket.OPEN) {
          for (const { request, update } of this.runningMutates) {
            update({ isLoading: true });
            try {
              this.websocket.send(request.toBinary());
            } catch {
              // We'll retry since we've stored in `*Mutates`.
            }
          }
        }
      };

      this.websocket.onerror = async () => {
        if (this.websocket !== undefined) {
          this.websocket = undefined;

          for (const { update } of this.runningMutates) {
            update({ isLoading: false, error: "WebSocket disconnected" });
          }

          if (this.refs > 0) {
            if (this.runningMutates.length > 0) {
              console.warn(
                `[Reboot] WebSocket disconnected, ${this.runningMutates.length} outstanding mutations will be retried when we reconnect`
              );
            }

            await this.backoff.wait();

            this.initializeWebSocket();
          }
        }
      };

      this.websocket.onclose = async () => {
        if (this.websocket !== undefined) {
          this.websocket = undefined;

          for (const { update } of this.runningMutates) {
            update({ isLoading: false, error: "WebSocket disconnected" });
          }

          if (this.refs > 0) {
            await this.backoff.wait();

            this.initializeWebSocket();
          }
        }
      };

      this.websocket.onmessage = async (event) => {
        const { resolve } = this.runningMutates[0];
        this.runningMutates.shift();

        const response = reboot_api.react_pb.MutateResponse.fromBinary(
          new Uint8Array(event.data)
        );

        resolve(response);

        if (
          this.flushMutates !== undefined &&
          this.runningMutates.length === 0
        ) {
          this.flushMutates.set();
        }
      };
    }
  }

  private async mutate(
    partialRequest: protobuf_es.PartialMessage<reboot_api.react_pb.MutateRequest>,
    update: (props: { isLoading: boolean; error?: any }) => void
  ): Promise<reboot_api.react_pb.MutateResponse> {
    const request = partialRequest instanceof reboot_api.react_pb.MutateRequest
      ? partialRequest
      : new reboot_api.react_pb.MutateRequest(partialRequest);

    return new Promise((resolve, _) => {
      if (this.loadingReaders === 0) {
        this.runningMutates = this.runningMutates.concat({ request, resolve, update });
        if (this.websocket?.readyState === WebSocket.OPEN) {
          update({ isLoading: true });
          try {
            this.websocket.send(request.toBinary());
          } catch {
            // We'll retry since we've stored in `*Mutates`.
          }
        }
      } else {
        this.queuedMutates = this.queuedMutates.concat({ request, resolve, update });
      }
    });
  }

  private async read<
    RequestType extends protobuf_es.Message<RequestType>,
    ResponseType extends protobuf_es.Message<ResponseType>,
    >(
    method: string,
    serializedRequest: Uint8Array,
    bearerToken: string | undefined,
    responseType: protobuf_es.MessageType<ResponseType>,
    reader: reboot_react.Reader<ResponseType>
  ) {
    const queryRequest = new reboot_api.react_pb.QueryRequest({
      method,
      request: serializedRequest,
      ...(bearerToken !== undefined && { bearerToken } || {}),
    });

    // Expected idempotency key we should observe due to a mutation.
    interface Expected {
      // Idempotency key of mutation.
      idempotencyKey: string;

      // Callback when we've observed this idempotency key.
      observed: (callback: () => void) => Promise<void>;

      // Callback when we no longer care about observing.
      aborted: () => void;
    }

    let expecteds: Expected[] = [];

    // When we disconnect we may not be able to observe
    // responses due to mutations yet there may still be
    // some outstanding responses that are expected which
    // we treat as "orphans" in the sense that we won't
    // observe their idempotency keys but once we reconnect
    // we will still have observed their effects and can
    // call `observed()` on them.
    let orphans: Expected[] = [];

    const id = `${uuidv4()}`;

    this.observers[id] = {
      observe: (
        idempotencyKey: string,
        observed: (callback: () => void) => Promise<void>,
        aborted: () => void
      ) => {
        expecteds = expecteds.concat({ idempotencyKey, observed, aborted })
      },
      unobserve: (idempotencyKey: string) => {
        expecteds = expecteds.filter(
          expected => expected.idempotencyKey !== idempotencyKey
        );

        orphans = orphans.filter(
          orphan => orphan.idempotencyKey !== idempotencyKey
        );
      }
    };

    try {
      await reboot_api.retryForever(async () => {
        let loaded = false;
        this.loadingReaders += 1;

        // Any mutations started after we've incremented
        // `this.loadingReaders` will be queued until after
        // all the readers have loaded and thus (1) we know all
        // current `expected` are actually `orphans` that
        // we will haved "observed" once we are (re)connected
        // because we flush mutations before starting to read
        // and (2) all queued mutations can stay in `expected`
        // because we will in fact be able to observe them
        // since they won't get sent over the websocket
        // until after we are (re)connected.
        //
        // NOTE: we need to concatenate with `orphans`
        // because we may try to (re)connect multiple times
        // and between each try more mutations may have been
        // made (or queued ones will be moved to running).
        orphans = [...orphans, ...expecteds];
        expecteds = [];

        try {
          // Wait for potentially completed mutations to flush
          // before starting to read so that we read the latest
          // state including those mutations.
          if (this.hasRunningMutations()) {
            await this.flushMutations();
          }

          reader.setIsLoading(true);

          const queryResponses = reboot_web.reactiveReader({
            endpoint: `${this.url}/__/reboot/rpc/${this.stateRef}`,
            request: queryRequest,
            signal: reader.abortController.signal,
          });

          for await (const queryResponse of queryResponses) {
            if (!loaded) {
              if ((this.loadingReaders -= 1) === 0) {
                this.readersLoadedOrFailed();
              }
              loaded = true;
            }

            reader.setIsLoading(false);

            const response = queryResponse.responseOrStatus.case === "response"
              ? responseType.fromBinary(queryResponse.responseOrStatus.value)
              : undefined;

            // If we were disconnected it must be that we've
            // observed all `orphans` because we waited
            // for any mutations to flush before we re-started to
            // read.
            const haveOrphans = orphans.length;
            if (haveOrphans > 0) {
              // We mark all mutations as observed except the
              // last one which we also invoke all `setResponse`s.
              // In this way we effectively create a barrier
              // for all readers that will synchronize on the last
              // mutation, but note that this still may lead
              // to some partial state/response updates because
              // one reader may have actually received a response
              // while another reader got disconnected. While this
              // is likely very rare, it is possible. Mitigating
              // this issue is non-trivial and for now we have
              // no plans to address it.
              for (let i = 0; i < orphans.length - 1; i++) {
                orphans[i].observed(() => {});
              }
              await orphans[orphans.length - 1].observed(() => {
                if (response !== undefined) {
                  reader.setResponse(response);
                }
              });

              orphans = [];
            }
            // We want to check the orphans list AND the expecteds list because
            // it could be possible that we receive a query response that
            // contains an idempotency key that we are expecting while having an
            // orphans list with a length greater than 0. In this case, we don't
            // want to skip checking the expecteds list just because we have
            // already checked the orphans list.
            if (
              expecteds.length > 0 &&
              queryResponse.idempotencyKeys.includes(
                expecteds[0].idempotencyKey
              )
            ) {
              await expecteds[0].observed(() => {
                if (response !== undefined) {
                  reader.setResponse(response);
                }
                expecteds.shift();
              });
            }
            // If we don't have any orphans to observe and we don't have any expecteds to observe,
	          // or at least, the first expecteds _is not observed_ by this response, then go ahead and
	          // pass on the response because it might contain new data that should get shown to the
	          // user (e.g., in a chat room this could be a new message from a different user).
            else if (response !== undefined && !haveOrphans) {
              reader.setResponse(response);
            }
          }

          throw new Error('Not expecting stream to ever be done');
        } catch (e: unknown) {
          if (!loaded) {
            if ((this.loadingReaders -= 1) === 0) {
              this.readersLoadedOrFailed();
            }
          }

          loaded = false;

          if (reader.abortController.signal.aborted) {
            for (const { aborted } of [...orphans, ...expecteds]) {
              aborted();
            }
            return;
          }

          // Intentionally leave `isLoading: true` here. The outer
          // `retryForever(...)` will run another attempt and call
          // `reader.setIsLoading(true)` again at the top of the
          // try block, but if we cleared it to `false` here first
          // consumers would observe a brief `false → true → false
          // → true ...` flip-flop on every retry while we're
          // actually still trying to (re)connect. Once a response
          // finally arrives the success path sets it to `false`.

          if (e instanceof reboot_api.Status) {
            reader.setStatus(e);
          } else {
            console.warn(
              `[Reboot] Caught unknown exception: ${e instanceof Error ? e.message : JSON.stringify(e)}`
            );
          }

          throw e; // This just retries!
        }
      });
    } finally {
      delete this.observers[id];
    }
  }


  private useRegisterMutations: (
    PendingVeterinarianRegisterMutation)[] = [];

  private useRegisterSetPendings: {
    [id: string]: (mutations: PendingVeterinarianRegisterMutation[]) => void
  } = {};

  async register(
    mutation: PendingVeterinarianRegisterMutation
  ): Promise<
    reboot_web.ResponseOrAborted<
      Veterinarian.RegisterResponse,
      VeterinarianRegisterAborted
  >> {
    // We always have at least 1 observer which is this function!
    let remainingObservers = 1;

    const event = new reboot_api.Event();

    let callbacks: (() => void)[] = [];

    const observed = (callback: () => void) => {
      callbacks = callbacks.concat(callback);
      remainingObservers -= 1;
      if (remainingObservers === 0) {
        for (const callback of callbacks) {
          callback();
        }
        event.set();
      }
      return event.wait();
    };

    const aborted = () => {
      observed(() => {});
    }

    // Tell observers about this pending mutation.
    for (const id in this.observers) {
      remainingObservers += 1;
      this.observers[id].observe(mutation.idempotencyKey, observed, aborted);
    }

    this.useRegisterMutations = this.useRegisterMutations.concat(mutation);

    for (const setPending of Object.values(this.useRegisterSetPendings)) {
      setPending(this.useRegisterMutations);
    }

    return new Promise<
      reboot_web.ResponseOrAborted<
        Veterinarian.RegisterResponse,
        VeterinarianRegisterAborted
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "Register",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
            bearerToken: mutation.bearerToken,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            let rerender = false;
            for (const m of this.useRegisterMutations) {
              if (m === mutation) {
                if (m.isLoading !== isLoading) {
                  m.isLoading = isLoading;
                  rerender = true;
                }
                if (error !== undefined && m.error !== error) {
                  m.error = error;
                  rerender = true;
                }
              }
            }

            if (rerender) {
              for (const setPending of Object.values(this.useRegisterSetPendings)) {
                setPending(this.useRegisterMutations);
              }
            }
          }
        );

        const removeMutationsAndSetPending = () => {
          this.useRegisterMutations =
            this.useRegisterMutations.filter(m => m !== mutation);

          for (const setPending of Object.values(this.useRegisterSetPendings)) {
            setPending(this.useRegisterMutations);
          }
        }


        switch (responseOrStatus.case) {
          case "response": {
            await observed(() => {
              removeMutationsAndSetPending();
              resolve({
                response:
                  VeterinarianRegisterResponseFromProtobufShape(
                    Empty.fromBinary(
                    responseOrStatus.value
                  )
                )
              });
            });
            break;
          }
          case "status": {
            // Let the observers know they no longer should expect to
            // observe this idempotency key.
            for (const id in this.observers) {
              this.observers[id].unobserve(mutation.idempotencyKey);
            }

            const status = reboot_api.Status.fromJsonString(responseOrStatus.value);

            const aborted = VeterinarianRegisterAborted.fromStatus(status);

            console.warn(
              `[Reboot] 'Veterinarian.Register' aborted with ${aborted.message}`
            );

            removeMutationsAndSetPending();
            resolve({ aborted });

            break;
          }
          default: {
            // TODO(benh): while this is a _really_ fatal error,
            // should we still set `aborted` instead of throwing?
            reject(new Error('Expecting either a response or a status'));
          }
        }
      });
  }

  useRegister(
    id: string,
    setPending: (mutations: PendingVeterinarianRegisterMutation[]) => void
  ) {
    this.useRegisterSetPendings[id] = setPending;
  }

  unuseRegister(id: string) {
    delete this.useRegisterSetPendings[id];
  }


  private useUpdateMutations: (
    PendingVeterinarianUpdateMutation)[] = [];

  private useUpdateSetPendings: {
    [id: string]: (mutations: PendingVeterinarianUpdateMutation[]) => void
  } = {};

  async update(
    mutation: PendingVeterinarianUpdateMutation
  ): Promise<
    reboot_web.ResponseOrAborted<
      Veterinarian.UpdateResponse,
      VeterinarianUpdateAborted
  >> {
    // We always have at least 1 observer which is this function!
    let remainingObservers = 1;

    const event = new reboot_api.Event();

    let callbacks: (() => void)[] = [];

    const observed = (callback: () => void) => {
      callbacks = callbacks.concat(callback);
      remainingObservers -= 1;
      if (remainingObservers === 0) {
        for (const callback of callbacks) {
          callback();
        }
        event.set();
      }
      return event.wait();
    };

    const aborted = () => {
      observed(() => {});
    }

    // Tell observers about this pending mutation.
    for (const id in this.observers) {
      remainingObservers += 1;
      this.observers[id].observe(mutation.idempotencyKey, observed, aborted);
    }

    this.useUpdateMutations = this.useUpdateMutations.concat(mutation);

    for (const setPending of Object.values(this.useUpdateSetPendings)) {
      setPending(this.useUpdateMutations);
    }

    return new Promise<
      reboot_web.ResponseOrAborted<
        Veterinarian.UpdateResponse,
        VeterinarianUpdateAborted
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "Update",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
            bearerToken: mutation.bearerToken,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            let rerender = false;
            for (const m of this.useUpdateMutations) {
              if (m === mutation) {
                if (m.isLoading !== isLoading) {
                  m.isLoading = isLoading;
                  rerender = true;
                }
                if (error !== undefined && m.error !== error) {
                  m.error = error;
                  rerender = true;
                }
              }
            }

            if (rerender) {
              for (const setPending of Object.values(this.useUpdateSetPendings)) {
                setPending(this.useUpdateMutations);
              }
            }
          }
        );

        const removeMutationsAndSetPending = () => {
          this.useUpdateMutations =
            this.useUpdateMutations.filter(m => m !== mutation);

          for (const setPending of Object.values(this.useUpdateSetPendings)) {
            setPending(this.useUpdateMutations);
          }
        }


        switch (responseOrStatus.case) {
          case "response": {
            await observed(() => {
              removeMutationsAndSetPending();
              resolve({
                response:
                  VeterinarianUpdateResponseFromProtobufShape(
                    Empty.fromBinary(
                    responseOrStatus.value
                  )
                )
              });
            });
            break;
          }
          case "status": {
            // Let the observers know they no longer should expect to
            // observe this idempotency key.
            for (const id in this.observers) {
              this.observers[id].unobserve(mutation.idempotencyKey);
            }

            const status = reboot_api.Status.fromJsonString(responseOrStatus.value);

            const aborted = VeterinarianUpdateAborted.fromStatus(status);

            console.warn(
              `[Reboot] 'Veterinarian.Update' aborted with ${aborted.message}`
            );

            removeMutationsAndSetPending();
            resolve({ aborted });

            break;
          }
          default: {
            // TODO(benh): while this is a _really_ fatal error,
            // should we still set `aborted` instead of throwing?
            reject(new Error('Expecting either a response or a status'));
          }
        }
      });
  }

  useUpdate(
    id: string,
    setPending: (mutations: PendingVeterinarianUpdateMutation[]) => void
  ) {
    this.useUpdateSetPendings[id] = setPending;
  }

  unuseUpdate(id: string) {
    delete this.useUpdateSetPendings[id];
  }


  private useDetailsReaders: {
    [requestBearerTokenHash: string]: reboot_react.Reader<petclinic_pb.VeterinarianDetailsResponse>
  } = {};

  // `FinalizationRegistry` lets us abort a reader once React has
  // garbage-collected its promise (i.e. abandoned it). It is absent on
  // some runtimes (e.g. React Native's Hermes engine), where we simply
  // skip this cleanup and rely on the `unuse...` timeout path instead.
  private detailsFinalizationRegistry =
    typeof FinalizationRegistry !== "undefined"
      ? new FinalizationRegistry<() => void>((finalize) => finalize())
      : undefined;

  startDetails(
    requestBearerTokenHash: string,
    serializedRequest: Uint8Array,
    bearerToken: string | undefined,
    offlineCacheEnabled: boolean,
    cacheKey: string | null
  ) {
    let reader = this.useDetailsReaders[requestBearerTokenHash];

    if (reader === undefined) {
      const event = new reboot_api.Event();

      const promise = event.wait();

      reader = {
        abortController: new AbortController(),
        event,
        promise,
        used: false,
        scheduledUnusedTimeoutsCount: 0,
        setResponses: {},
        setIsLoadings: {},
        setStatuses: {},

        setResponse(
          response: petclinic_pb.VeterinarianDetailsResponse,
          { cache }: { cache: boolean } = { cache: true }
        ) {
          // Store the response, delete the status.
          this.response = response;
          delete this.status;

          // Trigger response or aborted has been received event (if
          // it wasn't triggered already).
          this.event.set();

          // Dispatch to all listeners.
          for (const setResponse of Object.values(this.setResponses)) {
            setResponse(response);
          }

          // Cache response if applicable.
          if (cache && offlineCacheEnabled) {
            reboot_api.assert(cacheKey !== null);
            const cachedResponse = response.toJsonString();
            reboot_web.offlineCache().set(cacheKey, cachedResponse)
              .catch((error) => {
                console.warn(
                  `[Reboot] Setting of offline reader cache entry for 'Veterinarian.Details' errored with ${error}`
                );
              });
          }
        },

        setIsLoading(isLoading: boolean) {
          for (const setIsLoading of Object.values(this.setIsLoadings)) {
            setIsLoading(isLoading);
          }
        },

        setStatus(status: reboot_api.Status) {
          // Store the status, delete the response.
          this.status = status;
          delete this.response;

          // Trigger response or aborted has been received event (if
          // it wasn't triggered already).
          this.event.set();

          for (const setStatus of Object.values(this.setStatuses)) {
            setStatus(status);
          }
        },
      };

      this.detailsFinalizationRegistry?.register(
        promise,
        () => {
          if (!reader.used) {
            delete this.useDetailsReaders[requestBearerTokenHash];
            reader.abortController.abort();
          }
        }
      );

      // We want to remove the promise so that it can be garbage collected
      // which is our indication that React is no longer using it. But this
      // races with calls to `useDetails(...)`
      // that might be adding their `setResponse`, `setIsLoading`, etc, so
      // we delay deleting the promise for at least a second.
      //
      // Note that deleting the promise is okay because all subsequent calls
      // will simply use the `reader.response` since it will no longer be
      // undefined.
      reader.promise.then(async () => {
        // Allow the call to `useDetails(...)`
        // at least 5 seconds to indicate that the reader is being used,
        // afterwhich, once `reader.promise` gets garbage collected
        // we'll know that it must have been abandoned by React, e.g.,
        // because the component was suspended and never committed.
        await reboot_api.sleep({ ms: 5000 });

        delete reader.promise;
      });

      this.useDetailsReaders[requestBearerTokenHash] = reader;

      // Start fetching from the server.
      this.read(
        "Details",
        serializedRequest,
        bearerToken,
        petclinic_pb.VeterinarianDetailsResponse,
        reader
      );

      // Check if there is a cached result if applicable.
      if (offlineCacheEnabled) {
        reboot_api.assert(cacheKey !== null);

        reboot_web.offlineCache().get(cacheKey).then((cachedResponse) => {
          if (cachedResponse !== null) {
            // We only want to set the response if we haven't already
            // gotten a response from the server as it is the authority
            // and should take precedence.
            if (reader.response === undefined) {
              reader.setResponse(
                petclinic_pb.VeterinarianDetailsResponse.fromJsonString(cachedResponse),
                { cache: false } // Don't re-cache the value!
              );
            }
          }
        }).catch((error) => {
          console.warn(
            `[Reboot] Retrieval of offline reader cache entry for 'Veterinarian.Details' errored with ${error}`
          );
        });
      }
    }

    reboot_api.assert(reader !== undefined);

    return reader;
  }

  useDetails(
    id: string,
    requestBearerTokenHash: string,
    serializedRequest: Uint8Array,
    bearerToken: string | undefined,
    offlineCacheEnabled: boolean,
    cacheKey: string | null,
    setResponse: (response: petclinic_pb.VeterinarianDetailsResponse) => void,
    setIsLoading: (isLoading: boolean) => void,
    setStatus: (status: reboot_api.Status) => void
  ) {
    // We need to call start here because with strict mode the
    // `useEffect` that calls this method will also call "unuse"
    // which will mean the next time the `useEffect` calls here
    // we'll create a new reader in start.
    const reader = this.startDetails(
      requestBearerTokenHash,
      serializedRequest,
      bearerToken,
      offlineCacheEnabled,
      cacheKey
    );

    reboot_api.assert(reader !== undefined);

    // Indicate that the reader has properly been used so that we don't
    // clean it up prematurely.
    reader.used = true;

    reader.setResponses[id] = setResponse;
    reader.setIsLoadings[id] = setIsLoading;
    reader.setStatuses[id] = setStatus;

    // If we already have a `response` or `status` need to set it.
    if (reader.response) {
      setResponse(reader.response);
      setIsLoading(false);
    } else if (reader.status) {
      setStatus(reader.status);
    }
  }

  unuseDetails(
    id: string,
    requestBearerTokenHash: string,
  ) {
    const reader = this.useDetailsReaders[requestBearerTokenHash];

    reboot_api.assert(reader !== undefined);

    delete reader.setResponses[id];
    delete reader.setIsLoadings[id];
    delete reader.setStatuses[id];

    // Schedule a timeout to delete and abort this reader if we're the
    // last user. We need a timeout because, with StrictMode turned on,
    // we can't remove the reader right away otherwise we won't have a
    // stable Event and Promise. We use 3 seconds but may need to make
    // configurable depending on the application.
    if (Object.values(reader.setResponses).length === 0) {
      reader.scheduledUnusedTimeoutsCount += 1;
      setTimeout(() => {
        reader.scheduledUnusedTimeoutsCount -= 1;
        if (
          reader.scheduledUnusedTimeoutsCount === 0 &&
          Object.values(reader.setResponses).length === 0
        ) {
          delete this.useDetailsReaders[requestBearerTokenHash];
          reader.abortController.abort();
        }
      }, 3000);
    }
  }


  private static instances: { [id: string]: VeterinarianInstance } = {};

  static use(id: string, stateRef: string, url: string) {
    if (!(id in this.instances)) {
      this.instances[id] = new VeterinarianInstance(id, stateRef, url);
    } else {
      this.instances[id].ref();
    }

    return this.instances[id];
  }

  unuse() {
    if (this.unref() === 0) {
      delete VeterinarianInstance.instances[this.id];
    }
  }
}


// Called with an explicit `id`: bound to that state, returns the
// `UseVeterinarianApi` handle directly.
export function useVeterinarian(
  args: { id: string }
): UseVeterinarianApi;
// Called without an explicit `id`: resolves the default ID for this
// state. `veterinarian` is the
// handle once a default ID resolves, or `undefined` when there is
// none (e.g. signed out); `isLoading` is true until resolution
// settles.
export function useVeterinarian(
  args?: undefined
): {
  veterinarian: UseVeterinarianApi | undefined;
  isLoading: boolean;
};
export function useVeterinarian(
  { id: providedId }: { id?: string } = {}
):
  | UseVeterinarianApi
  | {
      veterinarian: UseVeterinarianApi | undefined;
      isLoading: boolean;
    } {
  // Resolve `id` from the frontend-agnostic state-ID map. A `null` map
  // means that resolution is still in flight; an empty map means it
  // resolved with no default ID for us.
  const defaultIds = useDefaultStateIds();
  const isLoading = defaultIds === null;

  // Resolve ID: explicit > URL param (dev) > default-ID map.
  const devId = useMemo(() => {
    // React Native defines `window` but not `window.location`, so both
    // must be checked.
    if (
      typeof window !== "undefined" &&
      typeof window.location !== "undefined"
    ) {
      return new URLSearchParams(
        window.location.search
      ).get("petclinic.v1.Veterinarian.id");
    }
    return null;
  }, []);

  const toolInputId =
    typeof defaultIds?.["petclinic.v1.Veterinarian"] === "string"
      ? defaultIds["petclinic.v1.Veterinarian"]
      : null;

  const resolvedId = providedId ?? devId ?? toolInputId;
  // Without a resolved ID we still run every hook below (rules of
  // hooks), binding to the inert empty-ID instance that opens no
  // socket.
  const id = resolvedId ?? "";
  // The unresolved no-id case carries an empty `stateRef` rather than
  // computing one. Keyed on the id being unresolved — an explicitly
  // passed empty id still reaches `stateIdToRef`, which rejects it.
  const stateRef =
    resolvedId == null
      ? ""
      : reboot_api.stateIdToRef("petclinic.v1.Veterinarian", id);

  const rebootClient = reboot_react.useRebootClient();

  const url = rebootClient.url;
  const bearerToken = rebootClient.bearerToken;
  const refreshBearerToken = useRefreshBearerToken();

  const [instance, setInstance] = useState(() => {
    return VeterinarianInstance.use(
      id, stateRef, url
    );
  });

  if (instance.id !== id) {
    setInstance(
      VeterinarianInstance.use(
        id, stateRef, url
      )
    );
  }

  useEffect(() => {
    return () => {
      instance.unuse();
    };
  }, [instance]);

  const headers = useMemo(() => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.append("Connection", "keep-alive");

    if (bearerToken !== undefined) {
      headers.append("Authorization", `Bearer ${bearerToken}`);
    }

    return headers;
  }, [bearerToken]);


  function useRegister() {
    const [
      pending,
      setPending
    ] = useState<PendingVeterinarianRegisterMutation[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useRegister(id, setPending);
      return () => {
        instance.unuseRegister(id);
      };
    }, [instance]);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const register = useMemo(() => {
      const method = async (
        partialRequest: Veterinarian.PartialRegisterRequest = {},
        options?: { metadata?: any, key?: string }
      ) => {
        const request = VeterinarianRegisterRequestToProtobuf(partialRequest);

        const idempotencyKey = options?.idempotencyKey ?? options?.key ?? reboot_web.makeExpiringIdempotencyKey();

        const mutation = {
          request,
          idempotencyKey,
          bearerToken,
          metadata: options?.metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        const result = await instance.register(mutation);

        // If the server rejected us due to an expired token,
        // refresh via the frontend's bearer-refresh and retry
        // once (mirrors the unary-call path).
        if (
          result.aborted !== undefined &&
          result.aborted.code === reboot_api.StatusCode.UNAUTHENTICATED &&
          refreshBearerToken
        ) {
          const newToken = await refreshBearerToken();
          if (newToken !== undefined) {
            return instance.register(
              { ...mutation, bearerToken: newToken }
            );
          }
        }

        return result;
      };

      method.pending =
        new Array<PendingVeterinarianRegisterMutation>();

      return method;
    }, [instance, bearerToken, refreshBearerToken]);

    register.pending = pending;

    return register;
  }

  const register = useRegister();


  function useUpdate() {
    const [
      pending,
      setPending
    ] = useState<PendingVeterinarianUpdateMutation[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useUpdate(id, setPending);
      return () => {
        instance.unuseUpdate(id);
      };
    }, [instance]);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const update = useMemo(() => {
      const method = async (
        partialRequest: Veterinarian.PartialUpdateRequest = {},
        options?: { metadata?: any, key?: string }
      ) => {
        const request = VeterinarianUpdateRequestToProtobuf(partialRequest);

        const idempotencyKey = options?.idempotencyKey ?? options?.key ?? reboot_web.makeExpiringIdempotencyKey();

        const mutation = {
          request,
          idempotencyKey,
          bearerToken,
          metadata: options?.metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        const result = await instance.update(mutation);

        // If the server rejected us due to an expired token,
        // refresh via the frontend's bearer-refresh and retry
        // once (mirrors the unary-call path).
        if (
          result.aborted !== undefined &&
          result.aborted.code === reboot_api.StatusCode.UNAUTHENTICATED &&
          refreshBearerToken
        ) {
          const newToken = await refreshBearerToken();
          if (newToken !== undefined) {
            return instance.update(
              { ...mutation, bearerToken: newToken }
            );
          }
        }

        return result;
      };

      method.pending =
        new Array<PendingVeterinarianUpdateMutation>();

      return method;
    }, [instance, bearerToken, refreshBearerToken]);

    update.pending = pending;

    return update;
  }

  const update = useUpdate();



  function useDetails(
    partialRequest: Veterinarian.PartialDetailsRequest = {},
    options: { suspense: boolean } = { suspense: false }
  ) {
    const newRequest = VeterinarianDetailsRequestToProtobuf(partialRequest);

    const [request, setRequest] = useState(newRequest);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const rebootClient = reboot_react.useRebootClient();

    const bearerToken = rebootClient.bearerToken;

    const serializedRequest = useMemo(() => request.toBinary(), [request]);

    // To distinguish this call from others when caching responses on
    // the client we compute a "request hash" using SHA256 from the
    // `request`.
    // We memoize this so we don't do it every time.
    const requestHash: string = useMemo(
      () => {
        const hash = reboot_web.calcSha256();
        hash.add(serializedRequest);
        return hash.digest().hex();
      },
      [serializedRequest]
    );

    // To create a map of unused readers globally on the client, we
    // compute a "request hash" using SHA256 from the `request`
    // including the bearerToken.
    // We memoize this so we don't do it every time.
    const requestBearerTokenHash: string = useMemo(
      () => {
        const hash = reboot_web.calcSha256();
        hash.add(serializedRequest);
        if (bearerToken) {
          hash.add(bearerToken);
        }
        return hash.digest().hex();
      },
      [serializedRequest, bearerToken]
    );

    const offlineCacheEnabled = rebootClient.offlineCacheEnabled;

    const cacheKey: string | null = useMemo(
      () => {
        if (offlineCacheEnabled) {
          return `${stateRef}:Details:${requestHash}`;
        }
        return null;
      },
      [stateRef, offlineCacheEnabled, requestHash]
    );

    // We start reading here, or if another component already started
    // the reading then we just get back the reader. We need to do this
    // before setting up our `useState`s because when using suspense
    // we need to use the `reader.response` or `reader.status` during
    // render where one of them will be defined, i.e., after we've
    // waited for `reader.promise` via `React.use()`.
    const reader = instance.startDetails(
      requestBearerTokenHash,
      serializedRequest,
      bearerToken,
      offlineCacheEnabled,
      cacheKey
    );

    const [response, setResponse] = useState<
      Veterinarian.DetailsResponse | undefined
      >(reader.response && VeterinarianDetailsResponseFromProtobufShape(reader.response));

    const [aborted, setAborted] = useState<
      VeterinarianDetailsAborted | undefined
      >(reader.status && VeterinarianDetailsAborted.fromStatus(reader.status));

    // Track which state ID the current `response` and `aborted` belong
    // to so we can reset them when the state ID changes, back into
    // their "loading" state. We track `id` rather than `instance`
    // because `id` updates immediately from props, whereas `instance`
    // only updates later after a separate `setState`.
    const [responseStateId, setResponseStateId] = useState(id);
    if (responseStateId !== id) {
      setResponseStateId(id);
      setResponse(undefined);
      setAborted(undefined);
      setIsLoading(true);
    }

    useEffect(() => {
      const id = uuidv4();

      instance.useDetails(
        id,
        requestBearerTokenHash,
        serializedRequest,
        bearerToken,
        offlineCacheEnabled,
        cacheKey,
        (response: petclinic_pb.VeterinarianDetailsResponse) => {
          setAborted(undefined);
          setResponse(VeterinarianDetailsResponseFromProtobufShape(response));
        },
        setIsLoading,
        (status: reboot_api.Status) => {
          // If the server rejected us due to an expired
          // token, refresh via the frontend's bearer-refresh
          // (the MCP host, or the web session). The token
          // change triggers a re-render and reconnect.
          if (
            status.code === reboot_api.StatusCode.UNAUTHENTICATED &&
            refreshBearerToken
          ) {
            refreshBearerToken();
          }

          const aborted = VeterinarianDetailsAborted.fromStatus(status);

          console.warn(
            `[Reboot] 'Veterinarian.Details' aborted with ${aborted.message}`
          );

          setAborted(aborted);
          setResponse(undefined);
        },
      );

      return () => {
        instance.unuseDetails(id, requestBearerTokenHash);
      };
    }, [
      instance,
      serializedRequest,
      requestBearerTokenHash,
      bearerToken,
      refreshBearerToken,
      offlineCacheEnabled,
      cacheKey,
    ]);

    // If the user has requested suspense via `options.suspense` then
    // we need to use `useMemo` to create a stable promise to pass
    // to `React.use()`. This is important for two reasons:
    //
    // 1. `reader.promise` gets deleted after 5 seconds to
    //    allow GC-based detection of abandoned readers (via
    //    `FinalizationRegistry`), so we can't pass it directly
    //    on every render.
    //
    // 2. `React.use()` suspends at least once for each new
    //    promise it sees (to call `.then()`), so we must
    //    return the same promise across re-renders for a given
    //    reader.
    //
    // When suspense is not requested, or the reader's event is
    // already set (i.e., we have a response or aborted status),
    // we return a pre-resolved promise. Note that `React.use()`
    // will suspend at least once even for a pre-resolved promise
    // in order to set internal state on it, but on subsequent
    // renders it will recognize the same promise and return
    // without suspending.
	//
	// We need to store the suspense promise in a `useRef` so
	// that we can continually return it even if the reader is
	// changing due to things like the `bearerToken` changing,
	// however, we don't want to flicker the suspense fallback
	// when `bearerToken` changes after we've already received
	// a stable `response` (or `aborted`).
	const suspensePromiseRef = useRef(undefined);

    const suspensePromise = useMemo(
      () => {
	    if (suspensePromiseRef.current === undefined || (response === undefined && aborted === undefined)) {
          if (!options.suspense || reader.event.isSet()) {
		    suspensePromiseRef.current = Promise.resolve();
          } else {
            reboot_api.assert(reader.promise !== undefined);
			reboot_api.assert(response === undefined);
			reboot_api.assert(aborted === undefined);
            suspensePromiseRef.current = reader.promise.then(() => {});
          }
		}
		return suspensePromiseRef.current;
      },
      [options.suspense, reader, response, aborted]
    );

    if (options.suspense) {
      if (!("use" in React)) {
        // Raise if it doesn't look like we are using React>=19.
        const error = "In order to pass `suspense: true` to a Reboot reactive reader you must be using React>=19 which provides `React.use`";
        console.error(error);
        throw new Error(error);
      }

      React.use(suspensePromise);
    }

    if (!request.equals(newRequest)) {
      setRequest(newRequest);
      setIsLoading(true);

      return { response, isLoading: true, aborted };
    }

    return { response, isLoading, aborted };
  }

  async function details(
    partialRequest: Veterinarian.PartialDetailsRequest = {},
    options?: { signal?: AbortSignal; retry?: boolean }
  ) {
    let retry = true;
    if (options !== undefined && options.retry !== undefined) {
      retry = options.retry;
    }

    const request = VeterinarianDetailsRequestToProtobuf(partialRequest);

    // The age of the transaction this call started, once an error has
    // told us: the root transaction id of its first attempt. A retry
    // carries it so that the retried transaction is as old as its first
    // attempt rather than younger than every transaction started since.
    let transactionRetryAge: string | undefined;

    // Fetch with retry, using a backoff, i.e., if we get disconnected
    // or the server asks us to try again.
    const { response, aborted } = await (async () => {
      const backoff = new reboot_api.Backoff();
      // A `TransactionShouldRetry` may ask us to retry immediately, but
      // we elide the backoff only once: a transaction that keeps being
      // asked to start over should still back off.
      let backoffElided = false;

      while (true) {
        let retryWithoutBackoff = false;
        // Copied per attempt so that a retry age set for this call does
        // not outlive it on the hook's shared headers.
        const attemptHeaders = new Headers(headers);
        if (transactionRetryAge !== undefined) {
          attemptHeaders.set("x-reboot-transaction-retry-age", transactionRetryAge);
        }
        try {
          // Invariant here is that we use the '/package.service.method' path and
          // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
          //
          // See also 'reboot/helpers.py'.
          const response = await reboot_web.guardedFetch(
            `${rebootClient.url}/__/reboot/rpc/${stateRef}/petclinic.v1.VeterinarianMethods/Details`,
            {
              ...options,
              method: "POST",
              headers: attemptHeaders,
              body: request.toJsonString()
            }
          );
          // A 'fetch' does not throw on these, so check the status and
          // retry the same way a failed 'fetch' is retried:
          // - 502 (Bad Gateway): the proxy can not reach the backend.
          // - 503 (Unavailable): the server is temporarily unavailable,
          //   or is asking for the transaction to be started over.
          // - 499 (Cancelled): the request was cancelled, often because
          //   the server is shutting down.
          if (
            response.status === 502 ||
            response.status === 503 ||
            response.status === 499
          ) {
            if (response.headers.get("content-type") === "application/json") {
              const status = reboot_api.Status.fromJson(await response.json());
              const shouldRetry = reboot_api.errorFromGoogleRpcStatusDetails(
                status,
                [reboot_api.errors_pb.TransactionShouldRetry] as const
              );
              if (shouldRetry !== undefined) {
                retryWithoutBackoff =
                  reboot_api.TRANSACTION_SHOULD_RETRY_REASONS_WITHOUT_BACKOFF.has(
                    shouldRetry.reason
                  );
                if (transactionRetryAge === undefined && shouldRetry.retryAge !== "") {
                  transactionRetryAge = shouldRetry.retryAge;
                }
                if (
                  shouldRetry.reason ===
                  reboot_api.errors_pb.TransactionShouldRetry_Reason.PRESUMED_DEADLOCK
                ) {
                  console.warn(
                    `[Reboot] Retrying call to \`petclinic.v1.VeterinarianMethods.Details\` because its transaction is presumed deadlocked: ${status.message}`
                  );
                }
              }
              // Handled in the 'catch' block below.
              throw VeterinarianDetailsAborted.fromStatus(status);
            }
            throw new VeterinarianDetailsAborted(
              new reboot_api.errors_pb.Unknown(), {
                message: `Unknown error with HTTP status ${response.status}`
              }
            );
          }
          return { response };
        } catch (e: unknown) {
          if (options?.signal?.aborted || !retry) {
            if (e instanceof VeterinarianDetailsAborted) {
              return { aborted: e };
            }
            const aborted = new VeterinarianDetailsAborted(
              new reboot_api.errors_pb.Aborted(), {
                message: e instanceof Error
                  ? `${e}`
                  : `Unknown error: ${JSON.stringify(e)}`
              }
            );

            return { aborted };
          } else if (e instanceof Error) {
            console.error(e);
          } else {
            console.error(`[Reboot] Unknown error: ${JSON.stringify(e)}`);
          }
        }

        if (retryWithoutBackoff && !backoffElided) {
          backoffElided = true;
          continue;
        }

        await backoff.wait(`[Reboot] Retrying call to \`petclinic.v1.VeterinarianMethods.Details\` with backoff...`);
      }
    })();

    if (aborted) {
      return { aborted };
    } else if (response.status === 401 && refreshBearerToken) {
      // Token expired — refresh via the frontend's bearer-refresh
      // and retry once.
      const newToken = await refreshBearerToken();
      if (newToken) {
        const retryHeaders = new Headers();
        retryHeaders.set("Content-Type", "application/json");
        retryHeaders.append("Connection", "keep-alive");
        retryHeaders.append("Authorization", `Bearer ${newToken}`);
        try {
          const retryResponse = await reboot_web.guardedFetch(
            `${rebootClient.url}/__/reboot/rpc/${stateRef}/petclinic.v1.VeterinarianMethods/Details`,
            {
              ...options,
              method: "POST",
              headers: retryHeaders,
              body: request.toJsonString()
            }
          );
          if (retryResponse.ok) {
            return {
              response:
                VeterinarianDetailsResponseFromProtobufShape((petclinic_pb.VeterinarianDetailsResponse.fromJson(await retryResponse.json())))
            };
          }
          // Fall through to generic error handling on retry failure.
          return {
            aborted: new VeterinarianDetailsAborted(
              new reboot_api.errors_pb.Unknown(), {
                message: `Unknown error with HTTP status ${retryResponse.status} after token refresh`
              }
            )
          };
        } catch (e: unknown) {
          return {
            aborted: new VeterinarianDetailsAborted(
              new reboot_api.errors_pb.Aborted(), {
                message: e instanceof Error
                  ? `${e}`
                  : `Unknown error: ${JSON.stringify(e)}`
              }
            )
          };
        }
      }
      // Refresh failed — fall through to generic error.
      return {
        aborted: new VeterinarianDetailsAborted(
          new reboot_api.errors_pb.Unknown(), {
            message: `Unauthorized (HTTP 401) and token refresh failed`
          }
        )
      };
    } else if (!response.ok) {
      if (response.headers.get("content-type") === "application/json") {
        const status = reboot_api.Status.fromJson(await response.json());


        // If the server rejected us due to an expired
        // token, refresh via the frontend's bearer-refresh and
        // retry once.
        if (
          status.code === reboot_api.StatusCode.UNAUTHENTICATED &&
          refreshBearerToken
        ) {
          const newToken = await refreshBearerToken();
          if (newToken) {
            const retryHeaders = new Headers();
            retryHeaders.set(
              "Content-Type", "application/json",
            );
            retryHeaders.append(
              "Connection", "keep-alive",
            );
            retryHeaders.append(
              "Authorization", `Bearer ${newToken}`,
            );
            try {
              const retryResponse =
                await reboot_web.guardedFetch(
                  `${rebootClient.url}/__/reboot/rpc/${stateRef}/petclinic.v1.VeterinarianMethods/Details`,
                  {
                    ...options,
                    method: "POST",
                    headers: retryHeaders,
                    body: request.toJsonString()
                  }
                );
              if (retryResponse.ok) {
                return {
                  response:
                    VeterinarianDetailsResponseFromProtobufShape((petclinic_pb.VeterinarianDetailsResponse.fromJson(await retryResponse.json())))
                };
              }
            } catch {
              // Fall through to return the original aborted error.
            }
          }
        }

        const aborted = VeterinarianDetailsAborted.fromStatus(status);

        console.warn(
          `[Reboot] 'Veterinarian.Details' aborted with ${aborted.message}`
        );

        return { aborted };
      } else {
        const aborted = new VeterinarianDetailsAborted(
          new reboot_api.errors_pb.Unknown(), {
            message: `Unknown error with HTTP status ${response.status}`
          }
        );

        return { aborted };
      }
    } else {
      return {
        response:
          VeterinarianDetailsResponseFromProtobufShape((petclinic_pb.VeterinarianDetailsResponse.fromJson(await response.json())))
      };
    }
  }


  // Don't re-render if `id` hasn't changed.
    const api: UseVeterinarianApi = useMemo(() => ({
      state_id: id,
      mutators: {
        register,
        update,
      },
      idempotently: ({ key }: { key: string }) => {
      return {
        register: (
          partialRequest?:Veterinarian.PartialRegisterRequest,
          options?: { metadata?: any }
        ) => register(partialRequest, { ...options, key }),
        update: (
          partialRequest?:Veterinarian.PartialUpdateRequest,
          options?: { metadata?: any }
        ) => update(partialRequest, { ...options, key }),
      };
    },
      register,
      update,
      details,
      useDetails,
    }), [id, instance, bearerToken, refreshBearerToken]);

  // An explicit `id` caller gets the handle directly; a no-id caller
  // gets the `{ veterinarian, isLoading }`
  // shape, where the handle is `undefined` until a default ID
  // resolves.
  if (providedId !== undefined) {
    return api;
  }
  return {
    veterinarian: resolvedId ? api : undefined,
    isLoading,
  };
};



export class Veterinarian {
  static State = VeterinarianProto;
}
export namespace Veterinarian {
  export type State = VeterinarianProto;
}


