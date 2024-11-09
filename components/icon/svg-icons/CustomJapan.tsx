import type { SVGProps } from 'react';
import * as React from 'react';

const SvgCustomJapan = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		xmlSpace='preserve'
		viewBox='0 0 512 512'
		width='1em'
		height='1em'
		className='svg-icon'
		{...props}>
		<rect
			width='512'
			height='512'
			fill='#ffffff'
		/>
		<circle
			cx='256'
			cy='256'
			r='180'
			fill='#bc002d'
		/>
	</svg>
);

export default SvgCustomJapan;
