import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import getCSSModuleLocalIdent from '../utils/getCSSModuleLocalIdent'

export function buildCssLoaders(isDev: boolean) {
    return {
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
    }
}
