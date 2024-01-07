import React from "react";
import {Controller} from "react-hook-form";
import {getValueFromObject} from "../../utils/basic";
import {DateField} from "@mui/x-date-pickers";
import {ZipCodeTextField} from "./index";
import {TextField} from "@mui/material";
import DateTextField from "./DateTextField";

const ControlledDateField = ({
                                 formProps,
                                 name,
                                 validationKey,
                                 ignoreError = false,
                                 ...otherProps
                             }) => {
    const {
        control,
        formState: {errors},
        rules,
    } = formProps;

    const isError =
        (getValueFromObject(errors, name) !== undefined && !ignoreError) ||
        otherProps.error;

    return (
        <Controller
            name={name}
            control={control}
            disabled={otherProps.disabled}
            rules={
                otherProps.disabled
                    ? {a: () => true}
                    : getValueFromObject(rules, validationKey ?? name)
            }
            render={({field: {onChange, onBlur, value}}) => (
                <DateTextField
                    customInput={TextField}
                    {...otherProps}
                    value={value}
                    error={isError}
                    helperText={
                        !isError
                            ? otherProps.helperText
                            : !ignoreError
                                ? getValueFromObject(errors, name)?.message ??
                                otherProps.helperText
                                : undefined
                    }
                    onChange={(v) => {
                        onChange(v);
                        if (!!otherProps.onChange) {
                            otherProps.onChange(v);
                        }
                    }}
                    onBlur={() => {
                        onBlur();
                        if (!!otherProps.onBlur) {
                            otherProps.onBlur(value);
                        }
                    }}
                />
            )}
        />
    );
};

export default ControlledDateField;
