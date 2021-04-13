import React from 'react'
import { Grid } from '@material-ui/core'
import { Headset } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import CategoryItem from './CategoryItem'

const CATEGORIES = [
  {
    title: 'Kits',
    Icon: Headset
  },
  {
    title: 'Snares',
    Icon: Headset
  },
  {
    title: 'Cymbals',
    Icon: Headset
  },
  {
    title: 'Accessories',
    Icon: Headset
  },
  {
    title: 'Electronics',
    Icon: Headset
  },
  {
    title: 'Apparel',
    Icon: Headset
  },
  {
    title: 'Drum Heads',
    Icon: Headset
  },
  {
    title: 'Drum Sticks',
    Icon: Headset
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}))

export default function CategoryList() {
  const classes = useStyles()

  return (
    <Grid container justify="center" spacing={2} className={classes.root}>
      {CATEGORIES.map((category) => (
        <CategoryItem key={category.title} {...category}></CategoryItem>
      ))}
    </Grid>
  )
}
