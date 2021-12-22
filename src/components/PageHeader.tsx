import React, { FC } from 'react'

const PageTitle: FC = ({ children }) => {
    return (
        <h1 className='font-bold text-2xl'>
            {children}
        </h1>
    )
}

const PageHeader: FC = ({ children }) => {
    return (
        <div className='d-flex justify-center mb-3'>
            <PageTitle>
                {children}
            </PageTitle>
        </div>
    )
}

export default PageHeader
