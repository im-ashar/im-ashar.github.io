import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { browser } from '$app/environment';

if (browser) {
	gsap.registerPlugin(ScrollTrigger);
}

export interface RevealOptions {
	/** direction the element travels from */
	y?: number;
	x?: number;
	scale?: number;
	duration?: number;
	delay?: number;
	/** stagger children that carry [data-reveal-child] */
	stagger?: number;
	once?: boolean;
}

/**
 * Svelte action: reveal an element (and optional [data-reveal-child] descendants)
 * on scroll using GSAP ScrollTrigger. Respects prefers-reduced-motion.
 */
export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	if (!browser) return;

	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const {
		y = 40,
		x = 0,
		scale = 1,
		duration = 0.8,
		delay = 0,
		stagger = 0,
		once = true
	} = options;

	if (prefersReduced) {
		gsap.set(node, { opacity: 1, clearProps: 'transform' });
		return { destroy() {} };
	}

	const children = stagger ? node.querySelectorAll<HTMLElement>('[data-reveal-child]') : [];
	const targets: HTMLElement[] = children.length ? Array.from(children) : [node];

	const ctx = gsap.context(() => {
		gsap.set(targets, { opacity: 0, y, x, scale });
		gsap.to(targets, {
			opacity: 1,
			y: 0,
			x: 0,
			scale: 1,
			duration,
			delay,
			stagger,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: node,
				start: 'top 85%',
				toggleActions: once ? 'play none none none' : 'play none none reverse'
			}
		});
	}, node);

	// Children handle their own opacity; if we staggered, ensure the parent is visible.
	if (children.length) gsap.set(node, { opacity: 1 });

	return {
		destroy() {
			ctx.revert();
		}
	};
}
