import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total, color }) {
  return (
      <Card style={{backgroundColor:`${color}`}}>
      <CardContent>
        <h3>
          {title} {cases}
        </h3>
        <Typography>Total :{total}</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
