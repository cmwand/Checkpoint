import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-ps',
  templateUrl: './config-ps.page.html',
  styleUrls: ['./config-ps.page.scss'],
})
export class ConfigPsPage implements OnInit {

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
