import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveHelperComponent } from './components/responsive-helper/responsive-helper.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [ResponsiveHelperComponent, ClickOutsideDirective, SearchPipe],
  imports: [CommonModule],
  exports: [ResponsiveHelperComponent, ClickOutsideDirective,SearchPipe],
})
export class SharedModule {}
