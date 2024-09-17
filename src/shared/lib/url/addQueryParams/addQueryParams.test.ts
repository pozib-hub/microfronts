import { getQueryParams } from "./addQueryParams"

describe("addQueryParams.ts", () => {
    test('test with one param', () => {
        const params = getQueryParams({
            test: "kek"
        })

        expect(params).toBe("?test=kek")
    })

    test('test with multi param', () => {
        const params = getQueryParams({
            test: "kek",
            test2: "kek2",
            test3: "kek3",
        })

        expect(params).toBe("?test=kek&test2=kek2&test3=kek3")
    })

    test('test with one undefine param', () => {
        const params = getQueryParams({
            test: "kek",
            test2: undefined,
        })

        expect(params).toBe("?test=kek")
    })

    test('test with one array param', () => {
        const params = getQueryParams({
            test: "kek",
            test2: ["lol", "lol2"],
        })

        expect(params).toBe("?test=kek&test2=lol&test2=lol2")
    })
})