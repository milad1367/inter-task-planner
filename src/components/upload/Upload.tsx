import { Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface UploadProps {
  list?: string[];
  onChange: (files: string[]) => void;
}
export const Upload = ({ list = [], onChange }: UploadProps) => {
  const [files, setFiles] = useState<string[]>(list || []);
  const onDelete = (index: number) => {
    const shallowFiles = files.slice();
    shallowFiles.splice(index, 1);
    setFiles(shallowFiles);
  };
  useEffect(() => {
    onChange(files);
    console.log("deleter");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(files)]);
  const OnChange = (e: any) => {
    e.preventDefault();
    const file = e?.target?.files[0];
    if (file) {
      setFiles((prev: any) => [URL.createObjectURL(file), ...prev]);
    }
  };

  return (
    <>
      {files.map((file: string, index: number) => (
        <div key={index}>
          <img width={200} height={200} alt={`img${index}`} src={file} />
          <IconButton onClick={() => onDelete(index)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
      <Button variant="contained" component="label">
        Upload
        <input
          onChange={OnChange}
          hidden
          accept="image/*"
          multiple
          type="file"
        />
      </Button>
    </>
  );
};
