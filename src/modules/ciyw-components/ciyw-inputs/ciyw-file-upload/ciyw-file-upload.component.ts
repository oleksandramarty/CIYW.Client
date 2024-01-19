import {Component, Input} from '@angular/core';

@Component({
  selector: 'ciyw-file-upload',
  templateUrl: './ciyw-file-upload.component.html',
  styleUrl: './ciyw-file-upload.component.scss'
})
export class CiywFileUploadComponent {
  @Input() title: string | null = null;

  public selectedFile: File | null = null;

  onFileChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    } else {
      this.selectedFile = null;
    }
  }
}
