import { ActionReducerMapBuilder } from "@reduxjs/toolkit"

const builderReducersByProject = <T>(builder: ActionReducerMapBuilder<T>) => {
    if (__PROJECT__ === "storybook") {
        return
    }

    return builder

}

export default builderReducersByProject