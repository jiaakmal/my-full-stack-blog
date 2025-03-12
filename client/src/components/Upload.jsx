import { IKContext, IKUpload } from "imagekitio-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const authenticator = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ children, type, setProgress, setData }) => {
  const ref = useRef(null);
  const [preview, setPreview] = useState(null); // State to store image preview URL

  const onError = (err) => {
    console.log(err);
    toast.error("Image upload failed!");
  };
  const onSuccess = (res) => {
    console.log(res);
    setData(res);
    setPreview(res.url); // Set the preview URL to the uploaded image URL
  };
  const onUploadProgress = (progress) => {
    console.log(progress);
    setProgress(Math.round((progress.loaded / progress.total) * 100));
  };

  const handleCancel = () => {
    setPreview(null);
    setData(null);
    ref.current.value = null; // Reset the file input
  };

  const handleEdit = () => {
    ref.current.click(); // Trigger the file input click
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IK_URL_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        className="hidden"
        ref={ref}
        accept={`${type}/*`}
      />
      <div className="cursor-pointer" onClick={() => ref.current.click()}>
        {children}
      </div>
      {preview && (
        <div className="mt-2 flex items-center gap-2">
          <img src={preview} alt="Image Preview" className="w-20 h-20 object-cover rounded-md" />
          <button
            className="px-2 py-1 bg-red-500 text-white rounded-md"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded-md"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      )}
    </IKContext>
  );
};

export default Upload;