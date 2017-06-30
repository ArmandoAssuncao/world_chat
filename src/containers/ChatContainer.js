import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadChatPersonList } from '../actions/ChatListActions';
import Chat from '../screens/Chat';

const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loadChatPersonList,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Chat);