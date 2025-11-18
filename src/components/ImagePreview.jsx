const ImagePreview = ({ imageUrl }) => {
    return (
        <>
            <h2>Vista previa:</h2>
            <img src={imageUrl} alt="Vista previa" />
        </>
    )
};
export default ImagePreview;