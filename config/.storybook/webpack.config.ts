import path from "path"
import webpack, { RuleSetRule } from "webpack"

import { BuildPaths } from '../build/types/config'
import { buildAliases } from '../build/alias/buildAliases'
import { buildCssLoaders } from '../build/loaders/buildCssLoaders'


export default ({ config }: { config: webpack.Configuration }) => {

    const paths: BuildPaths = {
        build: "",
        html: "",
        entry: "",
        src: path.resolve(__dirname, "..", "..", "src"),
    }

    const rules = [
        // тут мы разворачиваем существующие И исключаем правила для svg
        ...(config.module?.rules || []).map((rule) => {
            if (rule && typeof rule === "object"
                && rule.test instanceof RegExp
                && rule.test.test('.svg')
            ) {
                return { ...rule, exclude: /\.svg$/i }
            }
            return rule
        }),
        {
            test: /\.svg$/,
            use: "@svgr/webpack"
        },
        buildCssLoaders(true),
    ]

    const resolve: webpack.Configuration["resolve"] = {
        modules: [...(config.resolve?.modules || []), paths.src],
        extensions: [...(config.resolve?.extensions || []), '.tsx', '.ts', '.js'],
        alias: {
            ...config.resolve?.alias,
            ...buildAliases(paths.src)
        }
    }

    const plugins = [
        new webpack.DefinePlugin({
            __IS_DEV__: true,
        }),
    ]

    const modifyConfig: webpack.Configuration = {
        ...config,
        resolve: {
            ...config.resolve,
            ...resolve
        },
        module: {
            ...config.module,
            rules: rules
        },
        plugins: [
            ...config.plugins as any,
            ...plugins
        ],
    }

    return modifyConfig
}

// import webpack, { RuleSetRule } from 'webpack';
// import path from 'path';
// import { buildCssLoaders } from '../build/loaders/buildCssLoaders';
// import { BuildPaths } from '../build/types/config';
// import { buildAliases } from '../build/alias/buildAliases'

// export default ({ config }) => {
//     const paths = {
//         build: '',
//         html: '',
//         entry: '',
//         src: path.resolve(__dirname, '..', '..', 'src'),
//     };
//     config.resolve.modules.push(paths.src);
//     config.resolve.extensions.push('.ts', '.tsx');
//     config.resolve.alias = buildAliases(paths.src)

//     // eslint-disable-next-line no-param-reassign
//     config.module.rules = config.module.rules.map((rule) => {
//         if (/svg/.test(rule.test)) {
//             return { ...rule, exclude: /\.svg$/i };
//         }

//         return rule;
//     });

//     config.module.rules.push({
//         test: /\.svg$/,
//         use: ['@svgr/webpack'],
//     });
//     config.module.rules.push(buildCssLoaders(true));

//     return config;
// };
