import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ArticleService } from "components/Article";

export default function AddArticle() {
  const [article, setArticle] = React.useState({ title: "", body: "" });

  const handleChange = e => {
    const { name, value } = e.target;
    setArticle(state => ({ ...state, [name]: value }));
  };

  const handleSubmit = () => {
    ArticleService.create(article)
      .then(() => alert("done"))
      .catch(error => console.log(error));
  };

  return (
    <Grid container spacing={2} style={{ marginTop: 16 }}>
      <Grid item xs={12}>
        <TextField
          name="title"
          fullWidth
          variant="outlined"
          label="Title"
          value={article.title}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="body"
          fullWidth
          variant="outlined"
          label="Body"
          multiline
          value={article.body}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
