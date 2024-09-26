import { fireEvent, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import componentRender from 'shared/lib/tests/componentRender/componentRender'
import { IProfile } from 'entities/profile'
import { EditableProfileCard } from './EditableProfileCard'
import {
    editProfileReducer
} from '../../model/slice/profileSlice'
import { $api } from 'shared/api/api'

const profile: IProfile = {
    id: "1",
    firstname: "Anyon",
    lastname: "Eames",
    username: "pozib",
    age: 32
}

const options = {
    initialState: {
        editProfile: {
            data: profile,
            form: profile,
            readonly: true
        },
        user: {
            authData: { id: "1", username: "pozib" }
        }
    },
    asyncReducers: {
        editProfile: editProfileReducer
    }
}

describe('feature/EditableProfileCard', () => {
    test('switch readonly mode', async () => {
        componentRender(<EditableProfileCard id='1' />, options)

        await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"))

        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument()
    })

    test('when cancelled, the value needs to be updated', async () => {
        componentRender(<EditableProfileCard id='1' />, options)
        await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"))

        await userEvent.clear(screen.getByTestId("ProfileCart.firstname"))
        await userEvent.clear(screen.getByTestId("ProfileCart.lastname"))

        await userEvent.type(screen.getByTestId("ProfileCart.firstname"), "user")
        await userEvent.type(screen.getByTestId("ProfileCart.lastname"), "user")

        expect(screen.getByTestId('ProfileCart.firstname')).toHaveValue("user")
        expect(screen.getByTestId('ProfileCart.lastname')).toHaveValue("user")

        await userEvent.click(screen.getByTestId("EditableProfileCardHeader.CancelButton"))

        expect(screen.getByTestId('ProfileCart.firstname')).toHaveValue("Anyon")
        expect(screen.getByTestId('ProfileCart.lastname')).toHaveValue("Eames")
    })


    test('an error should appear', async () => {
        componentRender(<EditableProfileCard id='1' />, options)

        await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"))

        await userEvent.clear(screen.getByTestId("ProfileCart.firstname"))

        await userEvent.click(screen.getByTestId("EditableProfileCardHeader.SaveButton"))

        const options = screen.getAllByTestId('EditableProfileCard.Error')
        expect(options.length).toBeGreaterThan(0)
    })

    test('success form validate and sent put request', async () => {
        const mockPutReq = jest.spyOn($api, "put")

        componentRender(<EditableProfileCard id='1' />, options)

        await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"))

        await userEvent.clear(screen.getByTestId("ProfileCart.firstname"))
        await userEvent.type(screen.getByTestId("ProfileCart.firstname"), "user")
        expect(screen.getByTestId('ProfileCart.firstname')).toHaveValue("user")

        await userEvent.click(screen.getByTestId("EditableProfileCardHeader.SaveButton"))

        expect(mockPutReq).toHaveBeenCalled()
        console.log(mockPutReq.mock.calls)

    })
})
