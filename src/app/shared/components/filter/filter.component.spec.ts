import { TeamFilters } from './../../../features/dashboard/team/models/team-member.interface';
import { TeamService } from './../../../features/dashboard/team/services/team.service';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { BehaviorSubject, of } from 'rxjs';

describe('TeamFilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let mockTeamService: jasmine.SpyObj<TeamService>;

  const filtersSubject = new BehaviorSubject<TeamFilters>({
    search: 'ali',
    role: 'Developer',
    status: 'Active'
  });

  beforeEach(async () => {
    mockTeamService = jasmine.createSpyObj('TeamService', ['getUniqueRoles', 'getUniqueStatuses'], {
      filters$: filtersSubject.asObservable()
    });

    mockTeamService.getUniqueRoles.and.returnValue(of(['Developer', 'Designer']));
    mockTeamService.getUniqueStatuses.and.returnValue(of(['Active', 'Busy', 'Offline']));

    await TestBed.configureTestingModule({
      imports: [FilterComponent],
      providers: [{ provide: TeamService, useValue: mockTeamService }]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filters on search change (with debounce)', fakeAsync(() => {
    spyOn(component.filtersChange, 'emit');

    component.filters = {
      search: 'ali',
      role: 'Developer',
      status: 'Active'
    };

    component.onSearchChange('test');

    tick(400);
    fixture.detectChanges();

    expect(component.filtersChange.emit).toHaveBeenCalledWith({
      search: 'test',
      role: 'Developer',
      status: 'Active'
    });
  }));

  it('should emit filters on role change', () => {
    filtersSubject.next({ search: '', role: '', status: '' }); 
    spyOn(component.filtersChange, 'emit');
    component.filters = { search: '', role: '', status: '' }; 
    component.onRoleChange('Designer');
    expect(component.filtersChange.emit).toHaveBeenCalledWith({
      search: '',
      role: 'Designer',
      status: ''
    });
  });

  it('should emit filters on status change', () => {
    filtersSubject.next({ search: '', role: '', status: '' });
    spyOn(component.filtersChange, 'emit');
    component.filters = { search: '', role: '', status: '' };
    component.onStatusChange('Busy');
    expect(component.filtersChange.emit).toHaveBeenCalledWith({
      search: '',
      role: '',
      status: 'Busy'
    });
  });

  it('should emit clearFilters and reset filters', () => {
    spyOn(component.clearFilters, 'emit');
    component.filters = {
      search: 'ahmed',
      role: 'Developer',
      status: 'Active'
    };
    component.onClearFilters();
    expect(component.filters).toEqual({ search: '', role: '', status: '' });
    expect(component.clearFilters.emit).toHaveBeenCalled();
  });

  it('should detect active filters correctly', () => {
    component.filters = { search: '', role: '', status: '' };
    expect(component.hasActiveFilters).toBeFalse();

    component.filters = { search: 'x', role: '', status: '' };
    expect(component.hasActiveFilters).toBeTrue();

    component.filters = { search: '', role: 'Developer', status: '' };
    expect(component.hasActiveFilters).toBeTrue();

    component.filters = { search: '', role: '', status: 'Busy' };
    expect(component.hasActiveFilters).toBeTrue();
  });
});
