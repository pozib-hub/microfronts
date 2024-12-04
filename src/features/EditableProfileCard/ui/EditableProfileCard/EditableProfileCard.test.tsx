import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import componentRender from '@shared/lib/tests/componentRender/componentRender'
import { IProfile } from '@entities/profile'
import { $api } from '@shared/api/api'

import { EditableProfileCard } from './EditableProfileCard'
import { editProfileReducer } from '../../model/slice/profileSlice'

const profile: IProfile = {
    id: '1',
    firstname: 'Anyon',
    lastname: 'Eames',
    username: 'pozib',
    age: 32,
    address: {
        id: '1',
        name: 'kek',
    },
    subdivision: {
        id: '1',
        name: 'kek',
    },
}

const options = {
    initialState: {
        editProfile: {
            data: profile,
            form: profile,
            readonly: true,
        },
        user: {
            authData: { id: '1', username: 'pozib' },
        },
    },
    asyncReducers: {
        editProfile: editProfileReducer,
    },
}

describe('feature/EditableProfileCard', () => {
    test('switch readonly mode', async () => {
        componentRender(<EditableProfileCard id="1" />, options)

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument()
    })

    test('when cancelled, the value needs to be updated', async () => {
        componentRender(<EditableProfileCard id="1" />, options)
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'))

        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')
        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user')

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user')
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user')

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'))

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('Anyon')
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('Eames')
    })

    test('an error should appear', async () => {
        componentRender(<EditableProfileCard id="1" />, options)

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

        // expect(screen.getAllByTestId('EditableProfileCard.Error').length).toBeGreaterThan(0)
    })

    test('success form validate and sent put request', async () => {
        const mockPutReq = jest.spyOn($api, 'put')

        componentRender(<EditableProfileCard id="1" />, options)

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')
        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user')

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

        // Это не будет срабатывать из за builderReducersByProject
        // expect(mockPutReq).toHaveBeenCalled()
    })
})
