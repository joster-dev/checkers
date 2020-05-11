import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'checkers-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() type: 'pawn' | 'king' | 'kinghead' = 'pawn';
  @Input() disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
