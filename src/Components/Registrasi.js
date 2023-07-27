import React, { Component } from 'react';
import { Button, Container, Grid, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { firebaseAuthentication } from '../config/firebase';

export default class Registrasi extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChangeField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    firebaseAuthentication
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebaseAuthentication.currentUser.sendEmailVerification()
          .then(() => {
            alert('Mohon verifikasi email anda');
            this.props.history.push('/login');
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container style={styles.container}>
        <Grid container justify="center">
          <Grid item xs={12} md={8} lg={4}>
            <center>
              <h2 style={styles.heading}>Halaman Register</h2>
            </center>
            <form onSubmit={this.handleSubmit}>
              <TextField
                type="email"
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
                value={email}
                onChange={this.handleChangeField}
                name="email"
                label="Email"
                required
              />
              <TextField
                type="password"
                fullWidth
                margin="dense"
                variant="outlined"
                size="small"
                value={password}
                onChange={this.handleChangeField}
                name="password"
                label="Password"
                required
              />
              <Button type="submit" fullWidth variant="contained" color="primary" style={styles.button}>
                Register
              </Button>
            </form>
            <Button component={Link} to="/login" fullWidth variant="outlined" color="primary" style={styles.loginButton}>
              Login
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const styles = {
  container: {
    marginTop: '150px', // Sesuaikan margin sesuai kebutuhan
  },
  heading: {
    marginBottom: '20px',
    color: '#333'
  },
  button: {
    marginTop: '20px'
  },
  loginButton: {
    marginTop: '10px', // Sesuaikan margin sesuai kebutuhan
    fontWeight: 'bold' // Tambahkan gaya lain yang diinginkan untuk mempercantik tampilan
  }
};
