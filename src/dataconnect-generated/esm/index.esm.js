import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'milatary',
  location: 'us-east4'
};

export const createNewTrainingRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewTraining');
}
createNewTrainingRef.operationName = 'CreateNewTraining';

export function createNewTraining(dc) {
  return executeMutation(createNewTrainingRef(dc));
}

export const listAvailableUnitsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableUnits');
}
listAvailableUnitsRef.operationName = 'ListAvailableUnits';

export function listAvailableUnits(dc) {
  return executeQuery(listAvailableUnitsRef(dc));
}

export const assignEquipmentToSoldierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignEquipmentToSoldier', inputVars);
}
assignEquipmentToSoldierRef.operationName = 'AssignEquipmentToSoldier';

export function assignEquipmentToSoldier(dcOrVars, vars) {
  return executeMutation(assignEquipmentToSoldierRef(dcOrVars, vars));
}

export const getSoldierProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSoldierProfile');
}
getSoldierProfileRef.operationName = 'GetSoldierProfile';

export function getSoldierProfile(dc) {
  return executeQuery(getSoldierProfileRef(dc));
}

