import { MongoClient } from "mongodb"

export const MongoHelper = {
    client: null as MongoClient,
    async connect(url: string): Promise<void> {
        this.client = await MongoClient.connect(global.__MONGO_URI__, {
            directConnection: true,
        })
    },

    async disconnect() {
        await this.client.close
    },
}
