import { Component, computed } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

import { SearchFormComponent } from './components/search-form';
import { DEFAULTS, ORIGINS } from './components/search-form/search-form.data';

@Component({
  standalone: true,
  imports: [SearchFormComponent, GoogleMap],
  selector: 'qs-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'nearbai';

  readonly mapOptions = computed<google.maps.MapOptions>(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const defaultPosition = ORIGINS.find(
      (o) => o.value === DEFAULTS['origin']
    )!.position;

    return {
      center: defaultPosition,
      zoom: 16,
    };
  });
}
