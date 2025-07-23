import { TeamService } from './../services/team.service';
import { ViewMode } from './../../../../features/dashboard/team/models/team-member.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamPageComponent } from './team-page.component';
import { provideHttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';


describe('TeamPageComponent', () => {
  let component: TeamPageComponent;
  let fixture: ComponentFixture<TeamPageComponent>;
  let mockTeamService: jasmine.SpyObj<TeamService>;

  beforeEach(async () => {
    mockTeamService = jasmine.createSpyObj(
      'TeamService',
      [
        'loadTeamMembers',
        'updateFilters',
        'clearFilters',
        'setViewMode',
        'getUniqueRoles',
        'getUniqueStatuses',
      ],
      {
        filteredTeamMembers$: of([]),
        loading$: of(false),
        viewMode$: of(ViewMode.GRID),
        filters$: of({ search: '', role: '', status: '' }),
        teamMembers$: of([]),
      }
    );

    await TestBed.configureTestingModule({
      imports: [TeamPageComponent],
      providers: [
        provideHttpClient(),
        { provide: TeamService, useValue: mockTeamService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadTeamMembers on init', () => {
    expect(mockTeamService.loadTeamMembers).toHaveBeenCalled();
  });
});
