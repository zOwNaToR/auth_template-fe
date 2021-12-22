import React, { ElementType, FC } from 'react'

type ButtonProps = React.ComponentProps<'button'> & {

}
const Button: FC<ButtonProps> = (props) => {
    const color = "cyan";

    return (
        <button
            className={`bg-${color}-500 text-white active:bg-${color}-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150`}
            type='button'
            {...props}
        >
            {props.children}
        </button>
    )
}

export default Button
