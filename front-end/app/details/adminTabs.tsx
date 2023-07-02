'use client';
import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabsContainer from '@mui/material/Tabs';
import Applications from './applications';
import {InterfaceParticipant} from '../datainterface';
import TextField from '@mui/material/TextField/TextField';
import Timeline from '../profile/timeline';
import {Button} from '@mui/material';
import Link from 'next/link';
import LoadingButton from '@mui/lab/LoadingButton';
import API from '../API';
import {FileUploader} from 'react-drag-drop-files';

const axios = new API.Axios();

function TabPanel(props: any) {
	const {children, value, index, ...other} = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}>
			{value === index && (
				<div className="flex flex-col w-full items-start justify-center">
					{children}
				</div>
			)}
		</div>
	);
}

export default function AdminTabs(props: {
	showSuccessPopup: Function;
	showFailurePopup: Function;
	isOrganizer: boolean;
	participant: InterfaceParticipant[];
	fcfs: boolean;
	eventId: number;
	href: string;
	title: any;
	sPopUp: {show: Function; message: Function};
	fPopUp: {show: Function; message: Function};
}) {
	const [value, setValue] = React.useState(0);
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const [isDeleting, setIsDeleting] = React.useState(false);
	const [deleteVal, setDeleteVal] = React.useState('');
	//TODO fetch timeline
	function deleteEvent() {
		setIsDeleting(true);
		//TODO delete event here after deleting throw him to home page
	}

	const reportUpload = async (file: File) => {
		try {
			const response = await axios.post(
				API.get_url('event:upload_report', props.eventId),
				{file: file},
				{
					'Content-Type': 'multipart/form-data',
				}
			);
			props.sPopUp.show(true);
			props.sPopUp.message('File Uploaded Successfully');
			console.log('File uploaded successfully:', response.data);
		} catch (error) {
			props.fPopUp.show(true);
			props.fPopUp.message('Error uploading file');
			console.error(error);
		}
	};
	return (
		<div className="flex flex-col w-full sm:items-center">
			<TabsContainer
				value={value}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons={true}
				allowScrollButtonsMobile
				aria-label="scrollable auto tabs example">
				<Tab
					label={
						<div className="flex flex-col md:flex-row md:gap-2 justify-center items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<h1 className="text-lg sm:text-xl" style={{textTransform: 'none'}}>
								Timeline
							</h1>
						</div>
					}
				/>
				<Tab
					label={
						<div className="flex flex-col md:flex-row md:gap-2 justify-center items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
								/>
							</svg>
							<h1 className="text-lg sm:text-xl" style={{textTransform: 'none'}}>
								Applications
							</h1>
						</div>
					}
				/>
				<Tab
					label={
						<div className="flex flex-col md:flex-row md:gap-2 justify-center items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
								/>
							</svg>
							<h1 className="text-lg sm:text-xl" style={{textTransform: 'none'}}>
								Event Actions
							</h1>
						</div>
					}
				/>
				<Tab
					label={
						<div className="flex flex-col md:flex-row md:gap-2 justify-center items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
								/>
							</svg>
							<h1 className="text-lg sm:text-xl" style={{textTransform: 'none'}}>
								Upload Report
							</h1>
						</div>
					}
				/>
			</TabsContainer>
			<div className="w-full pt-3 border-t border-gray-300">
				<TabPanel value={value} index={0} className="px-5 pt-8 w-full pb-5">
					<Timeline current={6} failed={6} failedLabel={'Hello'}></Timeline>
				</TabPanel>
				<TabPanel value={value} index={2} className="px-5 pt-2 w-full pb-5">
					<div className="flex flex-col p-4 w-full rounded-md border bg-blue-50 border-blue-300">
						<div className="flex w-full h-auto p-2 bg-white rounded-md my-4 border">
							<ol className="space-y-1 text-gray-500 list-decimal list-inside">
								<li>
									To edit (or) update your event, click on the
									<span className="font-semibold text-gray-900 ml-1">
										EDIT / UPDATE EVENT
									</span>{' '}
									button.
								</li>
								<li>
									Changes will be reflected
									<span className="font-semibold text-gray-900 ml-1">
										immediately
									</span>{' '}
									on both student and admin views, after saving.
								</li>
								<li>
									Unsaved changes will be
									<span className="font-semibold text-gray-900 ml-1">
										discarded.
									</span>
								</li>
							</ol>
						</div>
						<Link href={props.href}>
							<Button
								variant="contained"
								style={{backgroundColor: '#1565c0'}}
								className="w-72">
								Edit / Update Event
							</Button>
						</Link>
					</div>
					<div className="flex flex-col p-4 w-full rounded-md mt-3 border bg-red-50 border-red-300">
						<div className="flex w-full h-auto p-2 bg-white rounded-md my-4 border">
							<ol className="space-y-1 text-gray-500 list-decimal list-inside">
								<li>
									This will
									<span className="font-semibold text-gray-900 mx-1">DELETE</span>
									the event from the event management system for all students and
									administrators.
								</li>
								<li>
									This action cannot be
									<span className="font-semibold text-gray-900 ml-1">
										undone.
									</span>{' '}
								</li>
								<li>
									To delete your event, please type
									<span className="font-semibold text-gray-900 ml-1 select-none">
										"{props.title}"
									</span>{' '}
									in the textbox provided below.
								</li>
							</ol>
						</div>
						<TextField
							label="Event's Name Here"
							value={deleteVal}
							autoComplete="off"
							sx={{
								'color': '#c62828',
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: '#c62828',
								},
							}}
							color="error"
							onChange={(e) => setDeleteVal(e.target.value)}
							helperText="This field is Case-Sensitive."
							style={{marginBottom: '1rem'}}
						/>
						<LoadingButton
							loadingIndicator="Deleting…"
							variant="contained"
							className="w-72"
							disabled={deleteVal !== props.title}
							onClick={deleteEvent}
							loading={isDeleting}
							style={
								!isDeleting && deleteVal === props.title
									? {backgroundColor: '#c62828'}
									: {}
							}>
							<span>Delete Event</span>
						</LoadingButton>
					</div>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<div className="flex flex-col w-full gap-3 items-center">
						<div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-3 w-11/12 bg-blue-50 p-4 rounded-md border">
							<p className="text-lg text-[#014361]">
								Click to view and download all accepted applicants.
							</p>
							<Link href="/applicants" target="_blank">
								<Button
									variant="contained"
									style={{backgroundColor: '#1565c0'}}
									className="w-72">
									Accepted Applicants
								</Button>
							</Link>
						</div>
						{!props.fcfs && (
							<Applications
								applications={props.participant}
								showSuccessPopup={props.showSuccessPopup}
								showFailurePopup={props.showFailurePopup}
								eventId={props.eventId}
							/>
						)}
					</div>
				</TabPanel>
				<TabPanel value={value} index={3}>
					<div className="w-full h-full flex justify-center items-center">
						<FileUploader
							className="helppe"
							multiple={false}
							handleChange={reportUpload}
							name="file"
							label="Drag Your File Here"
							hoverTitle="Upload Report"
							types={['PDF']}
							onTypeError={(err: any) => {
								props.fPopUp.show(true);
								props.fPopUp.message('Only PDFs are allowed');
								console.error(err);
							}}
							maxSize={10}
							onSizeError={(err: any) => {
								props.fPopUp.show(true);
								props.fPopUp.message('File cannot be more than 10 MB');
							}}
						/>
					</div>
				</TabPanel>
			</div>
		</div>
	);
}
