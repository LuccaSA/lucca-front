import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuUserDisplayModule, LuUserPictureModule, LuUserTileComponent, LuUserTileModule } from '@lucca-front/ng/user';
import { componentWrapperDecorator, Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { bob } from '../user.mocks';

@Component({
	standalone: true,
	selector: 'user-tile-stories',
	templateUrl: './user-tile.stories.html',
	imports: [LuUserTileModule, LuUserPictureModule, LuUserDisplayModule],
})
class UserTileStory {
	public bob = bob;
}

export default {
	title: 'Documentation/Users/Tile/Basic',
	component: LuUserTileComponent,
	decorators: [
		componentWrapperDecorator(UserTileStory),
		moduleMetadata({
			imports: [UserTileStory, BrowserAnimationsModule],
		}),
	],
} as Meta;

const template: StoryFn<LuUserTileComponent> = (args: LuUserTileComponent) => ({
	props: args,
});

const code = `
/* 1. Importer LuUserTileModule */
import { LuUserTileModule } from '@lucca-front/ng/user';

@NgModule({
	imports: [LuUserTileModule]
})
class UserTileStoriesModule {}

/* 2. (exemple n°1) Utiliser lu-user-tile */
/*    Vous devez simplement lui donner un ILuUser (ex: bob). */
<lu-user-tile [user]="bob"></lu-user-tile>

/* 3. (exemple n°2) Vous pouvez ajouter en option un displayFormat (cf: rubrique format), ou forcer un rôle */
/* La propriété jobTitle du ILuUser est automatiquement prise si aucun rôle n'est renseigné  */
<lu-user-tile [user]="bob" displayformat="LF" role="Administrateur"></lu-user-tile>
`;

export const basic = template.bind({});
basic.args = {};

basic.parameters = {
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
