import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadChatList } from '../actions/ChatListActions';
import Chats from '../screens/Chats';

const mapStateToProps = state => ({
  chat_list: state.chat_list,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loadChatList,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Chats);