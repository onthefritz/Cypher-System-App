import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, Input, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { character } from '../models/character';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styleUrls: ['./incrementer.component.scss']
})
export class IncrementerComponent implements OnInit {
  @Input() numberValueTotal: number = 0
  @Input() numberValueCurrent: number = 0
  @Input() showIncrementers: boolean = false

  @ViewChild('numberInput') numberInput: any;

  currentVal: string = '0'

  ngOnInit(): void {
    this.currentVal = this.numberValueCurrent.toString()
    console.log(this.numberInput)
    this.numberInput.style.width = ((this.numberInput.value.length) * 40) + 'px'
  }

  clearText() {
    this.currentVal = ''
  }

  applyChange(event: any) {
    let target = event.target || event.srcElement || event.currentTarget
    let newValue: string = target.value
    
    let mathSign: string = Array.from(newValue)[0]
    if (_isNumberValue(mathSign)) {
      this.numberValueCurrent = parseInt(newValue)
      this.currentVal = this.numberValueCurrent.toString()
    }
    else {
      let mathValue = parseInt(newValue.substring(1))
      this.numberValueCurrent = this.preformOperation(mathSign, this.numberValueCurrent, mathValue)
      this.currentVal = this.numberValueCurrent.toString()
    }

    target.style.width = ((this.currentVal.length) * 40) + 'px'

    target.blur()
  }

  textChange(event: any) {
    let target = event.target || event.srcElement || event.currentTarget
    let newValue: string = target.value

    let currentLength = target.style.width
    console.log(currentLength)
    let newLength = ((newValue.length) * 40)
    
    if (newLength > currentLength) {
      target.style.width = ((newValue.length) * 40) + 'px'
    }
  }

  incrementUp() {
    this.numberValueCurrent = this.numberValueCurrent + 1
  }

  incrementDown() {
    this.numberValueCurrent = this.numberValueCurrent - 1
  }

  private preformOperation(mathSign: string, currentValue: number, mathValue: number): number {
    if (mathSign === '+')
      return currentValue + mathValue
    else if (mathSign === '-')
      return currentValue - mathValue

    return -100
  }
}
