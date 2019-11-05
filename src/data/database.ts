import { MongoClient, Db, MongoError } from "mongodb";
import logger from '../logger/index';

class Database {

    private url:string;
    private dbName:string;

    constructor() {
        this.url = 'mongodb://localhost:27017';
        this.dbName = 'cobalt';
    }

    private getClient() : Promise<MongoClient> {
        const promise: Promise<MongoClient> = new Promise((resolve, reject) => {
            MongoClient.connect(this.url, (err, client) => {
                if (err) {
                    reject(err);
                } else {    
                    logger.log('Connected successfully to server', 'Database');
                    resolve(client);
                }
            });
        });
        return promise;
    }

    public async getUsers() : Promise<Array<User>> {
        const client = await this.getClient();
        const db = client.db(this.dbName);
        const collection = db.collection('users');

        const promise: Promise<User[]> = new Promise((resolve, reject) => {
            collection.find({}).toArray((err, users) => {
                if (err) {
                    client.close();
                    reject(err);
                } else {
                    client.close();
                    logger.log("Found the following records", 'Database');
                    logger.log(users);
                    resolve(dataToUsers(users));
                }
            });
        });

        return promise;
    }

}

let db: Database = new Database();
export default db;

let dataToUsers = function(data: any[]) {
    let users: User[] = [];
    data.forEach((elem) => {
        try {
            users.push(dataToUser(elem));
        } catch(e) {
            logger.error(e, 'Database');
        }
    });
    return users;
}

let dataToUser = function(data: any) {
    if (data.name && data.uid) {
        let user: User = {
            name: data.name,
            uid: data.uid
        }
        return user;
    } else {
        throw "Data is not a user !";
    }
}