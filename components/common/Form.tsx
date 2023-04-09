import { TextField, Box} from "@mui/material";

type InputProps = {
	required: boolean
	type: string;
	label: string
	placeholder: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

export const Form = (props: InputProps) => {
	return(
		<Box marginBottom={2}>
		<TextField
			required={props.required}
			fullWidth
			type={props.type}
			label={props.label}
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.onChange}
		/>
	  </Box>
	)
}
