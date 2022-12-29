import { Collection, MongoClient } from "mongodb"
import { AccountModel } from "../../../../domain/usecases/models/account"

export const MongoHelper = {
    client: null as MongoClient,
    async connect(url: string): Promise<void> {
        this.client = await MongoClient.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    },

    async disconnect() {
        await this.client.close
    },

    getCollection(name: string): Collection {
        return this.client.db().collection(name)
    },

    map: (collection: any): any => {
        const { _id, ...collectionWhithoutId } = collection
        return Object.assign({}, collectionWhithoutId, { id: _id })
    },
}
