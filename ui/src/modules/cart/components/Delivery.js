import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  CardActions,
  Card,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core'
import * as yup from 'yup'

import * as actions from '../actions'

const useStyles = makeStyles((theme) => ({
  form: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  submitBtn: {
    flex: 1,
  },
}))

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
})

export default function Delivery() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const nameField = register('name')
  const emailField = register('email')
  const addressField = register('address')

  const submit = (deliveryInfo) => {
    const action = actions.checkout(deliveryInfo)

    dispatch(action)
  }

  return (
    <form onSubmit={handleSubmit(submit)} autoComplete="off">
      <Card>
        <CardContent className={classes.form}>
          <Typography variant="h5" component="h2">
            Delivery Information
          </Typography>
          <TextField
            inputRef={nameField.ref}
            name={nameField.name}
            onChange={nameField.onChange}
            variant="outlined"
            label="Name"
            placeholder="Enter your fullname"
            fullWidth
            helperText={errors.name?.message || ''}
            error={!!errors.name}
          />
          <TextField
            inputRef={emailField.ref}
            name={emailField.name}
            onChange={emailField.onChange}
            type="email"
            variant="outlined"
            label="Email"
            placeholder="Enter your email"
            fullWidth
            helperText={errors.email?.message || ''}
            error={!!errors.email}
          />
          <TextField
            inputRef={addressField.ref}
            name={addressField.name}
            onChange={addressField.onChange}
            multiline
            rows={4}
            variant="outlined"
            label="Address"
            placeholder="Enter your address"
            fullWidth
            helperText={errors.address?.message || ''}
            error={!!errors.address}
          />
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitBtn}
          >
            Place Order
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}