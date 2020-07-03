import React, { Component } from 'react';
import styles from './LoginBlock.module.scss';
import LinkButton from '../../../LinkButton';
import Button from './../../../Button';
import validator from 'validator';
import { login } from './../../../../redux/actions/signActions';
import { toggleTopdrawer } from './../../../../redux/actions/headerActions';
import { connect } from 'react-redux';

class LoginBlock extends Component {
    state = {
        isEmailValid: false,
        isPasswordValid: false,
        allValid: false,
        email: '',
        password: ''
    }

    componentDidUpdate(prevsProps, prevState) {
        let cond = prevState.isEmailValid !== this.state.isEmailValid 
        || prevState.isPasswordValid !== this.state.isPasswordValid;
        if (cond) {
                let flag = true;
                for (let ev in this.state) {
                    if (!(ev === 'allValid')) {
                        if (this.state[ev]) {
                            continue
                        } else {
                            flag = false;
                            break;
                        }
                    }
                }
                if (flag) this.setState({ allValid: true });
                else this.setState({ allValid: false });
        }
    }

    validateEmail(e) {
        let value = e.target.value;
        if (validator.isEmail(value)) {
            e.target.style.borderColor = 'rgb(0, 165, 0)';
            this.setState({ isEmailValid: true, email: value })
        } else {
            e.target.style.borderColor = 'rgb(255, 79, 79)';
            this.setState({ isEmailValid: false })
        }
    }

    validatePassword(e) {
        let value = e.target.value;
        let pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]\/:;<>,.?~_+-=|\\]).{8,32}$/;
        if (validator.matches(value, pattern)) {
            e.target.style.borderColor = 'rgb(0, 165, 0)';
            this.setState({ isPasswordValid: true, password: value })
        } else {
            e.target.style.borderColor = 'rgb(255, 79, 79)';
            this.setState({ isPasswordValid: false })
        }
    }

    blur(e) {
        let value = e.target.value;
        if (value.length) {
            if (e.target.getAttribute('name') === 'email') {
                this.validateEmail(e);
                return;
            }
            this.validatePassword(e);
            return;
        }
        e.target.style.borderColor = 'white';
    }

    render() {
        return (
            <section className={styles.login__container}>
                <div className={styles.login__form}>
                    <h2 className={styles.textlight}>Login</h2>
                    <form>
                        <input type='text' placeholder='Email' name='email' onChange={(e) => this.validateEmail(e)}
                            onBlur={(e) => this.blur(e)} />
                        <input type='password' placeholder='Password' name='password' onChange={(e) => this.validatePassword(e)}
                            onBlur={(e) => this.blur(e)} />
                        <Button name='Login' color='btn--light' type='button' isDisabled={!this.state.allValid} 
                        event={() => {this.props.login({email:this.state.email,password:this.state.password})}}/>
                    </form>
                </div>
                <div className={styles['register-block']}>
                    <small className={styles['textlight'] + ' ' + styles.register__caption}>New to Search & Buy?</small>
                    <LinkButton name='Create Account' color='dark' type='link' 
                    link='/register' event={this.props.toggleTopDrawer}/>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (reducState) => {
    let state = reducState.signReducer;
    return {
        isAuthenticated: state.isAuthenticated,
        signError: state.signError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login : (data) => dispatch(login(data)),
        toggleTopDrawer : () => dispatch(toggleTopdrawer())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBlock);