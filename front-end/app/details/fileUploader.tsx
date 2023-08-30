import LoadingButton from '@mui/lab/LoadingButton';
import React, {useRef, useState} from 'react';
import API from '../API';
import Popup from '../popup';

interface FileUploaderProps {
	accepted_files: string;
	handleUpload: Function;
	path?: string;
	setPath?: Function;
	fileSizeBytes: number;
	handleDelete: Function;
	text?: string;
}

const axios = new API.Axios();
const getFileNameFromUrl = (url: string): string => {
	const path = url.split('/');
	return path[path.length - 1];
};

function convertKBToWords(kilobytes: number) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let index = 0;
	let size = kilobytes;

	while (size >= 1024 && index < units.length - 1) {
		size /= 1024;
		index++;
	}

	return `${size.toFixed(2)} ${units[index]}`;
}

const FileUploader: React.FC<FileUploaderProps> = (props: FileUploaderProps) => {
	const fileSize = props.fileSizeBytes;
	const accepted_files = props.accepted_files;

	const path = props.path;
	const setPath = props.setPath || function () {};

	const [isDragOver, setIsDragOver] = useState(false);
	const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const [showErrorPopup, setShowErrorPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState('');
	const [dragText, setDragText] = useState(
		props.text || 'Drag and drop (or) click here to upload file'
	);
	const [fileUploaded, setFileUploaded] = useState(!!path);
	const [uploading, setUploading] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [uploadedFileName, setUploadedFileName] = useState(
		getFileNameFromUrl(path || '')
	);
	const allowedFileTypes = {
		// pdf: ['application/pdf'],
		// zip: ['application/x-zip-compressed', '.rar'],
		// image: ['image/jpeg', 'image/png'],
	};

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragOver(true);
		setDragText('Drop your file here...');
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragOver(false);
		setDragText(props.text || 'Drag and drop (or) click here to upload file');
	};

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragOver(false);

		const files = e.dataTransfer.files;

		if (files.length > 0) {
			const file = files[0];
			if (file.size > fileSize) {
				setPopupMessage(`File size exceeds ${convertKBToWords(fileSize)} limit.`);
				setShowErrorPopup(true);
			} else if (accepted_files.match(file.type) === null) {
				setPopupMessage(`Only ${accepted_files} files are allowed!`);
				setShowErrorPopup(true);
			} else {
				await fileUpload(file);
			}
		}

		setDragText(props.text || 'Drag and drop (or) click here to upload file');
	};

	const fileUpload = async (file: File) => {
		try {
			setUploading(true);
			const formData = new FormData();
			formData.append('file', file);
			const response = await props.handleUpload(formData);
			console.log(response);
			if (response.data.link) {
				setPath(response.data.link);
				setFileUploaded(true);
				setUploadedFileName(file.name);
			}
			setPopupMessage('File Uploaded Successfully!');
			setShowSuccessPopup(true);
			setUploading(false);
			// console.log('File uploaded successfully:', response.data);
		} catch (error: any) {
			if (error.response.data?.detail) {
				setPopupMessage(error.response.data.detail);
			} else {
				setPopupMessage('Error Uploading File!!');
			}
			setShowErrorPopup(true);
			setUploading(false);
			console.error(error);
		}
	};

	const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		console.log(file?.type);
		if (file) {
			if (file.size > fileSize) {
				setPopupMessage(`File size exceeds ${convertKBToWords(fileSize)} limit.`);
				setShowErrorPopup(true);
			} else if (accepted_files.match(file.type) === null) {
				setPopupMessage(`Only ${accepted_files} files are allowed!`);
				setShowErrorPopup(true);
			} else {
				await fileUpload(file);
			}
		}
	};

	const deleteUploadedFile = async () => {
		setFileUploaded(false);
		setUploadedFileName('');
		setDeleting(false);
		const response = await props.handleDelete();
		if (response.status === 200) {
			setPopupMessage(`Report Deleted!!`);
			setShowSuccessPopup(true);
		}
		console.log(response);
	};

	const openFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};
	return (
		<>
			<div
				className={`flex flex-col hover:bg-gray-100 transition-all duration-500 justify-center cursor-pointer items-center w-full mx-3 h-64 border border-1 border-gray-400 rounded-md ${
					isDragOver ? 'border-[#1976d2] bg-blue-50' : ''
				} ${
					uploading ? 'bg-gradient-to-t from-blue-50 to-white animate-pulse' : ''
				}`}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				onClick={openFileInput}>
				{fileUploaded ? (
					<div className="flex flex-col items-center w-full gap-3 p-4">
						<a href={path} target="_blank" className="hover:text-blue-800 underline">
							<p className="text-xl text-center w-80 truncate">{uploadedFileName}</p>
						</a>
						<LoadingButton
							size="large"
							color="error"
							onClick={() => {
								deleteUploadedFile();
							}}
							loading={deleting}
							loadingIndicator="Deleting..."
							variant="outlined">
							<span>Delete File</span>
						</LoadingButton>
					</div>
				) : (
					<React.Fragment>
						<input
							type="file"
							accept={accepted_files}
							className="hidden"
							ref={fileInputRef}
							onChange={handleFileInputChange}
							disabled={uploading}
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className={`w-10 h-10 transition-all duration-700 text-[#1976d2] ${
								isDragOver ? 'scale-150 ' : ''
							} ${uploading ? 'animate-ping mb-2' : ''}`}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
							/>
						</svg>
						{uploading ? (
							<p className="p-4 text-2xl text-center">
								Just a moment, uploading your file...
							</p>
						) : (
							<p className="p-4 text-2xl text-center">{dragText}</p>
						)}
					</React.Fragment>
				)}
				{showSuccessPopup && (
					<Popup.Success message={popupMessage} showpopup={setShowSuccessPopup} />
				)}
				{showErrorPopup && (
					<Popup.Error message={popupMessage} showpopup={setShowErrorPopup} />
				)}
			</div>
		</>
	);
};

export default FileUploader;
