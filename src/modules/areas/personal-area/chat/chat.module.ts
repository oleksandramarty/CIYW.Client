import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ChatComponent} from "./chat.component";
import {CiywLoaderModule} from "../../../ciyw-components/ciyw-loader/ciyw-loader.module";
import {CiywInputModule} from "../../../ciyw-components/ciyw-inputs/ciyw-input/ciyw-input.module";
import {CiywTableModule} from "../../../ciyw-components/ciyw-table/ciyw-table.module";

@NgModule({
  declarations: [
    ChatComponent,
  ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,

        CiywLoaderModule,
        MatDialogModule,
        MatButtonModule,

        CiywInputModule,
        CiywTableModule,
    ],
  exports: [
    ChatComponent,
  ]
})
export class ChatModule {}
