import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadUser } from '../actions/UserActions';
import FormUser from '../screens/FormUser';

const mapStateToProps = state => ({
  user: state.user,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loadUser,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(FormUser);