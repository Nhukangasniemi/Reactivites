import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon, Header } from "semantic-ui-react";

interface IProps {
  setFiles: (files: object[]) => void;
}
const dropZoneStyles = {
  border: "dashed 3px",
  borderColor: "#eee",
  borderRadius: "5px",
  paddingTop: "30px",
  textAlign: "center" as "center",
  height: "200px"
};

const dropzoneActive = {
  borderColor: "green"
};

const PhotoWidgetDropZone: React.FC<IProps> = ({ setFiles }) => {
  const onDrop = useCallback(acceptedFiles => {
    setFiles(
      acceptedFiles.map((file: Object) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive ? { ...dropZoneStyles, ...dropzoneActive } : dropZoneStyles
      }
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      <Icon name="upload" size="huge"/>
      <Header content="Drop image here " />
    </div>
  );
};

export default PhotoWidgetDropZone;
