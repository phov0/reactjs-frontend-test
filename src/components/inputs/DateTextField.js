import React, {useEffect} from "react";
import { NumberFormatBase } from "react-number-format";
import { removeNonDigitsFromString } from "../../utils/basic";

const formatDate = (value) => {
    const stripped = removeNonDigitsFromString(value);
    const dia = stripped.slice(0, 2);
    const mes = stripped.slice(2, 4);
    const ano = stripped.slice(4, 8);

    let text = stripped.length <= 2  ? stripped :  stripped.length <= 4 ? `${dia}/${mes}` : `${dia}/${mes}/${ano}`

    return text;
};

const DateTextField = React.forwardRef(({ onChange, ...other }, ref) => {

    return (
        <NumberFormatBase
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        value: values.formattedValue,
                    },
                });
            }}
            format={formatDate}
        />
    );
});

export default DateTextField;
