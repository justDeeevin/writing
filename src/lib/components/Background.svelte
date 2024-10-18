<script lang="ts">
  import Starback from 'starback';
  import { theme } from '$lib/store';
  import { light, dark } from '$lib/theme';
  import Rainbow from 'rainbowvis.js';
  import { onMount } from 'svelte';

  export let disable = false;

  let canvas: HTMLCanvasElement;
  let snowfall: Starback;

  onMount(() => {
    snowfall = new Starback(canvas, {
      type: 'dot',
      quantity: 200,
      direction: 0,
      backgroundColor: $theme === 'light' ? light.backgroundColor : dark.backgroundColor,
      starColor: $theme === 'light' ? light.starColor : dark.starColor,
      randomOpacity: true,
      width: window.innerWidth,
      height: window.innerHeight
    });

    let fresh = true;
    theme.subscribe((t) => {
      if (!fresh) transition(400, t, snowfall);
      else fresh = false;
    });
  });

  const transition = (t_ms: number, theme: 'light' | 'dark', starback: Starback) => {
    const direction = theme === 'light' ? 1 : -1;
    const startIndex = theme === 'dark' ? t_ms : 0;
    const endIndex = theme === 'dark' ? 0 : t_ms;
    const startTime = Date.now();

    const bgGradient = new Rainbow();
    const starGradient = new Rainbow();
    bgGradient.setSpectrum(dark.backgroundColor, light.backgroundColor);
    starGradient.setSpectrum(dark.starColor, light.starColor);
    bgGradient.setNumberRange(0, t_ms);
    starGradient.setNumberRange(0, t_ms);

    const loop = () => {
      const time = Date.now();

      if (
        starback.config.backgroundColor !== bgGradient.colorAt(endIndex) &&
        time - startTime < t_ms
      ) {
        const progress = time - startTime;
        starback.config.backgroundColor = `#${bgGradient.colorAt(
          startIndex + progress * direction
        )}`;
        starback.stars.config.starColor = `#${starGradient.colorAt(
          startIndex + progress * direction
        )}`;
        setTimeout(loop, 0);
      }
    };

    loop();
  };
</script>

<canvas
  bind:this={canvas}
  style="
    top: 0;
    left: 0;
    position: fixed;
    z-index: -1;
    opacity: {disable ? '0' : '100%'};
    transition: opacity 0.4s"
/>

<svelte:window
  on:mousemove={(e) => {
    const x = e.clientX;
    const y =
      e.clientY < window.innerHeight / 2
        ? // Reduces the rate of change of Y past the midpoint
          e.clientY + 0.6 * (window.innerHeight / 2 - e.clientY)
        : e.clientY;
    const true_angle = -((Math.atan2(y, x) * 180) / Math.PI - 90);
    const direction = true_angle < 0 ? 360 + true_angle : true_angle;

    // @ts-ignore: library is improperly typed
    snowfall.config.direction = direction;
    // @ts-ignore: library is improperly typed
    snowfall.stars.config.direction = direction;
  }}
  on:resize={() => {
    canvas.setAttribute('width', window.innerWidth.toString());
    canvas.setAttribute('height', window.innerHeight.toString());
  }}
/>
