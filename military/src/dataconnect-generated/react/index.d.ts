import { CreateNewTrainingData, ListAvailableUnitsData, AssignEquipmentToSoldierData, AssignEquipmentToSoldierVariables, GetSoldierProfileData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateNewTraining(options?: useDataConnectMutationOptions<CreateNewTrainingData, FirebaseError, void>): UseDataConnectMutationResult<CreateNewTrainingData, undefined>;
export function useCreateNewTraining(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNewTrainingData, FirebaseError, void>): UseDataConnectMutationResult<CreateNewTrainingData, undefined>;

export function useListAvailableUnits(options?: useDataConnectQueryOptions<ListAvailableUnitsData>): UseDataConnectQueryResult<ListAvailableUnitsData, undefined>;
export function useListAvailableUnits(dc: DataConnect, options?: useDataConnectQueryOptions<ListAvailableUnitsData>): UseDataConnectQueryResult<ListAvailableUnitsData, undefined>;

export function useAssignEquipmentToSoldier(options?: useDataConnectMutationOptions<AssignEquipmentToSoldierData, FirebaseError, AssignEquipmentToSoldierVariables>): UseDataConnectMutationResult<AssignEquipmentToSoldierData, AssignEquipmentToSoldierVariables>;
export function useAssignEquipmentToSoldier(dc: DataConnect, options?: useDataConnectMutationOptions<AssignEquipmentToSoldierData, FirebaseError, AssignEquipmentToSoldierVariables>): UseDataConnectMutationResult<AssignEquipmentToSoldierData, AssignEquipmentToSoldierVariables>;

export function useGetSoldierProfile(options?: useDataConnectQueryOptions<GetSoldierProfileData>): UseDataConnectQueryResult<GetSoldierProfileData, undefined>;
export function useGetSoldierProfile(dc: DataConnect, options?: useDataConnectQueryOptions<GetSoldierProfileData>): UseDataConnectQueryResult<GetSoldierProfileData, undefined>;
