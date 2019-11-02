import React from "react";
import {Container, Paper, Typography, Button} from "@material-ui/core";
import {auth} from "../../lib/actions"
import {connect} from "react-redux";

const Dashboard = ({user, logout}) => {

  return <>
    <Container>
      <Paper>
        <Typography variant={"h4"}>
          Main dashboard
        </Typography>
        <Typography variant={"h5"}>
          {user.username}
        </Typography>
        <Button onClick={logout} color="secondary" variant="contained">Logout</Button>
      </Paper>
    </Container>
  </>;
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(auth.logout()),
  }
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);