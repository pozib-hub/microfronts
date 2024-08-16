import path from 'path'
import webpack from 'webpack'

export function buildAliases(basePath: string): Record<string, string> {
    return {
        src: basePath,
        entries: path.join(basePath, 'entries'),
        features: path.join(basePath, 'features'),
        widgets: path.join(basePath, 'widgets'),
        shared: path.join(basePath, 'shared'),
        slice: path.join(basePath, 'slice'),
        hooks: path.join(basePath, 'hooks'),
    }
}
