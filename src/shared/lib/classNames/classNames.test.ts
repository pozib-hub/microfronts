import classNames from './classNames'

const mods = { kek: true, lol: false, pop: true }

describe('classNames', () => {
    test('only first param', () => {
        expect(classNames('someClass'))
            .toBe('someClass')
    })

    test('with mods', () => {
        expect(classNames(mods))
            .toBe('kek pop')
    })

    test('with other classes', () => {
        expect(classNames('someClass', 'other1', 'other2', 'other3'))
            .toBe('someClass other1 other2 other3')
    })

    test('started mods and then classes', () => {
        expect(classNames(mods, 'class1', 'class2'))
            .toBe('kek pop class1 class2')
    })

    test('array classes in one param', () => {
        expect(classNames(['other1', 'other2', 'other3']))
            .toBe('other1 other2 other3')
    })

    test('array classes and mods', () => {
        expect(classNames(['other1', 'other2', 'other3'], mods))
            .toBe('other1 other2 other3 kek pop')
    })

    test('empty values', () => {
        const emptyArr = ['', undefined, null]
        const emptyObj = { kek: '', lol: null, pop: undefined } as any
        const arr = ['class3', 'class4']
        expect(classNames(emptyArr, arr, emptyObj, 'class1', '', 'class2'))
            .toBe('class3 class4 class1 class2')
    })
})
