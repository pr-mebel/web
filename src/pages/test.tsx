import React, { FC } from 'react';
import axios from 'axios';

export interface IProps {
    acceptedFileTypes?: string;
    allowMultipleFiles?: boolean;
    label: string;
    onChange: (formData: FormData) => void;
    uploadFileName: string;
}

export const UiFileInputButton: React.FC<IProps> = (props) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const formRef = React.useRef<HTMLFormElement | null>(null);
    const onClickHandler = () => {
        fileInputRef.current?.click();
    };
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) {
            return;
        }
        const formData = new FormData();
        formData.append('name', 'name');
        formData.append('tel', 'tel');
        formData.append('email', 'email@server.com');
        formData.append('description', 'description');
        Array.from(event.target.files).forEach((file) => {
            formData.append(event.target.name, file);
        });
        props.onChange(formData);
        formRef.current?.reset();
    };
    return (
        <form ref={formRef} style={{ marginTop: 100 }}>
            <button type="button" onClick={onClickHandler}>
                {props.label}
            </button>
            <input
                accept={props.acceptedFileTypes}
                multiple={props.allowMultipleFiles}
                name={props.uploadFileName}
                onChange={onChangeHandler}
                ref={fileInputRef}
                style={{ display: 'none' }}
                type="file"
            />
        </form>
    );
};

UiFileInputButton.defaultProps = {
    acceptedFileTypes: '',
    allowMultipleFiles: false,
};

const Test: FC = () => {
    const onChange = async (formData: FormData) => {
        const response = await axios.post('/api/send-email-v2', formData, {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: (event) => {
                console.log(
                    `Current progress:`,
                    Math.round((event.loaded * 100) / event.total)
                );
            },
        });
        console.log('response', response.data);
    };
    return (
        <UiFileInputButton
            label="Upload Single File"
            allowMultipleFiles
            uploadFileName="theFiles"
            onChange={onChange}
        />
    );
};

export default Test;
