import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { RouteComponentProps } from "react-router";

interface DetailsParam {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailsParam>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity: initialFormState,
    loadActivity,
    createActivity,
    editActivity,
    submitting,
    clearActivity
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: ""
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }
    //Clean up effect when component unmount
    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    clearActivity,
    match.params.id,
    initialFormState,
    activity.id.length
  ]);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              onChange={handleInputChange}
              placeholder="Title"
              value={activity.title}
              name="title"
            />
            <Form.Input
              onChange={handleInputChange}
              rows={2}
              placeholder="Description"
              value={activity.description}
              name="description"
            />
            <Form.Input
              onChange={handleInputChange}
              placeholder="Category"
              value={activity.category}
              name="category"
            />
            <Form.Input
              type="datetime-local"
              placeholder="Date"
              value={activity.date}
              onChange={handleInputChange}
              name="date"
            />
            <Form.Input
              placeholder="City"
              value={activity.city}
              onChange={handleInputChange}
              name="city"
            />
            <Form.Input
              placeholder="Venue"
              value={activity.venue}
              onChange={handleInputChange}
              name="venue"
            />
            <Button
              loading={submitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              floated="right"
              positive
              type="button"
              content="Cancel"
              onClick={() => history.push("./activities")}
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
