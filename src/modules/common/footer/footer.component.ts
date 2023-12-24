import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ciyw-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  currentYear: number | undefined;

  ngOnInit(): void {
    this.getCurrentYear();
  }

  getCurrentYear() {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
  }
}
