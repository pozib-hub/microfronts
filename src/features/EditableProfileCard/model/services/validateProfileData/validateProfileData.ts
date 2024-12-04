import { IProfile } from '@entities/profile'
import { ValidateProfileError } from '../../../model/const/const'

export const validateProfileData = (profile?: IProfile) => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA]
    }

    const { firstname, lastname, age, address } = profile

    const errors: ValidateProfileError[] = []

    if (!firstname || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA)
    }

    if (!age || !Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORRECT_AGE)
    }

    return errors
}
