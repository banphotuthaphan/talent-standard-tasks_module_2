import React from 'react';
import { Loader } from 'semantic-ui-react';

const bottomBorder = {
    marginBottom: '15px'
}

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const name = this.props.data.companyContact ? this.props.data.companyContact.name : "";
        const phone = this.props.data.companyContact ? this.props.data.companyContact.phone : "";
        const email = this.props.data.companyContact ? this.props.data.companyContact.email : "";

        const city = this.props.data.companyContact ? this.props.data.companyContact.location.city: "";
        const country = this.props.data.companyContact ? this.props.data.companyContact.location.country : "";


        return (
            <React.Fragment>
                <div className="ui card">
                    <div className="content">
                        <div className="center aligned header" style={bottomBorder}>
                            <img
                                className="ui tiny circular image"
                                src="https://react.semantic-ui.com/images/wireframe/image.png">
                            </img>
                        </div>
                        <div className="center aligned header">
                            {name} 
                        </div>
                        <div className="center aligned meta">
                            <i class="map pin icon"></i>
                            {city}, {country}
                            </div>
                        <div className="center aligned description">
                            <p>We currently do not have specific sills that we desires.</p>
                        </div>
                    </div>
                    <div className="extra">
                        <div className="left aligned author">
                            <i class="phone icon"></i>
                            : {phone}<br/>
                            <i class="envelope icon"></i>
                            : {email}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}