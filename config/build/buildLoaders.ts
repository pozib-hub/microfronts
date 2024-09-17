import webpack from 'webpack'

import { BuildOptions } from './types/config'
import { buildCssLoaders } from './loaders/buildCssLoaders'

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const babelLoader = {
        test: /\.(?:js|mjs|cjs|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [['@babel/preset-env', { targets: 'defaults' }]],
                plugins: [
                    [
                        'i18next-extract',
                        {
                            locales: ['ru', 'en'],
                            // keyAsDefaultValue: true,
                        },
                    ],
                    isDev && require.resolve("react-refresh/babel")
                ].filter(Boolean),
            },
        },
    }

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff)$/i,
        use: ['file-loader'],
    }

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
        // exclude: /node_modules/,
    }

    const cssLoaders = buildCssLoaders(isDev)

    // Если не используем тайпскрипт - нужен babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    return [fileLoader, svgLoader, babelLoader, typescriptLoader, ...cssLoaders]
}
