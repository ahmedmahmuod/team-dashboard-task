import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TeamMember, TeamFilters, ViewMode } from '../models/team-member.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamMembersSubject = new BehaviorSubject<TeamMember[]>([]);
  private filtersSubject = new BehaviorSubject<TeamFilters>({
    search: '',
    role: '',
    status: ''
  });
  private viewModeSubject = new BehaviorSubject<ViewMode>(ViewMode.GRID);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private dataLoaded = false;

  public teamMembers$ = this.teamMembersSubject.asObservable();
  public filters$ = this.filtersSubject.asObservable();
  public viewMode$ = this.viewModeSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  public filteredTeamMembers$: Observable<TeamMember[]> = combineLatest([
    this.teamMembers$,
    this.filters$
  ]).pipe(
    map(([members, filters]) => this.filterTeamMembers(members, filters))
  );

  constructor(private http: HttpClient) {}

  loadTeamMembers(): Observable<TeamMember[]> {
    if (this.dataLoaded) {
      return of(this.teamMembersSubject.value);
    }

    this.loadingSubject.next(true);

    return this.http.get<TeamMember[]>('/assets/data/team.json').pipe(
      tap({
        next: (members) => {
          this.teamMembersSubject.next(members);
          this.loadingSubject.next(false);
          this.dataLoaded = true;
        },
        error: () => this.loadingSubject.next(false)
      })
    );
  }

  updateFilters(filters: Partial<TeamFilters>): void {
    const currentFilters = this.filtersSubject.value;
    const newFilters = { ...currentFilters, ...filters };

    if (JSON.stringify(currentFilters) !== JSON.stringify(newFilters)) {
      this.filtersSubject.next(newFilters);
    }
  }

  clearFilters(): void {
    this.filtersSubject.next({
      search: '',
      role: '',
      status: ''
    });
  }

  setViewMode(mode: ViewMode): void {
    this.viewModeSubject.next(mode);
  }

  private filterTeamMembers(members: TeamMember[], filters: TeamFilters): TeamMember[] {
    if (!members) return [];

    const trimmedSearch = filters.search?.trim().toLowerCase();

    return members.filter(member => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      const email = member.email.toLowerCase();

      const matchesSearch =
        !trimmedSearch ||
        fullName.includes(trimmedSearch) ||
        email.includes(trimmedSearch);

      const matchesRole = !filters.role || member.role === filters.role;
      const matchesStatus = !filters.status || member.status === filters.status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }

  getUniqueRoles(): Observable<string[]> {
    return this.teamMembers$.pipe(
      map(members => [...new Set(members.map(member => member.role))].sort())
    );
  }

  getUniqueStatuses(): Observable<string[]> {
    return this.teamMembers$.pipe(
      map(members => [...new Set(members.map(member => member.status))].sort())
    );
  }
}