import { Paper, Grid, Avatar, Divider } from "@mui/material";
import React from "react";
import FaceImage from "../assets/images/face.jpeg";

interface CommentsProps {
  items: string[];
}
export const Comments = ({ items }: CommentsProps) => {
  return (
    <Paper style={{ padding: "40px 20px" }}>
      {items.map((item: string, index: number) => (
        <React.Fragment key={index}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" src={FaceImage} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
              <p style={{ textAlign: "left" }}>{item}</p>
            </Grid>
          </Grid>
          {index > items.length && (
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
          )}
        </React.Fragment>
      ))}
    </Paper>
  );
};
