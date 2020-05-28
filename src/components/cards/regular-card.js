import React, { CSSProperties, FC, ReactNode, ReactPropTypes } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
//import regularCardStyle from 'variables/styles/regularCardStyle';

export const RegularCard = ({
  cardTitle,
  cardSubtitle,
  children,
  style,
}) => {
  return (
    <Card style={{marginBottom: 20, ...style}}>
      <CardHeader title={cardTitle} subheader={cardSubtitle} />
      <CardContent style={{paddingTop: 0}}>{children}</CardContent>
    </Card>
  );
};