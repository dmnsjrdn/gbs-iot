import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineTrash,
  HiOutlineCog6Tooth,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineBookOpen
} from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineChartBar />
            <span>Dashbord</span>
          </StyledNavLink>
        </li>
         <li>
          <StyledNavLink to="/logs">
            <HiOutlineBookOpen />
            <span>Logs</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bins">
            <HiOutlineTrash />
            <span>Bins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/configurations">
            <HiOutlineCog6Tooth />
            <span>Configurations</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
