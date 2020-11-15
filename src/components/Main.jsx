import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import TopBar from "components/TopBar";
import Articles from "pages/Articles";
import AddArticle from "pages/AddArticle";
import { PrivateRoute } from "helpers";
import Article from "pages/Article/Article";
import Edit from "pages/Edit";

export default function Main() {
  return (
    <>
      <TopBar />
      <Container maxWidth="md">
        <Switch>
          <Route exact path={["/", "/articles"]} component={Articles} />
          <PrivateRoute exact path="/add" component={AddArticle} />
          <Route exact path={`/articles/:id`} ><Article /></Route>
          <Route exact path={"/articles/edit/:id"} component={Edit} />
          {/* <Route exact path={"/articles/delete/:id"} component={Articles} /> */}
          <Route component={() => <h1>Not Found</h1>} />
        </Switch>
      </Container>
    </>
  );
}
