import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initially set sidebarOpened based on window width', () => {
    expect(component.sidebarOpened).toBe(window.innerWidth > 800);
  });

  it('should toggle sidebarOpened when toggleSidebar() is called', () => {
    const initial = component.sidebarOpened;
    component.toggleSidebar();
    expect(component.sidebarOpened).toBe(!initial);
  });

  it('should close sidebar when SidebarComponent emits (closed)', () => {
    component.sidebarOpened = true;
    const sidebarElement: HTMLElement = fixture.nativeElement.querySelector('app-sidebar');
    sidebarElement.dispatchEvent(new Event('closed'));
    fixture.detectChanges();
    expect(component.sidebarOpened).toBeFalse();
  });

  it('should toggle sidebar when HeaderComponent emits (toggleSidebar)', () => {
    const initial = component.sidebarOpened;
    const headerElement: HTMLElement = fixture.nativeElement.querySelector('app-header');
    headerElement.dispatchEvent(new Event('toggleSidebar'));
    fixture.detectChanges();
    expect(component.sidebarOpened).toBe(!initial);
  });
});
