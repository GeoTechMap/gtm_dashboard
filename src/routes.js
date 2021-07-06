import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const UserForm = React.lazy(() => import('./views/users/UserForm'));
const Users = React.lazy(() => import('./views/users/Users'));

const InstitutionForm = React.lazy(() => import('./views/institutions/InstitutionForm'));
const Institutions = React.lazy(() => import('./views/institutions/Institutions'));

const TestTypeForm = React.lazy(() => import('./views/test_types/TestTypeForm'));
const TestTypes = React.lazy(() => import('./views/test_types/TestTypes'));

const TestForm = React.lazy(() => import('./views/essais/EssaiForm'));
const Tests = React.lazy(() => import('./views/essais/Essais'));
const PDF = React.lazy(() => import('./views/essais/PDF'));

// const Carte = React.lazy(() => import('./views/carte/Carte'));
const Fichier = React.lazy(() => import('./views/fichier/Fichier'));



const routes = [
  { path: '/', exact: true, name: 'Accueil', component: Dashboard , roles:['SUPER_ADMIN','ADMIN_INSTITUTION','OPERATEUR'] },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard , roles:['SUPER_ADMIN','ADMIN_INSTITUTION','OPERATEUR'] },
  // { path: '/carte', exact: true, name: 'Carte', component: Carte },
  { path: '/fichier', exact: true, name: 'Fichier', component: Fichier, roles:['SUPER_ADMIN','ADMIN_INSTITUTION','OPERATEUR']},

  { path: '/utilisateurs/create', exact: true, name: 'Ajouter', component: UserForm , roles:['SUPER_ADMIN','ADMIN_INSTITUTION']},//CRAETE
  { path: '/utilisateurs', exact: true,  name: 'Utilisateurs', component: Users , roles:['SUPER_ADMIN','ADMIN_INSTITUTION']},//READ
  { path: '/utilisateurs/edit/:id', exact: true, name: 'Modifier', component: UserForm , roles:['SUPER_ADMIN', 'ADMIN_INSTITUTION']},//UPDATE

  { path: '/institutions/create', exact: true, name: 'Ajouter', component: InstitutionForm , roles:['SUPER_ADMIN']},//CRAETE
  { path: '/institutions', exact: true,  name: 'Institutions', component: Institutions , roles:['SUPER_ADMIN']},//READ
  { path: '/institutions/edit/:id', exact: true, name: 'Modifier', component: InstitutionForm , roles:['SUPER_ADMIN']},//UPDATE

  { path: '/test_types/create', exact: true, name: 'Ajouter', component: TestTypeForm , roles:['SUPER_ADMIN']},//CRAETE
  { path: '/test_types', exact: true,  name: 'Types de d\'essais ', component: TestTypes , roles:['SUPER_ADMIN']},//READ
  { path: '/test_types/edit/:id', exact: true, name: 'Modifier', component: TestTypeForm , roles:['SUPER_ADMIN']},//UPDATE

  { path: '/tests/create', exact: true, name: 'Ajouter', component: TestForm , roles:['OPERATEUR']},//CRAETE
  { path: '/tests', exact: true,  name: 'Essais ', component: Tests , roles:['OPERATEUR']},//READ
  { path: '/tests/edit/:id', exact: true, name: 'Modifier', component: TestForm , roles:['OPERATEUR']},//UPDATE

  { path: '/pdf/:id', exact: true, name: 'Document PDF', component: PDF , roles:['SUPER_ADMIN','ADMIN_INSTITUTION','OPERATEUR']}
];

export default routes;
