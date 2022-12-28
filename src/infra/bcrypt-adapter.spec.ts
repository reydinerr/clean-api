import bcrypt from "bcrypt"
import { BcryptAdapter } from "./criptograph/bcrypt-adapter"
jest.mock("bcrypt", () => ({
    async hash(): Promise<String> {
        return new Promise((resolve) => resolve("hash"))
    },
}))
describe("Bcrypt Adapter", () => {
    test("should call bcrypt with correct value", async () => {
        const salt = 12
        const sut = new BcryptAdapter(salt)
        const hashSpy = jest.spyOn(bcrypt, "hash")
        await sut.encrypt("any_value")
        expect(hashSpy).toHaveBeenCalledWith("any_value", salt)
    })

    test("should return a hash on sucess", async () => {
        const salt = 12
        const sut = new BcryptAdapter(salt)
        const hashSpy = jest.spyOn(bcrypt, "hash")
        const hash = await sut.encrypt("any_value")
        expect(hash).toBe("hash")
    })
})
