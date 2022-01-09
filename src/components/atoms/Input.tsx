import { useFormatClassName } from 'hooks/useFormatClassName';
import React, { ComponentProps } from 'react';

export type InputProps = ComponentProps<'input'> & {
    label?: string;
    hasError?: boolean;
    fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    let [classNameWrapper, { fullWidth, ...otherProps }] = useFormatClassName(props, `
        ${props.readOnly ? "bg-transparent" : ''}
        ${props.hasError ? "bg-red-600" : ''}
        ${props.fullWidth ? 'w-full' : 'w-56'}
    `, [props.hasError, props.readOnly, props.fullWidth]);

    return (
        <div className={classNameWrapper}>
            {otherProps.label && <label htmlFor={otherProps.name} className='block text-gray-600'>{otherProps.label}</label>}
            <input
                ref={ref}
                className={`w-full rounded-md h-10 py-1 px-2.5 border border-gray-200 focus:outline-none active:outline-none`}
                {...otherProps}
            />
        </div>
    );
});

export default Input