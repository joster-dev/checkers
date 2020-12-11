import { Component, Input } from '@angular/core';

@Component({
  selector: 'checkers-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() type: 'pawn' | 'king' | 'kinghead' = 'pawn';
  @Input() side: 'a' | 'b' | undefined = 'a';
  @Input() isDisabled = false;
  @Input() isActive = false;
  @Input() color = 'ffffff';

  constructor() { }
}
