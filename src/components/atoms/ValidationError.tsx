import React from 'react'

type ValidationErrorProps = {
    error?: string;
}

const ValidationError: React.VFC<ValidationErrorProps> = ({ error }) => {
    return (
        <span className='inline text-red-500 text-sm font-semibold'>
            {error}
        </span>
    )
}

export default ValidationError