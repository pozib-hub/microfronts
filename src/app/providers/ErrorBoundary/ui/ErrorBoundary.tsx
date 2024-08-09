import React, {
    Component, ErrorInfo, FC, Suspense,
} from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'

import { PageError } from 'widgets/PageError'

interface IProps {
    children?: React.ReactNode
}

interface IState {
    hasError: boolean
}

class ErrorBoundary extends Component<IProps & WithTranslation, IState> {
    constructor(props: IProps & WithTranslation) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo)
    }

    render() {
        const { children, t } = this.props
        const { hasError } = this.state

        if (hasError) {
            // You can render any custom fallback UI
            return (
                <PageError />
            )
        }

        return children
    }
}

const NoSuspendedErrorBoundary = withTranslation()(ErrorBoundary)

const SuspendedErrorBoundary: FC<IProps> = (props: IProps) => (
    <Suspense fallback="">
        <NoSuspendedErrorBoundary {...props} />
    </Suspense>
)

export default SuspendedErrorBoundary
