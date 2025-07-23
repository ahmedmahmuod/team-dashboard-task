import { PaginationComponent } from './../../../../shared/components/pagination/pagination.component';
import { TeamCardComponent } from './../../../../features/dashboard/team/components/team-card/team-card.component';
import { FilterComponent } from './../../../../shared/components/filter/filter.component';
import { TeamFilters, ViewMode } from './../../../../features/dashboard/team/models/team-member.interface';
import { TeamService } from './../services/team.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaginatorModule } from "primeng/paginator";
import { combineLatest, debounceTime, map, take } from 'rxjs';

@Component({
  selector: "app-team-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FilterComponent,
    TeamCardComponent,
    PaginationComponent,
    PaginatorModule
  ],
  templateUrl: "./team-page.component.html",
  styleUrls: ["./team-page.component.scss"],
})
export class TeamPageComponent implements OnInit {
  // Observables from the service
  filteredTeamMembers$ = this.teamService.filteredTeamMembers$;
  loading$ = this.teamService.loading$;
  viewMode$ = this.teamService.viewMode$;

  // Pagination state (now as observable)
  paginationState$ = combineLatest([
    this.filteredTeamMembers$,
    this.viewMode$
  ]).pipe(
    debounceTime(100),
    map(([members]) => ({
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      totalRecords: members.length
    }))
  );

  // Local pagination properties
  currentPage: number = 0;
  pageSize: number = 10;

  // Expose enum for template
  ViewMode = ViewMode;

  constructor(
    private teamService: TeamService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.checkAndLoadTeamMembers();
  }

  checkAndLoadTeamMembers(): void {
    this.teamService.teamMembers$.pipe(take(1)).subscribe(members => {
      if (members.length === 0) {
        this.loadTeamMembers();
      }
    });
  }

  loadTeamMembers(): void {
    this.teamService.loadTeamMembers().subscribe({
      error: (error) => console.error("Error loading team members:", error),
    });
  }

  onFiltersChange(filters: TeamFilters): void {
    this.currentPage = 0; // Reset to first page on filter change
    this.teamService.updateFilters(filters);
    this.cdr.markForCheck(); // Ensure UI updates
  }

  onPageChange(event: { page: number, pageSize: number }): void {
    this.currentPage = event.page;
    this.pageSize = event.pageSize;
    this.cdr.markForCheck(); // Explicit change detection
  }

  onClearFilters(): void {
    this.currentPage = 0;
    this.teamService.clearFilters();
    this.cdr.markForCheck();
  }

  onViewModeChange(mode: ViewMode): void {
    this.teamService.setViewMode(mode);
  }

  trackByMemberId(index: number, member: any): string {
    return member.id;
  }
}