import { FC } from 'react'
import { WithClassName } from 'utils/types'

const CenteredContainer: FC<WithClassName> = ({ children, className }) => {
    return (
        <div className={`flex justify-center ${className ? className : ''}`}>
            {children}
        </div>
    )
}

export default CenteredContainer
