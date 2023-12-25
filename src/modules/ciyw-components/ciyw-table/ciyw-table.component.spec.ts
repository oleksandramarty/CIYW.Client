import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CiywTableComponent } from './ciyw-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule, Sort} from '@angular/material/sort';

describe('CiywTableComponent', () => {
  let component: CiywTableComponent<any>;
  let fixture: ComponentFixture<CiywTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CiywTableComponent],
      imports: [MatTableModule, MatPaginatorModule, MatSortModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiywTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filterChanged event on announceSortChange', () => {
    const sortState = { active: 'ColumnName', direction: 'asc' };

    spyOn(component.filterChanged, 'emit');

    component.announceSortChange(sortState as Sort);

    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      paginator: jasmine.any(Object),
      sort: { column: 'ColumnName', direction: 'asc' },
    });
  });

  it('should emit filterChanged event on onPageChange', () => {
    const pageEvent = { pageIndex: 1, pageSize: 10, length: 30 };

    spyOn(component.filterChanged, 'emit');

    component.onPageChange(pageEvent);

    expect(component.filterChanged.emit).toHaveBeenCalledWith({
      paginator: { isFull: false, pageNumber: 2, pageSize: 10 },
      sort: jasmine.any(Object),
    });
  });
});
