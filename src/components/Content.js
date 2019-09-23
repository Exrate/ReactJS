import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Queue from './Queue'
import Registration from './Registration'
import Admin from './Admin'

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}))

export default function Content() {
  const classes = useStyles()

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Route exact path="/" component={Dashboard} />
      <Route path="/queue" component={Queue} />
      <Route path="/registration" component={Registration} />
      <Route path="/admin" component={Admin} />
    </main>
  )
}