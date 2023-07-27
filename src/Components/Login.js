import React, { Component } from 'react';
import { Button, Container, Grid, TextField } from '@material-ui/core';
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
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        if (res.user.emailVerified) {
          window.location.href = 'https://whatsapphelper.vercel.app/';
        } else {
          alert('Verifikasi email anda terlebih dahulu!');
          firebaseAuthentication.signOut();
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  handleRegisterButton = () => {
    // Fungsi untuk mengarahkan pengguna ke halaman registrasi
    // Anda dapat mengganti URL '/registrasi' sesuai dengan URL halaman registrasi Anda
    window.location.href = '/registrasi';
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container style={styles.container}>
        <Grid container justify="center">
          <Grid item xs={12} md={8} lg={4}>
            <center>
              <h2 style={styles.heading}>Halaman Login</h2>
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
                Login
              </Button>
            </form>
            <Button fullWidth variant="outlined" color="primary" style={styles.registerButton} onClick={this.handleRegisterButton}>
              Register
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
  },
  button: {
    marginTop: '20px'
  },
  registerButton: {
    marginTop: '20px', // Sesuaikan margin sesuai kebutuhan
    fontWeight: 'bold' // Tambahkan gaya lain yang diinginkan untuk mempercantik tampilan
  }
};
