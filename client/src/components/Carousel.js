import React, { Component } from 'react';
import sprache1 from '../img/SKBBird.png'
import sprache2 from '../img/birdleft.png'
import sprache3 from '../img/testlogo1.0.png'
import Background from '../img/bgCarousel.jpg'
import Zoom from 'react-reveal/Zoom';

class Carousel extends Component {

    render() {

        return (
            <div className={'header-Top'} style={{backgroundImage: `url(${Background})`}}>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel"  >
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active text-center">
                            {/*<img className="d-block img-fluid" src={sprache1} alt="First slide"/>*/}
                            {/*<div className="carousel-caption d-none d-md-block">*/}
                                {/*<Zoom>*/}
                                {/*<section className={'ml-auto text-light  rounded shadow-md'} style={{fontSize:'1.2em', width:'50%'}}>*/}
                                {/*<p>Die SKB versteht sich als einen Raum, in dem Menschen mit ganz verschiedenen persönlichen und kulturellen Hintergründen miteinander lernen und arbeiten.</p>*/}
                                {/*</section>*/}
                                {/*</Zoom>*/}
                                {/*</div>*/}
                            <img src={sprache1} className={'rounded-circle pb-4 m-2'}/>
                        </div>

                        <div className="carousel-item">
                            <img className="d-block img-fluid" src={sprache3} alt="Third slide" />
                            <div className=" carousel-caption d-none d-md-block">
                                <Zoom>
                                <section className={' ml-auto text-light  rounded shadow-md'} style={{fontSize:'1.2em', width:'50%'}}>
                                    <p>Die SKB versteht sich als einen Raum, in dem Menschen mit ganz verschiedenen persönlichen und kulturellen Hintergründen miteinander lernen und arbeiten.</p>
                                </section>
                                </Zoom>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="ml-auto d-block img-fluid pr-5" src={sprache2} alt="Second slide" style={{transform: 'scaleX(-1)'}}/>
                            <div className="carousel-caption d-none d-md-block">
                                <Zoom>
                                    <section className={'mr-auto text-light  rounded shadow-md'} style={{fontSize:'1.2em', width:'50%'}}>
                                        <p>
                                            Wir und unsere Teilnehmenden haben ganz unterschiedliche nationale, kulturelle, sexuelle, religiöse, … Identitäten. Die Akzeptanz dieser Vielfalt bildet den Kern unseres Selbstverständnisses.                                    </p>
                                    </section>
                                </Zoom>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev bg-dark " href="#carouselExampleIndicators" role="button"
                       data-slide="prev" style={{width:'2%'}}>
                        <span className="carousel-control-prev-icon" aria-hidden="true"/>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next bg-dark" href="#carouselExampleIndicators" role="button"
                       data-slide="next" style={{width:'2%'}}>
                        <span className="carousel-control-next-icon" aria-hidden="true"/>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default Carousel;