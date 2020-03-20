import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatToolbarModule, MatIconModule, MatFormFieldModule,
  MatInputModule, MatCardModule, MatSnackBarModule, MatDialogModule, MatSidenavModule, MatDatepickerModule, MatRadioModule,
  MatListModule, MatMenuModule, MatTreeModule, MatSelectModule, MatNativeDateModule, MatFormFieldControl, MatTableModule,
  MatCheckboxModule, MatSliderModule, MatProgressSpinnerModule, MatBottomSheetModule, MatTabsModule, MatGridListModule, MatProgressBarModule
} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatButtonModule, MatToolbarModule, MatIconModule, MatFormFieldModule,
    MatProgressSpinnerModule, MatBottomSheetModule,
    MatInputModule, MatCardModule, MatSnackBarModule, MatDialogModule, MatNativeDateModule,
    MatListModule, MatSelectModule, MatTableModule, MatSidenavModule, MatSliderModule,MatProgressBarModule,
    MatMenuModule, MatDatepickerModule, MatRadioModule, MatTreeModule, MatCheckboxModule, MatTabsModule, MatGridListModule
  ],
  exports: [MatButtonModule, MatToolbarModule, MatIconModule, MatFormFieldModule,
    MatProgressSpinnerModule, MatBottomSheetModule,MatProgressBarModule,
    MatInputModule, MatCardModule, MatSnackBarModule, MatDialogModule, MatNativeDateModule,
    MatListModule, MatSelectModule, MatTableModule, MatSidenavModule, MatSliderModule, MatTabsModule,
    MatMenuModule, MatDatepickerModule, MatRadioModule, MatTreeModule, MatCheckboxModule, MatGridListModule
  ]
})
export class MaterialModule { }
