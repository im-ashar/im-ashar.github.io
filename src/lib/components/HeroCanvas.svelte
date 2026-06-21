<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced) return;

		let cleanup = () => {};
		let cancelled = false;

		// Dynamically import three so it is code-split out of the initial bundle.
		(async () => {
			const THREE = await import('three');
			if (cancelled || !canvas) return;

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 100);
			camera.position.z = 6;

			const renderer = new THREE.WebGLRenderer({
				canvas,
				alpha: true,
				antialias: true,
				powerPreference: 'low-power'
			});
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

			// Particle field
			const COUNT = 1400;
			const positions = new Float32Array(COUNT * 3);
			const colorChoices = [
				new THREE.Color('#6366f1'),
				new THREE.Color('#d946ef'),
				new THREE.Color('#22d3ee')
			];
			const colors = new Float32Array(COUNT * 3);
			// Distribute particles on a deformed sphere for an organic cloud look.
			for (let i = 0; i < COUNT; i++) {
				const golden = Math.PI * (3 - Math.sqrt(5));
				const yy = 1 - (i / (COUNT - 1)) * 2;
				const radius = Math.sqrt(1 - yy * yy);
				const theta = golden * i;
				const r = 3.4 + Math.sin(i * 0.5) * 0.6;
				positions[i * 3] = Math.cos(theta) * radius * r;
				positions[i * 3 + 1] = yy * r;
				positions[i * 3 + 2] = Math.sin(theta) * radius * r;
				const c = colorChoices[i % colorChoices.length];
				colors[i * 3] = c.r;
				colors[i * 3 + 1] = c.g;
				colors[i * 3 + 2] = c.b;
			}
			const geometry = new THREE.BufferGeometry();
			geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
			geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
			const material = new THREE.PointsMaterial({
				size: 0.045,
				vertexColors: true,
				transparent: true,
				opacity: 0.45,
				depthWrite: false,
				blending: THREE.AdditiveBlending
			});
			const points = new THREE.Points(geometry, material);
			scene.add(points);

			let mouseX = 0;
			let mouseY = 0;
			const onMouse = (e: MouseEvent) => {
				mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
				mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
			};
			window.addEventListener('pointermove', onMouse, { passive: true });

			function resize() {
				const parent = canvas.parentElement;
				if (!parent) return;
				const w = parent.clientWidth;
				const h = parent.clientHeight;
				renderer.setSize(w, h, false);
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
			}
			resize();
			const ro = new ResizeObserver(resize);
			if (canvas.parentElement) ro.observe(canvas.parentElement);

			let raf = 0;
			let running = true;
			let t = 0;
			function animate() {
				if (!running) return;
				t += 0.0015;
				points.rotation.y = t;
				points.rotation.x = t * 0.4;
				// ease toward mouse
				points.position.x += (mouseX * 0.6 - points.position.x) * 0.03;
				points.position.y += (-mouseY * 0.6 - points.position.y) * 0.03;
				renderer.render(scene, camera);
				raf = requestAnimationFrame(animate);
			}
			animate();

			// Pause when off-screen
			const io = new IntersectionObserver((entries) => {
				running = entries[0].isIntersecting;
				if (running && !raf) animate();
				if (!running) {
					cancelAnimationFrame(raf);
					raf = 0;
				}
			});
			if (canvas.parentElement) io.observe(canvas.parentElement);

			cleanup = () => {
				cancelAnimationFrame(raf);
				window.removeEventListener('pointermove', onMouse);
				ro.disconnect();
				io.disconnect();
				geometry.dispose();
				material.dispose();
				renderer.dispose();
			};
		})();

		return () => {
			cancelled = true;
			cleanup();
		};
	});
</script>

<canvas bind:this={canvas} class="h-full w-full"></canvas>
