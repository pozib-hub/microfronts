import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import getCSSModuleLocalIdent from '../utils/getCSSModuleLocalIdent'

export function buildCssLoaders(isDev: boolean) {
    return [
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                            getLocalIdent: isDev ? getCSSModuleLocalIdent : undefined,
                        },
                    },
                },
                'sass-loader',
            ],
        },
        {
            test: /\.less$/i,
            use: [
                // compiles Less to CSS
                "style-loader",
                "css-loader",
                "less-loader",
            ],
        },
    ]
}
