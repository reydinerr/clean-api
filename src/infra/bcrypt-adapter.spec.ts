import bcrypt from "bcrypt"
import { BcryptAdapter } from "./criptograph/bcrypt-adapter"

jest.mock("bcrypt", () => ({
    async hash(): Promise<String> {
        return new Promise((resolve) => resolve("hash"))
    },
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt)
}

describe("Bcrypt Adapter", () => {
    test("should call bcrypt with correct value", async () => {
        const sut = makeSut()
        const hashSpy = jest.spyOn(bcrypt, "hash")
        await sut.encrypt("any_value")
        expect(hashSpy).toHaveBeenCalledWith("any_value", salt)
    })

    test("should return a hash on sucess", async () => {
        const sut = makeSut()
        const hashSpy = jest.spyOn(bcrypt, "hash")
        const hash = await sut.encrypt("any_value")
        expect(hash).toBe("hash")
    })
})
