import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { IActivityFormValues } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import { TextInput } from "../../../app/common/form/TextInput";
import TextAreaInput from "./../../../app/common/form/TextAreaInput";
import { SelectInput } from "./../../../app/common/form/SelectInput";
import { category } from "./../../../app/common/options/categoryOptions";
import { DateInput } from "./../../../app/common/form/DateInput";

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

  const [activity, setActivity] = useState<IActivityFormValues>({
    id: undefined,
    title: "",
    category: "",
    description: "",
    date: undefined,
    time: undefined,
    city: "",
    venue: ""
  });

  useEffect(() => {
    if (match.params.id && activity.id) {
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
    activity.id
  ]);

  // const handleSubmit = () => {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid()
  //     };
  //     createActivity(newActivity).then(() =>
  //       history.push(`/activities/${newActivity.id}`)
  //     );
  //   } else {
  //     editActivity(activity).then(() =>
  //       history.push(`/activities/${activity.id}`)
  //     );
  //   }
  // };

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  placeholder="Title"
                  value={activity.title}
                  name="title"
                  component={TextInput}
                />
                <Field
                  component={TextAreaInput}
                  placeholder="Description"
                  rows={3}
                  value={activity.description}
                  name="description"
                />
                <Field
                  component={SelectInput}
                  options={category}
                  placeholder="Category"
                  value={activity.category}
                  name="category"
                />
                <Form.Group widths="equal">
                  <Field
                    placeholder="Date"
                    component={DateInput}
                    value={activity.date}
                    date={true}
                    name="date"
                  />
                  <Field
                    placeholder="Time"
                    component={DateInput}
                    value={activity.date}
                    time={true}
                    name="time"
                  />
                </Form.Group>
                <Field
                  placeholder="City"
                  value={activity.city}
                  component={TextInput}
                  name="city"
                />
                <Field
                  placeholder="Venue"
                  value={activity.venue}
                  component={TextInput}
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
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
