import babelRemovePropsPlugin from "../../babel/babelRemovePropsPlugin"
import { BuildOptions } from "../types/config"

interface buildBabelLoaderProps extends BuildOptions {
    isTSX?: boolean
}

export function buildBabelLoader({ isTSX, isDev }: buildBabelLoaderProps) {

    return {
        test: isTSX ? /\.(?:tsx|ts)$/ : /\.(?:js|mjs|cjs|jsx)$/,
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
                    [
                        "@babel/plugin-transform-typescript",
                        {
                            isTSX: isTSX,
                        }
                    ],
                    "@babel/plugin-transform-runtime",
                    isTSX && [
                        babelRemovePropsPlugin,
                        { props: ['data-testid'] }
                    ],
                    isDev && require.resolve("react-refresh/babel")
                ].filter(Boolean),
            },
        },
    }
}