import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface DetailsParam {
  id: string;
}
const ActivityDetails: React.FC<RouteComponentProps<DetailsParam>> = ({
  match
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity,
    openEditForm,
    cancelSelectedActivity,
    loadActivity,
    loadingInitial
  } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity]);

  if (loadingInitial || !activity) return <LoadingComponent content="Loading activity..." />;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>
        {activity!.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
            <Button basic color='blue' content='Edit' onClick={() => openEditForm(activity!.id)}/>
            <Button basic color='grey' content='Cancel' onClick={cancelSelectedActivity}/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
