import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadChatPersonList } from '../actions/ChatListActions';
import Chats from '../screens/Chats';

const mapStateToProps = state => ({
  chat_person_list: state.chat_person_list,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loadChatPersonList,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Chats);