import { useSnackbar } from 'notistack';
import { useCallback, useRef, useState } from 'react';

const maxPayloadSize = 4194304;

export const useFileUpload = () => {
    const { enqueueSnackbar } = useSnackbar();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<File[]>([]);

    /**
     * Имитирует клик по инпуту файлов
     */
    const handleFileInputClick = useCallback(() => {
        fileInputRef.current?.click();
    }, [fileInputRef]);

    /**
     * Сохраняет новые загруженные файлы в массив
     */
    const handleFileUploadChange = useCallback(() => {
        if (fileInputRef.current?.files && fileInputRef.current.files) {
            const files = fileInputRef.current.files;
            const filesSize =
                [...files].reduce((acc, file) => {
                    return acc + file.size;
                }, 0) +
                fileList.reduce((acc, file) => {
                    return acc + file.size;
                }, 0);

            if (filesSize > maxPayloadSize) {
                enqueueSnackbar(`Достигнут максимальный размер вложений (4 МБ)`, {
                    variant: 'error',
                });

                return;
            }

            setFileList([...fileList, ...files]);
        }
    }, [fileList, fileInputRef, enqueueSnackbar]);

    const handleClear = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            setFileList([]);
        }
    }, [fileInputRef]);

    const renderFileInput = () => (
        <input type="file" multiple ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUploadChange} />
    );

    return {
        renderFileInput,
        data: fileList,
        onClick: handleFileInputClick,
        onClear: handleClear,
    };
};
