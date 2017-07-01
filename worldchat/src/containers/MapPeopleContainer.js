import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPeopleList } from '../actions/PeopleListActions';
import { saveCoordinate } from '../actions/CoordinateActions';
import MapPeople from '../screens/MapPeople';

const mapStateToProps = state => ({
  people_list: state.people_list,
  coordinate: state.coordinate,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loadPeopleList,
    saveCoordinate,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MapPeople);