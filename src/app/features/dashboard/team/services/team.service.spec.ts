import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TeamService } from './team.service';
import { TeamMember, TeamMemberStatus, ViewMode } from '../models/team-member.interface';

describe('TeamService', () => {
  let service: TeamService;
  let httpMock: HttpTestingController;

  const mockTeam: TeamMember[] = [
    {
      id: '1',
      firstName: 'Ahmed',
      lastName: 'Said',
      email: 'ahmed@example.com',
      role: 'Developer',
      status: TeamMemberStatus.ACTIVE,
      performanceScore: 95,
      joinDate: '2022-01-01',
      department: 'Engineering',
      location: 'Cairo',
      avatar: ''
    },
    {
      id: '2',
      firstName: 'Sara',
      lastName: 'Ali',
      email: 'sara@example.com',
      role: 'Designer',
      status: TeamMemberStatus.BUSY,
      performanceScore: 88,
      joinDate: '2021-05-15',
      department: 'Design',
      location: 'Alex',
      avatar: ''
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamService],
    });

    service = TestBed.inject(TeamService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // تأكيد عدم وجود طلبات معلقة
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load team members and update state', () => {
    service.loadTeamMembers().subscribe(members => {
      expect(members.length).toBe(2);
    });

    const req = httpMock.expectOne('/assets/data/team.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockTeam);

    service.teamMembers$.subscribe(members => {
      expect(members).toEqual(mockTeam);
    });

    service.loading$.subscribe(loading => {
      expect(loading).toBeFalse();
    });
  });

  it('should update filters correctly', () => {
    service.updateFilters({ role: 'Developer' });

    service.filters$.subscribe(filters => {
      expect(filters.role).toBe('Developer');
    });
  });

  it('should clear filters', () => {
    service.updateFilters({ search: 'test', role: 'Dev' });
    service.clearFilters();

    service.filters$.subscribe(filters => {
      expect(filters).toEqual({ search: '', role: '', status: '' });
    });
  });

  it('should set view mode', () => {
    service.setViewMode(ViewMode.LIST);

    service.viewMode$.subscribe(mode => {
      expect(mode).toBe(ViewMode.LIST);
    });
  });

  it('should return filtered team members by search', () => {
    service['teamMembersSubject'].next(mockTeam);
    service.updateFilters({ search: 'sara' });

    service.filteredTeamMembers$.subscribe(filtered => {
      expect(filtered.length).toBe(1);
      expect(filtered[0].firstName).toBe('Sara');
    });
  });

  it('should return unique roles', () => {
    service['teamMembersSubject'].next(mockTeam);

    service.getUniqueRoles().subscribe(roles => {
      expect(roles).toEqual(['Designer', 'Developer']);
    });
  });

  it('should return unique statuses', () => {
    service['teamMembersSubject'].next(mockTeam);

    service.getUniqueStatuses().subscribe(statuses => {
      expect(statuses).toEqual(['Active', 'Busy']);
    });
  });
});
