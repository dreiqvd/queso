import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
})
export class Loader {
  readonly imageStyle = input<'transparent' | 'white'>('transparent');
  readonly message = input<string>('');

  protected readonly loaderImage = computed(() => {
    return this.imageStyle() === 'transparent'
      ? 'cat-sleep-1.svg'
      : 'cat-sleep-2.svg';
  });
}
