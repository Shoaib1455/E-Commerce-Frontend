import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbAccordionModule, NbAlertModule, NbBadgeModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbChatModule, NbCheckboxModule, NbContextMenuModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbMenuModule, NbPopoverModule, NbRadioModule, NbSearchModule, NbSelectModule, NbSidebarModule, NbSpinnerModule, NbTabsetModule, NbTagModule, NbToggleModule, NbTooltipModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        NbAccordionModule,
        NbAlertModule, NbBadgeModule,
        NbButtonGroupModule, NbButtonModule,
        NbCardModule, NbChatModule,
        NbCheckboxModule,
        // BrowserAnimationsModule,
        NbContextMenuModule,
        NbDatepickerModule, NbDialogModule.forChild(),
        NbFormFieldModule, NbIconModule,
        NbInputModule, NbLayoutModule, NbListModule, NbMenuModule,
        NbPopoverModule, NbRadioModule, NbSearchModule, NbSelectModule,
        NbSidebarModule, NbSpinnerModule, NbTabsetModule, NbTagModule,
        NbToggleModule, NbTooltipModule, NbTreeGridModule,
        NbUserModule, NbEvaIconsModule],
    exports: [
        CommonModule,
        FormsModule,
        NbAccordionModule,
        NbAlertModule, NbBadgeModule,
        NbButtonGroupModule, NbButtonModule,
        NbCardModule, NbChatModule,
        NbCheckboxModule,
        NbContextMenuModule,
        NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule,
        NbInputModule, NbLayoutModule, NbListModule, NbMenuModule,
        NbPopoverModule, NbRadioModule, NbSearchModule, NbSelectModule,
        NbSidebarModule, NbSpinnerModule, NbTabsetModule, NbTagModule,
        NbToggleModule, NbTooltipModule, NbTreeGridModule,
        NbUserModule,
        NbEvaIconsModule
    ], providers: []
})
export class SharedModule { }   