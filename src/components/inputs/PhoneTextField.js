import React from "react";
import { NumberFormatBase } from "react-number-format";
import { removeNonDigitsFromString } from "../../utils/basic";

const PhoneTextField = React.forwardRef(({ onChange, ...other }, ref) => {
	const formatPhone = (value) => {
		const stripped = removeNonDigitsFromString(value);
		const size = !!stripped ? stripped.length : 0;

		if (size === 0) return "";

		if (size > 10) {
			let finalValue = "(" + stripped.slice(0, 2);
			finalValue += ") " + stripped.slice(2, 7);
			finalValue += "-" + stripped.slice(7, 11);

			return finalValue;
		} else {
			let finalValue = "(" + stripped.slice(0, 2);
			if (stripped.length > 2) {
				finalValue += ") " + stripped.slice(2, 6);
			}
			if (stripped.length > 6) {
				finalValue += "-" + stripped.slice(6);
			}
			return finalValue;
		}
	};

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
			format={formatPhone}
		/>
	);
});

export default PhoneTextField;
