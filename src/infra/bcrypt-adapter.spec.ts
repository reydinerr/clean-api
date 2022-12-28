import bcrypt from "bcrypt"
import { BcryptAdapter } from "./criptograph/bcrypt-adapter"

const salt = 12
const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt)
}

jest.mock("bcrypt", () => ({
    async hash(): Promise<string> {
        return new Promise((resolve) => resolve("hash"))
    },
}))

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

    test("should throw if bcrypt throws", async () => {
        const sut = makeSut()
        jest.spyOn(bcrypt, "hash").mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const promise = sut.encrypt("any_value")
        await expect(promise).rejects.toThrow()
    })
})
