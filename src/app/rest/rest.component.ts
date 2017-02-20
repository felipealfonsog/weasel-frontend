import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProcessService } from '../process.service';
import { Rest } from '../rest';
import { Folder } from '../folder';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.css']
})
export class RestComponent implements OnInit {
  @Input() rest: Rest;
  @Input() folder: Folder;
  @Output() folderChange = new EventEmitter<Folder>();

  public badgeState: string;

  constructor(private _processService: ProcessService) { }

  ngOnInit() {
    let firstDigit = this.rest.status.toString().charAt(0);
    this.badgeState = firstDigit === '2' ? 'success' : 'danger';
  }

  removeRest(): void{
    this._processService.removeRest(this.folder.name, this.rest).subscribe(res=> {
      this.folder = res;
      this.folderChange.emit(this.folder);
    });
  }
}
