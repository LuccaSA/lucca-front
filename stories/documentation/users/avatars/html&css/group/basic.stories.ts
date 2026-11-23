import { Meta, StoryObj } from '@storybook/angular-vite';
import { CDN_URL } from '@lucca-front/ng/core';

export default {
	title: 'Documentation/Users/Avatar/HTML&CSS/Group/Basic',
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return `<ul class="avatarWrapper">
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="${CDN_URL}/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="${CDN_URL}/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="${CDN_URL}/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="${CDN_URL}/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="${CDN_URL}/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="${CDN_URL}/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="${CDN_URL}/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="${CDN_URL}/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="${CDN_URL}/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="${CDN_URL}/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
</ul>`;
}

const Template = () => ({
	template: getTemplate(),
});

export const Basic: StoryObj = {
	args: {},
	render: Template,
};
