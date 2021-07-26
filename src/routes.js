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
// const Fichier = React.lazy(() => import('./views/fichier/Fichier'));



const routes = [
  { path: '/', exact: true, name: 'Accueil', component: Dashboard , roles:['ADMIN','OPERATEUR'] },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard , roles:['ADMIN','OPERATEUR'] },
  // { path: '/carte', exact: true, name: 'Carte', component: Carte },
  // { path: '/fichier', exact: true, name: 'Fichier', component: Fichier, roles:['ADMIN','OPERATEUR']},

  { path: '/utilisateurs/create', exact: true, name: 'Ajouter', component: UserForm , roles:['ADMIN']},//CRAETE
  { path: '/utilisateurs', exact: true,  name: 'Utilisateurs', component: Users , roles:['ADMIN']},//READ
  { path: '/utilisateurs/edit/:id', exact: true, name: 'Modifier', component: UserForm , roles:['ADMIN',]},//UPDATE

  { path: '/institutions/create', exact: true, name: 'Ajouter', component: InstitutionForm , roles:['ADMIN']},//CRAETE
  { path: '/institutions', exact: true,  name: 'Institutions', component: Institutions , roles:['ADMIN']},//READ
  { path: '/institutions/edit/:id', exact: true, name: 'Modifier', component: InstitutionForm , roles:['ADMIN']},//UPDATE

  { path: '/test_types/create', exact: true, name: 'Ajouter', component: TestTypeForm , roles:['ADMIN']},//CRAETE
  { path: '/test_types', exact: true,  name: 'Types de d\'essais ', component: TestTypes , roles:['ADMIN']},//READ
  { path: '/test_types/edit/:id', exact: true, name: 'Modifier', component: TestTypeForm , roles:['ADMIN']},//UPDATE

  { path: '/tests/create', exact: true, name: 'Ajouter', component: TestForm , roles:['OPERATEUR']},//CRAETE
  { path: '/tests', exact: true,  name: 'Essais ', component: Tests , roles:['OPERATEUR']},//READ
  { path: '/tests/edit/:id', exact: true, name: 'Modifier', component: TestForm , roles:['OPERATEUR']},//UPDATE

  { path: '/pdf/:id', exact: true, name: 'Document PDF', component: PDF , roles:['ADMIN','OPERATEUR']}
];

export default routes;
