import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuApiSearcherModule, LuApiSelectInputComponent } from '@lucca-front/ng/api';
import { LuInputClearerModule, LuInputDisplayerModule } from '@lucca-front/ng/input';
import { LuForOptionsModule, LuOptionPickerModule } from '@lucca-front/ng/option';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
import { ILuApiItem } from 'dist/ng/api';

@Component({
  selector: 'lu-chips-api-select',
  template: `
      <div class="lu-select-placeholder">{{ placeholder }}</div>
      <div class="lu-select-value">
          <div class="lu-select-display-wrapper">
              <ng-container #display></ng-container>
          </div>
      </div>
      <div class="lu-select-suffix">
          <lu-input-clearer></lu-input-clearer>
      </div>
      <span *luDisplayer="let option">
          <div class="chip">
              {{ option.name }}
              <button type="button" class="chip-kill" (click)="removeElement($event, option)"></button>
          </div>
      </span>
      <lu-option-picker-advanced [option-comparer]="byId">
      <header class="lu-picker-header">
          <lu-api-paged-searcher
          [standard]="standard"
          [api]="api"
          [fields]="fields"
          [filters]="filters"
          [orderBy]="orderBy"
          [sort]="sort"
          ></lu-api-paged-searcher>
      </header>
      <lu-option *luForOptions="let option" [value]="option">{{ option.name }}</lu-option>
      </lu-option-picker-advanced>

  `,
  // styleUrls: ['chips-api-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ChipsApiSelectComponent<T extends ILuApiItem> extends LuApiSelectInputComponent {

  public removeElement(event: Event, element: T) {
    event.stopPropagation();

    if (!Array.isArray(this.value)) {
      return;
    }

    const index = this.value.findIndex((item) => element.id === item.id);
    if (index < 0) {
      return;
    }
    this.value.splice(index, 1);
    this.setValue(this.value);
  }
}



@Component({
	selector: 'lu-chips-api-select-story',
	template: `
		<label class="textfield u-marginTopStandard">
			<lu-chips-api-select class="textfield-input" multiple="true" standard="v4" [api]="apiV4"></lu-chips-api-select>
			<span class="textfield-label">Api V4 Select</span>
		</label>
	`,
})
class ChipApiSelectStory {
	apiV4 = '/organization/structure/api/job-qualifications';
}

export default {
	title: 'Documentation/Forms/Api/SelectChip',
	component: ChipApiSelectStory,
	decorators: [
		componentWrapperDecorator(ChipApiSelectStory),
		moduleMetadata({
			declarations: [ChipsApiSelectComponent],
      entryComponents: [ChipApiSelectStory],
			imports: [HttpClientModule, BrowserAnimationsModule, CommonModule,
        LuOptionPickerModule,
        LuForOptionsModule,
        LuApiSearcherModule,
        LuInputClearerModule,
        LuInputDisplayerModule
      ],
		}),
	],
} as Meta;

const Template: Story<ChipApiSelectStory> = (props) => ({ props });

const code = `
`;

export const Basic = Template.bind({});
Basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
