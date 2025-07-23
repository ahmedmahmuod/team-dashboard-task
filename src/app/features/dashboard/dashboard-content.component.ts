import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-dashboard-content",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./dashboard-content.component.html",
  styleUrl: "./dashboard-content.component.scss",
})
export class DashboardContentComponent {}
