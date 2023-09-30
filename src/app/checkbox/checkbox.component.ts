import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() defaultValue: boolean = false
  @Input() checkedStyle: string = 'X'
  @Input() title: string = ''

  @Input() element: string = ''
  @Output() checkboxChange = new EventEmitter()

  checkedStatus: boolean = false
  checkedValue: string = ''

  ngOnInit(): void {
    if (this.defaultValue) {
      this.checkedStatus = this.defaultValue
      this.checkedValue = this.checkedStyle
    }
  }

  checkItem() {
    this.checkedStatus = !this.checkedStatus

    if (this.checkedStatus) {
      this.checkedValue = this.checkedStyle
    }
    else {
      this.checkedValue = ''
    }

    this.onCheckboxChange()
  }

  onCheckboxChange() {
    let content = {
      "element": this.element,
      "value": this.checkedStatus
    }
    this.checkboxChange.emit(content)
  }
}
