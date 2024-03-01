import { IGrade, IStudent } from "../../interfaces/student";
import Realm from 'realm';

export class Students extends Realm.Object<IStudent> {
    name!: string;
    rollNo!: string;
    className!: string;
    mobile!: string | null;
    grade!: IGrade | string;
    score!: string;
    public static schema = {
        name: 'Students',
        primaryKey: 'rollNo',
        properties: {
            name: 'string',
            rollNo: 'string',
            className: 'string',
            mobile: 'string?',
            grade: 'string',
            score: 'string'
        }
    }


    static all(realm: Realm): Realm.Results<Students> {
        return realm.objects(Students.schema.name);
    }

    static getByGrade(realm: Realm, grade: IGrade | string): Realm.Results<Students> {
        if (grade) {
            return realm.objects(Students.schema.name).filtered('grade == $0', grade);
        }
        else {
            return realm.objects(Students.schema.name);
        }
    }

    static getByScore(realm: Realm, score: string): Realm.Results<Students> {
        return realm.objects(Students.schema.name).filtered('score > $0', score);
    }

    static createAndUpdate(obj: IStudent, realm: Realm) {
        return new Promise((resolve, reject) => {
            try {
                realm.write(() => {
                    const instance = realm.create<IStudent>(
                        Students.schema.name,
                        obj,
                        Realm.UpdateMode.Modified,
                    );
                    resolve(instance);
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }


    //Update grade by classwise
    static changeGrade(
        obj: { grade: IGrade, className: string },
        realm: Realm,
    ) {
        return new Promise((resolve, reject) => {
            try {
                const allRowsbyClassName = realm.objects<Students>(Students.schema.name).filtered('className == $0', obj.className);
                if (allRowsbyClassName && allRowsbyClassName.length > 0) {
                    realm.write(() => {
                        allRowsbyClassName.forEach(e => {
                            Object.assign(e, { grade: obj.grade });
                        });
                    });
                }
                resolve(true);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    //Update grade by rollno wise
    static changeGradeSingle(
        obj: { grade: IGrade, rollNo: string },
        realm: Realm,
    ) {
        return new Promise((resolve, reject) => {
            try {
                const allRows = realm.objectForPrimaryKey<Students>(Students.schema.name, obj.rollNo);
                if (allRows) {
                    realm.write(() => {
                        Object.assign(allRows, { grade: obj.grade });
                    })
                }
                resolve(true)
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }



    //Update grade by rollno wise
    static delete(
        rollNo: string,
        realm: Realm,
    ) {
        return new Promise((resolve, reject) => {
            try {
                const instance = realm.objectForPrimaryKey<Students>(Students.schema.name, rollNo);
                if (instance) {
                    realm.write(() => {
                        realm.delete(instance)
                    })
                }
                resolve(true)
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

}