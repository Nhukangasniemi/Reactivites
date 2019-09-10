import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity | null;
}
const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
      console.log(activity);
  }

  return (
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
          type="date"
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
          floated="right"
          positive
          type="submit"
          content="Submit"
          onChange={handleInputChange}
        />
        <Button
          floated="right"
          positive
          type="button"
          content="Cancel"
          onClick={() => setEditMode(false)}
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
