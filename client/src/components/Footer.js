import React, { Component } from 'react';

class Footer extends Component {

    render() {

        return (
            <footer className={'container-fluid pt-4 mb-5 pb-5 fixed-bottom bg-dark text-muted' } style={{zIndex:1, position:'relative'}}>
                <div className={'row'}>
                <div className={"col-md-4"}>
                        <section>
                            <p>
                            <b>Unsere Adresse</b> <br/>
                                Sprach- und Kulturbörse der TU Berlin<br/>

                                Raum 024 <br/>

                                Hardenbergstr. 36 <br/>

                                10587 Berlin <br/>
                            </p>
                        </section>

                    </div>
                    <div className={"col-md-4"}>
                        <section>
                            <p>
                                <b>Kontakt</b><br/>
                                Email: info@skb.tu-berlin.de <br/>
                                Tel: (030) 314 73224 <br/>
                            </p>
                        </section>
                    </div>
                    <div className={"col-md-4"}>
                        <section>
                                <b>Sprechstunden</b> <br/>


                                Sprechstunden ab 07.05.2018:
                                <ul>
                                    <li>
                                        Montag - 9:30 - 11:30 telefonisch und im Büro
                                    </li>
                                    <li>
                                        Dienstag     – 14:30 - 16:30 nur telefonisch
                                    </li>
                                    <li>
                                        Donnerstag – 14:00 - 16:00 telefonisch und im Büro
                                    </li>
                                    <li>
                                        Freitag       – 10:30 - 12:30 nur telefonisch

                                    </li>
                                </ul>
                                Eine Anmeldung für Kurse ist nicht vor Beginn des jeweiligen Einschreibezeitraums möglich.
                        </section>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;