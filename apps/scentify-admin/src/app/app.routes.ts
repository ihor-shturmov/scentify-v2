import { Route } from '@angular/router';
import { loadPerfumesResolver } from './resolvers/load-perfumes.resolver';
import { loadPerfumeByIdResolver } from './resolvers/load-perfume-by-id.resolver';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
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
        loadComponent: () => import('./pages/user-management/user-management').then(m => m.UserManagementComponent)
    }
];
