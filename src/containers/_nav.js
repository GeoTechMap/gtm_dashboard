import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav = {
  admin: [
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    },
    {
      _tag: 'CSidebarNavTitle',
      _children: ['Menu']
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Utilisateurs',
      to: '/utilisateurs',
      icon: 'cil-user',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Institutions',
      to: '/institutions',
      icon: 'cil-home',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Types d\'essai',
      to: '/test_types',
      icon: 'cil-pencil',
    },

  ],
  adminInstitution: [
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    },
    {
      _tag: 'CSidebarNavTitle',
      _children: ['Menu']
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Essais',
      to: '/tests',
      icon: 'cil-map',
    },
  ],
  operateur:[
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    },
    {
      _tag: 'CSidebarNavTitle',
      _children: ['Menu']
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Essais',
      to: '/tests',
      icon: 'cil-map',
    },
  ],

  
} 
export default _nav
