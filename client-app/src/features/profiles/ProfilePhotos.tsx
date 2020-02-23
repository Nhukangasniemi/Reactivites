import React, { useState } from "react";
import { Tab, Header, Card, Button, Grid } from "semantic-ui-react";
import { useContext } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { Image } from "semantic-ui-react";
import PhotoUploadWidget from "./../../app/common/photoUpload/PhotoUploadWidget";
import { observer } from "mobx-react-lite";

const ProfilePhotos = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isCurrentUser,
    uploadPhoto,
    uploadingPhoto,
    loading,
    setMainPhoto,
    deletePhoto
  } = rootStore.profileStore;
  const [addPhotoMode, setAddPhotoMode] = useState(true);
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | undefined>(
    undefined
  );

  const handleUploadImage = (photo: Blob) => {
    uploadPhoto(photo).then(() => setAddPhotoMode(false));
  };
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(prev => !prev)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              uploadPhoto={handleUploadImage}
              loading={uploadingPhoto}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile.photos.map(photo => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <Button.Group fluid widths={2}>
                        <Button
                          name={photo.id}
                          disabled={photo.isMain}
                          loading={loading && target === photo.id}
                          basic
                          positive
                          content="Main"
                          onClick={e => {
                            setTarget(e.currentTarget.name);
                            setMainPhoto(photo);
                          }}
                        />
                        <Button
                          basic
                          name={photo.id}
                          positive
                          icon="trash"
                          disabled={photo.isMain}
                          onClick={(e) => {
                            deletePhoto(photo)
                            setDeleteTarget(e.currentTarget.name)
                          }}
                          loading={loading && deleteTarget === photo.id}
                        />
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);
