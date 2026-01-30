const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'milatary',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createNewTrainingRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewTraining');
}
createNewTrainingRef.operationName = 'CreateNewTraining';
exports.createNewTrainingRef = createNewTrainingRef;

exports.createNewTraining = function createNewTraining(dc) {
  return executeMutation(createNewTrainingRef(dc));
};

const listAvailableUnitsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableUnits');
}
listAvailableUnitsRef.operationName = 'ListAvailableUnits';
exports.listAvailableUnitsRef = listAvailableUnitsRef;

exports.listAvailableUnits = function listAvailableUnits(dc) {
  return executeQuery(listAvailableUnitsRef(dc));
};

const assignEquipmentToSoldierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignEquipmentToSoldier', inputVars);
}
assignEquipmentToSoldierRef.operationName = 'AssignEquipmentToSoldier';
exports.assignEquipmentToSoldierRef = assignEquipmentToSoldierRef;

exports.assignEquipmentToSoldier = function assignEquipmentToSoldier(dcOrVars, vars) {
  return executeMutation(assignEquipmentToSoldierRef(dcOrVars, vars));
};

const getSoldierProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSoldierProfile');
}
getSoldierProfileRef.operationName = 'GetSoldierProfile';
exports.getSoldierProfileRef = getSoldierProfileRef;

exports.getSoldierProfile = function getSoldierProfile(dc) {
  return executeQuery(getSoldierProfileRef(dc));
};
