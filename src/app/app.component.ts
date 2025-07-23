import { DashboardContentComponent } from './features/dashboard/dashboard-content.component';
import { HeaderComponent } from "./core/components/header/header.component";
import { SidebarComponent } from "./core/components/sidebar/sidebar.component";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, DashboardContentComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  sidebarOpened = window.innerWidth > 800;

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }
}
