import { Button, Grid, IconButton } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import styled from "styled-components";

interface UploadProps {
  list?: string[];
  onChange: (files: string[]) => void;
  [x: string]: any;
}

const Container = styled.div``;

export const Upload = ({ list = [], onChange, ...rest }: UploadProps) => {
  const [files, setFiles] = useState<string[]>(list || []);
  const onDelete = (index: number) => {
    const shallowFiles = files.slice();
    shallowFiles.splice(index, 1);
    onChange(shallowFiles);
    setFiles(shallowFiles);
  };
  const OnChange = (e: any) => {
    e.preventDefault();
    const file = e?.target?.files[0];
    if (file) {
      const newFiles = [URL.createObjectURL(file), ...files];
      onChange(newFiles);
      setFiles(newFiles);
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
      <Button disableRipple variant="contained" component="label">
        <input
          onChange={OnChange}
          hidden
          accept="image/*"
          multiple
          type="file"
          {...rest}
        />
        Attach file
        <AttachFileIcon />
      </Button>
    </Container>
  );
};
