import Home from './../views/Home';
import User from './../views/User';
import Error404 from './../views/Error404';
import LayoutBasic from './../layouts/LayoutBasic';

const routes = [{
    path: '/',
    component: Home,
    layout: LayoutBasic,
    exact: true
},{
    path: '/:username',
    component: User,
    layout: LayoutBasic,
    exact: true,
},{
    layout: LayoutBasic,
    component: Error404
}];

export default routes;