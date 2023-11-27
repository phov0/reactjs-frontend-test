import React from "react";
import { NumberFormatBase } from "react-number-format";
import { removeNonDigitsFromString } from "../../utils/basic";

const formatZipCode = (value) => {
	const stripped = removeNonDigitsFromString(value);

	let finalValue = stripped.slice(0, 5);
	if (stripped.length > 5) {
		finalValue += "-" + stripped.slice(5, 8);
	}
	return finalValue;
};

const ZipCodeTextField = React.forwardRef(({ onChange, ...other }, ref) => {
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
			format={formatZipCode}
		/>
	);
});

export default ZipCodeTextField;
