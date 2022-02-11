import { useFormatClassName } from 'hooks/useFormatClassName';
import React, { ComponentProps } from 'react';
import { FOCUS_CLASSNAMES } from 'utils/constants';

export type InputProps = ComponentProps<'input'> & {
    label?: string;
    hasError?: boolean;
    fullWidth?: boolean;
    button?: JSX.Element;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    let [classNameWrapper, { fullWidth, ...otherProps }] = useFormatClassName(props, `
        ${props.readOnly ? "bg-transparent" : ''}
        ${props.hasError ? "bg-red-600" : ''}
        ${props.fullWidth ? 'w-full' : 'w-60'}
    `, [props.hasError, props.readOnly, props.fullWidth]);

    return (
        <div className={classNameWrapper}>
            {otherProps.label && <label htmlFor={otherProps.name} className='w-full inline-block text-gray-600'>{otherProps.label}</label>}
            <input
                ref={ref}
                className={`${FOCUS_CLASSNAMES} w-full rounded-md h-10 py-1 px-2.5 border border-gray-200`}
                {...otherProps}
            />
            {otherProps.button}
        </div>
    );
});

export default Input