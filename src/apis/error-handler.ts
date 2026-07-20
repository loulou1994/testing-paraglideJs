import { ApiError } from "./errors"


export function handleApiError(response: Response){

    throw new ApiError("Something in auth procedure is wrong", "check your credentials if any is invalid")
}