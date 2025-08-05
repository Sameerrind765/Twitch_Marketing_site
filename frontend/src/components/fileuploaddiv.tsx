import React, { useEffect, useRef, useState } from 'react';

type Props = {
  fileName?: string | null;
  startUpload: boolean;
  onUploadComplete: (result: { fileName: string; url: string } | null) => void;
};

const FileUploadDiv: React.FC<Props> = ({ fileName, startUpload, onUploadComplete }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [localFileName, setLocalFileName] = useState<string | null>(fileName || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setLocalFileName(selectedFile.name); // Show name as selected
    setError(null);
  };

  useEffect(() => {
    const triggerUpload = async () => {
      if (!startUpload || !file) return;

      setUploading(true);
      setError(null);

      const formData = new FormData();
      const publicId = `payment-confirmation-${Date.now()}`;
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default');
      formData.append('public_id', publicId);

      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dzqtygtxd/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error?.message || 'Upload failed');

        // ✅ Return public_id and url to parent
        onUploadComplete({
          fileName: data.public_id,
          url: data.secure_url
        });
      } catch (err: any) {
        setError(err.message || 'Upload failed');
        onUploadComplete(null);
      } finally {
        setUploading(false);
      }
    };


    triggerUpload();
  }, [startUpload]);

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100 transition"
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleChange}
        accept="image/*"
      />
      <div className="text-gray-600">
        {uploading ? (
          <p className="text-blue-500 text-sm">Uploading...</p>
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : localFileName ? (
          <>
            <p className="text-green-600 font-semibold">{localFileName}</p>
            <p className="text-sm text-gray-500">✅ File selected, ready to upload</p>
          </>
        ) : (
          <>
            <p className="mb-2">Upload payment confirmation</p>
            <p className="text-sm">Click to browse your file</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploadDiv;
