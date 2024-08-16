import React, {useState, useEffect} from 'react';
import "../../styles/allstyles.css"
import { useNavigate } from "react-router-dom";
import FileListCard from "../components/FileListCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import SpinnerButton from "../components/SpinnerButton";
import NotificationToast from "../components/NotificationToast";

const Resizer = () => {
    const [inputImage, setInputImage] = useState(null);
    const [outputDirectory, setOutputDirectory] = useState('');
    const [resizedImages, setResizedImages] = useState([]);

    //outsrc
    const page ='upload'
    const navigate = useNavigate()
    const [files, setFiles] = useState([])
    const [progress, setProgress] = useState(0)
    const [uploadReady, setUploadReady] = useState(true)
    const [loading, setLoading] = useState(false)
    const [uploadBtn, setUploadBtn] = useState('Upload')
    const [status, setStatus] = useState('visually-hidden')
    const [message, setMessage] = useState('')
    const [bg, setBg] = useState('')
    const [toast, setToast] = useState('hide')

    const sizes = [[48, 48], [72, 72], [96, 96], [144, 144], [192, 192]];

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setInputImage(URL.createObjectURL(file));
        }
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

    const handleResize = async () => {
        if (!inputImage) {
            alert('Please select an image first.');
            return;
        }

        const resizedResults = await Promise.all(
            sizes.map(([width, height]) => resizeImage(inputImage, width, height))
        );

        setResizedImages(resizedResults);
    };

    //outsrc
    useEffect(() => {
        // Start listening for changes in file holder state
        if (files.length) {
            setUploadReady(false)
        } else {
            setUploadReady(true)
        }

    }, [files]);

    const handleFileSelect = (e) => {
        const selectedFiles = e.target.files;
        const newFiles = Array.from(selectedFiles).map(file => ({
            id: generateId(), // Generate ID for the file
            file: file
        }));
        setFiles(prevFiles => [...prevFiles, ...newFiles]); // Add new files to the existing array
    };
    const handleUpload = (e) => {
        e.preventDefault();

        //const files = e.target.files;
        try {

            //uploadDoc()
        }catch (e){
            console.log(e.message)
        }

    };
    const cleanFileName = (originalName) => {
        // Remove special characters like "-" and "_" and replace with spaces
        // Trim any leading or trailing whitespaces
        return (originalName.replace(/[-_]/g, ' ')).trim();
    };
    /*const uploadDoc = () => {

        if (!files) {
            return;
        }

        const url = `https://policymaking-api.azurewebsites.net/ingest`;
        console.log(url)

        try {
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('file', file.file);
            });
            console.log('formData:', formData);
            // Print all file names in the formData before uploading
            for (let pair of formData.entries()) {
                console.log(pair[1].name);
            }
            const confirmUpload = window.confirm('Do you want to upload the selected files?');
            if (!confirmUpload) {
                return;
            }
            setStatus('not-visually-hidden')
            setUploadBtn('Uploading...')
            setLoading(true)
            setToast('hide')
            fetch(url, {
                method: 'POST',
                body: formData

            })
                .then((response) => response.json())
                .then(async (data) => {
                    console.log(data);
                    //const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
                    //let totalUploadedBytes = 0;
                    const filePromises = files.map(file => {
                        const cleanedFileName = cleanFileName(file.file.name);
                        /!*const metadata = {
                            contentType: 'application/pdf',
                            name: file.name,
                            size: file.size,
                            created: file.creationTimestamp,
                            updated: file.lastModified
                        };*!/
                        const docRef = ref(storage, `documents/${cleanedFileName}`);
                        // Upload the file and metadata
                        //const uploadTask = uploadBytesResumable(docRef, file)

                        //code to calculate and print percentage of download complete and status. the code is not fully functional
                        /!*uploadTask.on('state_changed',
                            (snapshot) => {
                                // Observe state change events such as progress, pause, and resume
                                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                totalUploadedBytes = snapshot.bytesTransferred;
                                const combinedPercent = (totalUploadedBytes / totalBytes) * 100;
                                setProgress(Math.floor(combinedPercent));
                                console.log('Upload is ' + combinedPercent + '% done');

                                switch (snapshot.state) {
                                    case 'paused':
                                        console.log('Upload is paused');
                                        break;
                                    case 'running':
                                        console.log('Upload is running');
                                        break;
                                    default:
                                    //do nothing
                                }
                            },
                            (error) => {
                                // Handle unsuccessful uploads
                                console.log('line 145')
                            },
                            () => {
                                console.log('uploads successful')
                                // Handle successful uploads on complete
                                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                    console.log('File available at', downloadURL);
                                });
                            }
                        );*!/
                        //return uploadTask
                        return uploadBytesResumable(docRef, file.file)
                    })

                    await Promise.all(filePromises)
                    setFiles([])
                    setProgress(0)
                    document.getElementById('upload').value = '';
                    setStatus('visually-hidden')
                    setUploadBtn('Upload')
                    setBg('success')
                    setMessage('Upload Successful')
                    setToast('show')
                    setUploadReady(true)
                    setLoading(false)
                });


        } catch (e) {
            //console.error(e)
            setStatus('visually-hidden')
            setUploadBtn('Upload')
            setBg('danger')
            setMessage('Upload Failed, Try again!')
            setToast('show')
            setUploadReady(true)
            setLoading(false)
        }


    };*/
    const generateId = () => {
        return Math.random().toString(36).slice(2);
    };
    const browseFiles = () => {
        const upBtnRef = document.getElementById('upload')
        upBtnRef.click()
    };
    const deleteFile = (fileId) => {
        setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    };


    return (
        <div className={"container-fluid min-vh-100 text-bg-primary d-flex flex-column"}>
            <div className="row justify-content-center min-vh-100 lighter-purple">
                <div className="col-md-7 pt-5">
                    <div className="card text-bg-light border-0  rounded-4 overflow-hidden">

                        <div className="card-body d-flex flex-column">
                            <div className="card upload-box dash-rnd overflow-hidden ">

                                <div className="card-body  d-flex flex-row light-purple justify-content-center"
                                     style={{opacity: .95}}>

                                    <button type={"button"} onClick={browseFiles}
                                            className="btn btn-light border border-dark-subtle m-3 border-white"
                                            style={{fontSize: '20px'}}>+
                                    </button>
                                </div>
                            </div>
                            {/*<label className="form-label" style={{fontSize: '15px', opacity: .8}}>Upload multiple
                                files</label>
                            <div className="card upload-box border border-dark">
                                <div
                                    className="card-body rounded-1 d-flex flex-row text-bg-secondary justify-content-between"
                                    style={{opacity: .95}}>
                                    <div className="upload-guide align-items-center d-flex">
                                        <FontAwesomeIcon icon={faCloudArrowUp} size="2xl" style={{color: "#0d6efd",}}/>
                                        <div className="upload-guide-info ms-3">
                                            <p className={'fw-semibold mb-0'}>Drag and drop files here</p>
                                            <p className={'mb-0'} style={{opacity: .8}}>Limit 2MB per file • PDF</p>
                                            <div className="text-white" style={{opacity: .5}}>This is 50% opacity
                                            primary text
                                        </div>
                                        </div>
                                    </div>
                                    <button type={"button"} onClick={browseFiles}
                                            className="btn btn-dark border border-dark-subtle m-3 border-white"
                                            style={{fontSize: '20px'}}>Browse files
                                    </button>
                                </div>
                            </div>*/}
                            <div className={'card-text placeholder-glow pt-3'} hidden={true}>
                                <span className="placeholder col-3 rounded-1"></span>
                                <span className="placeholder col-12 rounded-1"></span>
                                <span className="placeholder col-12 rounded-1"></span>
                                <span className="placeholder col-12 rounded-1"></span>
                            </div>
                            <input hidden={true} id="upload" type="file" accept=".pdf" className="form-control"
                                   onChange={handleFileSelect} multiple/>
                            <SpinnerButton
                                hidden={uploadReady}
                                disabled={loading}
                                onClick={handleUpload}
                                status={status}
                                text={uploadBtn}
                            />
                        </div>
                        <div className="card-footer border-0 text-bg-light">

                            {files.map((file, index) =>

                                <FileListCard
                                    key={file.id} // Use the generated ID as the key
                                    id={file.id}
                                    name={cleanFileName(file.file.name)}
                                    size={file.file.size}
                                    deleteFile={deleteFile}
                                    disabled={loading}
                                    //percent={progress}
                                    //height={5}
                                    bg={'text-bg-info'}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <NotificationToast
                bg={bg}
                show={toast}
                message={message}
            />
        </div>
        /*<div>
        <h1>Image Resizer</h1>
        <input type="file" accept="image/*" onChange={handleImageUpload} className={``}/>
        <button onClick={handleResize}>Start Resizing</button>

        <div>
            {resizedImages.map((src, index) => (
                <div key={index}>
                    <img src={src} alt={`Resized ${sizes[index][0]}x${sizes[index][1]}`}/>
                    <a href={src} download={`resized-${sizes[index][0]}x${sizes[index][1]}.png`}>Download</a>
                </div>
            ))}
        </div>
    </div>*/
)
    ;
};

export default Resizer;
