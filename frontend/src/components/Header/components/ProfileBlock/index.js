import React, { Component } from 'react';
import styles from './ProfileBlock.module.scss';
import LinkButton from './../../../LinkButton';
import Button from './../../../Button';
import { connect } from 'react-redux';
import { logout } from './../../../../redux/actions/signActions';
import { Redirect } from 'react-router-dom';

class ProfileBlock extends Component {
    redirect() {
        if (!this.props.isAuthenticated){
            return <Redirect to='/'/>
        }
    }
    render() {
        return (
            <section className={styles['profile-block']}>
                {this.redirect()}
                <h2>Welcome {this.props.name}</h2>
                <div className={styles['caption']}>View your account information, orders and products</div>
                <div className={styles['link-block']}>
                    <div className={styles['links']}>
                        <LinkButton name='Dashboard' color='dark' link='/dashboard'/>
                        <LinkButton name='Account Details' color='dark' link='/profile'/>
                        <LinkButton name='Orders' color='dark' link='/orders'/>
                    </div>
                    <div>
                        <Button name='Logout' color='btn__outline--dark' isDisabled={false} type='button'
                        event={() => this.props.logout()}/>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (reducState) => {
    let state = reducState.signReducer;
    return {
        isAuthenticated: state.isAuthenticated,
        signError: state.signError,
        name: state.userData.fullname
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout : () => dispatch(logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileBlock);