import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Grid, Paper, Typography, ButtonGroup, Button } from '@material-ui/core'
import Box from '@material-ui/core/Box';

import * as productActions from '../actions'
import * as cartActions from 'modules/cart/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
    gap: "12px",
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.between('sm', 'xl')]: {
      flexDirection: 'row',
    },
  },
  content: {
    height: '100%',
  },
  amountContainer: {
    marginBottom: theme.spacing(2),
  },
  amount: {
    padding: theme.spacing(0, 2),
  },
  imageSuperWrapper: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '30%',
  },
  imageWrapper: {
    height: 0,
    position: "relative",
    minWidth: 200,
    paddingBottom: "75%",
  },
  img: {
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    position: "absolute",
    objectFit: "cover",
  },
  mainLetter: {
    flexBasis: "70%",
    padding: "16px 20px",
  }
}))

export default function ProductDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product] = useSelector((state) => state.products.items)
  const productIds = useSelector((state) => state.cart.productIds)
  const exists = productIds.includes(id)
  const classes = useStyles()
  const history = useHistory()
  const theme = useTheme()
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    const action = productActions.loadProduct(id)

    dispatch(action)
  }, [dispatch, id])

  const addToCart = () => dispatch(cartActions.addToCart(id))

  const buyNow = () => {
    addToCart()
    history.push('/cart')
  }

  if (!product) return null

    return (
        <Paper
            container
            spacing={2}
            justify={isMediumUp ? 'flex-start' : 'center'}
            className={classes.root}
        >
            <Box className={classes.imageSuperWrapper}>
                <Box className={classes.imageWrapper}>
                    <img src={product.image} alt={product.name} className={classes.img}/>
                </Box>
            </Box>
            <Grid className={classes.mainLetter}>
                <Grid
                    container
                    className={classes.content}
                    direction="column"
                    justify="space-between"
                >
                    <Grid item>
                        <Typography variant="h4" component="h1">
                            {product.name}
                        </Typography>
                        <p>{product.desc}</p>
                    </Grid>
                {!exists && (
                    <Grid item>
                        <ButtonGroup
                            variant="contained"
                            color="primary"
                            aria-label="primary button group"
                        >
                            <Button onClick={buyNow}>Buy Now</Button>
                            <Button onClick={addToCart}>Add to Cart</Button>
                        </ButtonGroup>
                    </Grid>
                )}
                </Grid>
            </Grid>
        </Paper>
    )
}
