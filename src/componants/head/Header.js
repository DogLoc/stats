import '../../css/head.scss';
import '../../css/var.scss';
import React from 'react';

class Header extends React.Component {
    constructor() {
        super();
    }
    render() {
        return(
        <div className="container-fluid">

            <div className="container text-center">
                <h1 className="titrePrincipal ralLight">Covid <span className="ralMedium">Statistiques</span></h1>

                <div className="row justify-content-center ligneRougeContainer">
                    <div className="ligneRouge"></div>
                </div>

            </div>
        </div>
        );
    }
}

export default Header;