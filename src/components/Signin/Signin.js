import React from 'react';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }
  saveAuthTokenSession = (token) =>{
     window.sessionStorage.setItem('token',token);
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.userId && data.success ==='true') {
          this.saveAuthTokenSession(data.token);
          fetch(`http://localhost:3000/profile/${data.userId}`,{
              method: 'get',
              headers: {
                'Content-Type' : 'application/json',
                'Authorization': data.token
              }
            })
            .then(resp => resp.json())
            .then(user => {
              if(user && user.email){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
              }
            })

        }
      })
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv6 w-100 w-50-m w-25-l mw6 shadow-5 center bg-black-10 ">
        <main className="pa4 black-70 ">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0 ">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 bw1 input-reset ba bg-transparent hover-bg-black-10 hover-white-20 w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="bw1 pa2 input-reset ba bg-transparent hover-bg-black-10 hover-white-20 w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="br-pill bw1 ph3 pv2 input-reset ba b--black-50 bg-transparent grow pointer f6 dib"
                type="submit"
                value="submit"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer underline">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;