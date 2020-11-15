import React from 'react';
import { connect } from 'react-redux';
import * as Constants from '../../Constants';
import * as tripSelectors from '../../Selectors/trip.selector';
import * as tripActions from '../../MyStore/actions/trip.actions';
import { Redirect } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { GiKnifeFork, GiMusicalNotes } from 'react-icons/gi';
import { FaHome } from 'react-icons/fa';
import { Row } from 'reactstrap';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import ExploreMap from './tripmap';
import './style.css';

const getItems = props => {
  return props?.venues;
};
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex, props) => {
  const result = props.venues;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  if (destination.length >= 5) {
    toast.info('Complete that day!');
    const result = [];
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    result[droppableDestination.droppableId] = destClone;
    result[droppableSource.droppableId] = sourceClone;
    return result;
  } else {
    const result = [];
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    let filter = [];
    filter = destClone.filter(val => val === removed);
    filter.length < 1 && destClone.splice(droppableDestination.index, 0, removed);
    // if (droppableDestination.droppableId !== "day_0") {
    result[droppableDestination.droppableId] = destClone;
    // }
    result[droppableSource.droppableId] = sourceClone;
    return result;
  }
};

const grid = 1;
const getItemStyle = (isDragging, draggableStyle, isDraggingOver) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 1,
  margin: `0 0 ${grid}px 0`,
  // change background colour if dragging
  background: isDragging ? '#CDCDCD' : 'transparent',
  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#f2f2f2' : 'white',
  borderColor: '3px solid green !important'
});

class Plan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activitiesList: []
    };
  }
  componentDidMount() {
    let { activitiesList } = this.state;
    let user = this.props.user.userId;
    for (let index = 0; index <= this.props.trip?.date?.xDays; index++) {
      activitiesList[`day_${index}`] = index === 0 ? getItems(this.props) : [];
    }
    this.setState({ activitiesList });
    this.props.updateUser(user);
  }
  onDragStart = result => {};
  onDragEnd = async result => {
    let activitiesList = this.state.activitiesList;
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.state.activitiesList[source.droppableId],
        source.index,
        destination.index,
        { ...this.props }
      );
      let state = { items };
      if (source.droppableId === 'day_2') {
        state = { selected: items };
      }
    } else {
      const result = move(
        activitiesList[source.droppableId],
        activitiesList[destination.droppableId],
        source,
        destination
      );
      activitiesList[source.droppableId] = result[source.droppableId];
      activitiesList[destination.droppableId] = result[destination.droppableId];
      activitiesList['day_0'] = getItems(this.props);
      this.setState({ activitiesList });
    }
  };

  handleTrip = () => {
    let dailyAgenda = this.state.activitiesList;
    let tripDetails = this.props.trip;
    delete dailyAgenda['day_0'];
    delete tripDetails.status;
    for (let index = 1; index <= this.props.trip?.date?.xDays; index++) {
      tripDetails.activities[index - 1] = dailyAgenda[`day_${index}`];
    }
    tripDetails.userId = this.props.auth.user.userId;
    this.props.addTrip(tripDetails);
    this.props.history.push('/tour');
  };
  render() {
    if (!this.props.auth?.isAuthenticated) return <Redirect to="" />;
    if (!this.props.trip?.date) return <Redirect to="/plan" />;
    return (
      <div className="plan">
        <div className="planHead">
          <div className="searchHeading">
            <div className="aboutheading">
              <h1>{Constants.PLAN_YOUR_TRIP}</h1>
            </div>
          </div>
          <div className="planHeadCity">
            <div>
              <h4>{`${this.props.trip?.location?.city}, ${this.props.trip?.location?.state}`}</h4>
            </div>
          </div>
          <div className="planHeadCity">
            <div>
              <h5>{`${this.props.trip?.date?.from} - ${this.props.trip?.date?.to}`}</h5>
            </div>
          </div>
        </div>
        <ExploreMap />
        {/* <Container>
          <DragDropContext
            onDragEnd={this.onDragEnd}
            onDragStart={this.onDragStart}
            onDragUpdate={this.onDragUpdate}
          >
            <Row>
              <Col className="planDropCol" xl={{ size: 6 }}>
                <Droppable droppableId="day_0">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      <Location {...this.props} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
              <Col xl={{ size: 6 }}>
                <div className="activity">
                  {renderMeActivityCards(this.props.trip?.date?.xDays, this.state)}
                </div>
              </Col>
            </Row>
          </DragDropContext>
          <div className="exportBtn">
            <CustomButton name={'Export'} onClick={this.handleTrip} />
          </div>
        </Container> */}
      </div>
    );
  }
}

const Location = props => {
  let activities = getItems(props);
  return (
    <div className="location">
      <div className="locationHead">
        <div className="locationHeadDiv">
          <h2>Saved Locations</h2>
        </div>
      </div>
      <div className="locationHead">
        <h4>Drag and drop saved locations to populate daily agendas</h4>
      </div>
      <div className="locationScroolDiv">
        <div className="locationScrool">
          {activities &&
            activities.map((venue, index) => {
              return (
                <Draggable key={venue._id} draggableId={`draggableId_${venue._id}`} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      <h3>
                        <FaCircle /> &nbsp; &nbsp; {venue?.businessName}
                      </h3>
                    </div>
                  )}
                </Draggable>
              );
            })}
          {props.venues.length < 1 && 'You do not have any saved place'}
        </div>
      </div>
    </div>
  );
};

const ActivityDiv = props => {
  return (
    <Droppable droppableId={`day_${props.nDay}`} style={{ minHieght: 'inherit' }}>
      {(provided, snapshot) => {
        return (
          <div
            className="activityCard"
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <Row>
              <div className="activityCardDay">
                <h1>{`Day ${props.nDay}`}</h1>
              </div>
              <div className="activityIcons">
                <FaHome className="activityIconsSize" />
                <GiKnifeFork className="activityIconsSize" />
                <GiMusicalNotes className="activityIconsSize" />
                <GiMusicalNotes className="activityIconsSize" />
                <GiKnifeFork className="activityIconsSize" />
              </div>
              <div className="activityIconsTime">
                <h3>9:00</h3>
                <h3>12:00</h3>
                <h3>14:50</h3>
                <h3>17:00</h3>
                <h3>21:00</h3>
              </div>
              <div className="activityTextDiv">
                {props.state?.map((activity, key) => {
                  return (
                    <Draggable
                      key={activity._id}
                      draggableId={`draggable_${props.nDay}_${activity._id}`}
                      index={key}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                          >
                            <h3> {activity?.businessName}</h3>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
              </div>
            </Row>
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

const renderMeActivityCards = (xDays, stateActivities) => {
  let cards = [];
  for (let index = 0; index < xDays; index++) {
    cards[index] = (
      <ActivityDiv
        key={index}
        nDay={index + 1}
        state={stateActivities.activitiesList[`day_${index + 1}`]}
      />
    );
  }
  return cards;
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    trip: tripSelectors.trip(state),
    business: state.business.businessList.venue,
    venues: state.venues.DetailsVenues,
    user: state.auth.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addTrip: payload => dispatch(tripActions.saveTrip(payload)),
    updateUser: user => dispatch(tripActions.updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
