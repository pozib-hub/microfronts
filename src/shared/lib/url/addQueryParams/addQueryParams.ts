
type Params = string | number | boolean | string[] | undefined | null


export function getQueryParams(params: Record<string, Params>) {
    const searchParams = new URLSearchParams(window.location.search)

    for (const key in params) {
        if (!params[key]) {
            searchParams.delete(key)
            continue
        }

        if (Array.isArray(params[key])) {
            params[key].forEach((value) => {
                searchParams.append(key, String(value))
            })
        } else {
            if (params[key]) {
                searchParams.set(key, String(params[key]))
            }
        }

    }

    return `?${searchParams.toString()}`
}

export function addQueryParams(params: Record<string, Params>) {
    window.history.pushState(null, '', getQueryParams(params))
}

export function removeQueryParams(keys: string[]) {

}