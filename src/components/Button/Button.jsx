import React from "react";
import { CircularProgress, Button as MuiButton } from "@material-ui/core";

export default function Button({ loading, children, ...rest }) {
  return (
    <MuiButton {...rest} disabled={loading}>
      {loading ? <CircularProgress size={24} /> : children}
    </MuiButton>
  );
}
