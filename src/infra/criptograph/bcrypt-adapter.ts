import bcrypt from "bcrypt"
import { Encrypter } from "../../data/protocols/encrypter"

export class BcryptAdapter {
    private readonly salt: number

    constructor(salt: number) {
        this.salt = salt
    }
    async encrypt(value: string): Promise<string> {
        await bcrypt.hash(value, this.salt)
        return null
    }
}