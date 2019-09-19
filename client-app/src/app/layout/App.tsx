import React, {
  useEffect,
  Fragment,
  useContext
} from "react";
import "./styles.css";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashboard";
import "../api/agent";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import HomePage from './../../features/home/HomePage';
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [ActivityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities..." />;
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/activities' component={ActivityDashBoard} />
        <Route path='/activities/:id' component={ActivityDetails} />
        <Route path='/createActivity' component={ActivityForm} />
      </Container>
    </Fragment>
  );
};

export default observer(App);
