import {NgModule} from "@angular/core";
import {RemoveDashesPipe} from "../../kernel/pipes/remove-dashes.pipe";
import {CiywDynamicStyleDirective} from "../../kernel/directives/ciyw-dynamic-style.directive";

@NgModule({
  declarations: [
    RemoveDashesPipe,

    CiywDynamicStyleDirective,
  ],
  exports: [
    RemoveDashesPipe,

    CiywDynamicStyleDirective,
  ]
})
export class UtilityCiywModule {}
