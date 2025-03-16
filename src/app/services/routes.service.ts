import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { routes } from '../app.routes'; // Import the app routes

@Injectable({
    providedIn: 'root'
})
export class RoutesService {
    constructor() { }

    /** Get all defined routes */
    getRoutes() {
        return routes
            .filter(route => route.path !== undefined) // Ensure no undefined paths
            .map(route => ({
                path: route.path || '', // Default to empty string if undefined
                name: this.formatRouteName(route.path || '') // Ensure always string
            }));
    }

    /** Format route names for UI */
    private formatRouteName(path: string): string {
        return path
            .replace(/-/g, ' ') // Replace hyphens with spaces
            .replace(/staff/g, 'Staff') // Capitalize keywords
            .replace(/dashboard/g, 'Dashboard')
            .replace(/events/g, 'Events')
            .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
    }
}