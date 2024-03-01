import Realm from 'realm';
import { Students } from './schemas/students.model';
import { createRealmContext } from '@realm/react';

console.log(
    '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n',
    'Realm db location :\n',
    Realm.defaultPath,
    '\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n',
);

export const realmConfig: Realm.Configuration = {
    schema: [Students],
    schemaVersion: 4
};

export const realmContext = createRealmContext(realmConfig);
