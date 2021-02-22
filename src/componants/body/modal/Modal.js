import '../../../css/general.scss';
import '../../../css/var.scss';
import React from 'react';

class Modal extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        visible: true
    };

    componentWillReceiveProps() {
        console.log('dqzfz')
        this.setState({
            visible : true
        })
    }

    render() {

        return (
            <div className={this.state.visible ? "popModal in"  : "popModal out"}>
                <h1 className="ralLight">{this.props.country}</h1>

                <div>
                    <p>Deaths : {this.props.deaths}</p>
                    <p>Tested : {this.props.tested}</p>
                    <p>Active cases : {this.props.active_cases}</p>
                    <p>Critical : {this.props.critical}</p>
                    <p>Death ratio : {this.props.death_ratio}</p>
                    <p>Recovered : {this.props.recovered}</p>
                    <p>Recovery_ratio : {this.props.recovery_ratio}</p>
                    <p>Total_cases : {this.props.total_cases}</p>

                </div>

                <p className="deleteModal" onClick={() => this.setState({ visible: false })} >X</p>

            </div>

        )

    }

}

export default Modal;