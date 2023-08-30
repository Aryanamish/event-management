import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import API from '../API';
import Popup from '../popup';

const axios = new API.Axios();

export default function OrganiserDialog(props: {
	title: any;
	id: number;
	setApproved: Function;
}) {
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const [accept, setAccept] = React.useState('1');
	const closeDialog = () => {
		setOpen(false);
	};
	const [sPopup, setSpopup] = React.useState(false);
	const [fPopup, setFpopup] = React.useState(false);

	const approveEvent = async (e: any) => {
		let url = 'event:';
		if (accept === '1') {
			url += 'accept';
		} else if (accept === '0') {
			url += 'reject';
		}
		const response = await axios.post(API.get_url(url, props.id), {
			message: messageRef.current?.querySelector('textarea')?.value,
		});
		if (response.status === 200) {
			setOpen(false);
			setSpopup(true);
			setTimeout(() => props.setApproved(true), 5000);
		} else {
			setOpen(false);
			setFpopup(true);
		}
		console.log(response);
	};

	const [loading, setLoading] = React.useState(false);
	const messageRef = React.useRef<HTMLInputElement>(null);

	return (
		<div className="mt-2">
			{sPopup && (
				<Popup.Success message="Action Successful!" showpopup={setSpopup} />
			)}
			{fPopup && (
				<Popup.Error
					message="Action Unsuccessful, try again!"
					showpopup={setSpopup}
				/>
			)}
			<Button
				variant="contained"
				onClick={handleClickOpen}
				style={{backgroundColor: '#1565c0'}}>
				Open Action Panel
			</Button>
			<Dialog open={open} onClose={closeDialog}>
				<DialogTitle>
					Do you want to approve or deny -
					<span className="text-[#007efd] ml-1">{props.title}</span>?
				</DialogTitle>
				<DialogContent>
					<AcceptDeny value={accept} setValue={setAccept} />
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Comments (optional)"
						placeholder="Start typing..."
						fullWidth
						multiline
						maxRows={6}
						variant="filled"
						ref={messageRef}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeDialog} variant="outlined" color="error">
						Cancel
					</Button>
					<LoadingButton
						loadingIndicator="Submitting..."
						onClick={async (e) => {
							// setLoading(true);
							await approveEvent(e);
							setLoading(false);
						}}
						loading={loading}
						className="w-32"
						variant="contained"
						style={!loading ? {backgroundColor: '#1565c0'} : {}}>
						Submit
					</LoadingButton>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export function AcceptDeny(props: {setValue: Function; value: string}) {
	const {value, setValue} = props;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
		console.log((event.target as HTMLInputElement).value);
		//TODO use this bro accept or deny
	};

	return (
		<FormControl>
			<RadioGroup value={value} onChange={handleChange}>
				<FormControlLabel
					value="1"
					style={{fontSize: '100px'}}
					control={<Radio />}
					label={<p className="text-xl text-green-600">Approve</p>}
				/>
				<FormControlLabel
					value="0"
					control={<Radio />}
					label={<p className="text-xl text-red-600">Deny</p>}
				/>
			</RadioGroup>
		</FormControl>
	);
}
