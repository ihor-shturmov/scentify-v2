import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './header.html',
})
export class HeaderComponent {
    isMenuOpen = false;

    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }
}
