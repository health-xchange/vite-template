import {
  IconReceipt2,
  IconLogout,
  IconUsersGroup,
  IconDatabase,
} from '@tabler/icons-react';
import classes from './AdminSideNav.module.css';

const data = [
  { link: '', id: 'users', label: 'users', icon: IconUsersGroup },
  { link: '', id: 'billing', label: 'Billing', icon: IconReceipt2 },
  { link: '', id: 'claims', label: 'Claims', icon: IconDatabase },
];

export function AdminSideNav(props: { activeTab: string, onTabChange: (tabId: string) => void }) {
  const { activeTab, onTabChange } = props;

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.id === activeTab || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        onTabChange(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
