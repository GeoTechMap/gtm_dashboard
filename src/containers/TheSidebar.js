import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import logo from './target.svg';
import Search from '../views/carte/Search';
import { CounterContextProvider } from "../views/carte/EssaisContext";
// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.changeState.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" style={{color:'black'}} to="/">
       <h4>Ge</h4>
      {/* <CIcon
          className="c-sidebar-brand-full"
          name="target"
          height={25}
        /> */}
         <img src={logo}  width="30" height="30" alt="logo" style={{marginRight:'-5px'}}></img>
        <h4>TechMap</h4>
        {/* <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> */}
   
      </CSidebarBrand>
      {/* <CounterContextProvider>
              <Search />                           
         </CounterContextProvider> */}
      <CSidebarNav>


        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />  
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
     
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
