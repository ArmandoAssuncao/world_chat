import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPeopleList } from '../actions/PeopleListActions';
import MapPeople from '../screens/MapPeople';

const mapStateToProps = state => ({
  people_list: state.people_list,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loadPeopleList,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MapPeople);