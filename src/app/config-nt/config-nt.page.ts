import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-nt',
  templateUrl: './config-nt.page.html',
  styleUrls: ['./config-nt.page.scss'],
})
export class ConfigNtPage implements OnInit {
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
