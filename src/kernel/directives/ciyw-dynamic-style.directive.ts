// dynamic-style.directive.ts
import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import {IStyleHelper} from "../models/common.model";

@Directive({
  selector: '[ciywDynamicStyle]'
})
export class CiywDynamicStyleDirective implements OnInit {
  @Input() ciywDynamicStyle: IStyleHelper | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.applyStyles();
  }

  private applyStyles() {
    if (!this.ciywDynamicStyle) {
      return;
    }

    for (const key in this.ciywDynamicStyle) {
      if (this.ciywDynamicStyle.hasOwnProperty(key)) {
        const style = this.ciywDynamicStyle[key];
        if (style.attr && style.value) {
          this.renderer.setStyle(this.el.nativeElement, style.attr, style.value);
        }
      }
    }
  }
}
