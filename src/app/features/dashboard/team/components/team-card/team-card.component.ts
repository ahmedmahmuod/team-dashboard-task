import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMember, ViewMode, TeamMemberStatus } from '../../../team/models/team-member.interface';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent {
  @Input() member!: TeamMember;               // Team member data input
  @Input() viewMode: ViewMode = ViewMode.GRID; // Display mode: grid or list

  ViewMode = ViewMode;                         // Expose enum for template use
  TeamMemberStatus = TeamMemberStatus;         // Expose status enum for template use

  // Compute full name of the team member
  get fullName(): string {
    return `${this.member.firstName} ${this.member.lastName}`;
  }

  // Get performance label based on performance score
  get performanceLabel(): string {
    if (this.member.performanceScore >= 90) return 'Excellent';
    if (this.member.performanceScore >= 80) return 'Good';
    if (this.member.performanceScore >= 70) return 'Average';
    return 'Needs Improvement';
  }

  // Get CSS class for performance status for styling
  get performanceClass(): string {
    if (this.member.performanceScore >= 90) return 'excellent';
    if (this.member.performanceScore >= 80) return 'good';
    if (this.member.performanceScore >= 70) return 'average';
    return 'poor';
  }

  // Get CSS class for member status (e.g., active, inactive)
  get statusClass(): string {
    return this.member.status.toLowerCase().replace(/\s+/g, '-');
  }

  // Return avatar URL or fallback to generated avatar
  getAvatarUrl(): string {
    return this.member.avatar || 
      `https://ui-avatars.com/api/?name=${encodeURIComponent(this.fullName)}&background=263238&color=fff&size=100`;
  }

  // Format join date to a readable string
  formatJoinDate(): string {
    return new Date(this.member.joinDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
