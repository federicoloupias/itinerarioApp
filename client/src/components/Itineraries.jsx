import React from  'react';
import Menu from './Menu';
import {connect} from 'react-redux';
import {getItineraries} from '../actions/itineraryActions';
import{getFavs} from '../actions/likesActions';
import ButtonCol from './ButtonCollapse';
import LikeButton from './LikeButton';


class CityItinerary extends React.Component {
  constructor() {
    super();

    this.state= {
      city:{},
      active: false,
    }
  }

  async componentDidMount(){
    const { match: { params } } = this.props;
    await this.props.getItineraries(params.cityID);
    
    this.props.getFavs(this.props.auth.user._id);

    this.setState({cities: this.props.city.cities});
    this.findCity(params.cityID)
  }

  findCity(id){
    var cityF = this.state.cities;
    cityF = cityF.find(city => {
      return city._id.indexOf(id) !== -1;
    });
    this.setState({city: cityF});
  }

  
  render(){
    const {itineraries} = this.props.itinerary;
    return (
      <div>
        <Menu />
        <div className="itineraryContainer">
          <div id="banner">
            <img src={this.state.city.img} id="bannerImg" alt={this.state.city.name}></img>
            <h1 id="title">{this.state.city.name}</h1>
          </div>
          <h4 id="subtitle">Available MyTineraries:</h4>
          <div id="itcontainer">
            {this.props.itinerary.isEmpty ? <p id="noItinerary">Nothing here</p> :
              <div> 
                {itineraries.map((itinerary, i) =>
                  <div id="itinerary" key={i}>
                    <div id="divImg">
                      <img src={itinerary.profilePic} id="profilePic" alt="profile"></img>
                    </div>
                    <div id="itineraryInfo">
                      <h4>{itinerary.title}</h4>
                      {this.props.auth.isAuthenticated ? <LikeButton id={itinerary._id} cityId={this.props.match.params.cityID}/> : <div></div>}
                      <div id="feedback">
                        <p>Likes: {itinerary.rating}</p>
                        <p>{itinerary.duration} hours</p>
                        <p>${itinerary.price}</p>
                      </div>
                    </div>
                    <p>{itinerary.hashtag}</p>
                    <ButtonCol id={itinerary._id} index={i}/>
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  itinerary: state.itinerary,
  city: state.city,
  auth: state.auth,
});

export default connect (mapStateToProps,{getItineraries, getFavs})(CityItinerary);