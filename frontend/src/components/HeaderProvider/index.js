import Header from './../Header/index';
import React from 'react';

export default function HeaderProvider(ChildComponent) {
    return function () {
        return (
            <>
                <Header />
                <ChildComponent style={{ position: 'relative', top: '80px' }} />
            </>
        )
    }
}