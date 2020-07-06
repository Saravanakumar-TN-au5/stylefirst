import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from './../../../../components/Button';
import styles from './AccountDetails.module.scss';

class AccountDetails extends Component {
    render() {
        let { fullname, email, address} = this.props.userData
        return (
            <section className={styles['container']}>
                <div className={styles['head']}>
                    <h4>Account Details</h4>
                    <div>Manage all your account information</div>
                </div>
                <section className={styles['name']}>
                    <div className={styles['name__content']}>
                        <div>
                            <div className={styles['bold']}>NAME</div>
                            <div>{fullname}</div>
                        </div>
                        <div>
                            <div className={styles['bold']}>EMAIL</div>
                            <div>{email}</div>
                        </div>
                    </div>
                    <div className={styles['f-btn']}>
                        <Button type='button' color='btn__outline--light' name='Edit'/>
                    </div>
                </section>
                <section className={styles['address']}>
                    <div className={styles['address__content']}>
                        <div>
                            <div className={styles['bold']}>ADDRESS 1</div>
                            <div>{address.address1}</div>
                        </div>
                        <div>
                            <div className={styles['bold']}>ADDRESS 2</div>
                            <div>{address.address2}</div>
                        </div>
                        <div>
                            <div className={styles['bold']}>CITY</div>
                            <div>{address.city}</div>
                        </div>
                        <div>
                            <div className={styles['bold']}>STATE</div>
                            <div>{address.state}</div>
                        </div>
                        <div>
                            <div className={styles['bold']}>COUNTRY</div>
                            <div>{address.country}</div>
                        </div>
                    </div>
                    <div className={styles['f-btn']}>
                        <Button type='button' color='btn__outline--light' name='Edit'/>
                    </div>
                </section>
                <section className={styles['password']}>
                    <div>
                        <h4>User Email</h4>
                        <div>With this email you will be able to access My Account</div>
                        <div>{email}</div>
                    </div>
                    <div>
                        <h4>User Password</h4>
                        <div>With this password you can access My Account</div>
                        <div>password</div>
                    </div>
                </section>
            </section>
        )
    }
}

const mapStateToProps = (reducState) => {
    let state = reducState.signReducer
    return {
        userData: state.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AccountDetails);