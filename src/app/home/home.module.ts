import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { Ps1GamesComponent } from '../home-sections/ps1-games/ps1-games.component';
import { Ps2GamesComponent } from '../home-sections/ps2-games/ps2-games.component';
import { Ps3GamesComponent } from '../home-sections/ps3-games/ps3-games.component';
import { PspGamesComponent } from '../home-sections/psp-games/psp-games.component';
import { PsvitaGamesComponent } from '../home-sections/psvita-games/psvita-games.component';
import { Ps4GamesComponent } from '../home-sections/ps4-games/ps4-games.component';
import { Ps5GamesComponent } from '../home-sections/ps5-games/ps5-games.component';
import { XboxGamesComponent } from '../home-sections/xbox-games/xbox-games.component';
import { Xbox360GamesComponent } from '../home-sections/xbox360-games/xbox360-games.component';
import { XboxOneGamesComponent } from '../home-sections/xboxone-games/xboxone-games.component';
import { XboxsxGamesComponent } from '../home-sections/xboxsx-games/xboxsx-games.component';
import { NesGamesComponent } from '../home-sections/nes-games/nes-games.component';
import { SnesGamesComponent } from '../home-sections/snes-games/snes-games.component';
import { n64GamesComponent } from '../home-sections/n64-games/n64-games.component';
import { GbcGamesComponent } from '../home-sections/gbc-games/gbc-games.component';
import { GbaGamesComponent } from '../home-sections/gba-games/gba-games.component';
import { GcGamesComponent } from '../home-sections/gc-games/gc-games.component';
import { NdsGamesComponent } from '../home-sections/nds-games/nds-games.component';
import { WiiGamesComponent } from '../home-sections/wii-games/wii-games.component';
import { n3dsGamesComponent } from '../home-sections/n3ds-games/n3ds-games.component';
import { WiiuGamesComponent } from '../home-sections/wiiu-games/wiiu-games.component';
import { SwitchGamesComponent } from '../home-sections/switch-games/switch-games.component';
import { PcGamesComponent } from '../home-sections/pc-games/pc-games.component';
import { MobileGamesComponent } from '../home-sections/mobile-games/mobile-games.component';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, Ps1GamesComponent, Ps2GamesComponent, Ps3GamesComponent, PspGamesComponent, PsvitaGamesComponent, Ps4GamesComponent, Ps5GamesComponent, XboxGamesComponent, Xbox360GamesComponent, XboxOneGamesComponent, XboxsxGamesComponent, NesGamesComponent, SnesGamesComponent, n64GamesComponent, GbcGamesComponent, GbaGamesComponent, GcGamesComponent, NdsGamesComponent, WiiGamesComponent, n3dsGamesComponent, WiiuGamesComponent, SwitchGamesComponent, PcGamesComponent, MobileGamesComponent]
})
export class HomePageModule {}
