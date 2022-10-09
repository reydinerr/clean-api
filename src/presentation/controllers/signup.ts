import { HttpRequest, HttpResponse } from "../protocols/http"
import { MissingParamError } from "../error/missing-param-error"
import { badRequest } from "../helpers/http-helper"
export class SignUpController {
    handler(httpRequest: HttpRequest): HttpResponse {
        if (!httpRequest.body.name) {
            return badRequest(new MissingParamError("name"))
        }
        if (!httpRequest.body.email) {
            return badRequest(new MissingParamError("email"))
        }
    }
}
