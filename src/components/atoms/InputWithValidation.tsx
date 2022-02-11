import { useFormatClassName } from 'hooks/useFormatClassName';
import React from 'react';
import { FieldError } from 'react-hook-form';
import Input, { InputProps } from './Input';
import ValidationError from './ValidationError';

type InputWithValidationProps = InputProps & {
    error?: FieldError;
    required?: boolean;
}

const InputWithValidation = React.forwardRef<HTMLInputElement, InputWithValidationProps>((props, ref) => {
    let [classNameWrapper, { error, required, ...otherProps }] = useFormatClassName(props, `
        ${props.fullWidth ? 'w-full' : 'w-60'} 
    `, [props.fullWidth]);


    if (required) otherProps.label += "*"; 
    
    return (
        <div className={classNameWrapper}>
            <Input {...otherProps} ref={ref} fullWidth />
            {props.error && <ValidationError error={props.error.message} />}
        </div>
    );
})


export default InputWithValidation
