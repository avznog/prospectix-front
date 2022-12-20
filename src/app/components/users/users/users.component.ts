import { Component, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  htmlContent: string = ""
  constructor(
    public readonly usersService: UsersService,
    public authService: AuthService
  ) { }

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};
  ngOnInit(): void {
  }

  pageUp() {
    this.usersService.updateSearchParameters({
      ...this.usersService.researchParamsUsers,
      skip: this.usersService.researchParamsUsers.skip + 20
    });
  }

  pageDown() {
    this.usersService.updateSearchParameters({
      ...this.usersService.researchParamsUsers,
      skip: this.usersService.researchParamsUsers.skip - 20
    });
  }


  onClickAddProspectsBase() {
    // this.prospectsService.addProspectsBase();
  }

  onClickAddEvents() {
    // this.prospectsService.addEvents();
  }
  click(value: any) {
    console.log(value.target.innerHTML)
  }

}
