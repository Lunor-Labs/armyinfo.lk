# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAvailableUnits*](#listavailableunits)
  - [*GetSoldierProfile*](#getsoldierprofile)
- [**Mutations**](#mutations)
  - [*CreateNewTraining*](#createnewtraining)
  - [*AssignEquipmentToSoldier*](#assignequipmenttosoldier)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAvailableUnits
You can execute the `ListAvailableUnits` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAvailableUnits(): QueryPromise<ListAvailableUnitsData, undefined>;

interface ListAvailableUnitsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAvailableUnitsData, undefined>;
}
export const listAvailableUnitsRef: ListAvailableUnitsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAvailableUnits(dc: DataConnect): QueryPromise<ListAvailableUnitsData, undefined>;

interface ListAvailableUnitsRef {
  ...
  (dc: DataConnect): QueryRef<ListAvailableUnitsData, undefined>;
}
export const listAvailableUnitsRef: ListAvailableUnitsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAvailableUnitsRef:
```typescript
const name = listAvailableUnitsRef.operationName;
console.log(name);
```

### Variables
The `ListAvailableUnits` query has no variables.
### Return Type
Recall that executing the `ListAvailableUnits` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAvailableUnitsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAvailableUnitsData {
  units: ({
    id: UUIDString;
    unitName: string;
    unitType: string;
    location?: string | null;
    description?: string | null;
  } & Unit_Key)[];
}
```
### Using `ListAvailableUnits`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAvailableUnits } from '@dataconnect/generated';


// Call the `listAvailableUnits()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAvailableUnits();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAvailableUnits(dataConnect);

console.log(data.units);

// Or, you can use the `Promise` API.
listAvailableUnits().then((response) => {
  const data = response.data;
  console.log(data.units);
});
```

### Using `ListAvailableUnits`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAvailableUnitsRef } from '@dataconnect/generated';


// Call the `listAvailableUnitsRef()` function to get a reference to the query.
const ref = listAvailableUnitsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAvailableUnitsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.units);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.units);
});
```

## GetSoldierProfile
You can execute the `GetSoldierProfile` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getSoldierProfile(): QueryPromise<GetSoldierProfileData, undefined>;

interface GetSoldierProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetSoldierProfileData, undefined>;
}
export const getSoldierProfileRef: GetSoldierProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSoldierProfile(dc: DataConnect): QueryPromise<GetSoldierProfileData, undefined>;

interface GetSoldierProfileRef {
  ...
  (dc: DataConnect): QueryRef<GetSoldierProfileData, undefined>;
}
export const getSoldierProfileRef: GetSoldierProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSoldierProfileRef:
```typescript
const name = getSoldierProfileRef.operationName;
console.log(name);
```

### Variables
The `GetSoldierProfile` query has no variables.
### Return Type
Recall that executing the `GetSoldierProfile` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSoldierProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetSoldierProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSoldierProfile } from '@dataconnect/generated';


// Call the `getSoldierProfile()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSoldierProfile();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSoldierProfile(dataConnect);

console.log(data.soldier);

// Or, you can use the `Promise` API.
getSoldierProfile().then((response) => {
  const data = response.data;
  console.log(data.soldier);
});
```

### Using `GetSoldierProfile`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSoldierProfileRef } from '@dataconnect/generated';


// Call the `getSoldierProfileRef()` function to get a reference to the query.
const ref = getSoldierProfileRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSoldierProfileRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.soldier);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.soldier);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNewTraining
You can execute the `CreateNewTraining` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNewTraining(): MutationPromise<CreateNewTrainingData, undefined>;

interface CreateNewTrainingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateNewTrainingData, undefined>;
}
export const createNewTrainingRef: CreateNewTrainingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNewTraining(dc: DataConnect): MutationPromise<CreateNewTrainingData, undefined>;

interface CreateNewTrainingRef {
  ...
  (dc: DataConnect): MutationRef<CreateNewTrainingData, undefined>;
}
export const createNewTrainingRef: CreateNewTrainingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNewTrainingRef:
```typescript
const name = createNewTrainingRef.operationName;
console.log(name);
```

### Variables
The `CreateNewTraining` mutation has no variables.
### Return Type
Recall that executing the `CreateNewTraining` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNewTrainingData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNewTrainingData {
  training_insert: Training_Key;
}
```
### Using `CreateNewTraining`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNewTraining } from '@dataconnect/generated';


// Call the `createNewTraining()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNewTraining();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNewTraining(dataConnect);

console.log(data.training_insert);

// Or, you can use the `Promise` API.
createNewTraining().then((response) => {
  const data = response.data;
  console.log(data.training_insert);
});
```

### Using `CreateNewTraining`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNewTrainingRef } from '@dataconnect/generated';


// Call the `createNewTrainingRef()` function to get a reference to the mutation.
const ref = createNewTrainingRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNewTrainingRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.training_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.training_insert);
});
```

## AssignEquipmentToSoldier
You can execute the `AssignEquipmentToSoldier` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
assignEquipmentToSoldier(vars: AssignEquipmentToSoldierVariables): MutationPromise<AssignEquipmentToSoldierData, AssignEquipmentToSoldierVariables>;

interface AssignEquipmentToSoldierRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignEquipmentToSoldierVariables): MutationRef<AssignEquipmentToSoldierData, AssignEquipmentToSoldierVariables>;
}
export const assignEquipmentToSoldierRef: AssignEquipmentToSoldierRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
assignEquipmentToSoldier(dc: DataConnect, vars: AssignEquipmentToSoldierVariables): MutationPromise<AssignEquipmentToSoldierData, AssignEquipmentToSoldierVariables>;

interface AssignEquipmentToSoldierRef {
  ...
  (dc: DataConnect, vars: AssignEquipmentToSoldierVariables): MutationRef<AssignEquipmentToSoldierData, AssignEquipmentToSoldierVariables>;
}
export const assignEquipmentToSoldierRef: AssignEquipmentToSoldierRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the assignEquipmentToSoldierRef:
```typescript
const name = assignEquipmentToSoldierRef.operationName;
console.log(name);
```

### Variables
The `AssignEquipmentToSoldier` mutation requires an argument of type `AssignEquipmentToSoldierVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AssignEquipmentToSoldierVariables {
  equipmentId: UUIDString;
  soldierId: UUIDString;
}
```
### Return Type
Recall that executing the `AssignEquipmentToSoldier` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AssignEquipmentToSoldierData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AssignEquipmentToSoldierData {
  equipment_update?: Equipment_Key | null;
}
```
### Using `AssignEquipmentToSoldier`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, assignEquipmentToSoldier, AssignEquipmentToSoldierVariables } from '@dataconnect/generated';

// The `AssignEquipmentToSoldier` mutation requires an argument of type `AssignEquipmentToSoldierVariables`:
const assignEquipmentToSoldierVars: AssignEquipmentToSoldierVariables = {
  equipmentId: ..., 
  soldierId: ..., 
};

// Call the `assignEquipmentToSoldier()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await assignEquipmentToSoldier(assignEquipmentToSoldierVars);
// Variables can be defined inline as well.
const { data } = await assignEquipmentToSoldier({ equipmentId: ..., soldierId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await assignEquipmentToSoldier(dataConnect, assignEquipmentToSoldierVars);

console.log(data.equipment_update);

// Or, you can use the `Promise` API.
assignEquipmentToSoldier(assignEquipmentToSoldierVars).then((response) => {
  const data = response.data;
  console.log(data.equipment_update);
});
```

### Using `AssignEquipmentToSoldier`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, assignEquipmentToSoldierRef, AssignEquipmentToSoldierVariables } from '@dataconnect/generated';

// The `AssignEquipmentToSoldier` mutation requires an argument of type `AssignEquipmentToSoldierVariables`:
const assignEquipmentToSoldierVars: AssignEquipmentToSoldierVariables = {
  equipmentId: ..., 
  soldierId: ..., 
};

// Call the `assignEquipmentToSoldierRef()` function to get a reference to the mutation.
const ref = assignEquipmentToSoldierRef(assignEquipmentToSoldierVars);
// Variables can be defined inline as well.
const ref = assignEquipmentToSoldierRef({ equipmentId: ..., soldierId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = assignEquipmentToSoldierRef(dataConnect, assignEquipmentToSoldierVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.equipment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.equipment_update);
});
```

