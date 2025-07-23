import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  // @inputs
  @Output() toggleSidebar = new EventEmitter<void>();
}
