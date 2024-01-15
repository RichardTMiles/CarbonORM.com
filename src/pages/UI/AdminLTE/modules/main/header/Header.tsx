import {ADMIN_LTE} from "pages/UI/AdminLTE";
import {UI} from "pages/UI/MaterialDashboard";
import {Link} from 'react-router-dom';
import MessagesDropdown from 'pages/UI/AdminLTE/modules/main/header/messages-dropdown/MessagesDropdown';
import NotificationsDropdown from 'pages/UI/AdminLTE/modules/main/header/notifications-dropdown/NotificationsDropdown';
import LanguagesDropdown from 'pages/UI/AdminLTE/modules/main/header/languages-dropdown/LanguagesDropdown';
import UserDropdown from 'pages/UI/AdminLTE/modules/main/header/user-dropdown/UserDropdown';

const Header = () => {

  return (
    <nav className='main-header navbar navbar-expand'>
      <ul className="navbar-nav">
        <li className="nav-item">
          <button
            type="button"
            className="nav-link"
            data-widget="pushmenu"
          >
            <i className="fas fa-bars" />
          </button>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to={"/" + UI + ADMIN_LTE} className="nav-link">
            home
          </Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="#" className="nav-link">
            contact
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <MessagesDropdown />
        <NotificationsDropdown />
        <LanguagesDropdown />
        <UserDropdown />
        <li className="nav-item">
          <button
            type="button"
            className="nav-link"
            data-widget="control-sidebar"
          >
            <i className="fas fa-th-large" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
