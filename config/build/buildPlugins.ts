import webpack from 'webpack'
import Dotenv from 'dotenv-webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import CopyPlugin from "copy-webpack-plugin"
import CircularDependencyPlugin from "circular-dependency-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"

import { BuildOptions } from './types/config'

export function buildPlugins({
    paths,
    isDev,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new HTMLWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
            __IS_DEV__: JSON.stringify(isDev),
            __PROJECT__: JSON.stringify("frontend"),
        }),
        new Dotenv(),
        new webpack.ProvidePlugin({}),
        new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },
            ],
        }),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules/,
            // include specific files based on a RegExp
            // include: /dir/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // allow import cycles that include an asyncronous import,
            // e.g. via import(/* webpackMode: "weak" */ './file.js')
            // allowAsyncCycles: false,
            // // set the current working directory for displaying module paths
            // cwd: process.cwd(),
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: "write-references"
            },
        })
    ]

    if (isDev) {
        const dev_plugins = [
            new ReactRefreshWebpackPlugin(),
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
            }),
        ]

        plugins.push(...dev_plugins)
    }

    return plugins
}
