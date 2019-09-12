import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon } from 'semantic-ui-react'

const inlineStye = {
    display: 'inline-block',
    width: '25%'
}

const iconLeftMargin = {
    marginLeft: '50%'
}

const cardWidth = {
    width: '550px'
}

const borderBottom = {
    marginBottom: '15px',
    fontSize: '12px'
}


export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetails: true
        }

        this.handleChangeView = this.handleChangeView.bind(this)

    };

    handleChangeView() {

        this.setState({
            showDetails: this.state.showDetails ? false : true
        })

    }

    render() {
        return (
            this.state.showDetails ? this.renderDetails() : this.renderVideo()
        )
    }

    renderVideo() {
        return (
            <div style={cardWidth} className="ui card fluid">
                <div clasName="content">
                    <video width="100%" controls>

                        Your browser does not support HTML5 video.
                    </video>
                </div>
                <div className="extra content eight wide column">

                    <div style={inlineStye} >
                        <i style={iconLeftMargin} className="middle big user icon" onClick={this.handleChangeView}></i>
                    </div>
                    <div style={inlineStye} >
                        <i style={iconLeftMargin} className="big file pdf outline icon"></i>
                    </div>
                    <div style={inlineStye} >
                        <i style={iconLeftMargin} className="big linkedin alternate icon"></i>
                    </div>
                    <div style={inlineStye}>
                        <i style={iconLeftMargin} className="big github icon"></i>
                    </div>
                </div>
            </div>
        )

    }

    renderDetails() {
        const { name,
            currentEmpolyment,
            visa,
            skills } = this.props.data;

        return (
            <div style={cardWidth} className="ui fluid card items">
                <div class="content">
                    <i class="right floated star icon"></i>
                    <div class="header">{name}</div>
                </div>
                <div class="item">
                    <div class="image">
                        <img
                            class="ui large image"
                            src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
                    </div>
                    <div class="content">
                        <div>
                            <h4>Talent Snapshort</h4>
                        </div>
                        <div class="meta">
                        </div>
                        <div style={borderBottom}><b>CURRENT EMPLOYER</b> <br />
                            <span>{currentEmpolyment}</span>
                        </div>
                        <div style={borderBottom}><b>VISA STATUS</b> <br />
                            <span>{visa}</span>
                        </div>
                        <div style={borderBottom}><b>POSITION</b> <br />
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className="extra">
                    <div style={inlineStye} >
                        <i style={iconLeftMargin} className="middle big video icon" onClick={this.handleChangeView}></i>
                    </div>
                    <div style={inlineStye} >
                        <i style={iconLeftMargin} className="big file pdf outline icon"></i>
                    </div>
                    <div style={inlineStye} >
                        <i style={iconLeftMargin} className="big linkedin alternate icon"></i>
                    </div>
                    <div style={inlineStye}>
                        <i style={iconLeftMargin} className="big github icon"></i>
                    </div>
                </div>
                <div className="extra">
                    {skills.length > 0 && skills.map(s =>
                        <button class="ui blue basic button">{s.name}</button>
                    )}
                </div>
            </div>)
    }
}

