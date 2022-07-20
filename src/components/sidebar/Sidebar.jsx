import './sidebar.css';
import { PermIdentity, Storefront, AttachMoney, AddBox } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Orders
              </li>
            </Link>

            <Link to="/newproduct" className="link">
              <li className="sidebarListItem">
                <AddBox className="sidebarIcon" />
                Add Product
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
