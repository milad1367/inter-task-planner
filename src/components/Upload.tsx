import { Button, Grid, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import styled from "styled-components";

interface UploadProps {
  list?: string[];
  onChange: (files: string[]) => void;
}

const Container = styled.div``;

export const Upload = ({ list = [], onChange }: UploadProps) => {
  const [files, setFiles] = useState<string[]>(list || []);
  const onDelete = (index: number) => {
    const shallowFiles = files.slice();
    shallowFiles.splice(index, 1);
    setFiles(shallowFiles);
  };
  useEffect(() => {
    onChange(files);
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
    <Container>
      <Grid spacing={1} container>
        {files.map((file: string, index: number) => (
          <Grid item key={index}>
            <img width={50} height={50} alt={`img${index}`} src={file} />
            <Grid
              justifyContent={"center"}
              display={"flex"}
              alignItems={"center"}
            >
              <IconButton onClick={() => onDelete(index)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" component="label">
        <input
          onChange={OnChange}
          hidden
          accept="image/*"
          multiple
          type="file"
        />
        Attach file
        <AttachFileIcon />
      </Button>
    </Container>
  );
};
