import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, Input, Output, OnInit, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { character } from '../models/character';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styleUrls: ['./incrementer.component.scss']
})
export class IncrementerComponent implements OnInit, AfterViewInit {
  @Input() numberValueTotal: number = 0
  @Input() numberValueCurrent: number = 0
  @Input() showIncrementers: boolean = false
  @Input() fontSize: number = 50
  @Input() disableEdit: boolean = false

  @ViewChild('numberInput') numberInput: any;

  currentVal: string = '0'
  fontSizeWidthAdjustment: number = 50

  ngOnInit(): void {
    this.currentVal = this.numberValueCurrent.toString()
    this.fontSizeWidthAdjustment = this.fontSize
  }

  ngAfterViewInit() {
    this.numberInput.nativeElement.style.width = ((this.numberInput.nativeElement.value.length) * this.fontSizeWidthAdjustment) + 'px'
    this.numberInput.nativeElement.style.fontSize = `${this.fontSize}px` 
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
    else if (mathSign === '+' || mathSign === '-') {
      let mathValue = parseInt(newValue.substring(1))
      this.numberValueCurrent = this.preformOperation(mathSign, this.numberValueCurrent, mathValue)
      this.currentVal = this.numberValueCurrent.toString()
    }
    else {
      this.currentVal = this.numberValueCurrent.toString()
    }

    console.log(this.currentVal.length)
    target.style.width = ((this.currentVal.length) * this.fontSizeWidthAdjustment) + 'px'
    console.log(target.style.width)

    target.blur()
  }

  keyUp(event: any) {
    if (event.key === "Enter") {
      return
    }

    let target = event.target || event.srcElement || event.currentTarget
    let newValue: string = target.value
    
    let currentLength = target.style.width
    let currentLengthNumber = currentLength.substring(0, currentLength.length - 2)
    let newLength = ((newValue.length) * this.fontSizeWidthAdjustment)
    
    if (newLength > currentLengthNumber) {
      target.style.width = `${newLength}px`
    }
  }

  loseFocus(event: any) {
    let target = event.target || event.srcElement || event.currentTarget
    let newValue: string = target.value

    if (newValue === '') {
      this.currentVal = this.numberValueCurrent.toString()
    }
  }

  incrementUp() {
    this.numberValueCurrent = this.numberValueCurrent + 1
    this.currentVal = this.numberValueCurrent.toString()

    this.numberInput.nativeElement.style.width = ((this.currentVal.length) * this.fontSizeWidthAdjustment) + 'px'
  }

  incrementDown() {
    this.numberValueCurrent = this.numberValueCurrent - 1
    this.currentVal = this.numberValueCurrent.toString()

    this.numberInput.nativeElement.style.width = ((this.currentVal.length) * this.fontSizeWidthAdjustment) + 'px'
  }

  private preformOperation(mathSign: string, currentValue: number, mathValue: number): number {
    if (mathSign === '+')
      return currentValue + mathValue
    else if (mathSign === '-')
      return currentValue - mathValue

    return -100
  }
}
