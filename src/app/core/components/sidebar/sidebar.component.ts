import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  // Privates
  private router = inject(Router);

  // @Inputs & Outputs
  @Input() opened = true;
  @Output() closed = new EventEmitter<void>();

  get isMobile() {
    return window.innerWidth <= 767;
  }

  closeSidebar() {
    this.closed.emit();
  }

  // on Go to home func
  goToHome() {
    this.router.navigate(["/"]);
  }
}
