import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.getEnv().allowRespy(true);
  });

  it('should detect mobile correctly (mobile)', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(500);
    expect(component.isMobile).toBeTrue();
  });

  it('should detect mobile correctly (desktop)', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(800);
    expect(component.isMobile).toBeFalse();
  });
});

