import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DashboardContentComponent } from "./dashboard-content.component";
import { RouterOutlet } from "@angular/router";
import { By } from "@angular/platform-browser";

describe("DashboardContentComponent", () => {
  let component: DashboardContentComponent;
  let fixture: ComponentFixture<DashboardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should contain a router-outlet", () => {
    const outlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(outlet).toBeTruthy();
  });
});
