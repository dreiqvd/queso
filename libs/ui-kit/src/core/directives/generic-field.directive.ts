import {
  computed,
  Directive,
  inject,
  input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Directive({
  selector: '[qsFormField]',
  standalone: true,
})
export class QsGenericFormFieldDirective implements OnInit {
  /* Depencency injection for the control container */
  private readonly controlContainer = inject(ControlContainer);

  /**
   * The control to be used in the directive. This can be a FormControl instance
   * or a string representing the name of the control in the parent form group.
   */
  readonly control = input.required<FormControl | string>();

  /** The name of the field. This is also used for accessibility attributes. */
  readonly name = input.required<string>();

  /**
   * The optional label to be used for the form field.
   */
  readonly label = input<string>();

  /**
   * Whether the required marker should be hidden.
   */
  readonly hideRequiredMarker = input<boolean>(false);

  /**
   * The optional mapping for the error messages.
   * @example { required: 'Your custom required error message.' }
   */
  readonly errorMsgMap = input<{ [key: string]: string }>({});

  /** Holds the value of the error message string */
  protected readonly errorMessage = signal<string>('');

  /**
   * The resolved form control instance to be used in the directive.
   */
  public readonly formControl: Signal<FormControl> = computed(() => {
    // Immediately assign to formControl if control input is a FormControl instance.
    // Otherwise, attempt to resolve the control from the parent form group.
    const control = this.control();
    if (control instanceof FormControl) {
      return control;
    } else if (typeof control === 'string') {
      const group = this.controlContainer.control as FormGroup;
      return group.get(control as string) as FormControl;
    } else {
      throw new Error(
        'Invalid control input provided to QsGenericFormFieldDirective'
      );
    }
  });

  ngOnInit(): void {
    this.initControlSubscriptions();
  }

  /**
   * Subscribe to the status changes of the form control and resolve the error message
   */
  private initControlSubscriptions(): void {
    const control = this.formControl();
    control.statusChanges.pipe(debounceTime(500)).subscribe((state) => {
      if (state === 'INVALID' && control.errors) {
        // At the moment, only one error message is displayed within the field.
        const errorKey = Object.keys(control.errors)[0];
        let errorMsg = '';
        if (this.errorMsgMap()[errorKey]) {
          errorMsg = this.errorMsgMap()[errorKey];
        } else if (
          DEFAULT_ERROR_MESSAGES[
            errorKey as keyof typeof DEFAULT_ERROR_MESSAGES
          ]
        ) {
          errorMsg =
            DEFAULT_ERROR_MESSAGES[
              errorKey as keyof typeof DEFAULT_ERROR_MESSAGES
            ];
        } else {
          console.error('No validation message found for error:', errorKey);
        }

        if (this.errorMessage() !== errorMsg) {
          this.errorMessage.set(errorMsg);
        }
      }
    });
  }

  /**
   * Compute the value of the "required" field error message.
   */
  public checkRequiredMsg(): void {
    if (this.formControl().hasError('required')) {
      const errorMsg = this.errorMsgMap()['required']
        ? this.errorMsgMap()['required']
        : DEFAULT_ERROR_MESSAGES['required'];
      // Only assign new error message if it was not the same with the previous one.
      if (errorMsg !== this.errorMessage()) {
        this.errorMessage.set(errorMsg);
      }
    }
  }

  /** Generic handle for blur event */
  public onBlur(): void {
    this.checkRequiredMsg();
  }
}

const DEFAULT_ERROR_MESSAGES = {
  required: 'This field is required.',
} as const;
