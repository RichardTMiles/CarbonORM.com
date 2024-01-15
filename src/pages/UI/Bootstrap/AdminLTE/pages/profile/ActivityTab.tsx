import Post from 'pages/UI/Bootstrap/AdminLTE/pages/profile/Post';

const ActivityTab = ({isActive}: {isActive: boolean}) => {
  return (
    <div className={`tab-pane ${isActive ? 'active' : ''}`}>
      <Post />
      <Post isClearfix={false} />
      <Post />
    </div>
  );
};

export default ActivityTab;
