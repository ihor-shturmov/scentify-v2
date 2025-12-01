import { Route } from '@angular/router';
import { loadPerfumesResolver } from './resolvers/load-perfumes.resolver';
import { loadPerfumeByIdResolver } from './resolvers/load-perfume-by-id.resolver';
import { loadDashboardResolver } from './resolvers/load-dashboard.resolver';
import { loadUsersResolver } from './resolvers/load-users.resolver';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        resolve: {
            dashboard: loadDashboardResolver
        },
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
    },
    {
        path: 'perfumes',
        resolve: {
            perfumes: loadPerfumesResolver
        },
        loadComponent: () => import('./pages/perfume-list/perfume-list').then(m => m.PerfumeListComponent)
    },
    {
        path: 'perfumes/new',
        loadComponent: () => import('./pages/perfume-form/perfume-form').then(m => m.PerfumeFormComponent)
    },
    {
        path: 'perfumes/:id/edit',
        resolve: {
            perfume: loadPerfumeByIdResolver
        },
        loadComponent: () => import('./pages/perfume-form/perfume-form').then(m => m.PerfumeFormComponent)
    },
    {
        path: 'users',
        resolve: {
            users: loadUsersResolver
        },
        loadComponent: () => import('./pages/user-management/user-management').then(m => m.UserManagementComponent)
    }
];
