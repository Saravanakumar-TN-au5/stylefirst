import React, { Component } from 'react';
import styles from './TopDrawer.module.scss';
import { connect } from 'react-redux';
import { toggleTopdrawer } from './../../../../redux/actions/headerActions';

export default function TopDrawer(ChildComponent) {
    class TopDrawerComp extends Component {
        componentDidMount() {
            setTimeout(() => this.props.toggleTopDrawer(), 0)
        }

        render() {
            return (<section className={styles['top-drawer'] + ' ' + (this.props.topDrawerVisible ? styles['visible'] : '')}>
                <ChildComponent {...this.props} />
                {/* eslint-disable-next-line */}
                <div className={styles['close']}
                    onClick={() => this.props.toggleTopDrawer()}>❌</div>
            </section>);
        }
    }
    const mapStateToProps = (reducState) => {
        let state = reducState.headerReducer
        return {
            isAuthenticated: state.isAuthenticated,
            topDrawerVisible: state.topDrawerVisible
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            toggleTopDrawer: () => dispatch(toggleTopdrawer())
        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(TopDrawerComp);
}