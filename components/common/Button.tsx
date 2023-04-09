import { Button } from "@mui/material";

type buttonProps = {
	buttonName: string
}
export const FormButton = (props: buttonProps) => {
	return(
		<Button
			fullWidth
			type="submit"
			variant="contained"
			color="primary"
			sx={{ mt: 2 }}
	  	>
			{props.buttonName}
	  	</Button>
	)
}
