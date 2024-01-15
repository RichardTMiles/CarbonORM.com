import {Link} from 'react-router-dom';

import styled from 'styled-components';
import {PfDropdown} from '@profabric/react-components';

export const StyledDropdown = styled(PfDropdown)`
  border: none;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  --pf-dropdown-menu-min-width: 18rem;
  --pf-dropdown-menu-margin-top:300px;
  .dropdown-item {
    padding: 0.5rem 1rem;
  }

  .text-sm {
    margin-bottom: 0;
  }
  .dropdown-divider {
    margin: 0;
  }
`;

const NotificationsDropdown = () => {
  

  return (
    <StyledDropdown hideArrow>
      <div slot="button">
        <i className="far fa-bell" />
        <span className="badge badge-warning navbar-badge">15</span>
      </div>
      <div slot="menu">
        <span className="dropdown-item dropdown-header">
          header.notifications.count
        </span>
        <div className="dropdown-divider" />
        <Link to="/" className="dropdown-item">
          <i className="fas fa-envelope mr-2" />
          <span>
            header.notifications.newMessagesCount
          </span>
          <span className="float-right text-muted text-sm">
            measurement.quantityUnit
          </span>
        </Link>
        <div className="dropdown-divider" />
        <Link to="/" className="dropdown-item">
          <i className="fas fa-users mr-2" />
          <span>
            header.notifications.friendRequestsCount
          </span>
          <span className="float-right text-muted text-sm">
            measurement.quantityUnit
          </span>
        </Link>
        <div className="dropdown-divider" />
        <Link to="/" className="dropdown-item">
          <i className="fas fa-file mr-2" />
          <span>
            header.notifications.reportsCount
          </span>
          <span className="float-right text-muted text-sm">
            measurement.quantityUnit
          </span>
        </Link>
        <div className="dropdown-divider" />
        <Link to="/" className="dropdown-item dropdown-footer">
          header.notifications.seeAll
        </Link>
      </div>
    </StyledDropdown>
  );
};

export default NotificationsDropdown;
