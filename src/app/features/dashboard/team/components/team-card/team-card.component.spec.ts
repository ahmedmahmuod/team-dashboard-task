import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamCardComponent } from './team-card.component';
import { TeamMember, ViewMode, TeamMemberStatus } from '../../../team/models/team-member.interface';

describe('TeamCardComponent', () => {
  let component: TeamCardComponent;
  let fixture: ComponentFixture<TeamCardComponent>;

  const mockMember: TeamMember = {
    id: '1',
    firstName: 'Ahmed',
    lastName: 'Said',
    email: 'ahmed@example.com',
    role: 'Developer',
    status: TeamMemberStatus.ACTIVE,
    performanceScore: 92,
    avatar: '',
    joinDate: '2022-01-01',
    department: 'Engineering',
    location: 'Cairo'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamCardComponent);
    component = fixture.componentInstance;
    component.member = { ...mockMember };
    component.viewMode = ViewMode.GRID;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should return full name', () => {
    expect(component.fullName).toBe('Ahmed Said');
  });

  it('should return correct performance label', () => {
    component.member.performanceScore = 92;
    expect(component.performanceLabel).toBe('Excellent');

    component.member.performanceScore = 85;
    expect(component.performanceLabel).toBe('Good');

    component.member.performanceScore = 75;
    expect(component.performanceLabel).toBe('Average');

    component.member.performanceScore = 60;
    expect(component.performanceLabel).toBe('Needs Improvement');
  });

  it('should return correct performance class', () => {
    component.member.performanceScore = 92;
    expect(component.performanceClass).toBe('excellent');

    component.member.performanceScore = 85;
    expect(component.performanceClass).toBe('good');

    component.member.performanceScore = 75;
    expect(component.performanceClass).toBe('average');

    component.member.performanceScore = 60;
    expect(component.performanceClass).toBe('poor');
  });

  it('should return correct status class', () => {
    component.member.status = TeamMemberStatus.ACTIVE;
    expect(component.statusClass).toBe('active');

    component.member.status = TeamMemberStatus.BUSY;
    expect(component.statusClass).toBe('busy');

    component.member.status = TeamMemberStatus.OFFLINE;
    expect(component.statusClass).toBe('offline');

    component.member.status = TeamMemberStatus.AWAY;
    expect(component.statusClass).toBe('away');
  });

  it('should return correct avatar URL', () => {
    component.member.avatar = '';
    expect(component.getAvatarUrl()).toContain('https://ui-avatars.com/api/?name=Ahmed%20Said');

    component.member.avatar = 'https://example.com/avatar.jpg';
    expect(component.getAvatarUrl()).toBe('https://example.com/avatar.jpg');
  });

  it('should format join date correctly', () => {
    component.member.joinDate = '2022-01-01';
    expect(component.formatJoinDate()).toBe('January 1, 2022');
  });
});
