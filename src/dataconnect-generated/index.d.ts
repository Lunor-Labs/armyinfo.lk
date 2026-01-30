import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AssignEquipmentToSoldierData {
  equipment_update?: Equipment_Key | null;
}

export interface AssignEquipmentToSoldierVariables {
  equipmentId: UUIDString;
  soldierId: UUIDString;
}

export interface Assignment_Key {
  id: UUIDString;
  __typename?: 'Assignment_Key';
}

export interface CreateNewTrainingData {
  training_insert: Training_Key;
}

export interface Equipment_Key {
  id: UUIDString;
  __typename?: 'Equipment_Key';
}

export interface GetSoldierProfileData {
  soldier?: {
    id: UUIDString;
    firstName: string;
    lastName: string;
    rank: string;
    serviceNumber: string;
    specialty: string;
    unit?: {
      unitName: string;
      unitType: string;
    };
  } & Soldier_Key;
}

export interface ListAvailableUnitsData {
  units: ({
    id: UUIDString;
    unitName: string;
    unitType: string;
    location?: string | null;
    description?: string | null;
  } & Unit_Key)[];
}

export interface SoldierTraining_Key {
  soldierId: UUIDString;
  trainingId: UUIDString;
  __typename?: 'SoldierTraining_Key';
}

export interface Soldier_Key {
  id: UUIDString;
  __typename?: 'Soldier_Key';
}

export interface Training_Key {
  id: UUIDString;
  __typename?: 'Training_Key';
}

export interface Unit_Key {
  id: UUIDString;
  __typename?: 'Unit_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateNewTrainingRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateNewTrainingData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateNewTrainingData, undefined>;
  operationName: string;
}
export const createNewTrainingRef: CreateNewTrainingRef;

export function createNewTraining(): MutationPromise<CreateNewTrainingData, undefined>;
export function createNewTraining(dc: DataConnect): MutationPromise<CreateNewTrainingData, undefined>;

interface ListAvailableUnitsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAvailableUnitsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAvailableUnitsData, undefined>;
  operationName: string;
}
export const listAvailableUnitsRef: ListAvailableUnitsRef;

export function listAvailableUnits(): QueryPromise<ListAvailableUnitsData, undefined>;
export function listAvailableUnits(dc: DataConnect): QueryPromise<ListAvailableUnitsData, undefined>;

interface AssignEquipmentToSoldierRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignEquipmentToSoldierVariables): MutationRef<AssignEquipmentToSoldierData, AssignEquipmentToSoldierVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AssignEquipmentToSoldierVariables): MutationRef<AssignEquipmentToSoldierData, AssignEquipmentToSoldierVariables>;
  operationName: string;
}
export const assignEquipmentToSoldierRef: AssignEquipmentToSoldierRef;

export function assignEquipmentToSoldier(vars: AssignEquipmentToSoldierVariables): MutationPromise<AssignEquipmentToSoldierData, AssignEquipmentToSoldierVariables>;
export function assignEquipmentToSoldier(dc: DataConnect, vars: AssignEquipmentToSoldierVariables): MutationPromise<AssignEquipmentToSoldierData, AssignEquipmentToSoldierVariables>;

interface GetSoldierProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetSoldierProfileData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetSoldierProfileData, undefined>;
  operationName: string;
}
export const getSoldierProfileRef: GetSoldierProfileRef;

export function getSoldierProfile(): QueryPromise<GetSoldierProfileData, undefined>;
export function getSoldierProfile(dc: DataConnect): QueryPromise<GetSoldierProfileData, undefined>;

