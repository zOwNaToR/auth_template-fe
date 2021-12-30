import { useState } from "react";

type UseSameValueStatesParams<T> = {
    firstFieldInitalState: T;
    secondFieldInitalState: T;
}
const useSameValueStates = <T>(firstFieldInitalState: T, secondFieldInitalState: T) => {
    const [firstField, setFirstField] = useState(firstFieldInitalState);
    const [secondField, setSecondField] = useState(secondFieldInitalState);

    const checkValues = () => firstField === secondField;

    return [
        [firstField, setFirstField],
        [secondField, setSecondField],
        checkValues
    ] as [
            [T, React.Dispatch<React.SetStateAction<T>>],
            [T, React.Dispatch<React.SetStateAction<T>>],
            () => boolean
        ];
}

export default useSameValueStates;