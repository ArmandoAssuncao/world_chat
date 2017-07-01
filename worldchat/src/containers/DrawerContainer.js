import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadUser } from '../actions/UserActions';
import Drawer from '../component/Drawer';

const mapStateToProps = state => ({
  user: state.user,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loadUser,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);