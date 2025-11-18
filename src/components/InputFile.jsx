const InputFile = ({ handleFileUpload }) => {
    const handleFileChange = (e) => {
        if (e.target.value === '') {
            handleFileUpload(null);
        } else {
            const fileType = e.target.files[0].type;
            if (fileType.startsWith('image/')) {
                handleFileUpload(e.target.files[0]);
            } else {
                window.alert('Por favor, seleccione un archivo de tipo imagen');
                e.target.value = '';
                handleFileUpload(null);
            }
        }
    };

    return (
        <input
            type="file"
            name="image"
            id="imageInput"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-400
        file:mr-4 file:py-2.5 file:px-5
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-emerald-600 file:text-white
        hover:file:bg-emerald-700
        active:file:bg-emerald-800
        file:cursor-pointer cursor-pointer
        file:transition-colors file:duration-150"
        />
    );
};

export default InputFile;