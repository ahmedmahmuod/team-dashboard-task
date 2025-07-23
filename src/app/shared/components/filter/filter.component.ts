import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../../features/dashboard/team/services/team.service';
import { TeamFilters } from '../../../features/dashboard/team/models/team-member.interface';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  // Events to emit filter changes or clear action
  @Output() filtersChange = new EventEmitter<TeamFilters>();
  @Output() clearFilters = new EventEmitter<void>();

  // Current filter values
  filters: TeamFilters = {
    search: '',
    role: '',
    status: ''
  };

  // Dropdown data sources
  roles$: Observable<string[]>;
  statuses$: Observable<string[]>;

  // Search input observable with debounce
  private searchInput$ = new Subject<string>();

  // Track all subscriptions
  private subscriptions = new Subscription();

  constructor(private teamService: TeamService) {
    // Load unique roles and statuses from service
    this.roles$ = this.teamService.getUniqueRoles();
    this.statuses$ = this.teamService.getUniqueStatuses();
  }

  ngOnInit(): void {
    // Listen to debounced search input and emit filters
    this.subscriptions.add(
      this.searchInput$
        .pipe(
          map(value => value.trim()),
          debounceTime(400),
          distinctUntilChanged()
        )
        .subscribe(search => {
          this.filters.search = search;
          this.emitFilters();
        })
    );

    // Sync initial filter state from service
    this.subscriptions.add(
      this.teamService.filters$.subscribe(filters => {
        this.filters = { ...filters };
      })
    );
  }

  // Triggered when search input changes
  onSearchChange(search: string): void {
    this.searchInput$.next(search);
  }

  // Triggered when role is selected
  onRoleChange(role: string): void {
    this.filters.role = role;
    this.emitFilters();
  }

  // Triggered when status is selected
  onStatusChange(status: string): void {
    this.filters.status = status;
    this.emitFilters();
  }

  // Clears all filters
  onClearFilters(): void {
    this.filters = { search: '', role: '', status: '' };
    this.clearFilters.emit();
    this.emitFilters();
  }

  // Emit the current filters to parent
  private emitFilters(): void {
    this.filtersChange.emit({ ...this.filters });
  }

  // Check if there are any active filters
  get hasActiveFilters(): boolean {
    return !!(this.filters.search || this.filters.role || this.filters.status);
  }

  // Cleanup on destroy
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
