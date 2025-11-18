import { useState } from "react";
import ImagePreview from "../components/ImagePreview";
import InputFile from "../components/InputFile";

function PageFile() {

    const [imageUrl, setImageUrl] = useState(null);

    const handleImageUpload = (file) => {
        const url = file !== null ? URL.createObjectURL(file) : null;
        setImageUrl(url);
    };

    return (
        <>
            <InputFile handleFileUpload={handleImageUpload} />
            {imageUrl && <ImagePreview imageUrl={imageUrl} />}
        </>
    )
}

export default PageFile;