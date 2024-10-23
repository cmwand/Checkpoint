import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-xb',
  templateUrl: './config-xb.page.html',
  styleUrls: ['./config-xb.page.scss'],
})
export class ConfigXbPage implements OnInit {
  selectedButtons: number[] = [];

  toggleSelection(buttonId: number) {
    const index = this.selectedButtons.indexOf(buttonId);
    if (index === -1) {
      this.selectedButtons.push(buttonId);
    } else {
      this.selectedButtons.splice(index, 1);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
