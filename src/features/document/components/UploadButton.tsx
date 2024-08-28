import React from 'react';

interface UploadButtonProps {
  onUpload: (files: FileList) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onUpload }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files);
    }
  };

  return (
    <div className="col-lg-3">
      <div className="selection-widget mt-2 mt-lg-0">
        <button type="button" onClick={handleClick} className="btn btn-primary w-100">
          <i className="bi bi-upload upload-icon"></i>
          Upload
        </button>
      </div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        name="file"
        accept="*"
        multiple
      />
    </div>
  );
};

export default UploadButton;