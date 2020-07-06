import React from 'react';

function ServerDown(props) {
    return (
        <h1 style={{textAlign:'center', position:'relative', top: '26vh',fontSize: '1.8rem'}}>{props.message}</h1>
    )
}

export default ServerDown;