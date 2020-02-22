import React, { Fragment, useState, useEffect } from "react";
import { Header, Grid, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PhotoWidgetDropZone from "./PhotoWidgetDropZone";

const PhotoUploadWidget = () => {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file));
    };
  });
  return (
    <Fragment>
      <Grid>
        <Grid.Row />
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 1 - Add Photo" />
          <PhotoWidgetDropZone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 2 - Resize image" />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 3 - Preview & Upload" />
          {files.length > 0 && <Image src={files[0].preview} />}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(PhotoUploadWidget);
