import React from 'react';

class SignIn extends React.Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:''
        }
    }

    onInput =(e)=>{
        e.preventDefault()
        const {name}=e.target
        this.setState({
            [name]: e.target.value
        })
    }

    onSubmitSignIn=()=>{
        fetch('api/users/login', {
            method:'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                email:this.state.email,
                password:this.state.password
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.user){
                this.props.loadUser(data.user)
                this.props.onRouteChange('home') 
            }
        })
        .catch(err=> alert('error login  it', err))
    }

    render(){
        const {onRouteChange} = this.props
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email"  
                            id="email-address"
                            onChange={this.onInput}
                        />
                        </div>
                        <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={this.onInput}
                        />
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                            onClick={this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" value="Sign in"  
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={()=>onRouteChange('register')} className="f6 link pointer dim black db">Register</p>
                    </div>
                    </div>
                </main>
            </article>
    
        );
    }
};

export default SignIn;