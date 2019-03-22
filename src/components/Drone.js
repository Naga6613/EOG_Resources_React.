import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import AvatarRaw from "@material-ui/core/Avatar";
import Plot from 'react-plotly.js';

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const avatarStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  }
});
const Avatar = withStyles(avatarStyles)(AvatarRaw);

const styles = {
  card: {
    margin: "5% 25%"
  },
  textCenter: {
    'textAlign': 'center'
  }
};
const customeDateFormat = (yData) => {
  return yData.map(duration => {
    let minutes = parseInt((duration.timestamp / (1000 * 60)) % 60);
    let hours = parseInt((duration.timestamp / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    return hours + ":" + minutes;
  });
}
class Drone extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    const { classes } = this.props;
    let visClass = { width: '90%', height: '0px', display: 'initial' };
    if (!this.props.loading) {
      visClass = { width: '90%', height: '250px' };
    }
    return (
      <Card className={classes.card}>
        <CardHeader title="Drone Metrics" />
        <CardContent>
          <List>
            {this.props.loading ? <h3 style={styles.textCenter}>Loading . . . </h3> : null}
            {!this.props.loading ?
            <Plot
              data={[
                {
                  x: this.props.time_x_data,
                  y: this.props.metrics_y_data,
                  type: 'scatter',
                  mode: 'lines',
                  marker: { color: 'smokeblue' },
                }
              ]}
              layout={{height: '250px', title: 'Drone Visualization' }}
            />
            :
            null }
          </List>
        </CardContent>
      </Card>
    );
  };
};
const mapState = (state, ownProps) => {

  const {
    loading,
    metricDetails
  } = state.drone;

  const { data } = metricDetails;
  let time_x_data = [];
  let metrics_y_data = [];
  if (data) {
    time_x_data = customeDateFormat(data);
    metrics_y_data = data.map(d => d.metric);
    return {
      loading,
      time_x_data,
      metrics_y_data
    };
  }

  return {
    loading,
    metricDetails,
    time_x_data,
    metrics_y_data
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_DRONE_DETAILS
    })
});
export default connect(mapState, mapDispatch)(withStyles(styles)(Drone));
