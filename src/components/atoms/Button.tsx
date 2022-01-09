import { useFormatClassName } from 'hooks/useFormatClassName';
import { ComponentProps, FC } from 'react';

type ButtonProps = ComponentProps<'button'> & {
    color?: string;
    textColor?: string;
}

const Button: FC<ButtonProps> = ({ color, textColor, ...props }) => {
    let [className, otherProps] = useFormatClassName(props, `
        bg-${color} active:bg-${color}/50 text-${textColor}
        font-bold uppercase text-sm px-6 py-3 
        rounded-md shadow hover:shadow-lg outline-none focus:outline-none 
        ease-linear transition-all duration-150
    `, [props.className]);

    return (
        <button
            className={className}
            type='button'
            {...otherProps}
        >
            {props.children}
        </button>
    )
}

Button.defaultProps = {
    color: 'primary',
    textColor: 'secondary',
}

export default Button