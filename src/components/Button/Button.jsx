import React from "react";
import MuiButton from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Button({ loading = false, children, ...rest }) {
  return (
    <MuiButton {...rest} disabled={loading}>
      {loading ? <CircularProgress size={24} /> : children}
    </MuiButton>
  );
}
