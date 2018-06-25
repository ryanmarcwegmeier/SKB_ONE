import React, { Component } from 'react';
import Footer from '../components/Footer'
import Header from "../components/Header";

/**
 * represents Impressum view
 */
class Impressum extends Component {
    /**
     * constructor
     * @param props
     */
    constructor(props){
        sessionStorage.clear()
        super(props);
    }




    render () {
        return (
            <div className="App">
                <div className={"content"}>
                    <Header text={'Impressum'}/>
                    <main className={'container-fluid'}>
                        <div className={'row'}>
                            <div className={'col-md-9 ml-auto mr-auto border rounded bg-light rounded shadow m-3'}>
                                <article>
                                        Die Sprach- und Kulturbörse ist eine Einrichtung an der TU Berlin.
                                    <section>
                                        <h5><b>Leitung</b></h5>
                                        <div>Prof. Dr. Angela Ittel</div>
                                        <div>Vizepräsidentin für Internationales und Lehrkräftebildung</div>
                                        <div>Straße des 17. Juni 135</div>
                                        <div>10623 Berlin</div>
                                    </section>
                                    <section>
                                            <h5><b>Fachliche Betreuung</b></h5>
                                            <div>Prof. Dr. Thorsten Roelcke</div>
                                            <div>Lehrstuhl für Deutsch als Fremdsprache</div>
                                            <div>Institut für Sprache und Kommunikation</div>
                                            <div>Hardenbergstraße 16-18</div>
                                            <div>10623 Berlin</div>
                                    </section>
                                    <section>
                                            <h5><b>Studentische Koordination der Sprach- und Kulturbörse:</b></h5>
                                            <div>Adina Bielenberg</div>
                                            <div>Julia Schlauch</div>
                                            <div>Mona Kroppen</div>
                                            <div>Taisija Cesar</div>
                                            <div>Viridiana Cortes Coria</div>

                                            <div>Hardenbergstraße 16-18</div>
                                            <div>10623 Berlin</div>
                                    </section>
                                </article>
                                <article>
                                    <h5><b>Rechtlicher Hinweis</b></h5>
                                    <p style={{textAlign:'justify'}}>Von den von uns betreuten Seiten führen Links zu anderen Seiten im Internet. Entsprechend dem Urteil des Landgerichts Hamburg vom 12. Mai 1998 wird hiermit erklärt, dass wir keinen Einfluss auf die Gestaltung und auf die Inhalte der gelinkten Seiten haben. Zum Zeitpunkt der Verlinkung wurden die Seiten auf ihren Inhalt kontrolliert. Wir distanzieren uns hiermit ausdrücklich von allen Inhalten aller gelinkten Seiten, die nach dem Zeitpunkt der Verlinkung verändert wurden.</p>
                                </article>


                            </div>

                        </div>

                    </main>

                    <Footer/>
                </div>

            </div>
        )
    }


}

export default Impressum;