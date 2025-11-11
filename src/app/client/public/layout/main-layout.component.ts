import { Component } from '@angular/core';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'] // Note the use of SCSS
})
export class MainLayoutComponent {
    // No complex state or logic needed here, as the content is mainly public-facing.
    // We're assuming the logic for the "Go to Admin" button is purely navigational (routerLink).
    isSearchBarVisible: boolean = true;
    searchQuery: string = '';
    constructor() { }

    closeSearchOverlay() {
        this.isSearchBarVisible = false;
    }
    performSearch() {
        if (this.searchQuery.trim()) {
            console.log('Searching for:', this.searchQuery);
            // TODO: Navigate to the search results page
            this.closeSearchOverlay();
        }
    }
    openSearchBar() {
        this.isSearchBarVisible = true;
    }
    //----------------------------------------------------
    // Toggles the visibility of the search bar
    toggleSearchBar() {
        this.isSearchBarVisible = !this.isSearchBarVisible;
        if (!this.isSearchBarVisible) {
            this.searchQuery = ''; // Clear search on close
        }
    }

    // Explicitly closes the search bar
    closeSearchBar() {
        this.isSearchBarVisible = false;
        this.searchQuery = '';
    }

    // Handles the search submission


    // ngOnInit() or other lifecycle hooks can be added if needed later.
}