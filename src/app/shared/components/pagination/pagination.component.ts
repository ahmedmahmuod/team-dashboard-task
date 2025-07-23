import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  // === Inputs ===
  @Input() currentPage: number = 0;
  @Input() pageSize: number = 10;
  @Input() totalRecords: number = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50];
  @Input() showPageLinks: boolean = true;

  // === Outputs ===
  @Output() pageChange = new EventEmitter<{ page: number, pageSize: number }>();

  // === Local State ===
  totalPages: number = 0;

  // === Lifecycle ===
  // Recalculate total pages when totalRecords or pageSize changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalRecords'] || changes['pageSize']) {
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }
  }

  // === Handlers ===
  // Called when the paginator emits a page change
  onPageChange(event: any): void {
    this.currentPage = event.page;
    this.pageSize = event.rows;
    this.pageChange.emit({
      page: event.page,
      pageSize: event.rows
    });
  }

  // Generate current page report string: "Showing x–y of z"
  get currentPageReport(): string {
    const start = this.currentPage * this.pageSize + 1;
    const end = Math.min((this.currentPage + 1) * this.pageSize, this.totalRecords);
    return `Showing ${start}-${end} of ${this.totalRecords}`;
  }
}
