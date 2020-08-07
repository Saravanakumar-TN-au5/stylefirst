import React, { Component } from 'react';
import Button from '../../../components/Button';
import styles from './Register.module.scss';
import validator from 'validator'
import { connect } from 'react-redux';
import { register } from './../../../redux/actions/signActions';
import { Redirect } from 'react-router-dom';

class Register extends Component {
    constructor(props){
        super(props);
        this.pwdRef = React.createRef();
    }

    state = {
        redirect: false,
        valids : {
            isNameValid : false,
            isEmailValid : false,
            isAddressValid : false,
            isCityValid : false,
            isStateValid : false,
            isCountryValid : false,
            isPasswordValid : false,
            isConfirmPwdValid : false
        },
        allValid : false,
        values : {
            fullname : null,
            email : null,
                address1: null,
                address2: '',
                city: null,
                state: null,
                country: null,
            password: null
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.redirect && prevState.valids !== this.state.valids){
            let flag = true;
            for (let ev in this.state.valids){
                    if (this.state.valids[ev]){ 
                        continue
                    }
                    else {
                        console.log(ev)
                        flag = false
                        break
                    };
            }
            if (flag) this.setState({allValid: true});
            else this.setState({allValid: false})
        }
        if (this.props.isAuthenticated && prevState.isAuthenticated !== this.props.isAuthenticated) {
            this.setState({redirect: true});
        }
    }

    validate(e) {
        let isValid = false;
        let value = e.target.value;
        let type = e.target.getAttribute('type');
        switch (type) {
            case 'text':
                if (value.length > 4) {
                    isValid = true;
                    if (e.target.getAttribute('name') === 'fullname'){
                        this.setState({
                            valids: {...this.state.valids,isNameValid: true},
                            values: {...this.state.values,fullname: value}})
                    }
                    if (e.target.getAttribute('name') === 'address1'){
                        this.setState({
                            valids: {...this.state.valids,isAddressValid: true},
                            values: {...this.state.values,address1:value}
                        })
                    }
                    if (e.target.getAttribute('name') === 'address2'){
                        this.setState({
                            values: {...this.state.values,address2:value}
                        })
                    }
                    if (e.target.getAttribute('name') === 'city'){
                        this.setState({
                            valids: {...this.state.valids,isCityValid: true},
                            values: {...this.state.values,city:value}
                        })
                    }
                    if (e.target.getAttribute('name') === 'state'){
                        this.setState({
                            valids: {...this.state.valids,isStateValid: true},
                            values: {...this.state.values,state:value}
                        })
                    }
                    if (e.target.getAttribute('name') === 'country'){
                        this.setState({
                            valids: {...this.state.valids,isCountryValid: true},
                            values: {...this.state.values,country:value}
                        })
                    }
                } else {
                    if (e.target.getAttribute('name') === 'fullname'){
                        this.setState({valids: {...this.state.valids,isNameValid: false}})
                    }
                    if (e.target.getAttribute('name') === 'address1'){
                        this.setState({valids: {...this.state.valids,isAddressValid: false}})
                    }
                    if (e.target.getAttribute('name') === 'city'){
                        this.setState({valids: {...this.state.valids,isCityValid: false}})
                    }
                    if (e.target.getAttribute('name') === 'state'){
                        this.setState({valids: {...this.state.valids,isStateValid: false}})
                    }
                    if (e.target.getAttribute('name') === 'country'){
                        this.setState({valids: {...this.state.valids,isCountryValid: false}})
                    }
                };
                break;
            case 'email':
                if (validator.isEmail(value)) {
                    isValid = true;
                    this.setState({
                        valids: {...this.state.valids,isEmailValid: true},
                        values : {...this.state.values, email: value}
                    });
                } else {
                    this.setState({valids: {...this.state.valids,isEmailValid: false}});
                };
                break;
            case 'password':
                let pwdPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]\/:;<>,.?~_+-=|\\]).{8,32}$/;
                if (validator.matches(value, pwdPattern)) {
                    isValid = true;
                    this.setState({
                        valids: {...this.state.valids,isPasswordValid: true},
                        values : {...this.state.values, password: value}
                    })
                } else {
                    this.setState({valids: {...this.state.valids,isPasswordValid: false}});
                };
                break;
            default:
                break;
        }
        if (isValid) e.target.style.borderColor = 'rgb(0, 165, 0)';
        else e.target.style.borderColor = 'rgb(255, 79, 79)';
    }

    validateConfirmPwd(e) {
        let value = e.target.value;
        let pwd = this.pwdRef.current.value;
        if (value === pwd) {
            e.target.style.borderColor = 'rgb(0, 165, 0)'
            this.setState({valids: {...this.state.valids,isConfirmPwdValid: true}})
        } else {
            e.target.style.borderColor = 'rgb(255, 79, 79)'
        }
    }

    onRegister() {
        this.props.register(this.state.values)
    }

    renderRedirect(){
        return this.state.redirect ? <Redirect to='/'/> : null
    }

    render() {
        return (
                <section className={styles['container']} style={{position:'relative',top:'80px'}}>
                    {this.renderRedirect()}
                    <section className={styles['register__container']}>
                        <h2>Register</h2>
                        <form className={styles['register__form']} noValidate>
                            <div>
                                <input type='text' placeholder='Fullname' name='fullname' 
                                onChange={(e) => {this.validate(e)}}/>
                            </div>
                            <div>
                                <input type='email' placeholder='Email' name='email' 
                                onChange={(e) => this.validate(e)}/>
                            </div>
                            <div className={styles['register__address']}>
                                <div>
                                    <input type='text' placeholder='Address line 1' name='address1' 
                                    onChange={(e) => {this.validate(e)}}/>
                                </div>
                                <div>
                                    <input type='text' placeholder='Address line 2' name='address2' 
                                    onChange={(e) => {this.validate(e)}}/>
                                </div>
                                <div className={styles['register__address__csc']}>
                                    <input type='text' placeholder='City' name='city' 
                                    onChange={(e) => {this.validate(e)}}/>
                                    <input type='text' placeholder='State' name='state' 
                                    onChange={(e) => {this.validate(e)}}/>
                                    <input type='text' placeholder='Country' name='country' 
                                    onChange={(e) => {this.validate(e)}}/>
                                </div>
                            </div>
                            <div>
                                <input type='password' placeholder='Password' name='password' 
                                onChange={(e) => this.validate(e)} ref={this.pwdRef}/>
                            </div>
                            <div>
                                <input type='password' placeholder='Confirm password' 
                                onChange={(e) => this.validateConfirmPwd(e)}/>
                            </div>
                            <div className={styles['register__form__btn']}>
                                <Button name='Register' color='btn--dark' type='button' isDisabled={!this.state.allValid}
                                event={() => this.onRegister()}/>
                                {this.props.registerError ? 
                                <span className={styles['alert']}>{this.props.registerError}</span>:
                                <span></span>
                                }
                            </div>
                        </form>
                    </section>
                </section>
        );
    }
}

const mapStateToProps = (reducState) => {
    let state = reducState.signReducer;
    return {
        isAuthenticated: state.isAuthenticated,
        registerError: state.registerError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register : (data) => dispatch(register(data))
    }
}

export default (connect(mapStateToProps,mapDispatchToProps)(Register));