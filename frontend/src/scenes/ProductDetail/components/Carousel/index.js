import React from 'react';
import CarouselB from 'react-bootstrap/Carousel';
import styles from './Carousel.module.scss';

function Carousel(props) {
    return (
        <CarouselB interval={null} 
        prevIcon={<span aria-hidden="true" className={styles['prev']}/>} 
        nextIcon={<span aria-hidden="true" className={styles['next']}/>}>
            {Object.keys(props.images).map((image) => {
                return (<CarouselB.Item key={image}>
                <img
                  className="d-block w-100"
                  src={props.images[image]}
                  alt="First slide"
                />
                </CarouselB.Item>)
            })}
        </CarouselB>
    )
}

export default Carousel;