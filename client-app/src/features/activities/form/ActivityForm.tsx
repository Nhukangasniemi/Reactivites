import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import {
  ActivityFormValues
} from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import { TextInput } from "../../../app/common/form/TextInput";
import TextAreaInput from "./../../../app/common/form/TextAreaInput";
import { SelectInput } from "./../../../app/common/form/SelectInput";
import { category } from "./../../../app/common/options/categoryOptions";
import { DateInput } from "./../../../app/common/form/DateInput";
import { combineDateAndTime } from "./../../../app/common/util/util";
import {combineValidators, isRequired, composeValidators, hasLengthGreaterThan} from 'revalidate';

const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time')
})

interface DetailsParam {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailsParam>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    loadActivity,
    createActivity,
    editActivity,
    submitting,
  } = activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then(activity => {
          setActivity(new ActivityFormValues(activity));
          console.log(activity);
        })
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            validate={validate}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
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
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  floated="right"
                  positive
                  disabled={loading}
                  type="button"
                  content="Cancel"
                  onClick={
                    activity.id
                      ? () => history.push(`/activities/${activity.id}`)
                      : () => history.push("/activities")
                  }
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
