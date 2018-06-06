import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';


class Home extends Component {

    componentWillMount(){
        sessionStorage.clear()
    }


    render() {
        return (
            <div className="App">
                <div className={"content"}>
                <Header text={"Sprach- und Kulturbörse Berlin"}/>
                <main className={'bg-light container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-sm-11 ml-auto mr-auto'}>
                            {sessionStorage.getItem('session')!=null && sessionStorage.getItem('session')!="" && sessionStorage.getItem('session')!=undefined
                            &&
                            <div className={'row'}>
                                <h2>Willkommen</h2>
                            </div>

                            }


                            <div className={'row'}>
                                <div className={'col-md-6'}>
                                    <p className={'border rounded p-3'} style={{textAlign:'justify'}}>
                                        <i>Die SKB versteht sich als einen Raum, in dem Menschen mit ganz verschiedenen persönlichen und kulturellen Hintergründen miteinander lernen und arbeiten. Wir und unsere Teilnehmenden haben ganz unterschiedliche nationale, kulturelle, sexuelle, religiöse, … Identitäten. Die Akzeptanz dieser Vielfalt bildet den Kern unseres Selbstverständnisses. Solltest du dich einmal in einem unserer Kurse selbst diskriminiert fühlen oder Zeuge/in rassistischen, antisemitischen, homo- oder trans*phoben oder in sonst einer Weise diskriminierenden Handelns und Verhaltens sein, dann wende dich gern vertrauensvoll an eine*n unserer Dozierenden oder komme in unser Büro</i>

                                    </p>
                                </div>
                                <div className={'col-md-6'}>
                                    <span className={"card float-right"}>
                                        <div className="card-header bg-info">News</div>
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                                        </div>
                                    </span>

                                </div>
                            </div>
                        </div>

                    </div>

                </main>

                 <Footer/>
                </div>

            </div>


        );
    }
}

export default Home;