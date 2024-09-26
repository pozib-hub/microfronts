import { ActionReducerMapBuilder } from "@reduxjs/toolkit"

const builderReducersByProject = <T>(builder: ActionReducerMapBuilder<T>) => {
    if (__PROJECT__ === "storybook" || __PROJECT__ === "jest") {
        return
    }

    return builder

}

export default builderReducersByProject