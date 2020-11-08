import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import TopBar from "components/TopBar";
import AddArticle from "pages/AddArticle";
import Articles from "pages/Articles";

export default function Main() {
  return (
    <>
      <TopBar />
      <Container maxWidth="md">
        <Switch>
          <Route exact path={["/", "/articles"]} component={Articles} />
          <Route exact path="/new" component={AddArticle} />
        </Switch>
      </Container>
    </>
  );
}
