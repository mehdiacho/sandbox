import React, { useState, useEffect } from 'react';
import "../../styles/allstyles.css";
import { useNavigate } from "react-router-dom";
import FileListCard from "../components/FileListCard";
import SpinnerButton from "../components/SpinnerButton";

const Resizer = () => {
    const sizes = [[48, 48], [72, 72], [96, 96], [144, 144], [192, 192]];

    // States
    useNavigate();
    const [files, setFiles] = useState([]);
    const [processedFiles, setProcessedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadBtn, setUploadBtn] = useState('Resize');
    const [status, setStatus] = useState('visually-hidden');

    // Effects
    useEffect(() => {
        if (files.length) {
            setUploadBtn('Resize');
        } else {
            setUploadBtn('Upload');
        }
    }, [files]);

    // Handlers
    const handleFileSelect = (e) => {
        const selectedFiles = e.target.files;
        const newFiles = Array.from(selectedFiles).map(file => ({
            id: generateId(),
            file: file
        }));
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const handleResize = async () => {
        setLoading(true);
        setStatus('not-visually-hidden');

        const resizedImagesPromises = files.map(async (fileObj) => {
            const resizedResults = await Promise.all(
                sizes.map(([width, height]) => resizeImage(URL.createObjectURL(fileObj.file), width, height))
            );

            return {
                originalFile: fileObj,
                resizedImages: resizedResults
            };
        });

        const resizedImages = await Promise.all(resizedImagesPromises);
        setProcessedFiles(resizedImages);

        setLoading(false);
        setStatus('visually-hidden');
    };

    const resizeImage = async (image, width, height) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {

                    resolve(URL.createObjectURL(blob));
                }, 'image/png');
            };

            img.src = image;
        });
    };

    const generateId = () => {
        return Math.random().toString(36).slice(2);
    };

    const browseFiles = () => {
        const upBtnRef = document.getElementById('upload');
        upBtnRef.click();
    };

    const deleteFile = (fileId) => {
        setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
        setProcessedFiles(prevProcessedFiles => prevProcessedFiles.filter(({ originalFile }) => originalFile.id !== fileId));
    };

    return (
        <div className="container-fluid min-vh-100 p-0 text-bg-primary">
            <div className={`sticky-top row text-bg-dark`}>
                <h1 className={''}>Image Resizer</h1>
            </div>
            <div className="row justify-content-center min-vh-100 lighter-purple m-0 pt-5">
                <div className="col-md-6 ">
                    <div className="card text-bg-light border-0 rounded-4 overflow-hidden ">
                        <div className="card-body d-flex flex-column">
                            <div className="card upload-box dash-rnd overflow-hidden">
                                <div className="card-body d-flex flex-row light-purple justify-content-center"
                                     onClick={browseFiles}
                                     style={{opacity: .95}}>
                                    <button type="button" disabled={true}
                                            className="btn btn-light m-3 ps-4 pe-4"
                                            style={{fontSize: '20px'}}>
                                        +
                                    </button>
                                </div>
                            </div>
                            <input hidden={true} id="upload" type="file" accept="image/*" className="form-control"
                                   onChange={handleFileSelect} multiple={true}/>
                            <SpinnerButton
                                hidden={!files.length}
                                disabled={loading}
                                onClick={handleResize}
                                status={status}
                                text={uploadBtn}
                            />
                            <div className="border-0 text-bg-light">
                                {files.map((file) =>
                                    <FileListCard
                                        key={file.id}
                                        id={file.id}
                                        name={file.file.name}
                                        size={file.file.size}
                                        deleteFile={deleteFile}
                                        disabled={loading}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={'card-footer d-flex flex-column'}>
                            {processedFiles.map(({originalFile, resizedImages}) => (
                                <div key={originalFile.id}>
                                    <h3>{originalFile.file.name}</h3>
                                    {resizedImages.map((src, index) => (
                                        <div key={index}>
                                            <img src={src} alt={`Resized ${sizes[index][0]}x${sizes[index][1]}`}/>
                                            <a href={src}
                                               download={`resized-${sizes[index][0]}x${sizes[index][1]}.png`}>Download</a>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resizer;
