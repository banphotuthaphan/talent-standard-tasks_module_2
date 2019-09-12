import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from './TalentCard.jsx';
import { Loader } from 'semantic-ui-react';
import CompanyProfile from './CompanyProfile.jsx';
import FollowingSuggestion from './FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: null
        }

        this.init = this.init.bind(this);
        this.updateWithoutSaveEmployer = this.updateWithoutSaveEmployer.bind(this)
        this.updateWithoutSaveTalent = this.updateWithoutSaveTalent.bind(this)
        this.updateWithoutSaveTalentWithMore = this.updateWithoutSaveTalentWithMore.bind(this)
        this.handleScroll = this.handleScroll.bind(this)

    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        //loader.allowedUsers.push("Employer")
        //loader.allowedUsers.push("Recruiter")
        this.setState({ loaderData });//comment this
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.loadData();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    loadData() {

        var cookies = Cookies.get('talentAuthToken');

        const position = this.state.loadPosition;
        const number = this.state.loadNumber;

        const url = 'http://localhost:60290/profile/profile/getTalent?position=' + position + '&number=' + number + '';

        $.ajax({
            url: url,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                if (this.state.loadPosition === 0) {
                    this.updateWithoutSaveTalent(res.data)
                    this.updateWithoutSaveEmployer(res.employer)
                }
                else {
                    this.updateWithoutSaveTalentWithMore(res.data)
                }

            }.bind(this)
        })

        this.init()
    }

    updateWithoutSaveTalentWithMore(newValues) {
        let talentProfiles = [...this.state.feedData, ...newValues];

        this.setState({
            feedData: talentProfiles
        })
    }

    //updates component's state without saving data
    updateWithoutSaveTalent(newValues) {
        let talentProfiles = Object.assign(this.state.feedData, newValues)

        this.setState({
            feedData: talentProfiles
        })
    }

    updateWithoutSaveEmployer(newValues) {
        let empolyerProfile = Object.assign({}, this.state.companyDetails, newValues)

        this.setState({
            companyDetails: empolyerProfile
        })
    }

    handleScroll() {

        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {

            const previousPosition = Object.assign(this.state.loadPosition);
            this.setState({
                loadPosition: previousPosition + 1
            })
            this.loadData();
        }
    }

    render() {

        const { feedData: talentList } = this.state;



        const companyDetails = this.state.companyDetails ? this.state.companyDetails : "";
        console.log('Feed data', this.state.feedData);
        //<h4> There are no talents found for your recruitment company</h4>
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui grid talent-feed container">
                    <div className="four wide column">
                        <CompanyProfile data={companyDetails} />
                    </div>
                    {talentList ? <div className="eight wide column">
                        {
                            talentList.map(t =>
                                <TalentCard
                                    data={t} />
                            )
                        }
                    </div> :
                        <h4> There are no talents found for your recruitment company</h4>
                    }

                    <div className="four wide column">
                        <div className="ui card">
                            <FollowingSuggestion />
                        </div>
                    </div>
                </div>
            </BodyWrapper>
        )
    }
}